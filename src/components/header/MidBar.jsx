import React from 'react'
import Container from '../common/Container'
import styles from "./Header.module.css";
import { useNavigate } from 'react-router-dom';
// import logo from "../../assets/PujoraLogo.svg";
import logo from "../../assets/poonjora_logo.png";
// import logo from "../../assets/test.png";
// import logo from "../../assets/test6.png";
// import logo from "../../assets/new_logo.png";
import SearchBar from './SearchBar';
import Location from './Location';
import ShopingCart from './ShopingCart';
import UserAccount from './UserAccount';
import WishList from './WishList';
import { Menu } from 'lucide-react';

import { useContext } from 'react';
import CartContext from '../../context/CartContext';


function MidBar() {

    const {closeCart,setCloseCart,cartItems} = useContext(CartContext)
    const navigate =useNavigate();

    
    function OpenCart(){
        setCloseCart(false)
    }

    function navigateHome(){
        navigate("/")
    }


  return (
    <div className={styles.midBar}>
        <Container>

            <div className={styles.midBarContent}>

                <div className={styles.hamBurgerIcon}>
                    <Menu size={28}  color="#f7f3ee" ></Menu>
                </div>

                <div onClick={navigateHome} className={styles.logoWrap}>
                    <img src={logo}></img>
                </div>

                <div className={styles.searchBarMain}>
                    <SearchBar></SearchBar>
                  
                </div>

                <div className={styles.midBarNav}>

                    <Location ></Location>
                    <WishList className={styles.midBarNavItems}></WishList>
                    <div className={styles.midBarNavCartIconDiv}  onClick={OpenCart}>
                    <ShopingCart className={styles.midBarNavItems}></ShopingCart>
                    <span style={{visibility: cartItems.length >=1? "visible":"hidden"}} className={styles.cartCountBadge}>{cartItems.length}</span>
                    </div>
                    <UserAccount className={styles.midBarNavItems}></UserAccount>
                    
                </div>

            </div>

        </Container>
        
    </div>
  )
}

export default MidBar