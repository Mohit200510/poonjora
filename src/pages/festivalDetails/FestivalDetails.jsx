import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight, BookOpen, CalendarDays, ChevronDown, ChevronRight,
  CircleHelp, Clock3, Flower2, House, Hourglass, Info,
  List, MapPin, ShoppingBag, ShoppingBasket, Sun, Sunset, Music2
} from "lucide-react";
import { CityContext } from "../../context/CityContext";
import CitySelector from "../../components/panchang/CitySelector";
import styles from "./FestivalDetails.module.css";
import diwaliLeft from "../../assets/diwali-hero-left.png"
import diwaliright from "../../assets/diwali-hero-right.png"
import { ImGlass } from "react-icons/im";
import aboutArt from "../../assets/diwali-about-art.png";
import significanceArt from "../../assets/diwali-significance-art.png";
import FestivalTabSections from "./FestivalTabSections";

// STEP 1: display-only content. Do not put unverified festival dates or muhurats here.
// Add researched festival entries later, without changing this shared page component.
const FESTIVAL_CONTENT = {
  diwali: {
    title: "Diwali",
    alternate: "Deepavali",
    subtitle: "The Festival of Lights",
    description: "Diwali, also known as Deepavali, is one of India's most widely celebrated festivals. Known as the Festival of Lights, it symbolizes the triumph of light over darkness, knowledge over ignorance, and good over evil. Families celebrate by lighting diyas, decorating their homes, sharing sweets, and offering prayers. In many North Indian households, Goddess Lakshmi and Lord Ganesha are worshipped for prosperity, wisdom, and auspicious beginnings.",
    significance: "Diwali represents spiritual renewal, gratitude, and hope. In popular Hindu tradition, the festival is associated with Lord Rama's return to Ayodhya, while other traditions commemorate Lord Krishna's victory over Narakasura. Lighting diyas symbolizes the removal of darkness and the welcoming of positive beginnings. Customs and religious observances vary across different regions and communities.",
    timingLabels: { tithi: "Amavasya Tithi (End)", period: "Pradosh Kaal", puja: "Lakshmi Puja Muhurat" },
    artwork: { left: diwaliLeft, right: diwaliright },
  },
};

const TABS = [
  { id: "overview", label: "Overview", Icon: House },
  { id: "vidhi", label: "Puja Vidhi", Icon: List },
  { id: "samagri", label: "Puja Samagri", Icon: ShoppingBasket },
  { id: "timings", label: "Muhurat & Timings", Icon: Clock3 },
  { id: "katha", label: "Katha (Story)", Icon: BookOpen },
  { id: "mantra", label: "Mantra & Aarti", Icon: Music2 },
  { id: "traditions", label: "Vrat & Traditions", Icon: Flower2 },
  { id: "faq", label: "FAQ", Icon: CircleHelp },
];

const EXPLORE = [
  { id: "vidhi", subtitle: "Step-by-step worship process", image: new URL("../../assets/diwali-vidhi.png" ,import.meta.url).href },
  { id: "samagri", subtitle: "Complete list of required items", image: new URL("../../assets/diwali-samagri.png",import.meta.url).href  },
  { id: "katha", subtitle: "The story and spiritual background", image: new URL("../../assets/diwali-katha.png",import.meta.url).href  },
  { id: "mantra", subtitle: "Key mantras and aarti", image: new URL("../../assets/diwali-mantra.png",import.meta.url).href  },
  { id: "traditions", subtitle: "Fasting rules and regional customs", image: new URL("../../assets/diwali-traditions.png",import.meta.url).href  },
  { id: "faq", subtitle: "Common questions and answers", image: new URL("../../assets/diwali-faq.png",import.meta.url).href },
];

// const asset = (name) => `/festival-assets/diwali-${name}.png`;
const Pending = ({ children = "Unavailable" }) => <span className={styles.pending}>{children}</span>;

