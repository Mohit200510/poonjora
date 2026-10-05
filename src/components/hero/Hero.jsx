import React from 'react'
import styles from "./Hero.module.css";
import Container from '../common/Container';
import banner from "../../assets/hero_bg.webp";
// import Mobbanner from "../../assets/mob2.png"
// import Mobbanner from "../../assets/newherobg.png"
// import Mobbanner from "../../assets/better_mob.png"
import Mobbanner from "../../assets/mobile_new.png"
import { LayoutGrid,ShoppingBag } from 'lucide-react';



function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bannerOverlay}>
      
        <img className={styles.bannerImg} src={banner}></img>
        <img className={styles.mobbanner} src={Mobbanner}></img>
        <Container>

        <div className={styles.heroWraper}>

          <div className={styles.heroContent}>

            <div className={styles.herotext}>

              <h1>Bringing Devotion Closer to Home</h1>
              
              <p>Authentic puja essentials for everyday worship, festivals and sacred occasions.</p>
              <div className={styles.heroBtn}>


                
                  <button className={styles.heroBtnOne}><ShoppingBag style={{display: "block" ,position:"absolute"}}  stroke='var(--color-accent' />  Shop Now</button>
                  
                  <button className={styles.heroBtnTwo}><LayoutGrid style={{display: "block" ,position:"absolute"}} /> Explore Categories</button>
                  

              </div>

            </div>

            <div>

            </div>
            


          </div>

        </div>

        






      </Container>
      </div>
    </section>
  )
}

export default Hero