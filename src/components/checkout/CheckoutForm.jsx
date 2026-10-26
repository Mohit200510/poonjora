import React, { useState } from 'react'
import styles from "./Checkout.module.css"
import { useRef } from "react";
import { supabase } from '../../supabaseClient';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { PulseLoader } from "react-spinners";
import OrderSuccess from './orderSuccess/OrderSuccess';
import PaymentScreen from './paymentPopup/PaymentScreen';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
// import { FaArrowRight } from "react-icons/fa6";


import { GoArrowLeft } from "react-icons/go";
import { IoMdLock } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";


// import logo from "../../assets/footer-logo.png";
import logo from "../../assets/footer_logo_reasnparent.png"

import UserBox from './formUX/UserBox';
import AddressBox from './formUX/AddressBox';
import OffersBox from './formUX/OffersBox';
import PaymentBox from './formUX/PaymentBox';

import Address from './addressForm/Address';
import Overlay from '../common/Overlay';
import ReviewBox from './formUX/ReviewBox';
import DialogBox from './dialogBox/DialogBox';
import AddressSelection from './addressSelectionPopup/addressSelection';

function CheckoutForm({setOpenCheckout}) {


  const naviagte = useNavigate();

    const [openAddressForm,setOpenAddressForm] = useState(false)
    const [openReviewBox,setOpenReviewBox] = useState(false)
    const [openAdressSelection,setOpenAddressSelection] = useState(false)
    

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

    const [loading,setLoading] = useState(false)

    const [openDialogBox,setOpenDialogBox] = useState(false)
    const [closeCheckout,setCloseCheckout] = useState(false)
    const [paymentScreen,openPaymentScreen] = useState(false)


    const {cartItems,cartPriceTotal,clearCart} = useContext(CartContext)
    const codRequestRef = useRef(null);

    const checkoutIdRef = useRef(null);

       if (!checkoutIdRef.current) {
       checkoutIdRef.current = crypto.randomUUID();
   }

    // const placeOrder = async ()=>{

    //   setLoading(true)
    //   const {data,error} =  await supabase
    //   .from("orders")
    //   .insert([{
    //     shipping_address: selectedAddress,
    //     items: cartItems,
    //     total_amount: cartPriceTotal,
    //     payment_method: selectedPaymentOption
    //   }])
    //   .select()
    //   .single();

    //   if (error) {
    //      console.log("Order error:", error);
    //      return;
    //      }

    //     // console.log("Order placed successfully");
    //     clearCart()

    //     naviagte(`/order-confirmation/${data.id}`,{
    //       state: {order: data}
    //     });
    //     setOpenCheckout(false)  
    //     setLoading(false)
    //     console.log("cartiTEMS",cartItems);
        


    
    //   }
     

      // cashfree payemnt verificaton fucntion
      

      const handlePaymentVerified = async (orderId) => {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("payment_status", "paid")
    .eq("order_status", "confirmed")
    .single();

  if (error || !order) {
    console.error("Could not retrieve confirmed order:", error);
    return;
  }

  checkoutIdRef.current = null;
  codRequestRef.current = null;

clearCart();

naviagte(`/order-confirmation/${order.id}`, {
  state: { order },
});

setOpenCheckout(false);

}; // Closes handlePaymentVerified


// COD ORDER PLACEMENT FUNCTION

const handleCODOrder = async () => {
  if (loading) return;

  if (!selectedAddress?.id) {
    alert("Please select a delivery address.");
    return;
  }

  if (!cartItems.length) {
    alert("Your cart is empty.");
    return;
  }

  setLoading(true);

  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session?.user) {
      throw new Error("Please log in to place a COD order.");
    }

    const userId = sessionData.session.user.id;

    // Only send product IDs and quantities to the backend.
    const items = cartItems.map((item) => ({
      id: Number(item.id),
      quantity: Number(item.quantity),
    }));

    // Identify the current checkout contents.
    const checkoutFingerprint = JSON.stringify({
      userId,
      addressId: selectedAddress.id,
      items: [...items].sort((a, b) => a.id - b.id),
    });

    // Generate a new key only for a different checkout.
    // Reuse the existing key when retrying the same checkout.
    if (
      codRequestRef.current?.fingerprint !== checkoutFingerprint
    ) {
      codRequestRef.current = {
        fingerprint: checkoutFingerprint,
        key: crypto.randomUUID(),
      };
    }

    const idempotencyKey = codRequestRef.current.key;

    // Create or retrieve the COD order securely.
const { data, error } = await supabase.functions.invoke(
  "create-cod-order",
  {
    body: {
      items,
      shippingAddress: {
        id: selectedAddress.id,
      },
      idempotencyKey,
      checkoutId: checkoutIdRef.current,
    },
  }
);

    if (error) {
  console.error("COD FUNCTION ERROR:", error);
  console.error("COD RESPONSE DATA:", data);

  let message = data?.error;

  if (!message && error.context) {
    try {
      const response = await error.context.json();
      message = response?.error;
    } catch (e) {
      console.error("Could not read error response:", e);
    }
  }

  throw new Error(
    message || "Unable to place your COD order."
  );
}

    if (!data?.success || !data?.orderId) {
      throw new Error("Invalid order response.");
    }

    // Fetch the order created by the backend.
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", data.orderId)
      .eq("user_id", userId)
      .eq("payment_method", "COD")
      .single();

    if (orderError || !order) {
      throw new Error(
        "Order created, but confirmation could not be loaded."
      );
    }

    // Reset checkout identifiers after successful confirmation.
      codRequestRef.current = null;
      checkoutIdRef.current = null;

      clearCart();

    naviagte(`/order-confirmation/${order.id}`, {
      state: { order },
    });

    setOpenCheckout(false);

  } catch (error) {
    console.error("COD order error:", error);

    alert(
      error.message || "Could not place COD order."
    );
  } finally {
    setLoading(false);
  }
};






  return (
    <div className={styles.CheckoutForm}>
      
        <div className={styles.CheckoutFormHeader}>
          <div >
           <GoArrowLeft onClick={()=>{
            setOpenDialogBox(true)
           }} className={styles.checkotFormArrow}/>
           <img src={logo}></img>
          </div>
          <p>100% Secured Checkout <IoMdLock/></p>
        </div>

        <div className={styles.CheckoutFormBody}>

        <AddressBox setOpenAddressForm={setOpenAddressForm} openAddressForm={openAddressForm} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} openAdressSelection={openAdressSelection} setOpenAddressSelection={setOpenAddressSelection}/>
        <OffersBox/>
        {/* <PaymentBox selectedAddress={selectedAddress} cartItems={cartItems} selectedPaymentOption={selectedPaymentOption} setSelectedPaymentOption={setSelectedPaymentOption} onPaymentVerified={handlePaymentVerified}/> */}
        <UserBox/>

        {openAddressForm || openReviewBox || openDialogBox || openAdressSelection ?<Overlay/>:null}

        {openAddressForm?<Address setOpenAddressForm={setOpenAddressForm} openAddressForm={openAddressForm} />:null}
        {openReviewBox?<ReviewBox setOpenReviewBox={setOpenReviewBox} openReviewBox={openReviewBox} />:null}
        {openDialogBox?<DialogBox setOpenDialogBox={setOpenDialogBox} setOpenCheckout={setOpenCheckout}/>:null}

        </div>

        <div className={styles.checkoutFormBottom}>
          <div>

            <div className={styles.checkoutFormBottomCollaspseBox}>
              <div className={styles.checkoutFormBottomCollaspseBoxLeft}>
                <FiShoppingBag/>
                <span>(3 items in Cart)</span>
              </div>
              <span onClick={()=>{
                setOpenReviewBox(true)
              }}>
                <FaAngleDown className={styles.angleDown}/>
              </span>
            </div>

            
{/* {selectedPaymentOption === "COD" && (
  <div className={styles.checkoutFormBottomButtonArea}>
  <div>
    <button
      type="button"
      onClick={handleCODOrder}
      disabled={loading || !selectedAddress?.id || !cartItems.length}
    >
      {loading ? "Placing Order..." : "Place Order"}
      {!loading && <FaArrowRightLong />}
    </button>
  </div>
  </div>
)} */}


            <div className={styles.checkoutFormBottomButtonArea}>
              
              <button type="button"
                disabled={!selectedAddress?.id || !cartItems.length || loading}
                onClick={() => openPaymentScreen(true)}>
              {loading
                  ? <PulseLoader color="#fff" size={10}/>
                  : `Pay ₹${cartPriceTotal}.00`
              }<FaArrowRightLong/>
              </button>

            </div>


          </div>

        </div>

         {paymentScreen && (
   <PaymentScreen
    onClose={() => openPaymentScreen(false)}
    selectedAddress={selectedAddress}
    cartItems={cartItems}
    selectedPaymentOption={selectedPaymentOption}
    setSelectedPaymentOption={setSelectedPaymentOption}
    onPaymentVerified={handlePaymentVerified}
    onCODOrder={handleCODOrder}
    loading={loading}
    setOpenDialogBox={setOpenDialogBox}
    checkoutId={checkoutIdRef.current}
  />
)}


      </div>
    
  )
}

export default CheckoutForm