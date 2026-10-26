import React from 'react'
import { Helmet } from "react-helmet-async";
import styles from "./Home.module.css"
import Hero from '../../components/hero/Hero'
import Categories from '../../components/categories/Categories'
// import banner from "../../assets/puja_banner.png"
import FeatureProducts from '../../components/featureProducts/featureProducts';
import TrustSection from '../../components/trustSection/TrustSection'
import Footer from '../../components/footer/Footer'
import PujaKit from '../../components/puja_kits/PujaKit'
import chameli from "../../assets/new_banner4.png"

import HomePanchang from '../../components/homePanchang/HomePanchang'

function Home() {
  return (
    <>

    <Helmet>
  <title>Poonjora - Puja Items & Puja Essentials Online</title>

  <meta
    name="description"
    content="Shop authentic puja items and puja essentials online at Poonjora. Discover products for everyday worship, festivals, puja rituals and sacred occasions."
  />

  <link
    rel="canonical"
    href="https://poonjora.in/"
  />
  </Helmet>


    <div className={styles.homeBG}>
        <Hero/>
        <HomePanchang/>
      

        <Categories/>
        
        <div className={styles.chamelOilBanner}>
          <img src={chameli}></img>
        </div>

        {/* <div>
        <img style={{width: "100%" , marginTop: "70px"}} src={banner}></img>
        </div> */}
        <FeatureProducts/>
        <PujaKit/>

        <TrustSection/>
        <Footer/>




    </div>
    </>
  )
}

export default Home