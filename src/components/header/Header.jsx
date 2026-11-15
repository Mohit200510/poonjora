import React from 'react';
import styles from './Header.module.css';
import Container from '../common/Container';
import TopBar from "./TopBar";
import MidBar from "./MidBar"
import BottomBar from './BottomBar';
// import Location from './Location';

function Header() {
  return (

    <header className={styles.header}>

      
      

        <TopBar></TopBar>

        
      <div className={styles.stickyHeader}>
        <MidBar></MidBar>
        
        <BottomBar></BottomBar>
        </div>





        {/* <Location/> */}
       
    

    
    </header>
  )
}

export default Header;