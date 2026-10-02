import React from 'react'
import { useState,useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import styles from './FeatureProducts.module.css'
import Container from '../common/Container'

import FeatureProduct from './FeatureProduct'
import { ArrowRight } from 'lucide-react'

function FeatureProducts() {

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    async function getProducts(){
        const {data,error} = await supabase
        .from("products")
        .select("*");

    if(error){
        console.log("error",error);
        return;   
    }
    // console.log("products:",data);
    setProducts(data);
    
    }



  return (

    <section className={styles.sectionProducts}>
        <Container>
            <div className={styles.featureProductsSecHeader}>
                <h2>Divine Essentails</h2>
                <p>Handpicked essentials for your daily puja and religious ceremonies</p>
            </div>

            <div className={styles.FeatureProductsMain}>

                
  
                <div className={styles.featureProductsBoxes}>

                    {products.map((product,index)=>(
                        <div className={styles.featureProductsBox} key={product.id}>
                            <FeatureProduct product ={product}></FeatureProduct>
                        </div>
                    ))}

                    {/* <FeatureProduct image = {productOne} name = "Pujora Premium Sandalwood Dhoop Sticks (Pack of 6)" price ="₹1,299" mrp = "₹1,999" ></FeatureProduct>
                    <FeatureProduct image = {productTwo} name = "Brass Puja Thali Set (7 Pcs)" price ="₹349" mrp = "₹499" ></FeatureProduct>
                    <FeatureProduct image = {productThree} name = "Marble Lord Ganesha Idol (12 Inch)" price ="₹2,499" mrp = "₹3,499" ></FeatureProduct>
                    <FeatureProduct image = {productFour} name = "Brass Panchmukhi Diya (Large)" price ="₹1,199" mrp = "₹1,799" ></FeatureProduct>
                    <FeatureProduct image = {productFive} name = "Chameli (Jasmine) Oil 900ml |Special Chameli Puja Oil (900 ml)" price ="₹489" mrp = "₹599" ></FeatureProduct>
                    <FeatureProduct image = {productSix} name = "Camphor Tablet 100g Jar - Pack of 1 | For Puja, Festivals & Other Religious Ritual" price ="₹190" mrp = "₹299" ></FeatureProduct>
                    <FeatureProduct image = {productSeven} name = " " price ="₹639" mrp = "₹1,499" ></FeatureProduct>
                    <FeatureProduct image = {productEight} name = "Devdarshan Desi Wet (Geela) Dhoop Sticks | 240 Sticks (Pack of 12 Units) " price ="₹306" mrp = "₹449" ></FeatureProduct> */}
                    
                </div>

            </div>

            <div className={styles.FeatureProductsSeeMore}>
                <button>View All Products <ArrowRight /></button>
            </div>


        </Container>
    </section>
    
  )
}

export default FeatureProducts