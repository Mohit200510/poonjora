import React, { useState } from 'react'

import { Star ,Heart} from 'lucide-react'
import styles from "./FeatureProducts.module.css"

import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import { MdOutlineStar } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";






function FeatureProduct({product}) {


    const {addToCart,cartItems,increaseQuantity,decreaseQuantity} = useContext(CartContext)
    

    const isInCart = cartItems.some((item) => {
        return item.id === product.id;
    });
    // return true adn false value only


    const cartProduct = cartItems.find(
     (item) => item.id === product.id
   );
   //    return cart sinle product object



  return (
   
        <>

                        <div className={styles.featureProductBoxWishlist}>
                            <Heart stroke='var(--color-primary)' size={24}/>
                        </div>

                        <div className={styles.featureProductBoxBadge}>
                            23% OFF
                        </div>

                        

<div className={styles.featureProductBoxImgWrapper}>
  <img src={product.image_url} alt={product.name} />

  {!isInCart ? (
    <button
      type="button"
      className={styles.mobileCartButton}
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product);
      }}
    >
      <PiShoppingCartSimpleBold size={17} />
      <span>Add to Cart</span>
    </button>
  ) : (
    <div
      className={styles.mobileQtyControl}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => decreaseQuantity(product.id)}
        aria-label="Decrease quantity"
      >
        <FiMinus />
      </button>

      <span>{cartProduct?.quantity ?? 0}</span>

      <button
        type="button"
        onClick={() => increaseQuantity(product.id)}
        aria-label="Increase quantity"
      >
        <FiPlus />
      </button>
    </div>
  )}
</div>



                        <div className={styles.featureProductBoxText}>
                            <h3>{product.name}</h3>
                            <h4 className={styles.featureProductBoxWeight}>{product.weight}</h4>

                            <div className={styles.featureProductBoxRating}>
                                <div>
                                
                                <MdOutlineStar/><MdOutlineStar/><MdOutlineStar/><MdOutlineStar/><MdOutlineStar/>

                                </div>
                                <span> <b>4.8</b> (122)</span>
                            </div>



                            <div className={styles.featureProductBoxPrice}>
                                <h4>₹{product.sale_price}</h4>
                                <h5><del>₹{product.mrp}</del></h5>
                                <h6>Save ₹{product.mrp-product.sale_price}</h6>
                            </div>

                            {!isInCart?(<button style={{background:isInCart?"#36014F": "#36014f"}}
                             onClick={(e)=>{
                                e.stopPropagation()
                                addToCart(product)
                            }} type='button'><PiShoppingCartSimpleBold size={22}/>{isInCart?" ✓ Added to Cart ":"Add to Cart"}
                            </button>):( <div className={styles.productQtyChange}>
                                <div className={styles.productQtyChangeInner}>
                                    <div onClick={(e)=>{
                                        e.stopPropagation();
                                        decreaseQuantity(product.id)

                                    }}><FiMinus/></div>

                                    <span>{cartProduct.quantity}</span>

                                    <div onClick={(e)=>{
                                        e.stopPropagation()
                                        increaseQuantity(product.id)
                                    }}><FiPlus/> </div>

                                </div>
                            </div>)}
                            

                           

                        </div>


                    </>
    
  )
}

export default FeatureProduct