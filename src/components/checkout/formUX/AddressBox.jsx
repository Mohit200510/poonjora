import React, { useState } from 'react'
import styles from "./FormUX.module.css"
import AddressSelection from '../addressSelectionPopup/addressSelection'

import { FaTruckFast } from "react-icons/fa6";

import { GrLocation } from "react-icons/gr";
import { LuPlus } from "react-icons/lu";







function AddressBox({setOpenAddressForm,openAddressForm,selectedAddress,setSelectedAddress,openAdressSelection,setOpenAddressSelection}) {
 
    

  return (
    <>

    <div>
        

        <h3 className={styles.deliveryAddressBoxHeading}><FaTruckFast size={22}/> Shipping Address</h3>

            {selectedAddress?( <div className={styles.AddressBox}>

                <div className={styles.addressBoxHeadder}>
                    <div>
                        <GrLocation/>
                        <h5>Deliver To <span className={styles.addresCustomerName}>{selectedAddress?.full_name}</span></h5>

                    </div>
                    <span
                    onClick={()=>{
                        setOpenAddressSelection(true)
                    }}
                     className={styles.addressBoxEditbtn}>Edit</span>

                </div>

                <div className={styles.addressBoxAddress}>

                    <p>{selectedAddress?.full_address}<br/>
                    <span>{selectedAddress?.state}, {selectedAddress?.pincode}</span><br/>
                    <h6>{selectedAddress?.phone}</h6>
                    </p>
                </div>

            </div>):(<div className={styles.AddressBox}>

                <div className={styles.addressBoxHeadder}>
                    <div>
                        <GrLocation/>
                        <h5 style={{color: "#6b6660" ,fontWeight: "600"}}>No Saved Address</h5>

                    </div>
                    <span
                    onClick={()=>{
                        setOpenAddressSelection(true)
                    }}
                     className={styles.addressBoxEditbtn}></span>

                </div>

                <div 
                onClick={()=>{
                        setOpenAddressSelection(true)
                    }}
                
                className={styles.addressBoxNoAddressSelected}>


                    <LuPlus/>
                    Add a New Address
                </div>

            </div>

                

            
            )}

        
    </div>


    {openAdressSelection? <AddressSelection setOpenAddressForm={setOpenAddressForm}openAddressForm={openAddressForm} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} setOpenAddressSelection={setOpenAddressSelection}/>:null}
   


    </>

    
  )

}



export default AddressBox