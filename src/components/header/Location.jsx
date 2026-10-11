import React, { useState } from 'react'
import { useContext } from 'react';
import { MapPin } from 'lucide-react';
import styles from "./Header.module.css";
import { FaTruck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";

import PincodeChecker from '../common/pincodeChecker/PincodeChecker';
import { PincodeContext } from '../../context/PincodeContext';



function Location() {

  const[openToggle,setOpenToggle] = useState(true);

  const{pincode,deliveryResult} =useContext(PincodeContext)
  



  function closeToggleBox(){
    setOpenToggle(false);
  }

  function openToggleBox(){
    setOpenToggle(true);
  }

  return (
    <>
    <div className={styles.location} style={{display: "flex" ,alignItems: "center" ,gap: "4px" ,color: "#fff"}}>
        <MapPin size={29} color="#c2bbb1" ></MapPin>
        <div className={styles.locationOuterText} onClick={openToggleBox}>
          <p>Deliver to</p>
        <span>{deliveryResult?(deliveryResult.available?(
                      pincode 
                  ):(
                     
                     `Unavailable · ${pincode}`
                  )
                  ):"Select delivery location"
                  } <FaAngleDown/>
          </span>


      
      <div className={styles.deliveryAvaialblity}>
      
                      
                  
      
       </div>
      

        
        </div>


        <div style={{display: openToggle ?"block":"none"}} className={styles.locationToggleBox}>

            <div className={styles.locationToggleBoxContainer}>
              <span onClick={closeToggleBox} className={styles.locationToggleClose}>
              <IoMdClose/>
              </span>
              <h4>Choose delivery location</h4>
              <p>Enter your PIN code to check delivery availablility</p>

              <PincodeChecker setOpenToggle={setOpenToggle}  />

              <h6><FaTruck/>Check whether we deliver to your area</h6>

            </div>
            
         </div>


    </div>


    
    </>
  )
}


export default Location