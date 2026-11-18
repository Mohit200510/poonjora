
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight, BookOpen, CalendarDays, ChevronRight,
  CircleHelp, ClockArrowUp,ClockArrowDown, House,
  List, MapPin, ShoppingBag, ShoppingBasket, Music2,Moon,Clock3,BookOpenText
} from "lucide-react";
import { Flower } from "lucide-react";
import { CityContext } from "../../context/CityContext";
import CitySelector from "../../components/panchang/CitySelector";
import { supabase } from "../../supabaseClient";
import styles from "./FestivalDetails.module.css";

import FestivalTabSections from "./FestivalTabSections";



const IMAGE_BASE =
  "https://cffhhqqkcrcxxivilosk.supabase.co/storage/v1/object/public/festival-images/common";

const COMMON_IMAGES = {
  about: `${IMAGE_BASE}/diwali-about-art.webp`,
  significance: `${IMAGE_BASE}/diwali-significance-art.webp`,
  vidhi: `${IMAGE_BASE}/diwali-vidhi.webp`,
  samagri: `${IMAGE_BASE}/diwali-samagri.webp`,
  katha: `${IMAGE_BASE}/diwali-katha.webp`,
  mantra: `${IMAGE_BASE}/diwali-mantra.webp`,
  traditions: `${IMAGE_BASE}/diwali-traditions.webp`,
  faq: `${IMAGE_BASE}/diwali-faq.webp`,
};


const TABS = [
  { id: "overview", label: "Overview", Icon: House },
  { id: "vidhi", label: "Puja Vidhi", Icon: List },
  { id: "samagri", label: "Puja Samagri", Icon: ShoppingBasket },
  { id: "timings", label: "Muhurat & Timings", Icon: Clock3 },
  { id: "katha", label: "Katha (Story)", Icon: BookOpen },
  { id: "mantra", label: "Mantra & Aarti", Icon: Music2 },
  { id: "traditions", label: "Vrat & Traditions", Icon: Flower },
  { id: "faq", label: "FAQ", Icon: CircleHelp },
];


const EXPLORE = [
  {
    id: "vidhi",
    subtitle: "Step-by-step worship process",
    image: COMMON_IMAGES.vidhi,
  },
  {
    id: "samagri",
    subtitle: "Complete list of required items",
    image: COMMON_IMAGES.samagri,
  },
  {
    id: "katha",
    subtitle: "The story and spiritual background",
    image: COMMON_IMAGES.katha,
  },
  {
    id: "mantra",
    subtitle: "Key mantras and aarti",
    image: COMMON_IMAGES.mantra,
  },
  {
    id: "traditions",
    subtitle: "Fasting rules and regional customs",
    image: COMMON_IMAGES.traditions,
  },
  {
    id: "faq",
    subtitle: "Common questions and answers",
    image: COMMON_IMAGES.faq,
  },
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

export default function FestivalDetails({
  initialContent = null,
}) {
  const { slug, year } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

const isHindi = location.pathname.startsWith("/hi/");
const language = isHindi ? "hi" : "en";

const currentYear = Number(
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
  }).format(new Date())
);

const validYear =
  year !== undefined &&
  /^\d{4}$/.test(year) &&
  Number(year) >= 2000 &&
  Number(year) <= 2100;

const selectedYear = validYear ? Number(year) : null;
// Only reuse English prerendered content on an English route.
const hasMatchingInitialContent =
  !isHindi && initialContent?.slug === slug;

const [festivalContent, setFestivalContent] = useState(
  () => hasMatchingInitialContent ? initialContent : null
);
const [contentLoading, setContentLoading] = useState(
  () => !hasMatchingInitialContent
);
const [contentError, setContentError] = useState("");

