import React from 'react'
import styles from "./FormUX.module.css"


import { BsCart2 } from "react-icons/bs";
import product from "../../../assets/featureCard5.png"
import { IoCloseSharp } from 'react-icons/io5';


function ReviewBox({setOpenReviewBox}) {
  return (
    <div className={styles.reviewBox}>

      <span onClick={()=>{
                  setOpenReviewBox(false)
              }} className={styles.reviewBoxCloseButton}> <IoCloseSharp/>  </span>
        <div className={styles.reviewBoxInner}>

          <div className={styles.reviewBoxHeader}>

            <div className={styles.reviewBoxHeaderHeading}>
              <BsCart2/>
              <h5>Order Summary</h5>
            </div>

            <div>
              <span>3 items</span>

            </div>
          </div>

            <div className={styles.reviewBoxBody}>
              <div>

                <div className={styles.reviewBoxBodyCartItem}>
                  <div className={styles.reviewBoxBodyCartItemLeft}>
                    <div className={styles.reviewBoxBodyCartItemImgWrapper}>
                      <img src={product}></img>

                    </div>
                    <div className={styles.reviewBoxBodyCartItemLeftText}>
                      <h3>Speicial Chameli oil for Religous Ceremonies good for daily Use</h3>
                      <p>900ml</p>


                    </div>

                  </div>

                  <div className={styles.reviewBoxBodyCartItemRight}>
                    <p>₹499.00</p>
                    <span>Qty: 1</span>
                    
                  </div>

                </div>

                <div className={styles.reviewBoxBodyCartItem}>
                  <div className={styles.reviewBoxBodyCartItemLeft}>
                    <div className={styles.reviewBoxBodyCartItemImgWrapper}>
                      <img src={product}></img>

                    </div>
                    <div className={styles.reviewBoxBodyCartItemLeftText}>
                      <h3>Speicial Chameli oil for Religous Ceremonies good for daily Use</h3>
                      <p>900ml</p>


                    </div>

                  </div>

                  <div className={styles.reviewBoxBodyCartItemRight}>
                    <p>₹499.00</p>
                    <span>Qty: 1</span>
                    
                  </div>

                </div>

                <div className={styles.reviewBoxBodyCartItem}>
                  <div className={styles.reviewBoxBodyCartItemLeft}>
                    <div className={styles.reviewBoxBodyCartItemImgWrapper}>
                      <img src={product}></img>

                    </div>
                    <div className={styles.reviewBoxBodyCartItemLeftText}>
                      <h3>Speicial Chameli oil for Religous Ceremonies good for daily Use</h3>
                      <p>900ml</p>


                    </div>

                  </div>

                  <div className={styles.reviewBoxBodyCartItemRight}>
                    <p>₹499.00</p>
                    <span>Qty: 1</span>
                    
                  </div>

                </div>

                 <div className={styles.reviewBoxBodyCartItem}>
                  <div className={styles.reviewBoxBodyCartItemLeft}>
                    <div className={styles.reviewBoxBodyCartItemImgWrapper}>
                      <img src={product}></img>

                    </div>
                    <div className={styles.reviewBoxBodyCartItemLeftText}>
                      <h3>Speicial Chameli oil for Religous Ceremonies good for daily Use</h3>
                      <p>900ml</p>


                    </div>

                  </div>

                  <div className={styles.reviewBoxBodyCartItemRight}>
                    <p>₹499.00</p>
                    <span>Qty: 1</span>
                    
                  </div>

                </div>

              </div>

              

            </div>


            <div className={styles.reviewBoxFooter}>
              <div className={styles.reviewBoxFooterTop}>
                <div className={styles.reviewBoxFooterInnerRow}>
                  <p>MRP Total</p>
                  <span>₹499.00</span>
                </div>
                <div className={styles.reviewBoxFooterInnerRow}>
                  <p>Dicount</p>
                  <span>-₹199.00</span>
                </div>
                <div className={styles.reviewBoxFooterInnerRow}>
                  <p>Delivery Charges</p>
                  <span id={styles.reviewBoxFreeDeliveryText}>Free</span>
                </div>
              </div>

              <div className=''>
                <div className={styles.reviewBoxFooterMainTotal}>
                  <p>Total Amount</p>
                  <h5>₹499.00</h5>
                </div>
              </div>
            </div>

            
            
        </div>
    </div>
  )
}

export default ReviewBox