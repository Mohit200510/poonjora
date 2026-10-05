import React from 'react'
import styles from "./Checkout.module.css"
import logo from "../../../public/pujora_icon.png"
import { FcGoogle } from "react-icons/fc";
import { PiLineVerticalThin } from "react-icons/pi";
import { FiArrowRight } from "react-icons/fi";
import { X } from 'lucide-react'
import bag from "../../assets/login_new2.webp"
import { IoMdLock } from "react-icons/io";






function LoginBox({googleLoginForm,setOpenCheckout}) {


  return (
    <div className={`${styles.loginBox}`}>
        <X onClick={()=>{
            setOpenCheckout(false)
        }} className={styles.loginBoxCrossIcon}/>
        <div>
            <div className={styles.loginBoxWrappper}>
                <div className={styles.loginBoxLogo}>
                    <img src={logo}></img>
                </div>
                <div className={styles.LoginBoxHeading}>
                    <h3>Sign In</h3>
                    <p>Sign in for a faster seemless exprience</p>
                </div>

                <div className={styles.LoginBoxBrandImage}>
                    <img src={bag}></img>
                </div>

                <div className={styles.loginBoxMid}>

                    <div className={styles.loginBoxGoogleBtn}>
                        <button onClick={googleLoginForm} type='button'><FcGoogle className={styles.googleIcon}/><PiLineVerticalThin className={styles.line} />Continue with Google<FiArrowRight className={styles.arrow}/></button>
                    </div>
                    <div className={styles.loginBoxDividerLine}>
                        <span></span>
                        <p>OR</p>
                        <span></span>
                    </div>
                    <div className={styles.loginBoxGuestBtn}>
                        <a href=''>Continue as Guest</a>
                    </div>

                </div>

                <div className={styles.loginBoxBottom}>
                    <p>
                    <span><IoMdLock/> By continuing, you agree to our</span><br/>
                    <a href=''>Terms of Service</a> and <a href=''>Privacy Policy.</a>
                    </p>
                </div>

            </div>
            
        </div>

    </div>
  )
}

export default LoginBox