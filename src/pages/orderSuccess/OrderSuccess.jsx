import React, { useEffect, useState } from 'react'
import styles from "./OrderSuccess.module.css"
import Container from '../../components/common/Container'
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";
import { MdVerified } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegMoneyBill1 } from "react-icons/fa6";

import { FiTruck } from "react-icons/fi";
import { LuCopy } from "react-icons/lu";
import { FiPhoneCall } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { FiBox } from "react-icons/fi";
import { ClipLoader } from "react-spinners";







function OrderSuccess() {

    const navigate = useNavigate();


    const location = useLocation();
    const { orderId } = useParams();

  
    const [order, setOrder] = useState(location.state?.order);
    const [copied,setCopied] =useState(false)
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {

  if (order) return;

  const fetchOrder = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) {
      console.log("Error fetching order:", error);
       setFetchError(true);
      return;
    }

    setOrder(data);
  };

  fetchOrder();

}, [orderId]);



// copy clipboard text fucntion
const copyOrderNumber = () => {
  navigator.clipboard.writeText(order.order_number);

  setCopied(true);

  
};

// ///////////////////////////////

if (!order) {
  return <ClipLoader  color="#46155C" size={60} />
}
if (fetchError) {
  return <p>Order could not be found.</p>;
}
    


  return (
    <main className={styles.orderSuccess}>
        <Container>
        <div className={styles.orderSuccessContainer}>

            <div className={styles.orderSuccessLeftContainer}>
                <div className={styles.orderSuccessLeft}>
                    <span><MdVerified/></span>
                    <h2>Order Confirmed!</h2>
                    <p>Thank you for shopping with Poonjora</p>
                    <div className={styles.orderSuccessLeftUpdateBox}>
                        <FiBox/>
                        <p className={styles.successMessage}>
                        <span>Your order has been placed successfully.</span>
                        <br />
                          We'll keep you updated about your delivery.
                         </p>
                    </div>
                    <button onClick={()=>{
                        navigate("/")
                    }} type='button'>Continue Shopping <FiArrowRight/></button>

                </div>

            </div>

            <div className={styles.orderSuccessRightContainer}>
                <div className={styles.orderSuccessRightBox}>
                    <div className={styles.orderSuccessRightBoxContainer}>

                        <div className={styles.orderSuccessRightBoxtop}>
                            <div className={styles.orderSuccessRightBoxHeading}>
                                <h5>Order Details</h5>
                                <span>#{order?.order_number} <LuCopy 
                                onClick={copyOrderNumber}
                                style={{color:copied?"#16a34a":"#46155C"}}/></span>
                            </div>

                            <div className={styles.orderSuccessRightBoxTopBody}>
                                <div className={styles.orderSuccessRightBoxTopBodyRow}>
                                    <div>
                                        <LuCalendarDays/>
                                        <span>Order Date</span>
                                    </div>
                                    <p>
                                    {new Date(order?.created_at).toLocaleString("en-IN", {
                                      day: "2-digit",
                                     month: "short",
                                     year: "numeric",
                                      hour: "numeric",
                                     minute: "2-digit"
                                     }).toUpperCase()}
                                    </p>
                                    {/* 03 Oct 2026, 2:15 PM */}
                                    
                                    
                                </div>

                                <div className={styles.orderSuccessRightBoxTopBodyRow}>
                                    <div>
                                        <FaRegMoneyBill1/>
                                        <span>Payment Method</span>
                                    </div>
                                    <p>{order?.payment_method} </p>
                                    
                                </div>

                                <div className={styles.orderSuccessRightBoxTopBodyRow}>
                                    <div>
                                        <FiPhoneCall/>
                                        <span>Contact Number</span>
                                    </div>
                                    <p>{order?.shipping_address?.phone} </p>
                                    
                                </div>

                                <div className={styles.orderSuccessRightBoxTopBodyRow}>
                                    <div>
                                        <FiTruck />
                                        <span>Delivery Address</span>
                                    </div>
                                    <p id={styles.orderSuccessBoxAddress}>
                                    <b>{order?.shipping_address?.full_name}</b>
                                    <br />

                                    {order?.shipping_address?.full_address},
                                    <br />

                                    {order?.shipping_address?.city},{" "}
                                   {order?.shipping_address?.state} -{" "}
                                    {order?.shipping_address?.pincode}
                                    </p>
                                    
                                </div>

                                
                                
                            </div>
                        </div>

                        <div className={styles.orderSuccessRightBoxMid}>
                            <div className={styles.orderSuccessMidRightBoxHeading}>
                                Order Items ({order?.items.length})
                            </div>

                            <div className={styles.orderSuccessRightBoxMidBody}>

                                {order?.items?.map((item)=>(
                                    <div   key={item.id} className={styles.orderSuccessRightBoxMidItem}>

                                    <div className={styles.orderSuccessRightBoxMidItemLeft}>
                                        <div className={styles.orderSuccessRightBoxMidItemImageContainer}>
                                            <img src={item.image_url} alt={item.name} />
                                        </div>
                                        <div>
                                            <h3>{item.name}</h3>
                                            <p>{item.weight}</p>
                                        </div>
                                    </div>

                                    <div className={styles.orderSuccessRightBoxMidItemPrice}>
                                        ₹{item.sale_price * item.quantity}.00
                                    </div>
                                </div>
                                ))}

                                

                            </div>

                            <div className={styles.orderSuccessMidRightBoxBottom}>
                                <h5>Grand Total</h5>
                                <span> ₹{order?.total_amount}.00</span>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>

            

        </div>
        </Container>
    </main>
  )
}

export default OrderSuccess