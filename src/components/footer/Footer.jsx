import React from 'react'
import styles from "./Footer.module.css"
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import logo from "../../assets/footer-logo.png";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MapPinned } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { RiVisaFill } from "react-icons/ri";
import { FaPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaStripe } from "react-icons/fa";







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
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href=''>About Us</a></li>
                        <li><a href=''>Contact Us</a></li>
                        <li><a href=''>Bulk Ordering</a></li>
                        <li><a href=''>Shopping</a></li>
                    </ul>

                </div>

            </div>

            <div className={styles.footerQuickLinks}>
                <div className=''>
                    <h4>Account Info</h4>
                    <ul>
                        <Link to="/privacy-policy"><li><a href=''>Privacy Policy</a></li></Link>
                        <Link to="/shipping-policy"><li><a href=''>Shipping & Delivery Policy</a></li></Link>
                        <Link to="/refund-cancellation-policy"><li><a href=''>Refund & Cancellation Policy</a></li></Link>
                        <Link to="/terms-and-conditions"><li><a href=''>Terms & Conditions</a></li></Link>

                    </ul>

                </div>

            </div>

            <div className={styles.footerContactDetails}>
                <div>
                    <h4>Contact Us</h4>
                    <div className={styles.footerContactDiv}>.
                        <div>
                        <MapPinned  size={40} />
                        </div>
                        <p> Shree Balaji Puja Prodcuts, Shop No 4, Shivalik Vihar, Bhabat Road, Zirakpur Punjab 140603</p>
                    </div>

                    <div className={styles.footerContactDiv}>
                        <div>
                        <Mail size={40}/>
                        </div>
                        <a href="mailto:support@poonjora.in">support@poonjora.in</a>
                    </div>

                    <div className={styles.footerContactDiv}>
                        <div>
                        <Phone size={40}/>
                        </div>
                        <a href="tel:+919877956181">+91-9877956181</a>
                    </div>
                </div>

            </div>
        </div>

        <div className={styles.footerLower}>
            <div className=''>
                <p>Copyright @ 2026 <b>Pujora</b> . All Rights Reserved.</p>

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