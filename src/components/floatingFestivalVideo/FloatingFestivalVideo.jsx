
import React, { useEffect, useState } from "react";
import { X, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./FloatingFestivalVideo.module.css";
import kartikMaasVideo from "../../assets/kartik-maas.mp4";

const festival = {
  title: "Kartik Maas",
  video: kartikMaasVideo,
  link: "/festivals/kartik-purnima/2026/",
};

export default function FloatingFestivalVideo() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("festival-video-closed")) return;

    const onScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeVideo = () => {
    sessionStorage.setItem("festival-video-closed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className={styles.widget} aria-label="Featured festival video">
      <button
        className={styles.closeButton}
        onClick={closeVideo}
        aria-label="Close festival video"
        type="button"
      >
        <X size={17} />
      </button>

      <div className={styles.videoWrapper}>
        <video
          src={festival.video}
          autoPlay
          muted={muted}
          playsInline
          loop
          preload="metadata"
        />

        <button
          className={styles.soundButton}
          type="button"
          onClick={() => setMuted((prev) => !prev)}
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div className={styles.footer}>
        <span>{festival.title}</span>

        <button
          type="button"
          onClick={() => navigate(festival.link)}
          className={styles.exploreButton}
        >
          Explore Festival <ArrowRight size={15} />
        </button>
      </div>
    </aside>
  );
}
