import React from 'react'
import styles from "./Hero.module.css";
import Container from '../common/Container';
import banner from "../../assets/hero_bg.webp";
// import Mobbanner from "../../assets/mob2.png"
// import Mobbanner from "../../assets/newherobg.png"
// import Mobbanner from "../../assets/better_mob.png"
import Mobbanner from "../../assets/mobile_hero.webp"
import { LayoutGrid,ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import aggarbatti from "../../assets/smoke5.webp"



function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bannerOverlay}>
      
        <img className={styles.bannerImg} src={banner}></img>
        <Link to="collections/products">
        <img className={styles.mobbanner} src={Mobbanner}></img>
        </Link>
        <Container>

        <div className={styles.heroWraper}>

          <div className={styles.heroContent}>

            <div className={styles.herotext}>

              <h1>Bringing Devotion Closer to Home</h1>
              <p>Authentic puja essentials for everyday worship, festivals and sacred occasions.</p>

              <div className={styles.heroBtn}>


                <Link
                   to="/collections/products"
                   className={styles.heroBtnOne}>
                   <ShoppingBag stroke="var(--color-accent)"/>Shop Now
                </Link>

                  <button  className={styles.heroBtnTwo}><LayoutGrid style={{display: "block" ,position:"absolute"}} /> Explore Categories</button>
                  

              </div>

              <img className={styles.agarabtii}
                 src={aggarbatti}
                 alt="Animated Agarbatti"
                style={{  position: "absolute" ,left: "-57px" , bottom: "-168px", zIndex: "-1"}}
              />

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