const content = festivalContent;
  const { selectedCity, setSelectedCity } = useContext(CityContext);

  const [activeTab, setActiveTab] = useState("overview");
  const [showLanguageHint, setShowLanguageHint] = useState(false);
  const [festivalData, setFestivalData] = useState(null);
  const [festivalLoading, setFestivalLoading] = useState(false);
  const [festivalError, setFestivalError] = useState("");
  const scrollingToRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    if (hasMatchingInitialContent) {
      setFestivalContent(initialContent);
      setContentError("");
      setContentLoading(false);
      return () => { cancelled = true; };
    }

    const fetchContent = async () => {
      setContentLoading(true);
      setContentError("");
      setFestivalContent(null);

      try {
        const { data: english, error: englishError } = await supabase
          .from("festival_content")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle();

        if (englishError) throw englishError;
        if (!english) throw new Error("Festival content is not available.");

        let translated = null;
        if (isHindi) {
          const { data, error } = await supabase
            .from("festival_content_translations")
            .select("*")
            .eq("festival_id", english.id)
            .eq("language_code", "hi")
            .eq("is_published", true)
            .maybeSingle();

          if (error) throw error;
          if (!data) throw new Error("Hindi translation is not published yet.");
          translated = data;
        }

        if (cancelled) return;

        setFestivalContent({
          ...english,
          ...(translated && {
            title: translated.title,
            alternate: translated.alternate_name,
            subtitle: translated.subtitle,
            description: translated.description,
            significance: translated.significance,
            sections: translated.sections,
            seo_title: translated.seo_title,
            seo_description: translated.seo_description,
          }),
          ...(!translated && { alternate: english.alternate_name }),
          artwork: {
            left: english.hero_left_image,
            right: english.hero_right_image,
          },
        });
      } catch (error) {
        if (cancelled) return;
        console.error("Festival content error:", error);
        setContentError(error.message || "Unable to load festival information.");
      } finally {
        if (!cancelled) setContentLoading(false);
      }
    };

    fetchContent();
    return () => { cancelled = true; };
  }, [slug, language, initialContent, hasMatchingInitialContent]);

  useEffect(() => {
    setActiveTab("overview");
  }, [slug]);

  // One-time hint, dismissed permanently on this browser.
  useEffect(() => {
    try {
      setShowLanguageHint(localStorage.getItem("poonjora-language-hint-seen") !== "1");
    } catch { /* storage may be unavailable */ }
  }, []);

  const dismissLanguageHint = () => {
    setShowLanguageHint(false);
    try { localStorage.setItem("poonjora-language-hint-seen", "1"); } catch { /* ignore */ }
  };

  // Restore the section after the translated page has finished loading.
  useEffect(() => {
    if (!content || contentLoading) return;
    const id = location.hash.replace(/^#festival-section-/, "");
    if (!TABS.some(tab => tab.id === id)) return;
    const timer = window.setTimeout(() => {
      const section = document.getElementById(`festival-section-${id}`);
      if (!section) return;
      setActiveTab(id);
      window.scrollTo({ top: Math.max(0, section.getBoundingClientRect().top + window.scrollY - 120), behavior: "instant" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [content, contentLoading, location.hash, language]);

  // Fetch city-wise festival data from the existing Edge Function (Diwali currently supported).
  useEffect(() => {
    let cancelled = false;

    const fetchFestival = async () => {
      setFestivalData(null);
      setFestivalError("");

      if (!selectedCity?.id || !selectedYear) {
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

        const festival = data.festivals?.find(
  (item) => item.festivalType?.replaceAll("_", "-") === slug
);

        if (festival) {
          setFestivalData(festival);
       } else {
        setFestivalError(
         "Festival date information is not available for this city and year."
        );
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

  const cityDisplay = selectedCity
    ? [selectedCity.city, selectedCity.state].filter(Boolean).join(", ")
    : "No city Selected";

  // Keep navigation highlighting in sync with the section in view.
  useEffect(() => {
    if (!content) return;
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (scrollingToRef.current) return;
        const offset = 180;
        let current = "overview";
        for (const { id } of TABS) {
          const section = document.getElementById(`festival-section-${id}`);
          if (section && section.getBoundingClientRect().top <= offset) current = id;
        }
        setActiveTab(current);
      });
    };
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [slug, content]);

  const selectTab = (id) => {
    const target = document.getElementById(`festival-section-${id}`);
    if (!target) return;
    setActiveTab(id);
    scrollingToRef.current = id;
    const top = target.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    // Clear the click lock when scrolling settles, without changing the URL.
    if (scrollingToRef.timer) clearTimeout(scrollingToRef.timer);
    scrollingToRef.timer = setTimeout(() => { scrollingToRef.current = null; }, 950);
  };

  const switchLanguage = () => {
    dismissLanguageHint();
    const target = `${isHindi ? "" : "/hi"}/festivals/${slug}/${selectedYear}/#festival-section-${activeTab}`;
    navigate(target);
  };

  // Redirect old festival URLs to the current year
if (year === undefined) {
  return (
    <Navigate
      to={`${isHindi ? "/hi" : ""}/festivals/${slug}/${currentYear}`}
      replace
    />
  );
}

// Handle invalid years
if (!validYear) {
  return (
    <main className={styles.notFound}>
      <h1>Invalid festival year</h1>
      <p>Please select a valid year between 2000 and 2100.</p>
      <Link to="/hindu-festival-calender">
        Back to Festival Calendar
      </Link>
    </main>
  );
}


if (contentLoading) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <p>Loading festival information...</p>
      </div>
    </main>
  );
}

if (contentError) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <p role="alert">{contentError}</p>
      </div>
    </main>
  );
}

// Handle festivals that are not yet available
if (!content) {
  return (
    <main className={styles.notFound}>
      <h1>Festival details are not available yet</h1>
      <p>This festival has not been prepared for publication.</p>
      <Link to="/hindu-festival-calender">
        Back to Festival Calendar
      </Link>
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

        {/* Language switcher: below the sticky site header */}
        <div className={styles.languageBar}>
          {showLanguageHint && (
            <div className={styles.languageHint} role="status">
              <span>{isHindi ? "Read in English" : "हिंदी में पढ़ें"}</span>
              <button type="button" onClick={dismissLanguageHint} aria-label="Dismiss language hint">×</button>
            </div>
          )}
          <button
            type="button"
            className={styles.languageToggle}
            onClick={switchLanguage}
            aria-label={isHindi ? "Read in English" : "हिंदी में पढ़ें"}
            title={isHindi ? "Read in English" : "हिंदी में पढ़ें"}
          >
            {isHindi ? "A" : "अ"}
          </button>
        </div>

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
          {content.artwork?.left && (
            <img src={content.artwork.left} className={styles.heroLeft} alt="" aria-hidden="true" />
          )}
          {content.artwork?.right && (
            <img src={content.artwork.right} className={styles.heroRight} alt="" aria-hidden="true" />
          )}
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
            <Moon />
            <div>
              <b>Tithi</b>
              {factValue(festivalData?.tithi)}
            </div>
          </div>

          <div className={styles.fact}>
            <ClockArrowUp />
            <div>
              <b>Tithi Begins</b>
              {factValue(formatTithiTime(festivalData?.sourceStart))}
            </div>
          </div>

          <div className={styles.fact}>
            <ClockArrowDown />
            <div>
              <b>Tithi Ends</b>
              {factValue(formatTithiTime(festivalData?.sourceEnd))}
            </div>
          </div>
        </section>

        {/* Navigation tabs */}
        <div className={styles.tabs} aria-label="Festival information sections">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              aria-current={activeTab === id ? "location" : undefined}
              aria-controls={`festival-section-${id}`}
              className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`}
              onClick={() => selectTab(id)}
            >
              <Icon size={20} aria-hidden="true" /><span>{label}</span>
            </button>
          ))}
        </div>

        {/* All sections remain mounted and visible for in-page navigation. */}
        <div className={styles.allSections}>
          <section id="festival-section-overview" className={styles.scrollSection} aria-label="Festival overview">
            <div className={styles.overview}>
              <div className={styles.overviewRow}>

                {/* Festival overview */}
                <section className={styles.about}>
                  <div className={styles.heading}>
                    <BookOpenText />
                    <h2>About {content.title}</h2>
                  </div>

                  <p className={styles.aboutCopy}>{content.description}</p>

                  <div className={styles.significance}>
                    <img src={COMMON_IMAGES.significance} alt="" className={styles.significanceImage} />
                    <div>
                      <h3>Significance</h3>
                      <p>{content.significance}</p>
                    </div>
                  </div>

                  <img src={COMMON_IMAGES.about} alt="" className={styles.aboutDecoration} />
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
          </section>
          {TABS.filter(({ id }) => id !== "overview").map(({ id }) => (
            <section
              key={`${slug}-${id}`}
              id={`festival-section-${id}`}
              className={styles.scrollSection}
              aria-label={TABS.find((tab) => tab.id === id)?.label}
            >
              <FestivalTabSections
  activeTab={id}
  content={content}
  selectedCity={selectedCity}
  setSelectedCity={setSelectedCity}
  year={selectedYear}
/>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
