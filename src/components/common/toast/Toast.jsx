import React from 'react'
import styles from "./Toast.module.css"
import { FaCheckCircle } from "react-icons/fa";


function Toast({message}) {
  return (

    <div className={styles.toast}>
      < FaCheckCircle/>  {message}
    </div>
    
  )
}

export default Toast