export default function FestivalDetails() {
  const { slug } = useParams();
  const content = FESTIVAL_CONTENT[slug];
  const { selectedCity, setSelectedCity } = useContext(CityContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [showCitySelector, setShowCitySelector] = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    setActiveTab("overview");
    setShowCitySelector(false);
  }, [slug]);

  const cityName = selectedCity?.city || "Select City";
  const selectTab = (id) => {
    setActiveTab(id);
    // Scroll after render, without changing routes or reloading the page.
    requestAnimationFrame(() => tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  if (!content) {
    return (
      <main className={styles.notFound}>
        <h1>Festival details are not available yet</h1>
        <p>This festival has not been prepared for publication.</p>
        <Link to="/hindu-festival-calender">Back to Festival Calendar</Link>
      </main>
    );
  }

  const fullTitle = `${content.title}${content.alternate ? ` (${content.alternate})` : ""}`;
  const currentTab = TABS.find((tab) => tab.id === activeTab);
  const CurrentIcon = currentTab?.Icon || BookOpen;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link><ChevronRight size={15} />
          <Link to="/hindu-festival-calender">Festival Calendar</Link><ChevronRight size={15} />
          <strong>{fullTitle}</strong>
        </nav>

        <section className={styles.hero} aria-label={`${content.title} festival`}>
          <img src={content.artwork.left} className={styles.heroLeft} alt="" aria-hidden="true" />
          <img src={content.artwork.right} className={styles.heroRight} alt="" aria-hidden="true" />
          <div className={styles.heroCopy}>
            <div className={styles.ornament} aria-hidden="true">✦ ❀ ✦</div>
            <h1>{content.title}<span>{content.alternate && ` (${content.alternate})`}</span></h1>
            <p>{content.subtitle}</p>
          </div>
        </section>

        <section className={styles.heroFacts} aria-label="Festival date and timing summary">
          <div className={styles.fact}><CalendarDays /><div><b>Festival Date</b><Pending>Date not verified</Pending></div></div>
          <div className={styles.fact}><Flower2 /><div><b>Tithi</b><Pending>Not available</Pending></div></div>
          <div className={styles.fact}><Clock3 /><div><b>{content.timingLabels.puja}</b><Pending>Not calculated</Pending></div></div>
          <div className={styles.fact}><CalendarDays /><div><b>Related Observance</b><Pending>Not available</Pending></div></div>
        </section>

        <div className={styles.tabs} ref={tabsRef} role="tablist" aria-label="Festival information sections">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} id={`festival-tab-${id}`} type="button" role="tab"
              aria-selected={activeTab === id} aria-controls="festival-tab-panel"
              className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`}
              onClick={() => selectTab(id)}>
              <Icon size={20} aria-hidden="true" /><span>{label}</span>
            </button>
          ))}
        </div>

        <div id="festival-tab-panel" role="tabpanel" aria-labelledby={`festival-tab-${activeTab}`}>
          {activeTab === "overview" ? (
            <div className={styles.overview}>
              <div className={styles.overviewRow}>
                
<section className={styles.about}>

  <div className={styles.heading}>
    <Flower2 />
    <h2>About {content.title}</h2>
  </div>

  <p className={styles.aboutCopy}>
    {content.description}
  </p>

  <div className={styles.significance}>

    {/* SIGNIFICANCE IMAGE */}
    <img
      src={significanceArt}
      alt="Diwali diya"
      className={styles.significanceImage}
    />

    <div>
      <h3>Significance</h3>
      <p>{content.significance}</p>
    </div>

  </div>

  {/* ABOUT DIWALI DECORATIVE IMAGE */}
  <img
    src={aboutArt}
    alt=""
    className={styles.aboutDecoration}
  />

</section>


                <section className={styles.timings}>
                  <div className={styles.timingHeader}>
                    <div className={styles.heading}><MapPin /><h2>City-Wise Puja Timings</h2></div>
                    <div className={styles.cityControl}>
                      <span className={styles.cityLabel}>Select City</span>
                      <button type="button" className={styles.cityButton}
                        aria-expanded={showCitySelector}
                        onClick={() => setShowCitySelector((value) => !value)}>
                        {cityName}<ChevronDown size={17} />
                      </button>
                      {showCitySelector && (
                        <div className={styles.cityPopup}>
                          <CitySelector selectedCity={selectedCity} onCitySelect={(city) => {
                            setSelectedCity(city);
                            setShowCitySelector(false);
                          }} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.timingStrip}>
                    <div className={styles.timingCell}><Sun /><b>Sunrise</b><Pending /></div>
                    <div className={styles.timingCell}><Sunset /><b>Sunset</b><Pending /></div>
                    <div className={styles.timingCell}><List /><b>{content.timingLabels.tithi}</b><Pending /></div>
                    <div className={styles.timingCell}><Hourglass /><b>{content.timingLabels.period}</b><Pending /></div>
                    <div className={`${styles.timingCell} ${styles.highlightTiming}`}><Flower2 /><b>{content.timingLabels.puja}</b><Pending /></div>
                  </div>
                  <div className={styles.timingNote}><Info size={17} /><span>Timings for {cityName} (IST) are pending validation. They may vary by location.</span></div>
                </section>
              </div>

              <section className={styles.explore}>
                <div className={styles.exploreHeading}><span aria-hidden="true">❧</span><BookOpen /><h2>Explore More About {content.title}</h2><span aria-hidden="true">❧</span></div>
                <div className={styles.exploreCards}>
                  {EXPLORE.map(({ id, subtitle, image }) => {
                    const tab = TABS.find((value) => value.id === id);
                    return (
                      <button type="button" className={styles.exploreCard} key={id} onClick={() => selectTab(id)}>
                        <img src={image} alt="" />
                        <div><h3>{tab.label}</h3><p>{subtitle}</p></div>
                        <ArrowRight size={20} className={styles.cardArrow} />
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={styles.products}>
                <div><ShoppingBag /><h2>Related Products for {content.title} Puja</h2></div>
                <Link to="/collections/products">View All Products <ArrowRight size={18} /></Link>
              </section>
            </div>
          ) : (
            <FestivalTabSections
             key={slug}
             activeTab={activeTab}
              content={content}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
             />
          )}
        </div>
      </div>
    </main>
  );
}
