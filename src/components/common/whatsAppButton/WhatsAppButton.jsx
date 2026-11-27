
import React, { useEffect, useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import styles from "./WhatsAppButton.module.css";

const WhatsAppButton = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const showTimer = useRef(null);
  const hideTimer = useRef(null);

  const phoneNumber = "917986686161";
  const message = "Hello Poonjora! I need some assistance.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(
      "poonjora-whatsapp-message-shown"
    );

    if (alreadyShown) return;

    showTimer.current = setTimeout(() => {
      setShowMessage(true);

      sessionStorage.setItem(
        "poonjora-whatsapp-message-shown",
        "true"
      );

      hideTimer.current = setTimeout(() => {
        setShowMessage(false);
      }, 8000);
    }, 3000);

    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const dismissMessage = () => {
    setShowMessage(false);
    setIsHovered(false);

    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);

    sessionStorage.setItem(
      "poonjora-whatsapp-message-shown",
      "true"
    );
  };

  const handleMouseEnter = (event) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setIsHovered(true);
    }
  };

  return (
    <div
      className={styles.whatsappContainer}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={() => setIsHovered(false)}
    >
      {(showMessage || isHovered) && (
        <div className={styles.messageBubble}>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close WhatsApp welcome message"
            onClick={dismissMessage}
          >
            <X size={14} />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.messageLink}
            onClick={dismissMessage}
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
        onClick={dismissMessage}
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default WhatsAppButton;
