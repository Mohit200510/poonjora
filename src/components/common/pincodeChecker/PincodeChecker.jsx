import React from 'react'
import { supabase } from '../../../supabaseClient'
import { useState } from 'react'
import { useContext } from 'react'
import styles from "./PincodeChecker.module.css"
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { PincodeContext } from '../../../context/PincodeContext'




function PincodeChecker({setOpenToggle}) {
    
    
    // const[pincode,setPincode] =useState("");
    const[checking,setChecking] =useState(false);
    // const[deliveryResult,setDeliveryResult] = useState(null);

    const {pincode,setPincode,deliveryResult,setDeliveryResult} = useContext(PincodeContext)




    const handleCheck = async () => {

        setChecking(true);
        setDeliveryResult(null);

    try {
        const { data, error } = await supabase.functions.invoke(
            "check-delivery",
            {
                body: {
                    pincode,
                    weight: 0.5
                }
            }
        );

        if (error) throw error;

        console.log("Shiprocket Response:", data);

        setDeliveryResult(data);

    } catch (error) {
        console.error("Delivery check failed:", error);
        setChecking(false);


    } finally {
        setChecking(false);
        setOpenToggle(false)
    }
};



  return (

    <div>

    {/* DELIVERY */}
        <div className={styles.delivery}>
            {/* <p>Check Delivery</p> */}
        
            <div className={styles.deliveryField}>
                <input type="text" placeholder="Enter 6-digit PIN code" inputMode='numeric' maxLength={6}
                value={pincode}
                onChange={(e) => {setPincode(e.target.value.replace(/\D/g, ""));
                     setDeliveryResult(null);
                }}/>
                <button
                disabled={pincode.length !== 6 || checking }
                 type='button' onClick={handleCheck}>{checking ? "Checking..." : "CHECK"}</button>
            </div>
            

            <div className={styles.deliveryAvaialblity}>

                
            {deliveryResult && (
            deliveryResult.available?(<div className={styles.deliveryAvaialblityTrue}>
                <FaCheckCircle/>
                <span>Delivery Available to {pincode}</span>
            </div>):(<div className={styles.deliveryAvaialblityFalse}>
                <IoCloseCircleOutline/>
                <span>Currently unservericable to {pincode}</span>
            </div>)
            )}

            </div>
            

            

        </div>

    </div>
  )
}

export default PincodeChecker