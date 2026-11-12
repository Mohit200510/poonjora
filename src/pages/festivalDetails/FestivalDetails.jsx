
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight, BookOpen, CalendarDays, ChevronRight,
  CircleHelp, Clock3, Flower2, House, Hourglass, Info,
  List, MapPin, ShoppingBag, ShoppingBasket, Sun, Sunset, Music2
} from "lucide-react";
import { CityContext } from "../../context/CityContext";
import CitySelector from "../../components/panchang/CitySelector";
import { supabase } from "../../supabaseClient";
import styles from "./FestivalDetails.module.css";
import diwaliLeft from "../../assets/diwali-hero-left.png";
import diwaliright from "../../assets/diwali-hero-right.png";
import aboutArt from "../../assets/diwali-about-art.png";
import significanceArt from "../../assets/diwali-significance-art.png";
import FestivalTabSections from "./FestivalTabSections";

// Festival content. Dates and timings are fetched separately.
const FESTIVAL_CONTENT = {
  diwali: {
    title: "Diwali",
    alternate: "दीपावली",
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
  { id: "vidhi", subtitle: "Step-by-step worship process", image: new URL("../../assets/diwali-vidhi.png", import.meta.url).href },
  { id: "samagri", subtitle: "Complete list of required items", image: new URL("../../assets/diwali-samagri.png", import.meta.url).href },
  { id: "katha", subtitle: "The story and spiritual background", image: new URL("../../assets/diwali-katha.png", import.meta.url).href },
  { id: "mantra", subtitle: "Key mantras and aarti", image: new URL("../../assets/diwali-mantra.png", import.meta.url).href },
  { id: "traditions", subtitle: "Fasting rules and regional customs", image: new URL("../../assets/diwali-traditions.png", import.meta.url).href },
  { id: "faq", subtitle: "Common questions and answers", image: new URL("../../assets/diwali-faq.png", import.meta.url).href },
];

const Pending = ({ children = "Unavailable" }) => <span className={styles.pending}>{children}</span>;

// Format YYYY-MM-DD festival date.
const formatFestivalDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata", day: "numeric", month: "long", year: "numeric"
  }).format(date);
};

// Convert OccultAPI UTC Tithi timestamps to IST.
const formatTithiTime = (value) => {
  if (!value || typeof value !== "string") return null;
  const normalized = value.trim().replace(/\s+UTC$/i, "Z").replace(" ", "T");
  if (!/(Z|[+-]\d{2}:\d{2})$/i.test(normalized)) return null;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata", day: "numeric", month: "short",
    hour: "numeric", minute: "2-digit", hour12: true
  }).format(date);
};

