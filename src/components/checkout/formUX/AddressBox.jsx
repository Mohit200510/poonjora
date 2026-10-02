import React, { useState,useEffect } from 'react'
import { supabase } from '../../../supabaseClient';
import styles from "./FormUX.module.css"
import { IoLocationSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";




function AddressBox({setOpenAddressForm,openAddressForm,selectedAddress,setSelectedAddress}) {


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
    <div>
        <div>

            <div style={{display:loading?"flex":"none"}} className={styles.loadingScreen}>
                <ClipLoader color='#240138' size={50}/>
            </div>


            <div className={styles.addressBoxHeader}>
                <div className={styles.addressBoxHeaderLeft}>
                     <IoLocationSharp/>

                    <h5>Delivery Address</h5>
                </div>
                
                <div onClick={()=>{
                    setOpenAddressForm(true)
                }} className={styles.addressBoxHeaderRight}>
                    <span>Add New Address</span>
                </div>


            </div>
            <div className={styles.AddressBoxBody}>
                <div className={styles.AddressBoxAdresses}>


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

                    {/* <div className={styles.addressBoxAddress}>
                        <input type='radio' name='address' id='office'></input>

                        <label for="office">Office</label>
                        
                    </div> */}
                    
                </div>

            </div>
        </div>
    </div>
  )
}

export default AddressBox