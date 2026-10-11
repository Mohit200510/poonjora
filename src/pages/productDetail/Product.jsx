import React, { useEffect, useState } from 'react'
import styles from "./Product.module.css"
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import Container from '../../components/common/Container'
import { MdOutlineStar } from 'react-icons/md'
import { BiLeaf } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";


import oil from "../../assets/featureCard5.png"
import gallery from "../../assets/gallery2.png"
import PincodeChecker from '../../components/common/pincodeChecker/PincodeChecker'
import ProductSkeleton from './productSkeleton/ProductSkeleton'



function Product() {


  const {id} = useParams();

  const[product,setProduct] = useState(null);
  



  useEffect(()=>{
    const fetchProduct =async ()=>{

      const {data,error} =await supabase
      .from("products")
      .select("*")
      .eq("id",id)
      .single();

    if (error) {
      console.log("this is the erorr",error);
      return;
    }

    console.log("product data box data",data);
    setProduct(data)
    
    }

    fetchProduct();

  },[id])




    const item = {
  id: 1,

  name: "Special Chameli Puja Oil",

  description:
    "Pure and aromatic puja oil crafted for daily diya lighting, aarti, festivals and sacred occasions.",

  image_url: "../../assets/featureCard6.png",

  sale_price: 499,

  mrp: 599,

  weight: "900ML",

  rating: 4.8,

  review_count: 124,

  stock: 25,

  category: "Puja Essentials"
};


if (!product) {
    return <ProductSkeleton/>;
}


  return (
    <>

    <main className={styles.productDetail}>
        <div>
            <section className={styles.productDetail}>

  <div className={styles.productHero}>

    <Container>
    <div className={styles.productHeroContent}>
      

      {/* LEFT — PRODUCT IMAGE */}


      <div className={styles.productVisualMain}>
        <div className={styles.productGallery}>
          <div className={styles.productGalleryContainer}>
            <div className={styles.productGalleryBox}>
              <img src={gallery}></img>
            </div>
            <div className={styles.productGalleryBox}>
              <img src={gallery}></img>
            </div>
            <div className={styles.productGalleryBox}>
              <img src={gallery}></img>
            </div>
            <div className={styles.productGalleryBox}>
              <img src={gallery}></img>
            </div>

          </div>
        </div>
      <div className={styles.productVisual}>
        <img className={styles.productMainImage}
          src={product.image_url}
        />
      </div>

      </div>



      

      {/* RIGHT — PRODUCT DETAILS */}
      <div className={styles.productInfo}>

        <div className={styles.productInfoInner}>

          {/* HEADING */}
          <div className={styles.heading}>
            <h1>{product.name}</h1>

            <p>
              Pure essentials for your everyday puja,
              rituals and sacred occasions.
            </p>
          </div>


          {/* RATING */}
          <div className={styles.rating}>
            <div className={styles.stars}>
              ★★★★★
            </div>

            <span>4.8 (124 reviews)</span>
          </div>


          {/* PRICE */}
          <div className={styles.price}>
            <strong>₹{product.sale_price}</strong>

            <span>
              ₹{product.mrp}
            </span>

            <div className={styles.discount}>
              34% OFF
            </div>
          </div>


          {/* PACK */}
          <div className={styles.packSection}>
            <p>Select Pack / Weight</p>

            <div className={styles.packOptions}>

              <button>
                <span>50 g</span>
                <strong>₹59</strong>
              </button>

              <button className={styles.selectedPack}>
                <span>100 g</span>
                <strong>₹99</strong>
              </button>

              <button>
                <span>200 g</span>
                <strong>₹179</strong>
              </button>

            </div>
          </div>


          {/* QUANTITY */}
          <div className={styles.quantityRow}>

            <div>
              <p>Quantity</p>

              <div className={styles.quantity}>
                <button>−</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>

            <span className={styles.stock}>
              ● In Stock
            </span>

          </div>


          {/* DELIVERY */}

          <PincodeChecker/>
          {/* <div className={styles.delivery}>
            <p>Check Delivery</p>

            <div>
              <input
                type="text"
                placeholder="Enter Pincode"
              />

              <button>CHECK</button>
            </div>
          </div> */}




          {/* CTA */}
          <div className={styles.actions}>

            <button className={styles.cartButton}>
              Add to Cart
              
            </button>

            <button className={styles.buyButton}>
              Buy Now
            </button>

          </div>


          {/* TRUST */}
          <div className={styles.trust}>

            <div className={styles.trustItem}>
              <BiLeaf/>
              <div>
                <h3>Authentic Products</h3>
                <p>Quality Assured</p>
              </div>
            </div>

            <div className={styles.trustItem}>
              <FaShippingFast/>
              <div>
                <h3>Fast Shipping</h3>
                <p>Across  India</p>
              </div>
            </div>

            

            <div className={styles.trustItem}>
              <MdOutlineLock/>
              <div>
                <h3>Secure Checkout</h3>
                <p>Safe & protected</p>
              </div>
            </div>
            
          </div>

        </div>

      </div>
      

    </div>
    </Container>

  </div>

</section>




        </div>
    </main>
    </>
  )
}

export default Product