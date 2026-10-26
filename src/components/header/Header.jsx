import React from 'react';
import styles from './Header.module.css';
import Container from '../common/Container';
import TopBar from "./TopBar";
import MidBar from "./MidBar"
import BottomBar from './BottomBar';

function Header() {
  return (

    <header className={styles.header}>

      
        <div className={styles.midBarContainer}>

        <TopBar></TopBar>
        <MidBar></MidBar>
        </div>
        <BottomBar></BottomBar>
       
    

    
    </header>
  )
}

export default Header;