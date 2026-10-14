import React from 'react'
import styles from "./TrustSection.module.css"
import Container from '../common/Container'
import { Truck,ShieldCheck,Lock,UserRoundCheck } from 'lucide-react'


function TrustSection() {
  return (

    <section className={styles.trustSection}>


            
        

            <div className={styles.trustSectionBody}>
            <Container>

              <div style={{marginBottom: "50px"}} className={styles.trustSectionHeader}>
                <h2><span> Devotion </span>You Can Trust</h2>
                <p>Bringing purity, authenticity, and devotion to every home with handpicked selected puja essentials.</p>
            </div>


              <div className={styles.trustSectionBodyBadges}>

                <div className={styles.trustSectionBodyBadge}>
                  <span><Truck size={68}/></span>
                  <h4>Free Shipping</h4>
                  <p>Free shipping on all orders</p>
                </div>

                <span className={styles.dividerLine}></span>

                <div className={styles.trustSectionBodyBadge}>
                  <span> <ShieldCheck size={68}/> </span>
                  <h4>100% Authentic</h4>
                  <p>Temple-quality puja products</p>
                </div>

                <span className={styles.dividerLine}></span>


                <div className={styles.trustSectionBodyBadge}>
                  <span><Lock size={68}/></span>
                  <h4>Secure Payments</h4>
                  <p>UPI • Cards • COD</p>
                </div>

                <span className={styles.dividerLine}></span>


                <div className={styles.trustSectionBodyBadge}>
                  <span><UserRoundCheck size={68}/></span>
                  <h4>Trusted By Devotees</h4>
                  <p>Thousands of happy customers</p>
                </div>

              </div>

            </Container>
            </div>

        



    </section>
    
    
  )
}

export default TrustSection