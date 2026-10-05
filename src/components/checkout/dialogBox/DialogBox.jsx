import React from 'react'
import styles from "./DialogBox.module.css"
import { GiExitDoor } from "react-icons/gi";
import { IoCloseSharp } from 'react-icons/io5';


function DialogBox({setOpenDialogBox,setOpenCheckout}) {
  return (
    <div className={styles.dialogBox}>


         <span onClick={()=>{
                    setOpenDialogBox(false)
                }} className={styles.DialogCloseButton}> <IoCloseSharp/>  </span>


        <div className={styles.dialogBoxConatiner}>
            <div className={styles.dialogBoxtop}>
                <GiExitDoor/>
                <div>
                    <h2>Are you sure you want to exit?</h2>
                    <p>Items in cart may run out of stock soon.</p>
                </div>

            </div>

            <div className={styles.DialogBoxBtns}>
                <button onClick={()=>{
                    setOpenDialogBox(false)
                }} id={styles.DialogBoxRejectBtn} type='button'>Stay in Checkout</button>
                <button onClick={()=>{
                    setOpenCheckout(false)
                }} type='button'>Yes, exit</button>
            </div>

            

        </div>
    </div>
  )
}

export default DialogBox