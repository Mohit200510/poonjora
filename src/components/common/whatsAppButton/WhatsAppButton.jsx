
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import styles from "./WhatsAppButton.module.css";

const WhatsAppButton = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "917986686161";
  const message = "Hello Poonjora! I need some assistance.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(
      "poonjora-whatsapp-message-shown"
    );

    if (alreadyShown) return;

    let hideTimer;

    const showTimer = setTimeout(() => {
      setShowMessage(true);

      sessionStorage.setItem(
        "poonjora-whatsapp-message-shown",
        "true"
      );

      hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, 8000);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
  className={styles.whatsappContainer}
  onMouseEnter={() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsHovered(true);
    }
  }}
  onMouseLeave={() => setIsHovered(false)}
>
      {(showMessage || isHovered) && (
        <div className={styles.messageBubble}>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close WhatsApp welcome message"
            onClick={() => {
              setShowMessage(false);
              setIsHovered(false);
            }}
          >
            <X size={14} />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.messageLink}
          >
            <span className={styles.messageTitle}>
              Need help? 👋
            </span>

            <span className={styles.messageText}>
              Chat with us on WhatsApp
            </span>
          </a>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
        aria-label="Chat with Poonjora on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default WhatsAppButton;
