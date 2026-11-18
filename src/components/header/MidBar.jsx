import React from 'react'
import Container from '../common/Container'
import styles from "./Header.module.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from "../../assets/poonjora_logo.png";
import logo from "../../assets/logooo.png";
// import logo from "../../assets/recently.png";
import SearchBar from './SearchBar';
import Location from './Location';
import ShopingCart from './ShopingCart';
import UserAccount from './UserAccount';
import WishList from './WishList';
import { Menu } from 'lucide-react';

import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import MobileNavDrawer from './MobileNavDrawer';




function MidBar() {

    const {closeCart,setCloseCart,cartItems} = useContext(CartContext)
    const navigate =useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    
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

                <button
                      type="button"
                      className={styles.hamBurgerIcon}
                      onClick={() => setIsMenuOpen(true)}
                       aria-label="Open navigation menu"
                        aria-expanded={isMenuOpen}
                       aria-controls="mobile-navigation-drawer"
                       >
                 <Menu size={28} />
              </button>



                    <Location/>


                <div onClick={navigateHome} className={styles.logoWrap}>
                    <img src={logo}></img>
                </div>

                {/* <div className={styles.searchBarMain}>
                    <SearchBar></SearchBar>
                  
                </div> */}

                <div className={styles.midBarNav}>

                    <WishList className={styles.midBarNavItems}></WishList>
                    <div className={styles.midBarNavCartIconDiv}  onClick={OpenCart}>
                    <ShopingCart className={styles.midBarNavItems}></ShopingCart>
                    <span style={{visibility: cartItems.length >=1? "visible":"hidden"}} className={styles.cartCountBadge}>{cartItems.length}</span>
                    </div>
                    <UserAccount className={styles.midBarNavItems}></UserAccount>
                    
                </div>

            </div>

        </Container>
        <MobileNavDrawer
  isOpen={isMenuOpen}
  onClose={() => setIsMenuOpen(false)}
/>
        
    </div>
    
  )
}

export default MidBar