
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Smartphone,
  Image as ImageIcon,
  Printer,
  ArrowDownToLine,
  ChevronDown,
} from "lucide-react";

import styles from "./DivineGallery.module.css";

import newbanner from "../../assets/gallery4.png"
import newbannerMob from "../../assets/gallerymob.png"
import banner from "../../assets/divine-gallery-banner.webp";
import framesBackground from "../../assets/poonjora-photo-frames-background.webp";
import laxmiganeshKuber from "../../assets/Poonjora_Lakshmi_Ganesh_Kuber_Final_4x6.jpg";
import radhaKrishna from "../../assets/radha-krishna-gallery.webp";
import hanumanji from "../../assets/hanuman-ji-gallery.webp";


const laxmiganesh = "/divine-gallery/lakshmi-ganesh-original-hd.jpg";

const categories = [
  "All Photos",
  "Lakshmi Ganesh",
  "Radha Krishna",
  "Hanuman Ji",
  "Shiv Ji",
  "Other Deities",
];

const divinePhotos = [
  {
  id: 1,
  title: "Lakshmi Ganesh Ji",
  category: "Lakshmi Ganesh",
  image: laxmiganesh,

  downloads: {
    wallpaper: "/divine-gallery/lakshmi-ganesh-phone-wallpaper.webp",
    original: "/divine-gallery/lakshmi-ganesh-original-hd.jpg",
    print: "/divine-gallery/lakshmi-ganesh-print-4x6.jpg",
    },

  },

  {
    id: 2,
    title: "Lakshmi Ganesh Kuber Ji",
    category: "Lakshmi Ganesh",
    image: laxmiganeshKuber,
  },
  {
    id: 3,
    title: "Radha Krishna Ji",
    category: "Radha Krishna",
    image: radhaKrishna,
  },
  {
    id: 4,
    title: "Hanuman Ji",
    category: "Hanuman Ji",
    image: hanumanji,
  },
  {
    id: 5,
    title: "Shiv Parivar",
    category: "Shiv Ji",
    image: "",
  },
  {
    id: 6,
    title: "Ram Darbar",
    category: "Other Deities",
    image: "",
  },
  {
    id: 7,
    title: "Saraswati Ji",
    category: "Other Deities",
    image: "",
  },
  {
    id: 8,
    title: "Durga Ji",
    category: "Other Deities",
    image: "",
  },
];


