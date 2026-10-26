import React, { useState,useEffect } from 'react'
import styles from "./AddressSelection.module.css"
import { supabase } from '../../../supabaseClient.js';
import { GrLocation } from "react-icons/gr";

import { ClipLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from 'react-icons/io5';



function AddressSelection({setOpenAddressForm,openAddressForm,selectedAddress,setSelectedAddress,setOpenAddressSelection}) {


    const[savedAddresses,setSavedAddresses] =useState([]);
    
        const [loading,setLoading] =useState(false)
    
        const fetchAddresses = async ()=>{
            setLoading(true)
    
            const {data,error} = await supabase
            .from("addresses")
            .select("*");
    
            if(error){
                console.log("error while fetching addreses",error);
            setLoading(false)
    
                return;
            }
    
    
            setSavedAddresses(data)
            setLoading(false)
    
    
    
        }
    
        useEffect(() => {
          if (!openAddressForm) {
            fetchAddresses();
         }
         }, [openAddressForm]);
    
    
    
    
         
         console.log("selectedAddress", selectedAddress);
         
        
        
  return (
   <div className={styles.addressSelectionBox}>
           <div>

             <span onClick={()=>{
                    setOpenAddressSelection(false)
            }} className={styles.DialogCloseButton}> <IoCloseSharp/>  </span>
   
               <div style={{display:loading?"flex":"none"}} className={styles.loadingScreen}>
                   <ClipLoader color='#240138' size={40}/>
               </div>
   
   
               <div className={styles.addressBoxHeader}>
                   <div className={styles.addressBoxHeaderLeft}>
                        <GrLocation/>
   
                       <h5>Select Delivery Address</h5>
                   </div>
                   
                   <div onClick={()=>{
                       setOpenAddressForm(true)
                   }} className={styles.addressBoxHeaderRight}>
                       <span>Add New Address</span>
                   </div>
   
   
               </div>
               <div className={styles.AddressBoxBody}>
                
                   <div className={styles.AddressBoxAdresses}>
                    <div className={styles.addressBoxEmptyContainer}>
                           <FaPlus/>
                           <p onClick={()=>{
                               setOpenAddressForm(true)
                           }}>Add Delivery Address</p>
                       </div>
   
   
                       {savedAddresses.map((address)=>(
   
                           <label key={address.id} htmlFor={address.id}>
                       <div className={styles.addressBoxAddress}>
                           <div className={styles.AddressBoxAdressInner}>
                           <input type='radio' name='address' id={address.id} onChange={()=>{
                               setSelectedAddress(address)
                           }}></input>
                           <div className={styles.AddressBoxText}>
                           <h5>{address.address_type}</h5>
                           <p>{address.full_name}</p>
                           <p>{address.full_address}</p>
                           <p>{address.phone}</p>
                           </div>
                           </div>
                           <div className={styles.addressBoxAddressEdit}>Edit</div>
                       </div>
                       </label>
                           
                       ))}
   
                       
   
                       
                   </div>
   
               </div>
           </div>
       </div>
  )
}

export default AddressSelection