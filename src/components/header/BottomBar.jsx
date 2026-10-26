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
                        <li><a className={styles.bottomBarNavItemsLink} href=''>All</a></li> 
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Puja Kits</a></li>
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Incense</a></li>
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Idols</a></li>
                        {/* <li><a className={styles.bottomBarNavItemsLink} href=''>Brass Items</a></li> */}
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Temple Decor</a></li>
                        {/* <li><a className={styles.bottomBarNavItemsLink} href=''>Rudraksha</a></li> */}
                        <li><a className={styles.bottomBarNavItemsLink} href=''>Books</a></li>
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