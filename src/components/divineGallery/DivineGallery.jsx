
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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


const laxmiganesh = "/divine-gallery/lakshmi-ganesh-original-hd.jpg";
const laxmiganeshKuber = "/divine-gallery/lakshmi-ganesh-kuber-original-hd.png";
const radhaKrishna = "/divine-gallery/radha-krishna-original-hd.png";
const hanumanji = "/divine-gallery/hanuman-ji-original-hd.png";



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
    print:    "/divine-gallery/lakshmi-ganesh-print-4x6.jpg",
    },

  },

  {
  id: 2,
  title: "Lakshmi Ganesh Kuber Ji",
  category: "Lakshmi Ganesh",
  image: laxmiganeshKuber,

  downloads: {
    wallpaper: "/divine-gallery/lakshmi-ganesh-kuber-phone-wallpaper.png",
    original: "/divine-gallery/lakshmi-ganesh-kuber-original-hd.png",
    print: "/divine-gallery/lakshmi-ganesh-kuber-print-4x6.png",
    },
  },

  {
    id: 3,
    title: "Radha Krishna Ji",
    category: "Radha Krishna",
    image: radhaKrishna,

    downloads: {
      wallpaper: "/divine-gallery/radha-krishna-phone-wallpaper-1440x3200.png",
      original: "/divine-gallery/radha-krishna-original-hd.png",
      print: "/divine-gallery/radha-krishna-print-4x6-300dpi.png",
    },
  },
  {
    id: 4,
    title: "Hanuman Ji",
    category: "Hanuman Ji",
    image: hanumanji,

    downloads: {
      wallpaper: "/divine-gallery/hanuman-ji-phone-wallpaper-1440x3200.png",
      original: "/divine-gallery/hanuman-ji-original-hd.png",
      print: "/divine-gallery/hanuman-ji-print-4x6-300dpi.png",
      },
  },

  {
  id: 5,
  title: "Shiv Parivar",
  category: "Shiv Ji",
  image: "/divine-gallery/shiv-parivar-original.png",

  downloads: {
    wallpaper: "/divine-gallery/shiv-parivar-phone-wallpaper.png",
    original: "/divine-gallery/shiv-parivar-original.png",
    print: "/divine-gallery/shiv-parivar-print-4x6.png",
    },

  },


  {
  id: 6,
  title: "Shri Ram Darbar",
  category: "Other Deities",
  image: "/divine-gallery/ram-darbar-original-with-poonjora-logo.webp",

  downloads: {
    wallpaper: "/divine-gallery/ram-darbar-phone-wallpaper-1440x3200.png",
    original: "/divine-gallery/ram-darbar-original-with-poonjora-logo.webp",
    print: "/divine-gallery/ram-darbar-print-4x6-300dpi.png",
    },
  },


  {
    id: 7,
    title: "Saraswati Ji",
    category: "Other Deities",
    image: "/divine-gallery/saraswati-ji-original-hd.webp",

    downloads: {
      wallpaper: "/divine-gallery/saraswati-ji-phone-wallpaper-1440x3200.png",
      original: "/divine-gallery/saraswati-ji-original-hd.webp",
      print: "/divine-gallery/saraswati-ji-print-4x6-300dpi.png",
    },
  },


  {
    id: 8,
    title: "Durga Ji",
    category: "Other Deities",
    image: "/divine-gallery/durga-mata-original-hd.webp",

    downloads: {
      wallpaper: "/divine-gallery/durga-mata-phone-wallpaper-1440x3200.png",
      original: "/divine-gallery/durga-mata-original-hd.webp",
      print: "/divine-gallery/durga-mata-print-4x6-300dpi.png",
    },
  },
];