function DivineGallery() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [openDownloadMenu, setOpenDownloadMenu] = useState(null);

  const handleDownload = (format) => {
    const photo = divinePhotos.find((item) => item.id === openDownloadMenu?.photoId);
    const fileUrl = photo?.downloads?.[format];
  
    if (!fileUrl) return;
  
    const link = document.createElement("a");
  
    link.href = fileUrl;
  
    link.download =
      format === "wallpaper"
        ? "Poonjora-Lakshmi-Ganesh-Wallpaper.webp"
        : format === "original"
        ? "Poonjora-Lakshmi-Ganesh-Original-HD.jpg"
        : "Poonjora-Lakshmi-Ganesh-Print-4x6.jpg";
  
    document.body.appendChild(link);
    link.click();
    link.remove();
    setOpenDownloadMenu(null);
  };


  const filteredPhotos =
    activeCategory === "All Photos"
      ? divinePhotos
      : divinePhotos.filter(
          (photo) => photo.category === activeCategory
        );

  const availablePhotos = filteredPhotos.filter(
    (photo) => Boolean(photo.image)
  );

  const openPreview = (photo) => {
    if (!photo.image) return;
    setPreviewPhoto(photo);
  };

  const closePreview = () => {
    setPreviewPhoto(null);
  };

  const changePreview = (direction) => {
    if (!previewPhoto || availablePhotos.length === 0) return;

    const currentIndex = availablePhotos.findIndex(
      (photo) => photo.id === previewPhoto.id
    );

    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + direction + availablePhotos.length) %
      availablePhotos.length;

    setPreviewPhoto(availablePhotos[nextIndex]);
  };

  const toggleDownloadMenu = (photo, location) => {
    if (!photo?.image) return;
    setOpenDownloadMenu((current) =>
      current?.photoId === photo.id && current?.location === location
        ? null
        : { photoId: photo.id, location }
    );
  };

  const renderDownloadMenu = (photo, location) => {
    if (openDownloadMenu?.photoId !== photo.id || openDownloadMenu?.location !== location) return null;

    const options = [
      { key: "wallpaper", label: "Phone Wallpaper", description: "Perfectly sized for your mobile screen", highlight: "Mobile Optimized", Icon: Smartphone },
      { key: "original", label: "Original HD Image", description: "High-resolution image with stunning clarity", highlight: "Full Resolution", Icon: ImageIcon },
      { key: "print", label: "Print-Ready Photo", description: "High-quality 4 × 6 inch photo printing", highlight: "Frame Ready", Icon: Printer },
    ];

    return (
      <div className={styles.compactDownloadMenu} role="group" aria-label={`Download ${photo.title}`}>
        <div className={styles.compactDownloadHeading}>CHOOSE YOUR DOWNLOAD <Download size={15} /></div>
        {options.map(({ key, label, description, highlight, Icon }) => (
          <button
            key={key}
            type="button"
            className={styles.compactDownloadOption}
            disabled={!photo.downloads?.[key]}
            onClick={() => handleDownload(key)}
          >
            <span className={styles.compactDownloadIcon}><Icon size={19} /></span>
            <span className={styles.compactDownloadCopy}>
              <strong>{label}</strong>
              <span>{description}</span>
              <em>{highlight}</em>
            </span>
            <ArrowDownToLine className={styles.compactDownloadArrow} size={19} />
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (!previewPhoto && !openDownloadMenu) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (openDownloadMenu) {
          setOpenDownloadMenu(null);
        } else {
          closePreview();
        }
        return;
      }

      if (openDownloadMenu) return;

      if (event.key === "ArrowLeft") changePreview(-1);
      if (event.key === "ArrowRight") changePreview(1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewPhoto, openDownloadMenu, availablePhotos]);

  useEffect(() => {
    if (!previewPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [previewPhoto]);

  useEffect(() => {
    if (!openDownloadMenu) return;
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest('[data-download-control]')) {
        setOpenDownloadMenu(null);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [openDownloadMenu]);

  return (
    <main className={styles.divineGallery}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <img
          src={newbanner}
          alt=""
          className={styles.heroBackground}
        />
        
        {/* <div className={styles.heroOverlay} /> */}

        {/* <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            POONJORA DEVOTIONAL COLLECTION
          </span>

          <h1>Divine Images for Every Home</h1>

          <p className={styles.heroDescription}>
            Beautiful devotional wallpapers and printable photos,
            thoughtfully curated for your daily worship.
          </p>

          <div className={styles.heroFeatures}>
            <span>✦ High-Quality Images</span>
            <span>✦ Mobile &amp; Print Ready</span>
            <span>✦ Free &amp; Premium Downloads</span>
          </div>
        </div> */}
        <img 
        src={newbannerMob}
        className={styles.bannermob}
        style={{width: "100%"}}
        
        >
        </img>
      </section>
      


      {/* GALLERY SECTION */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryContainer}>
          <div className={styles.galleryHeading}>
            {/* <div>
              <span className={styles.sectionEyebrow}>
                THE DIVINE COLLECTION
              </span>

              <h2>Explore Divine Photos</h2>

              <p>
                Discover beautiful devotional images for your
                home, worship space and everyday inspiration.
              </p>
            </div> */}

            <span className={styles.photoCount}>
              {filteredPhotos.length} 
              Divine Images
            </span>
          </div>

          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.filterButton} ${
                  activeCategory === category
                    ? styles.activeFilter
                    : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.photoGrid}>
            {filteredPhotos.map((photo) => (
              <article className={styles.photoCard} key={photo.id}>
                <div className={styles.photoImage}>
                  {photo.image ? (
                    <button
                      type="button"
                      className={styles.previewTrigger}
                      onClick={() => openPreview(photo)}
                      aria-label={`Preview ${photo.title}`}
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                      />

                      <span className={styles.previewHint}>
                        <ZoomIn size={17} />
                        View Photo
                      </span>
                    </button>
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>✦</span>
                      <p>{photo.title}</p>
                    </div>
                  )}
                </div>

                <div className={styles.photoDetails}>
                  <h3>{photo.title}</h3>

                  <p>
                    Phone Wallpaper | HD Image | 4 × 6 Print
                  </p>

                  <div className={styles.downloadControl} data-download-control>
                    <button
                      type="button"
                      className={styles.downloadButton}
                      onClick={() => toggleDownloadMenu(photo, "card")}
                      disabled={!photo.image}
                      aria-expanded={openDownloadMenu?.photoId === photo.id && openDownloadMenu?.location === "card"}
                    >
                      <Download size={17} />
                      Download
                      <ChevronDown size={15} />
                    </button>
                    {renderDownloadMenu(photo, "card")}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO FRAMES PROMOTION */}
      <section
        className={styles.framesSection}
        style={{
          backgroundImage: `url(${framesBackground})`,
        }}
      >
        <div className={styles.framesContainer}>
          <div
            className={styles.framesVisual}
            style={{
              backgroundImage: `url(${framesBackground})`,
            }}
            aria-hidden="true"
          />

          <div className={styles.framesContent}>
            <span className={styles.framesEyebrow}>
              DEVOTION BEYOND THE SCREEN
            </span>

            <h2>Bring Divinity to Your Home</h2>

            <p>
              Explore our beautiful collection of religious
              photo frames and bring the blessings of your
              favourite deities into your home and sacred spaces.
            </p>

            <Link
              to="/collections/products"
              className={styles.framesButton}
            >
              Shop Photo Frames
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* IMAGE PREVIEW */}
      {previewPhoto && (
        <div
          className={styles.previewOverlay}
          onClick={() => {
            if (!openDownloadMenu) closePreview();
          }}
        >
          <div
            className={styles.previewModal}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewPhoto.title} preview`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.previewClose}
              onClick={closePreview}
              aria-label="Close preview"
            >
              <X size={22} />
            </button>

            <div className={styles.previewImageArea}>
              {availablePhotos.length > 1 && (
                <button
                  type="button"
                  className={`${styles.previewArrow} ${styles.previewPrevious}`}
                  onClick={() => changePreview(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <img
                src={previewPhoto.image}
                alt={previewPhoto.title}
                className={styles.previewLargeImage}
              />

              {availablePhotos.length > 1 && (
                <button
                  type="button"
                  className={`${styles.previewArrow} ${styles.previewNext}`}
                  onClick={() => changePreview(1)}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            <div className={styles.previewFooter}>
              <div>
                <span className={styles.previewLabel}>
                  POONJORA DIVINE COLLECTION
                </span>

                <h3>{previewPhoto.title}</h3>

                <p>
                  Phone Wallpaper | HD Image | 4 × 6 Print
                </p>
              </div>

              <div className={styles.downloadControl} data-download-control>
                <button
                  type="button"
                  className={styles.previewDownload}
                  onClick={() => toggleDownloadMenu(previewPhoto, "preview")}
                  aria-expanded={openDownloadMenu?.photoId === previewPhoto.id && openDownloadMenu?.location === "preview"}
                >
                  <Download size={18} />
                  Download
                  <ChevronDown size={15} />
                </button>
                {renderDownloadMenu(previewPhoto, "preview")}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default DivineGallery;
