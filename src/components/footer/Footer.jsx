import React from 'react'
import styles from "./Footer.module.css"
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import logo from "../../assets/footer_logo_reasnparent.png";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { VscLocation } from "react-icons/vsc";


import { RiCustomerService2Line } from "react-icons/ri";


import { RiVisaFill } from "react-icons/ri";
import { FaPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaStripe } from "react-icons/fa";
import { PiFlowerLotusLight } from "react-icons/pi";
import { LuUserRoundSearch } from "react-icons/lu";
import { LiaNewspaper } from "react-icons/lia";
import { FaAngleRight } from "react-icons/fa6";
import { PiPhoneLight } from "react-icons/pi";













function Footer() {
  return (
    <>

    <footer>
    <div className={styles.footer}>
        <Container>
        <div className={styles.footerUpper}>

            <div className={styles.footerFirst}>
                <img src={logo}></img>
                
                <p>Pujora brings devotion closer to home with thoughtfully selected puja essentials, crafted to add purity, beauty, and meaning to every sacred moment.</p>

                <div className={styles.footerSocialIcons}>
                    <FaFacebookF/>
                    <FaTwitter/>
                    <FaInstagram/>
                    <FaLinkedinIn/>
                </div>

            </div>

            <div className={styles.footerQuickLinks}>
                <div className=''>
                    <h4><PiFlowerLotusLight/> Shop</h4>
                    <ul>
                        <li><a href=''>All products </a><FaAngleRight/></li>
                        <li><a href=''>Puja Kits</a><FaAngleRight/></li>
                        <li><a href=''>Categories</a><FaAngleRight/></li>
                        <li><a href=''>New Arrivals</a><FaAngleRight/></li>
                        <li><a href=''>Best Sellers</a><FaAngleRight/></li>
                        <li><a href=''>Bulk Ordering</a><FaAngleRight/></li>
                    </ul>

                </div>

            </div>

            <div className={styles.footerQuickLinks}>
                <div className=''>
                    <h4><LuUserRoundSearch/> My Account</h4>
                    <ul>
                        <li><a href=''>My Orders</a> <FaAngleRight/></li>
                        <li><a href=''>My Addresses</a><FaAngleRight/></li>
                        <li><a href=''>Account Details</a><FaAngleRight/></li>
                        <li><a href=''>Wishlist</a><FaAngleRight/></li>
                        <li><a href=''>Track Order</a><FaAngleRight/></li>
                    </ul>

                </div>

            </div>

            <div className={styles.footerQuickLinks}>
                <div className=''>
                    <h4><LiaNewspaper/> Policies</h4>
                    <ul>
                        {/* <li><a href=''>About Us</a><FaAngleRight/></li> */}
                        {/* <li><a href=''>Contact Us</a><FaAngleRight/></li> */}
                        <Link to="/privacy-policy"><li><a href=''>Privacy Policy</a><FaAngleRight/></li></Link>
                        <Link to="/shipping-policy"><li><a href=''>Shipping & Delivery Policy</a><FaAngleRight/></li></Link>
                        <Link to="/refund-cancellation-policy"><li><a href=''>Refund & Cancellation Policy</a><FaAngleRight/></li></Link>
                        <Link to="/terms-and-conditions"><li><a href=''>Terms & Conditions</a><FaAngleRight/></li></Link>

                    </ul>

                </div>

            </div>

            <div className={styles.footerContactDetails}>
                <div>
                    <h4 className={styles.footerContactHeading}><RiCustomerService2Line size={28}/> Contact Us</h4>

                    <div className={styles.footerContactMain}>

                    <div className={styles.footerContactDiv}>
                        <div className={styles.contactIconConatiner}>
                        <VscLocation   />
                        </div>
                        <div className={styles.ContactInfo}>
                        <h6>Our Store</h6>

                        <p> Shree Balaji Puja Prodcuts, Shop No 4, Shivalik Vihar, Bhabat Road, Zirakpur Punjab 140603</p>
                        </div>
                    </div>

                    <div className={styles.footerContactDiv}>
                        <div className={styles.contactIconConatiner}>
                        <CiMail />
                        </div>
                        <div className={styles.ContactInfo}>
                            <h6>Email</h6>
                        <a href="mailto:support@poonjora.in">support@poonjora.in</a>
                        </div>
                    </div>

                    <div className={styles.footerContactDiv}>
                        <div className={styles.contactIconConatiner}>
                        <PiPhoneLight />
                        </div>
                        <div className={styles.ContactInfo}>
                            <h6>Phone</h6>
                        <a href="tel:+919877956181">+91-9877956181</a>
                        </div>
                    </div>

                    </div>


                </div>

            </div>
        </div>

        <div className={styles.footerLower}>
            <div className=''>
                <p>Copyright @ 2026 <b>Poonjora</b> . All Rights Reserved.</p>

            </div>
            <div>
                <RiVisaFill/>
                <FaPaypal/>
                <FaCcMastercard/>
                <FaStripe/>

            </div>

        </div>
        </Container>
    </div>
    </footer>

    </>
  )
}

export default Footer