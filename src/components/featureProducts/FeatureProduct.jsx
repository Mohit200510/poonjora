import React, { useState } from 'react'

import { Star ,Heart} from 'lucide-react'
import styles from "./FeatureProducts.module.css"

import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import { MdOutlineStar } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";




function FeatureProduct({product}) {


    const {addToCart,cartItems} = useContext(CartContext)
    

    const isInCart = cartItems.some((item) => {
        return item.id === product.id;
    });



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

  <button
    type="button"
    className={styles.mobileCartButton}
    onClick={() => addToCart(product)}
  >
    <PiShoppingCartSimpleBold size={17} />
    <span>{isInCart ? "Added" : "Add to Cart"}</span>
  </button>
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

                            <button style={{background:isInCart?"#36014F": "#36014f"}} onClick={()=>{
                                addToCart(product)
                            }} type='button'><PiShoppingCartSimpleBold size={22}/>{isInCart?" ✓ Added to Cart ":"Add to Cart"}</button>

                        </div>


                    </>
    
  )
}

export default FeatureProduct