export default function FestivalDetails() {
  const { slug } = useParams();
  const content = FESTIVAL_CONTENT[slug];
  const { selectedCity, setSelectedCity } = useContext(CityContext);

  const [activeTab, setActiveTab] = useState("overview");
  const [festivalData, setFestivalData] = useState(null);
  const [festivalLoading, setFestivalLoading] = useState(false);
  const [festivalError, setFestivalError] = useState("");
  const tabsRef = useRef(null);

  // Current IST year. Later we can connect the calendar's selected year.
  const selectedYear = Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata", year: "numeric"
  }).format(new Date()));

  useEffect(() => {
    setActiveTab("overview");
  }, [slug]);

  // Fetch city-wise Diwali data from the existing Edge Function.
  useEffect(() => {
    let cancelled = false;

    const fetchFestival = async () => {
      setFestivalData(null);
      setFestivalError("");

      if (slug !== "diwali" || !selectedCity?.id) {
        setFestivalLoading(false);
        return;
      }

      setFestivalLoading(true);

      try {
        const { data, error } = await supabase.functions.invoke("get-festivals", {
          body: {
            location_id: Number(selectedCity.id),
            year: selectedYear
          }
        });

        if (cancelled) return;
        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || "Unable to fetch festival data.");

        const diwali = data.festivals?.find(item => item.festivalType === "diwali");

        if (diwali) {
          setFestivalData(diwali);
        } else {
          setFestivalError("Diwali data is not available for this city and year.");
        }
      } catch (error) {
        console.error("Festival details error:", error);
        if (!cancelled) setFestivalError("Unable to load festival details.");
      } finally {
        if (!cancelled) setFestivalLoading(false);
      }
    };

    fetchFestival();
    return () => { cancelled = true; };
  }, [slug, selectedCity?.id, selectedYear]);

  const cityName = selectedCity?.city || "Select City";
  const cityDisplay = selectedCity
    ? [selectedCity.city, selectedCity.state].filter(Boolean).join(", ")
    : "Chandigarh";

  const selectTab = (id) => {
    setActiveTab(id);
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
  const factValue = (value) => festivalLoading
    ? <Pending>Loading...</Pending>
    : value ? <span>{value}</span> : <Pending>Not available</Pending>;

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* Breadcrumb navigation */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link><ChevronRight size={15} />
          <Link to="/hindu-festival-calender">Festival Calendar</Link><ChevronRight size={15} />
          <strong>{fullTitle}</strong>
        </nav>

        {/* City selector */}
        <section className={styles.locationBar} aria-label="Festival location">
          <div className={styles.locationInfo}>
            <MapPin aria-hidden="true" />
            <div>
              <p>Festival dates &amp; timings for <strong>{cityDisplay}</strong></p>
              <span>Times shown in Indian Standard Time (IST)</span>
            </div>
          </div>

          <div className={styles.cityControl}>
            <CitySelector
              compact
              selectedCity={selectedCity}
              onCitySelect={(city) => setSelectedCity(city)}
            />
          </div>
        </section>

        {/* Festival hero */}
        <section className={styles.hero} aria-label={`${content.title} festival`}>
          <img src={content.artwork.left} className={styles.heroLeft} alt="" aria-hidden="true" />
          <img src={content.artwork.right} className={styles.heroRight} alt="" aria-hidden="true" />
          <div className={styles.heroCopy}>
            <h1>{content.title}<span>{content.alternate && ` (${content.alternate})`}</span></h1>
            <p>{content.subtitle}</p>
          </div>
        </section>

        {/* Dynamic festival date and Tithi information */}
        <section className={styles.heroFacts} aria-label="Festival date and timing summary" aria-busy={festivalLoading}>
          <div className={styles.fact}>
            <CalendarDays />
            <div>
              <b>Festival Date</b>
              {factValue(formatFestivalDate(festivalData?.festivalDateCandidate))}
            </div>
          </div>

          <div className={styles.fact}>
            <Flower2 />
            <div>
              <b>Tithi</b>
              {factValue(festivalData?.tithi)}
            </div>
          </div>

          <div className={styles.fact}>
            <Clock3 />
            <div>
              <b>Tithi Begins</b>
              {factValue(formatTithiTime(festivalData?.sourceStart))}
            </div>
          </div>

          <div className={styles.fact}>
            <Clock3 />
            <div>
              <b>Tithi Ends</b>
              {factValue(formatTithiTime(festivalData?.sourceEnd))}
            </div>
          </div>
        </section>

        {/* Navigation tabs */}
        <div className={styles.tabs} ref={tabsRef} role="tablist" aria-label="Festival information sections">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              id={`festival-tab-${id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              aria-controls="festival-tab-panel"
              className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`}
              onClick={() => selectTab(id)}
            >
              <Icon size={20} aria-hidden="true" /><span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div id="festival-tab-panel" role="tabpanel" aria-labelledby={`festival-tab-${activeTab}`}>
          {activeTab === "overview" ? (
            <div className={styles.overview}>
              <div className={styles.overviewRow}>

                {/* About Diwali */}
                <section className={styles.about}>
                  <div className={styles.heading}>
                    <Flower2 />
                    <h2>About {content.title}</h2>
                  </div>

                  <p className={styles.aboutCopy}>{content.description}</p>

                  <div className={styles.significance}>
                    <img src={significanceArt} alt="Diwali diya" className={styles.significanceImage} />
                    <div>
                      <h3>Significance</h3>
                      <p>{content.significance}</p>
                    </div>
                  </div>

                  <img src={aboutArt} alt="" className={styles.aboutDecoration} />
                </section>

                {/* City-wise puja timings - pending independent validation */}
                <section className={styles.timings}>
                  <div className={styles.timingHeader}>
                    <div className={styles.heading}><MapPin /><h2>City-Wise Puja Timings</h2></div>
                  </div>

                  <div className={styles.timingStrip}>
                    <div className={styles.timingCell}><Sun /><b>Sunrise</b><Pending /></div>
                    <div className={styles.timingCell}><Sunset /><b>Sunset</b><Pending /></div>
                    <div className={styles.timingCell}><List /><b>{content.timingLabels.tithi}</b><Pending /></div>
                    <div className={styles.timingCell}><Hourglass /><b>{content.timingLabels.period}</b><Pending /></div>
                    <div className={`${styles.timingCell} ${styles.highlightTiming}`}>
                      <Flower2 /><b>{content.timingLabels.puja}</b><Pending />
                    </div>
                  </div>

                  <div className={styles.timingNote}>
                    <Info size={17} />
                    <span>Timings for {cityName} (IST) are pending validation. They may vary by location.</span>
                  </div>
                </section>
              </div>

              {/* Explore more sections */}
              <section className={styles.explore}>
                <div className={styles.exploreHeading}>
                  <span aria-hidden="true">❧</span>
                  <BookOpen />
                  <h2>Explore More About {content.title}</h2>
                  <span aria-hidden="true">❧</span>
                </div>

                <div className={styles.exploreCards}>
                  {EXPLORE.map(({ id, subtitle, image }) => {
                    const tab = TABS.find(value => value.id === id);
                    return (
                      <button type="button" className={styles.exploreCard} key={id} onClick={() => selectTab(id)}>
                        <img src={image} alt="" />
                        <div><h3>{tab?.label}</h3><p>{subtitle}</p></div>
                        <ArrowRight size={20} className={styles.cardArrow} />
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Related products */}
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
