import React, { useState } from 'react'
import { createContext } from 'react'

export const PincodeContext = createContext();

export const PincodeProvider = ({children}) =>{


    const[pincode,setPincode] = useState("");
    const[deliveryResult,setDeliveryResult] = useState(null);
    


  return (
    <PincodeContext.Provider value={{pincode,setPincode,deliveryResult,setDeliveryResult}}>
        {children}
    </PincodeContext.Provider>
  )
}
