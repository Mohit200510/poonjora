import React, { useState } from 'react'
import { supabase } from '../../../supabaseClient';
import styles from "./Address.module.css"
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { AiOutlineShop } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";
import { PulseLoader } from "react-spinners";










function Address({setOpenAddressForm}) {


    
    

    const [loading,setLoading] = useState(false)
    
    // function to store address data filed by the user form data and then sent it to supabase for saving.

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const rawAddressData = new FormData(e.currentTarget)
    const addressData = Object.fromEntries(rawAddressData.entries());

    const { data , error } = await supabase
    .from("addresses")
    .insert([addressData])
    .select();

    if (error) {
    //    console.log("Address error:", error);
     return;
     }
     setLoading(false)
     setOpenAddressForm(false)
    //  console.log("Address saved:", data);
    
    };

   



  return (
    <>

    <div  className={styles.address}>
        <span onClick={()=>{
            setOpenAddressForm(false)
        }} className={styles.addressCloseButton}> <IoCloseSharp/>  </span>

        <div className={styles.addressInner}>
               <form onSubmit={handleSubmit}>
                <legend><MdOutlineLocalShipping className={styles.addressTruck}/>Add Delivey Address</legend>
                <fieldset>
                    <div className={styles.addressBody}>
                    <div className={styles.addressShippingInfo}>
                        <h6 className={styles.addressSubHeading} >Shipping Address</h6>

                        <div className={styles.addressFormField}>
                            <input type="text" name="pincode" id="pincode" placeholder="" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required ></input>
                            <label htmlFor="pincode">Pincode</label>
                        </div>
                        
                        <div className={styles.addressStateCity}>

                            <div className={styles.addressFormField}>
                            <input type='text' name='city' id='city' placeholder='' minLength={2} required></input>
                            <label htmlFor="city">City</label>
                            </div>

                            <div className={styles.addressFormField}>
                            <input type='text' name='state' id='state' placeholder='' minLength={2} required></input>
                            <label htmlFor="state">State</label>
                            </div>
                            

                        </div>

                        <div className={styles.addressFormField}>
                            <input type='text' name='full_address' id='full_address' placeholder='' minLength={10} required></input>
                            <label htmlFor="full_address">Full address</label>
                        </div>

                        

                    </div>

                    <div>
                        <h6 className={styles.addressSubHeading} >Customer Information</h6>

                        <div className={styles.addressFormField}>
                            <input type='text' name='full_name' id='full_name' placeholder='' minLength={1}  required></input>
                            <label htmlFor="full_name">Full Name</label>
                        </div>

                        <div className={styles.addressMailPhone}>

                            <div className={styles.addressFormField}>
                                <input type='tel' name='phone' id='phone' placeholder='' minLength={10} maxLength={10}  required></input>
                                <label htmlFor="phone">Contact Number</label>
                            </div>

                             {/* <div className={styles.addressFormField}>
                                <input type='email' name='email' id='email' placeholder='' required></input>
                                <label for="phone">Email Address</label>
                            </div> */}

                        </div>
                        

                    </div>

                    <div>
                        <h6 className={styles.addressSubHeading} >Address Type</h6>

                        <div className={styles.addressSaveTypes}>

                            <label htmlFor="home">
                            <div  className={styles.addressTypeRadioField}>
                                <input type='radio' name='address_type' id='home' value="Home" required></input>
                                <span><AiOutlineHome/>Home</span>
                            </div>
                            </label>

                            <label htmlFor="office">
                            <div className={styles.addressTypeRadioField}>
                                <input type='radio' name='address_type' id='office' value="Office" required></input>
                                <span><HiOutlineOfficeBuilding/>Office</span>
                            </div>
                            </label>

                            <label htmlFor="shop">
                            <div className={styles.addressTypeRadioField}>
                                <input type='radio' name='address_type' id='shop' value="Shop" required></input>
                                <span ><AiOutlineShop/>Shop</span>
                            </div>
                            </label>

                            <label htmlFor="others">
                            <div className={styles.addressTypeRadioField}>
                                <input type='radio' name='address_type' id='others' value="others" required></input>
                                <span ><LuMapPin/>Others</span>
                            </div>
                            </label>

                        </div>

                    </div>
                    </div>

                    <div className={styles.addressFinalBtn}>

                        <button type='submit'>{loading?<PulseLoader color="#fff" size={11}/>:"Save & Continue"}</button>
                        
                    </div>

                </fieldset>
               </form>
        </div>
    </div>


     </>
  )
 
}

export default Address