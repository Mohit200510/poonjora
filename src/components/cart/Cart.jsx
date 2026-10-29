import React, { useState } from 'react'
import styles from "./Cart.module.css"
import { X } from 'lucide-react'
import { GoTrash } from "react-icons/go";
import { Minus,Plus } from 'lucide-react';
import { FiMinus} from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { PiNewspaperFill } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import product from "../../assets/featureCard5.png"
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import bagImg from "../../assets/pujora_bag.png"
import { FaTruckFast } from "react-icons/fa6";
import Checkout from '../checkout/Checkout';




function Cart() {
    
    const {CloseCart,closeCart,setCloseCart,cartItems,setCartItems,decreaseQuantity,increaseQuantity,cartPriceTotal,cartMRPTotal,cartDiscount} = useContext(CartContext);

    const [openCheckout,setOpenCheckout]=useState(false)

    

    const deleteItem = (id) => {
      const updatedCart = cartItems.filter((item) => {
    return item.id !== id;
    });

    setCartItems(updatedCart);
   };



  return (
    
    <div style={{right: closeCart?"-100vw":"0%"}} className={styles.cartMain}>
    
   
            <div style={{visibility: cartItems.length >=1?"hidden":"visible"}} className={styles.emptyCartContent}>
                    <img src={bagImg}></img>
                    <h3>Your Cart is Empty!</h3>

            </div>

            <div className={styles.cartTop}>

                <h3>Your Cart <span>({cartItems.length})</span></h3>
                <div onClick={CloseCart} className={styles.cartTopCloseIcon}>
                    <X />
                </div>
                
            </div>

            <div className={styles.cartOfferHeadline}>
                <FaTruckFast/>
                <span><b>FREE DELIVERY</b> On all orders!</span> 


            </div>

            <div className={styles.cartBody}>
                
                <div className={styles.cartItems}>
                    {cartItems.map((item)=>(
                    
                        

                        <div key={item.id} className={styles.cartItem}>

                        <div className={styles.cartItemImage}>
                            <img src={item.image_url}></img>
                        </div>

                        <div className={styles.cartItemDetails}>
                            <div className={styles.cartItemMid}>
                                <h2>{item.name}</h2>
                                <h5>{item.weight}</h5>
                                <div className={styles.cartUpdationItems}>
                                    <div onClick={()=>{
                                        deleteItem(item.id)
                                    }} className={styles.cartBinIcon}>
                                        <GoTrash />
                                    </div>

                                    <div className={styles.cartQtynBox}>
                                        
                                        <div onClick={()=>{
                                            decreaseQuantity(item.id)
                                        }}>
                                        <FiMinus />
                                        </div>
                                        <span>{item.quantity}</span>
                                        <div onClick={()=>{
                                            increaseQuantity(item.id)
                                        }}>
                                        <FaPlus />
                                        </div>

                                    </div>
                                    
                                    
                                </div>
                            </div>

                            <div className={styles.cartItemprice}>
                                <h4>₹{item.sale_price * item.quantity}</h4>
                                <h5><del>₹{item.mrp * item.quantity}</del></h5>

                            </div>

                        </div>

                    </div>

                        

                    ))}
                    

                    


                </div>
            </div>

            <div style={{visibility: cartItems.length >=1 ?"visible":"hidden"}} className={styles.cartBottom}>
                <div className={styles.cartBottmDiv}>
                    <div className={styles.cartBottomTotal}>

                        <div className={styles.cartBottomTotalLeft}>
                            <PiNewspaperFill/>
                            <p>Estimated Total</p>
                            
                        </div>

                        <div className={styles.cartBottomTotalRight}>
                            <div>
                                <h5><del>₹{cartMRPTotal}</del></h5>
                                <h4>₹{cartPriceTotal}</h4>
                            </div>
                            <p>You saved ₹{cartDiscount}!</p>

                        </div>

                    </div>

                    <div className={styles.cartBottomCheckoutbtn}>
                        <button onClick={()=>{
                           
                            console.log("button is clicked");
                             setOpenCheckout(true)
                             setCloseCart(true)
                            
                        }} type='button'>Checkout <FaArrowRightLong/></button>
                    </div>

                    

       
                

                </div>
            </div>
             {openCheckout?<Checkout setOpenCheckout = {setOpenCheckout} />:null}
        </div>
        

    
  )
}

export default Cart