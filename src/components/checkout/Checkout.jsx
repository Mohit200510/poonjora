
import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { supabase } from "../../supabaseClient";
import LoginBox from "./LoginBox";
import CheckoutForm from "./CheckoutForm";
import Overlay from "../common/Overlay";

function Checkout({ setOpenCheckout }) {
  const [user, setUser] = useState(null);
  const [loadingGuest, setLoadingGuest] = useState(false);

  // Check existing login session
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      setUser(data.session?.user ?? null);
    };

    checkUser();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

    return () => subscription.unsubscribe();
  }, []);

  // Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://poonjora.in/",
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("Google login failed:", error);
    }
  };

  // Guest login
  const handleGuestContinue = async () => {
    if (loadingGuest) return;

    setLoadingGuest(true);

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data.session?.user) {
        setUser(data.session.user);
        return;
      }

      const { data: guestData, error: guestError } =
        await supabase.auth.signInAnonymously();

      if (guestError) throw guestError;

      setUser(guestData.user);
    } catch (error) {
      console.error("Guest login failed:", error);
      alert("Unable to continue as guest. Please try again.");
    } finally {
      setLoadingGuest(false);
    }
  };

  return (
    <>
      <Overlay />

      <div className={styles.checkoutWindow}>
        {user ? (
          <CheckoutForm setOpenCheckout={setOpenCheckout} />
        ) : (
          <LoginBox
            googleLoginForm={handleGoogleLogin}
            setOpenCheckout={setOpenCheckout}
            handleGuestContinue={handleGuestContinue}
            loadingGuest={loadingGuest}
          />
        )}
      </div>
    </>
  );
}

export default Checkout;
