import React from 'react'
import styles from "./FormUX.module.css"
import { FaTruckFast } from "react-icons/fa6";
import { FiGift } from "react-icons/fi";




function OffersBox() {
  return (
    <div className={styles.offersBox}>
        <div>
            <div className={styles.offersBoxHeader}>
                <FaTruckFast/>
                <h5>Delivery & Offers</h5>
                
            </div>
            <div className={styles.offersBoxBody}>

                <div className={styles.offersBoxBodyFreeDelivery}>
                <FaTruckFast/>
                <span>Free delivery on this order !</span>
                </div>

                <div className={styles.offersBoxBodyCouponBox}>
                    <div>
                        <input type='text' name='coupon' id='coupon' placeholder='Apply coupon code'></input>
                    </div>
                </div>

                 <div className={styles.offersBoxBodyPreapidOffer} id={styles.offersBoxBodyPreapidOffer}>
                <FiGift/>
                <span>Get 10% off on prepaid orders</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default OffersBox