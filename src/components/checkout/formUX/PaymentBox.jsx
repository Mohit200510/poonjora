
import React, { useEffect, useRef, useState } from "react";
import styles from "./FormUX.module.css";
import { IoCardOutline } from "react-icons/io5";
import { load } from "@cashfreepayments/cashfree-js";
import { supabase } from "../../../supabaseClient";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function PaymentBox({
  selectedAddress,
  cartItems,
  selectedPaymentOption,
  setSelectedPaymentOption,
  onPaymentVerified,
  checkoutId
}) {
  const checkoutRef = useRef(null);
  const activeCheckoutRef = useRef(null);
  const onVerifiedRef = useRef(onPaymentVerified);
  const mountedRef = useRef(false);
  const generationRef = useRef(0);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [pendingOrderId, setPendingOrderId] = useState(null);

  const addressId = selectedAddress?.id ?? null;

  const cartKey = JSON.stringify(
    cartItems.map((item) => ({
      id: Number(item.id),
      quantity: Number(item.quantity),
    }))
  );

  const isCOD = selectedPaymentOption === "COD";

  useEffect(() => {
    onVerifiedRef.current = onPaymentVerified;
  }, [onPaymentVerified]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      generationRef.current += 1;
    };
  }, []);

  // Retained for normal checkout use.
  // Do not invoke during webhook-only testing.
  const verifyPayment = async (orderId, generation) => {
    const isCurrent = () =>
      mountedRef.current &&
      generationRef.current === generation;

    for (let attempt = 0; attempt < 5; attempt++) {
      if (!isCurrent()) return;

      if (attempt > 0) {
        await sleep(2000);
      }

      if (!isCurrent()) return;

      try {
        const { data, error } =
          await supabase.functions.invoke(
            "verify-cashfree-payment",
            {
              body: { orderId },
            }
          );

        if (!isCurrent()) return;

        if (
          !error &&
          data?.verified === true &&
          data?.paymentStatus === "paid"
        ) {
          setPaymentStatus("Payment verified!");
          setPendingOrderId(null);

          await onVerifiedRef.current(orderId);
          return;
        }

        if (attempt === 4) {
          setPaymentStatus(
            "Payment is not confirmed yet. Please check your order status before trying again."
          );
          setPendingOrderId(orderId);
        }
      } catch (error) {
        console.error("Payment verification:", error);

        if (attempt === 4 && isCurrent()) {
          setPaymentStatus(
            "We couldn't confirm your payment yet."
          );
          setPendingOrderId(orderId);
        }
      }
    }
  };

  useEffect(() => {
    const generation = ++generationRef.current;

    const isCurrent = () =>
      mountedRef.current &&
      generationRef.current === generation;

   

    if (!addressId || !cartItems.length) {
      setLoading(false);
      return;
    }

   const requestKey = `${checkoutId}:${addressId}:${cartKey}`;

    if (
      activeCheckoutRef.current?.key === requestKey &&
      activeCheckoutRef.current?.state === "running"
    ) {
      return;
    }

    const initializeCheckout = async () => {
      setLoading(true);
      setErrorMessage("");
      setPaymentStatus("");

      let orderId = null;

      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError || !sessionData.session?.user) {
          throw new Error("Please log in to pay online.");
        }

        if (!isCurrent()) return;

        const items = JSON.parse(cartKey);

        const { data, error } =
          await supabase.functions.invoke(
            "create-cashfree-order",
            {
              body: {
                items,
                shippingAddress: { id: addressId },
                checkoutId,
              },
            }
          );
          if (error) {
  const response = error.context;

  const details = response
    ? await response.clone().json().catch(() => null)
    : null;

  alert(details?.error || error.message);

  return;
}

        if (error) {
          throw new Error(
            data?.error ||
            "Could not create payment session."
          );
        }

        if (!data?.paymentSessionId || !data?.orderId) {
          throw new Error(
            "Invalid payment session response."
          );
        }

        orderId = data.orderId;

        if (!isCurrent()) return;

        activeCheckoutRef.current = {
          key: requestKey,
          orderId,
          state: "running",
        };

        console.log("CASHFREE ORDER CREATED:", {
          orderId,
          hasPaymentSession: true,
        });

        const cashfree = await load({
          mode: "sandbox",
        });

        if (!cashfree) {
          throw new Error(
            "Cashfree SDK failed to load."
          );
        }

        if (!isCurrent() || !checkoutRef.current) return;

        console.log("CASHFREE SDK LOADED");

        setLoading(false);

        // Embedded Cashfree checkout.
        const result = await cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: checkoutRef.current,
          appearance: {
            width: "100%",
            height: "370px",
          },
          headerless: true
        });

        // Diagnostic logging.
        // Never log the full payment session ID.
        console.log("CASHFREE CHECKOUT RESULT:", result);

        if (result?.error) {
          console.error(
            "CASHFREE SDK ERROR:",
            result.error
          );
        }

        if (!isCurrent()) {
          console.warn(
            "Cashfree checkout completed, but its React effect is no longer active."
          );
          return;
        }

        // Verify payment securely through our backend.
              setPaymentStatus("Verifying payment...");
               setLoading(true);

         await verifyPayment(orderId, generation);

        if (result?.error) {
          setErrorMessage(
            "Cashfree checkout reported an issue. Check the console before retrying."
          );
        }

      } catch (error) {
        console.error(
          "CASHFREE CHECKOUT ERROR:",
          error
        );

        if (!isCurrent()) return;

        setErrorMessage(
          error.message ||
          "Unable to initialize payment."
        );

        if (orderId) {
          setPendingOrderId(orderId);
        }
      } finally {
        if (isCurrent()) {
          setLoading(false);

          if (
            activeCheckoutRef.current?.key === requestKey
          ) {
            activeCheckoutRef.current.state = "finished";
          }
        }
      }
    };

    initializeCheckout();

    return () => {
      if (generationRef.current === generation) {
        generationRef.current += 1;
      }
    };
  }, [addressId, cartKey, checkoutId]);

  // Disabled during webhook-only testing.
  // Restored after the webhook test is complete.
  const retryVerification = async () => {
    if (!pendingOrderId || loading) return;

    const generation = generationRef.current;

    setLoading(true);
    setErrorMessage("");
    setPaymentStatus("Checking payment status...");

    try {
      await verifyPayment(pendingOrderId, generation);
    } finally {
      if (
        mountedRef.current &&
        generationRef.current === generation
      ) {
        setLoading(false);
      }
    }
  };

 



  return (
    <div className={styles.paymentBox}>
      <div className={styles.paymentBoxHeader}>
        <IoCardOutline />
        <h5>Payment Options</h5>
      </div>

      <div className={styles.paymentBoxBody}>
        {/* <div className={styles.paymentBoxMethodText}>
          <h5>Pay Online Securely</h5>
          <p>
            UPI, Cards and other available payment methods
          </p>
        </div> */}

        {!selectedAddress && (
          <p>
            Please select a delivery address to continue.
          </p>
        )}

        {loading && (
          <p>Processing secure payment...</p>
        )}

        {errorMessage && (
          <p role="alert" style={{ color: "#b42318" }}>
            {errorMessage}
          </p>
        )}

        {paymentStatus && (
          <p role="status">{paymentStatus}</p>
        )}

       <div
         ref={checkoutRef}
         style={{
            width: "100%",
            minHeight: selectedAddress ?  "370px" : 0,
           display: selectedAddress ? "block" : "none",
        }}
        />

        <label htmlFor="COD">
          <div className={styles.paymentBoxMethod}>
            <div className={styles.paymentBoxMethodLeft}>
              <input
                type="radio"
                id="COD"
                name="payment"
                value="COD"
                checked={isCOD}
                onChange={() =>
                  setSelectedPaymentOption("COD")
                }
              />

              <div className={styles.paymentBoxMethodText}>
                <h5>Cash on Delivery</h5>
                <p>Pay when you receive your order</p>
              </div>
            </div>
          </div>
        </label>

        
      </div>
    </div>
  );
}

export default PaymentBox;
