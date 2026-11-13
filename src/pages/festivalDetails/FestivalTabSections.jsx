import React, { useState } from "react";
import {
  BookOpen, CheckCircle2, ChevronDown, CircleHelp, Clock3,
  Flower2, Info, ListChecks, MapPin, Music2, ScrollText,
  ShoppingBasket
} from "lucide-react";
import styles from "./FestivalTabSections.module.css";

// Reusable festival UI. Editorial content is supplied by Supabase.
// City-specific dates and muhurats must come from separately verified data.
const DEFAULT_SECTIONS = {
  vidhi: { intro: "", steps: [], notes: [] },
  samagri: { required: [], optional: [] },
  katha: { intro: "", paragraphs: [], variations: [] },
  mantra: { mantras: [], aartis: [] },
  traditions: { fasting: [], customs: [], regional: [] },
  faq: [],
};

const TITLES = {
  vidhi: { title: "Puja Vidhi", subtitle: "Step-by-step worship guidance", Icon: ListChecks },
  samagri: { title: "Puja Samagri", subtitle: "Items needed for worship", Icon: ShoppingBasket },
  timings: { title: "Muhurat & Timings", subtitle: "Date and city-specific observance information", Icon: Clock3 },
  katha: { title: "Katha (Story)", subtitle: "Traditional stories and their significance", Icon: BookOpen },
  mantra: { title: "Mantra & Aarti", subtitle: "Sacred recitations and devotional songs", Icon: Music2 },
  traditions: { title: "Vrat & Traditions", subtitle: "Fasting, observances and regional customs", Icon: Flower2 },
  faq: { title: "Frequently Asked Questions", subtitle: "Answers to common festival questions", Icon: CircleHelp },
};

const PLACEHOLDER = "Content will be added after festival-specific research and verification.";

