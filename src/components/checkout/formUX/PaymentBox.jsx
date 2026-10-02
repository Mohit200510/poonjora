import React from 'react'
import styles from "./FormUX.module.css"
import { IoCardOutline } from "react-icons/io5";
import { SiPhonepe } from "react-icons/si";
import { FaAmazonPay } from "react-icons/fa6";
import { SiPaytm } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";




function PaymentBox({selectedPaymentOption,setSelectedPaymentOption}) {

    
console.log("payemnt method",selectedPaymentOption);





  return (
    <div className={styles.paymentBox}>
        <div>
            <div className={styles.paymentBoxHeader}>
                <IoCardOutline/>
                <h5>Payment Method</h5>

            </div>
            <div onChange={(e)=>{
                setSelectedPaymentOption(e.target.value)
            }} className={styles.paymentBoxBody}>
                <div className=''>


                    <label htmlFor="UPI">
                
                    <div style={{alignItems:"center"}} className={styles.paymentBoxMethod}>
                        <div className={styles.paymentBoxMethodLeft}>
                            <input type='radio' name='payment' id='UPI' value="UPI"></input>
                             <div className={styles.paymentBoxMethodText}>
                                <h5>UPI</h5>
                                <p>Google Pay, PhonePe, Paytm, UPI ID</p>
                            </div>
                        </div>
                        <div className={styles.paymentBoxMethodRight}>
                            <SiPhonepe className={styles.phonePe}/>
                            <FaAmazonPay className={styles.amazonPay}/>
                            <SiPaytm className={styles.paytm}/>


                        </div>
                    </div>
                    </label>


                    <label htmlFor="CARD">
                    <div className={styles.paymentBoxMethod}>
                        <div className={styles.paymentBoxMethodLeft}>
                            <input type='radio' name='payment' id='CARD' value="CARD"></input>
                             <div className={styles.paymentBoxMethodText}>
                                <h5 >Credit /Debit Card</h5>
                                <p>Visa, Mastercard, Rupay</p>
                            </div>
                        </div>
                        <div style={{alignItems:"center"}} className={styles.paymentBoxMethodRight}>
                            <RiVisaLine className={styles.visa}/>
                            <FaCcMastercard className={styles.master}/>


                        </div>
                    </div>
                    </label>


                    <label htmlFor="COD">
                    <div className={styles.paymentBoxMethod}>
                        <div className={styles.paymentBoxMethodLeft}>
                            <input type='radio' name='payment' id='COD' value="COD"></input>
                             <div className={styles.paymentBoxMethodText}>
                                <h5>Cash on Delivery</h5>
                                <p>Pay when you receive the order</p>
                            </div>
                        </div>
                        <div style={{alignItems:"center"}} className={styles.paymentBoxMethodRight}>
                            


                        </div>
                    </div>
                    </label>

                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentBox