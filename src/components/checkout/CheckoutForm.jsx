import React, { useState } from 'react'
import styles from "./Checkout.module.css"
import { supabase } from '../../supabaseClient';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { PulseLoader } from "react-spinners";
import OrderSuccess from './orderSuccess/OrderSuccess';
import { useNavigate } from 'react-router-dom';

import { GoArrowLeft } from "react-icons/go";
import { IoMdLock } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";


import logo from "../../assets/footer-logo.png";

import UserBox from './formUX/UserBox';
import AddressBox from './formUX/AddressBox';
import OffersBox from './formUX/OffersBox';
import PaymentBox from './formUX/PaymentBox';

import Address from './addressForm/Address';
import Overlay from '../common/Overlay';
import ReviewBox from './formUX/ReviewBox';
import DialogBox from './dialogBox/DialogBox';

function CheckoutForm() {


  const naviagte = useNavigate();

  const [openAddressForm,setOpenAddressForm] = useState(false)
  const [openReviewBox,setOpenReviewBox] = useState(false)

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

    const [loading,setLoading] = useState(false)

    const [openDialogBox,setOpenDialogBox] = useState(false)


    const {cartItems,cartPriceTotal,clearCart} = useContext(CartContext)

    const placeOrder = async ()=>{

      setLoading(true)
      const {data,error} =  await supabase
      .from("orders")
      .insert([{
        shipping_address: selectedAddress,
        items: cartItems,
        total_amount: cartPriceTotal,
        payment_method: selectedPaymentOption
      }])
      .select()
      .single();

      if (error) {
         console.log("Order error:", error);
         return;
         }

        // console.log("Order placed successfully");
        clearCart()

        naviagte(`/order-confirmation/${data.id}`,{
          state: {order: data}
        });
        setLoading(false)


    
      }
     

      
      




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

        <AddressBox setOpenAddressForm={setOpenAddressForm} openAddressForm={openAddressForm} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
        <OffersBox/>
        <PaymentBox selectedPaymentOption={selectedPaymentOption} setSelectedPaymentOption={setSelectedPaymentOption} />
        <UserBox/>

        {openAddressForm || openReviewBox || openDialogBox ?<Overlay/>:null}

        {openAddressForm?<Address setOpenAddressForm={setOpenAddressForm} openAddressForm={openAddressForm} />:null}
        {openReviewBox?<ReviewBox setOpenReviewBox={setOpenReviewBox} openReviewBox={openReviewBox} />:null}
        {openDialogBox?<DialogBox setOpenDialogBox={setOpenDialogBox}/>:null}

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

            <div className={styles.checkoutFormBottomButtonArea}>
              
              <div>
                <button
                onClick={placeOrder}
                 disabled={!selectedAddress || ! selectedPaymentOption || loading} type='button'>
                  {loading?<PulseLoader color='#fff'
                  size={10}/>:(`Pay ₹${cartPriceTotal}.00`)}</button>
              </div>
            </div>

          </div>

        </div>


      </div>
    
  )
}

export default CheckoutForm