function EmptyState({ message = PLACEHOLDER }) {
  return (
    <div className={styles.emptyState} role="status">
      <Info size={19} aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

function Panel({ title, children, Icon = Flower2, className = "" }) {
  return (
    <section className={`${styles.panel} ${className}`}>
      <div className={styles.panelTitle}>
        <Icon size={21} aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function TextItems({ items, ordered = false }) {
  if (!items.length) return <EmptyState />;
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={styles.textList}>
      {items.map((item, index) => (
        <li key={index}>{typeof item === "string" ? item : item.text}</li>
      ))}
    </Tag>
  );
}

function VidhiPanel({ section, festivalTitle }) {
  return (
    <section className={styles.vidhiPanel} aria-labelledby="vidhi-heading">
      <header className={styles.vidhiHeader}>
        {/* <Flower2 className={styles.vidhiHeaderIcon} size={30} strokeWidth={1.7} aria-hidden="true" /> */}
        <div>
          <h2 id="vidhi-heading">{festivalTitle} Puja Vidhi</h2>
          <p>Step-by-step worship guidance</p>
        </div>
      </header>

      <div className={styles.vidhiContent}>
        {/* <h3 className={styles.vidhiSubheading}>Worship Procedure</h3> */}
        {/* {section.intro && <p className={styles.vidhiIntro}>{section.intro}</p>} */}

        {section.steps.length ? (
          <ol className={styles.vidhiSteps}>
            {section.steps.map((step, index) => (
              <li key={index} className={styles.vidhiStep}>
                <span className={styles.vidhiNumber} aria-hidden="true">{index + 1}</span>
                <div className={styles.vidhiStepContent}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState message="The researched step-by-step Puja Vidhi will appear here." />
        )}

        {section.notes?.length > 0 && (
          <aside className={styles.vidhiNotes}>
            <div className={styles.vidhiNotesHeading}>
              <Info size={20} aria-hidden="true" />
              <h3>Important Guidance</h3>
            </div>
            <TextItems items={section.notes} />
          </aside>
        )}
      </div>
    </section>
  );
}

function SamagriPanel({ section }) {
  return (
    <div className={styles.stack}>
      <div className={styles.twoColumns}>
        <Panel title="Common household essentials" Icon={CheckCircle2}>
          {section.required.length ? (
            <ul className={styles.itemList}>{section.required.map((item, index) => (
              <li key={index}><span>{typeof item === "string" ? item : item.name}</span>
                {item.quantity && <small>{item.quantity}</small>}</li>
            ))}</ul>
          ) : <EmptyState message="Common materials will be listed after research." />}
        </Panel>
        <Panel title="Optional & regional items" Icon={ShoppingBasket}>
          {section.optional.length ? (
            <ul className={styles.itemList}>{section.optional.map((item, index) => (
              <li key={index}><span>{typeof item === "string" ? item : item.name}</span>
                {item.quantity && <small>{item.quantity}</small>}</li>
            ))}</ul>
          ) : <EmptyState message="Optional materials and regional variations will be listed here." />}
        </Panel>
      </div>
      <div className={styles.smallNote}><ShoppingBasket size={18}/>
        <span>Relevant Poonjora products will be connected after the catalog-matching step. No prices or stock are assumed.</span>
      </div>
    </div>
  );
}

function TimingsPanel({ selectedCity }) {
  const cityName = selectedCity?.city || "your selected city";
  return (
    <div className={styles.stack}>
      <Panel title="Muhurat verification in progress" Icon={Clock3}>
        <p className={styles.bodyCopy}>
          Puja muhurat and location-specific observance timings for {cityName} will be
          published after independent verification. Please consult a trusted local
          Panchang or qualified priest for time-sensitive worship planning.
        </p>
      </Panel>
    </div>
  );
}

function KathaPanel({ section, festivalTitle }) {
  return (
    <div className={styles.stack}>
      <Panel title="Festival Katha" Icon={BookOpen}>
        {section.intro && <p className={styles.bodyCopy}>{section.intro}</p>}
        {section.paragraphs.length ? section.paragraphs.map((p, i) => (
          <p key={i} className={styles.storyParagraph}>{p}</p>
        )) : <EmptyState message="The festival Katha will appear here after its sources are reviewed." />}
      </Panel>
      
<Panel
  title={`Other Traditions Associated with ${festivalTitle}`}
  Icon={ScrollText}
>
  {section.variations.length ? (
    <div className={styles.kathaTraditions}>
      {section.variations.map((item, index) => {
        const text =
          typeof item === "string" ? item : item.text;

        const separator = text.indexOf(":");

        const heading =
          separator >= 0
            ? text.slice(0, separator).trim()
            : "";

        const description =
          separator >= 0
            ? text.slice(separator + 1).trim()
            : text;

        return (
          <article
            key={index}
            className={styles.kathaTradition}
          >
            {heading && <h4>{heading}</h4>}
            <p>{description}</p>
          </article>
        );
      })}
    </div>
  ) : (
    <EmptyState />
  )}
</Panel>

    </div>
  );
}


function MantraPanel({ section }) {
  const [kind, setKind] = useState("mantras");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const items =
    kind === "mantras"
      ? section?.mantras || []
      : section?.aartis || [];

  const copyMantra = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex((current) =>
          current === index ? null : current
        );
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <Panel title="Sacred recitations" Icon={Music2}>

      {/* Mantra / Aarti Toggle */}
      <div
        className={styles.segment}
        role="group"
        aria-label="Recitation type"
      >
        <button
          type="button"
          aria-pressed={kind === "mantras"}
          className={
            kind === "mantras"
              ? styles.selectedSegment
              : ""
          }
          onClick={() => {
            setKind("mantras");
            setCopiedIndex(null);
          }}
        >
          Mantras
        </button>

        <button
          type="button"
          aria-pressed={kind === "aartis"}
          className={
            kind === "aartis"
              ? styles.selectedSegment
              : ""
          }
          onClick={() => {
            setKind("aartis");
            setCopiedIndex(null);
          }}
        >
          Aarti
        </button>
      </div>

      {items.length > 0 ? (
        <div
          className={
            kind === "mantras"
              ? styles.mantraGrid
              : styles.aartiList
          }
        >
          {items.map((entry, index) =>
            kind === "mantras" ? (

              /* Mantra Card */
              <article
                className={styles.compactMantra}
                key={index}
              >

                {/* Heading at top-left */}
                <h4 className={styles.mantraHeading}>
                  {entry.title}
                </h4>

                {/* Om + Mantra Content */}
                <div className={styles.mantraContent}>

                  <div
                    className={styles.mantraOm}
                    aria-hidden="true"
                  >
                    ॐ
                  </div>

                  <div className={styles.mantraBody}>

                    <p className={styles.mantraVerse}>
                      {entry.text}
                    </p>

                    <div
                      className={styles.mantraLine}
                      aria-hidden="true"
                    />

                    {entry.meaning && (
                      <p className={styles.mantraDescription}>
                        {entry.meaning}
                      </p>
                    )}

                    <button
                      type="button"
                      className={styles.mantraCopy}
                      onClick={() =>
                        copyMantra(entry.text, index)
                      }
                    >
                      {copiedIndex === index
                        ? "✓ Copied"
                        : "Copy Mantra"}
                    </button>

                  </div>
                </div>
              </article>

            ) : (

              /* Aarti - Existing Layout */
              <article
                className={styles.recitation}
                key={index}
              >
                <h4>{entry.title}</h4>

                <p className={styles.devanagari}>
                  {entry.text}
                </p>

                {entry.meaning && (
                  <p>{entry.meaning}</p>
                )}

                {entry.source && (
                  <small>
                    Source: {entry.source}
                  </small>
                )}
              </article>
            )
          )}
        </div>
      ) : (
        <EmptyState
          message="Content will be added after verification."
        />
      )}
    </Panel>
  );
}


function TraditionsPanel({ section }) {
  return (
    <div className={styles.twoColumns}>
      <Panel title="Vrat & fasting practices" Icon={Flower2}><TextItems items={section.fasting}/></Panel>
      <Panel title="Traditional observances" Icon={ScrollText}><TextItems items={section.customs}/></Panel>
      <Panel title="Regional traditions" Icon={MapPin}><TextItems items={section.regional}/></Panel>
    </div>
  );
}

function FAQPanel({ section }) {
  return (
    <Panel title="Questions about this festival" Icon={CircleHelp}>
      {section.length ? (
        <div className={styles.faqList}>
          {section.map((entry, index) => (
            <details key={index} className={styles.faqItem}>
              <summary>{entry.question}<ChevronDown size={19} aria-hidden="true"/></summary>
              <p>{entry.answer}</p>
            </details>
          ))}
        </div>
      ) : <EmptyState message="Festival-specific questions and verified answers will be added here." />}
    </Panel>
  );
}

export default function FestivalTabSections({ activeTab, content, selectedCity }) {
  const config = TITLES[activeTab];
  if (!config) return null;
  const { title, subtitle, Icon } = config;
  // All editorial content now comes from the published Supabase record.
  const supplied = content?.sections || {};

  const sections = {
    vidhi: { ...DEFAULT_SECTIONS.vidhi, ...(supplied.vidhi || {}) },
    samagri: { ...DEFAULT_SECTIONS.samagri, ...(supplied.samagri || {}) },
    katha: { ...DEFAULT_SECTIONS.katha, ...(supplied.katha || {}) },
    mantra: { ...DEFAULT_SECTIONS.mantra, ...(supplied.mantra || {}) },
    traditions: { ...DEFAULT_SECTIONS.traditions, ...(supplied.traditions || {}) },
    faq: Array.isArray(supplied.faq) ? supplied.faq : [],
  };

  return (
    <div className={styles.tabRoot}>
      {activeTab !== "vidhi" && (
        <div className={styles.tabIntro}>
          <div className={styles.introIcon}><Icon size={27} aria-hidden="true" /></div>
          <div><h2>{title} — {content.title}</h2><p>{subtitle}</p></div>
        </div>
      )}
      {activeTab === "vidhi" && (
        <VidhiPanel section={sections.vidhi} festivalTitle={content.title} />
      )}
      {activeTab === "samagri" && <SamagriPanel section={sections.samagri} />}
      {activeTab === "timings" && <TimingsPanel selectedCity={selectedCity} />}
      {activeTab === "katha" && <KathaPanel section={sections.katha} festivalTitle={content.title} />}
      {activeTab === "mantra" && <MantraPanel section={sections.mantra} />}
      {activeTab === "traditions" && <TraditionsPanel section={sections.traditions} />}
      {activeTab === "faq" && <FAQPanel section={sections.faq} />}
    </div>
  );
}
