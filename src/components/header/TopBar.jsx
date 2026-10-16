import React from 'react'
import styles from './Header.module.css';
import Container from '../common/Container';
import { BadgePercent } from 'lucide-react';

function TopBar() {
  return (
    <div className={styles.topBar}>
        <Container>

            <div className={styles.topBarContent}>
                <div className={styles.topBarOffer}>
                    <BadgePercent style={{color: "#b98423"}}></BadgePercent>
                    
                    <span className={styles.topNavOffer}>Free puja samagri pouch on orders above ₹ 999</span>

                    
                    
                </div>

                <div className='topNavLinks'>
                    <ul style={{margin: "0"}}>
                        <li className={styles.topNavLinksItem}><a className={styles.topNavLinksItemA}>Track Order</a></li>
                        <li className={styles.topNavLinksItem}><a className={styles.topNavLinksItemA}>Login</a></li>
                        <li className={styles.topNavLinksItem}><a className={styles.topNavLinksItemA}>Help</a></li>
                    </ul>

                </div>
            </div>

            






        </Container>



        
    </div>
  )
}

export default TopBar;