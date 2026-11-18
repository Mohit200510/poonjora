
import React, { useEffect, useRef, useState } from "react";
import {
  CircleUserRound,
  UserRound,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import styles from "./UserAccount.module.css";
import checkoutStyles from "../checkout/Checkout.module.css";
import { supabase } from "../../supabaseClient";
import LoginBox from "../checkout/LoginBox";
import Overlay from "../common/Overlay";

function UserAccount() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(data.session?.user ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Close login popup after Google login
  useEffect(() => {
    if (user && !user.is_anonymous) {
      setShowLogin(false);
    } else {
      setShowDropdown(false);
    }
  }, [user]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!showDropdown) return;

    const handleOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDropdown]);

  // Account icon click
  const handleAccountClick = () => {
    if (!user || user.is_anonymous) {
      setShowLogin(true);
    } else {
      setShowDropdown((prev) => !prev);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.href,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("Google login failed:", error);
    }
  };

  // Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    setShowDropdown(false);
  };

  // Navigate to account pages
  const handleNavigation = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  // Customer information
  const isLoggedIn = user && !user.is_anonymous;

  const name =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "Poonjora Customer";

  const email = user?.email || "";

  const avatar = user?.user_metadata?.avatar_url;

  return (
    <>
      <div className={styles.accountWrapper} ref={dropdownRef}>
        <button
          type="button"
          onClick={handleAccountClick}
          aria-label="My Account"
          aria-haspopup={isLoggedIn ? "menu" : "dialog"}
          aria-expanded={isLoggedIn ? showDropdown : showLogin}
          className={styles.accountIconButton}
        >
          <CircleUserRound
            className={styles.accountIcon}
            size={27}
          />
        </button>

        {isLoggedIn && showDropdown && (
          <div className={styles.accountDropdown}>
            {/* Customer information */}
            <div className={styles.accountUserInfo}>
              <div className={styles.accountAvatar}>
                {avatar ? (
                  <img src={avatar} alt="Profile" />
                ) : (
                  name.charAt(0).toUpperCase()
                )}
              </div>

              <div className={styles.accountUserDetails}>
                <span className={styles.accountGreeting}>
                  NAMASTE 🙏
                </span>

                <strong title={name}>{name}</strong>

                <span
                  className={styles.accountEmail}
                  title={email}
                >
                  {email}
                </span>
              </div>
            </div>

            {/* Account menu */}
            <div className={styles.accountMenu}>
              <button
                type="button"
                onClick={() => handleNavigation("/profile")}
              >
                <UserRound size={19} />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/orders")}
              >
                <ShoppingBag size={19} />
                <span>My Orders</span>
              </button>

              <div className={styles.accountDivider} />

              <button
                type="button"
                className={styles.accountLogout}
                onClick={handleLogout}
              >
                <LogOut size={19} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Existing login popup - Google only */}
      {showLogin && (
        <>
          <Overlay />

          <div className={checkoutStyles.checkoutWindow}>
            <LoginBox
              googleLoginForm={handleGoogleLogin}
              setOpenCheckout={setShowLogin}
              showGuestLogin={false}
            />
          </div>
        </>
      )}
    </>
  );
}

export default UserAccount;
