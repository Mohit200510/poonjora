import React from 'react'
import styles from "./FormUX.module.css"
import { useEffect, useState } from "react";
import { supabase } from '../../../supabaseClient';


function UserBox() {


  const [user, setUser] = useState(null);

useEffect(() => {
  const getUser = async () => {
    const { data: { user }, error } =
      await supabase.auth.getUser();

    if (!error) {
      setUser(user);
    }
  };

  getUser();

  const { data: { subscription } } =
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

  return () => subscription.unsubscribe();
}, []);





const googleName =
  user?.user_metadata?.full_name ||
  user?.user_metadata?.name ||
  user?.email?.split("@")[0] ||
  "User";

const googleEmail = user?.email || "";

const googlePhoto =
  user?.user_metadata?.avatar_url ||
  user?.user_metadata?.picture;





  return (
    <>
    {user && (
  <div className={styles.checkoutUserBox}>
    <div className={styles.checkoutUserInfo}>
      {googlePhoto ? (
        <img
          src={googlePhoto}
          alt={googleName}
          referrerPolicy="no-referrer"
          className={styles.checkoutUserAvatar}
        />
      ) : (
        <div className={styles.checkoutUserAvatarFallback}>
          {googleName.charAt(0).toUpperCase()}
        </div>
      )}

      <div className={styles.checkoutUserDetails}>
        <h4>{googleName}</h4>
        <p>{googleEmail}</p>
      </div>
    </div>

    <button
      type="button"
      className={styles.checkoutLogout}
      onClick={async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Logout failed:", error);
      }}
    >
      Logout
    </button>
  </div>
)}
    </>
    
  )
}

export default UserBox