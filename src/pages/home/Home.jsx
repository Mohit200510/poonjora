import React from 'react'
import Hero from '../../components/hero/Hero'
import Categories from '../../components/categories/Categories'
// import banner from "../../assets/puja_banner.png"
import FeatureProducts from '../../components/featureProducts/FeatureProducts'
import TrustSection from '../../components/trustSection/TrustSection'
import Footer from '../../components/footer/Footer'
import PujaKit from '../../components/puja_kits/PujaKit'

function Home() {
  return (
    <div>
        <Hero/>
        <PujaKit/>
        <Categories/>
        {/* <div>
        <img style={{width: "100%" , marginTop: "70px"}} src={banner}></img>
        </div> */}
        <FeatureProducts/>
        <TrustSection/>
        <Footer/>




    </div>
  )
}

export default Home