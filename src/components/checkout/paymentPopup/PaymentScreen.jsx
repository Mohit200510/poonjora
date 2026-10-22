
import React from "react";
import styles from "./PaymentScreen.module.css";
import headerStyles from "../Checkout.module.css"
import PaymentBox from "../formUX/PaymentBox";
import logo from "../../../assets/footer-logo.png";

import { GoArrowLeft } from "react-icons/go";
import { IoMdLock } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

function PaymentScreen({
  onClose,
  selectedAddress,
  cartItems,
  selectedPaymentOption,
  setSelectedPaymentOption,
  onPaymentVerified,
  onCODOrder,
  loading,
  checkoutId
  
}) {

  const isCOD = selectedPaymentOption === "COD";

  return (

    <div className={styles.paymentScreen}>
        <div className={styles.paymentScreenContent}>

      <div className={headerStyles.CheckoutFormHeader}>
        <div>
          <GoArrowLeft
            onClick={onClose}
            className={headerStyles.checkotFormArrow}
          />

          <img src={logo} alt="Poonjora" />
        </div>

        <p>100% Secured Checkout <IoMdLock /></p>
      </div>

      <div className={styles.paymentScreenBody}>
        <PaymentBox
          selectedAddress={selectedAddress}
          cartItems={cartItems}
          selectedPaymentOption={selectedPaymentOption}
          setSelectedPaymentOption={setSelectedPaymentOption}
          onPaymentVerified={onPaymentVerified}
           checkoutId={checkoutId}
        />
      </div>

      {isCOD && (
        <div className={styles.paymentScreenBottom}>
          <button
            type="button"
            onClick={onCODOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place COD Order"}

            {!loading && <FaArrowRightLong />}
          </button>
        </div>
      )}

      </div>
    </div>
  );
}

export default PaymentScreen;
