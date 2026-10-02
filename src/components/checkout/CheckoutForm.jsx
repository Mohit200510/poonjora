import React, { useState } from 'react'
import styles from "./Checkout.module.css"
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

function CheckoutForm() {

  const [openAddressForm,setOpenAddressForm] = useState(false)
  const [openReviewBox,setOpenReviewBox] = useState(false)

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);




  return (
    <div className={styles.CheckoutForm}>
      
        <div className={styles.CheckoutFormHeader}>
          <div >
           <GoArrowLeft className={styles.checkotFormArrow}/>
           <img src={logo}></img>
          </div>
          <p>100% Secured Checkout <IoMdLock/></p>
        </div>

        <div className={styles.CheckoutFormBody}>

        <AddressBox setOpenAddressForm={setOpenAddressForm} openAddressForm={openAddressForm} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
        <OffersBox/>
        <PaymentBox selectedPaymentOption={selectedPaymentOption} setSelectedPaymentOption={setSelectedPaymentOption} />
        <UserBox/>

        {openAddressForm || openReviewBox?<Overlay/>:null}

        {openAddressForm?<Address setOpenAddressForm={setOpenAddressForm} openAddressForm={openAddressForm} />:null}
        {openReviewBox?<ReviewBox setOpenReviewBox={setOpenReviewBox} openReviewBox={openReviewBox} />:null}


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
                <button disabled={!selectedAddress || ! selectedPaymentOption} type='button'>Pay ₹499.00</button>
              </div>
            </div>

          </div>

        </div>


      </div>
    
  )
}

export default CheckoutForm