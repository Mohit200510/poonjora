import React from 'react'
import Container from '../common/Container';
import styles from "./Header.module.css";
import { LuCalendarDays, LuArrowRight } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";


function BottomBar() {
  return (

    <div className={styles.bottomBar}>
        
        <Container>

            <div>
                <ul className={styles.bottomBarUl}>
                    <div className={styles.bottomBarLeftLinks}>
                        <Link to="/collections/products" >
                        <li><a className={styles.bottomBarNavItemsLink} href=''>All</a></li> 
                        </Link>
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Puja Kits</a></li>
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Chameli Oil</a></li>
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Kapoor</a></li>
                        {/* <li><a className={styles.bottomBarNavItemsLink} href=''>Brass Items</a></li> */}
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Gangajal</a></li>
                        {/* <li><a className={styles.bottomBarNavItemsLink} href=''>Rudraksha</a></li> */}
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Puja Oil</a></li>
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Festive</a></li>
                    </div>

                    <div className={styles.calendarNavGroup}>
                        
                        <Link
                      to="/hindu-festival-calender"
                      className={styles.festivalCalendarLink}
                    >
                       <LuCalendarDays size={23} />
                       <span>Festival Calendar</span>
                    </Link>

                    
                    

                     <span className={styles.navDivider}></span>

                    <Link to="/panchang" className={styles.panchangButton}>
                        <FiClock className={styles.panchangIcon} />
                        <span>आज का पंचांग</span>
                        <LuArrowRight className={styles.panchangArrow} />
                    </Link>
                    </div>
                    
                    {/* <li><a className={styles.bottomBarNavItemsLink} href=''>Sale</a></li> */}
                </ul>
            </div>

        </Container>

    </div>
  )
}

export default BottomBar