function DivineGallery() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [openDownloadMenu, setOpenDownloadMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const downloadButtonRefs = useRef({});

  const closeDownloadMenu = () => setOpenDownloadMenu(null);

  useEffect(() => {
    if (!openDownloadMenu) {
      setMenuPosition(null);
      return;
    }

    const updatePosition = () => {
      if (window.innerWidth <= 768) {
        setMenuPosition(null);
        return;
      }

      const key = `${openDownloadMenu.location}-${openDownloadMenu.photoId}`;
      const button = downloadButtonRefs.current[key];
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const width = 310;
      const estimatedHeight = 275;
     const left = Math.max(
  width / 2 + 12,
  Math.min(rect.left + rect.width / 2, window.innerWidth - width / 2 - 12)
);
      const showAbove = window.innerHeight - rect.bottom < estimatedHeight + 16 && rect.top > estimatedHeight + 16;
      setMenuPosition({
        left,
        top: showAbove ? Math.max(12, rect.top - estimatedHeight - 8) : rect.bottom + 8,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [openDownloadMenu]);

  useEffect(() => {
    if (!openDownloadMenu || window.innerWidth > 768) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [openDownloadMenu]);

  const handleDownload = (format) => {
    const photo = divinePhotos.find((item) => item.id === openDownloadMenu?.photoId);
    const fileUrl = photo?.downloads?.[format];
  
    if (!fileUrl) return;
  
    const link = document.createElement("a");
  
    link.href = fileUrl;
  
    const fileName = fileUrl.split("/").pop();

     link.download = fileName;
  
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
    closeDownloadMenu();
    setPreviewPhoto(photo);
  };

  const closePreview = () => {
    closeDownloadMenu();
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

    closeDownloadMenu();
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

  const renderDownloadMenu = () => {
    if (!openDownloadMenu) return null;

    const photo = divinePhotos.find((item) => item.id === openDownloadMenu.photoId);
    if (!photo) return null;

    const options = [
      { key: "wallpaper", label: "Phone Wallpaper", description: "Optimized for mobile screens", Icon: Smartphone },
      { key: "original", label: "Original HD Image", description: "Full-resolution devotional image", Icon: ImageIcon },
      { key: "print", label: "Print-Ready Photo", description: "4 × 6 inches · 300 DPI", Icon: Printer },
    ];

    return createPortal(
      <>
        <div className={styles.downloadBackdrop} onClick={closeDownloadMenu} aria-hidden="true" />
        <div
          className={styles.downloadSheet}
          style={menuPosition || undefined}
          role="dialog"
          aria-modal="true"
          aria-label={`Download ${photo.title}`}
          data-download-control
        >
          <div className={styles.downloadSheetHandle} aria-hidden="true" />
          <div className={styles.downloadSheetHeader}>
            <strong>Choose Download</strong>
            <button type="button" onClick={closeDownloadMenu} aria-label="Close download options">
              <X size={19} />
            </button>
          </div>
          <div className={styles.downloadSheetOptions}>
            {options.map(({ key, label, description, Icon }) => (
              <button
                key={key}
                type="button"
                className={styles.downloadSheetOption}
                disabled={!photo.downloads?.[key]}
                onClick={() => handleDownload(key)}
              >
                <span className={styles.downloadSheetIcon}><Icon size={19} /></span>
                <span className={styles.downloadSheetText}>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
                <ArrowDownToLine size={17} className={styles.downloadSheetArrow} />
              </button>
            ))}
          </div>
        </div>
      </>,
      document.body
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

            {/* <span className={styles.photoCount}>
              {filteredPhotos.length} 
              Divine Images
            </span> */}
            
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
                      ref={(node) => { downloadButtonRefs.current[`card-${photo.id}`] = node; }}
                      onClick={() => toggleDownloadMenu(photo, "card")}
                      disabled={!photo.image}
                      aria-expanded={openDownloadMenu?.photoId === photo.id && openDownloadMenu?.location === "card"}
                    >
                      <Download size={17} />
                      Download
                      <ChevronDown size={15} />
                    </button>
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

      {renderDownloadMenu()}

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
                  ref={(node) => { downloadButtonRefs.current[`preview-${previewPhoto.id}`] = node; }}
                  onClick={() => toggleDownloadMenu(previewPhoto, "preview")}
                  aria-expanded={openDownloadMenu?.photoId === previewPhoto.id && openDownloadMenu?.location === "preview"}
                >
                  <Download size={18} />
                  Download
                  <ChevronDown size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default DivineGallery;
