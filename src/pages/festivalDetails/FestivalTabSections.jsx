import React, { useState } from "react";
import {
  BookOpen, CheckCircle2, ChevronDown, CircleHelp, Clock3,
  Flower2, Info, ListChecks, MapPin, Music2, ScrollText,
  ShoppingBasket, Sun, Sunset
} from "lucide-react";
import CitySelector from "../../components/panchang/CitySelector";
import styles from "./FestivalTabSections.module.css";

// Reusable festival UI. Diwali editorial copy is provided below.
// City-specific dates and muhurats must come from separately verified data.
const DEFAULT_SECTIONS = {
  vidhi: { intro: "", steps: [], notes: [] },
  samagri: { required: [], optional: [] },
  katha: { intro: "", paragraphs: [], variations: [] },
  mantra: { mantras: [], aartis: [] },
  traditions: { fasting: [], customs: [], regional: [] },
  faq: [],
};

// Editorial draft based on the Diwali research report.
// Replace with independently verified content before final publication.
// Diwali editorial content: reviewed against the supplied research and checked
// for common calendar/region errors. This is a practical household guide,
// not a claim that every tradition requires the same rituals.
const DIWALI_VIDHI = {
  intro: "A practical Lakshmi–Ganesh Puja guide reflecting common North Indian household practice. The sequence, offerings, and additional deities vary across families and sampradayas. This is not a complete priest-led Shodashopachara procedure.",
  steps: [
    { title: "Prepare and Clean the Worship Space", description: "Clean the puja area, arrange a stable chowki, and gather the worship materials. Rangoli, flowers, and torans are customary decorations, not compulsory ritual steps." },
    { title: "Arrange Lakshmi and Ganesh Images", description: "Place clean images or idols of Goddess Lakshmi and Lord Ganesha on a cloth-covered chowki according to your family's practice. Keep a thali, water, flowers, offerings, and a safely positioned lamp nearby." },
    { title: "Light a Diya and Begin with Prayer", description: "Light a diya safely and begin with a quiet prayer. Some households also perform purification (achamana) and sprinkle water as part of their established puja method." },
    { title: "Take Sankalpa (Intention)", description: "With folded hands, state your intention to worship with devotion and pray for the family's welfare. A formal Sanskrit sankalpa may include the place and date, but its wording should come from a verified local Panchang or priest." },
    { title: "Worship Lord Ganesha", description: "Invoke Lord Ganesha first, as commonly practiced, and offer flowers, akshat, or sweets. Durva is used in some Ganesh traditions. You may chant 'ॐ गं गणपतये नमः'." },
    { title: "Kalash Sthapana (If Followed)", description: "Where customary, set a clean water-filled kalash with leaves and coconut near the deities. Kalash arrangements and mantras differ; it is acceptable to follow a simpler household method." },
    { title: "Invoke Goddess Lakshmi", description: "Offer a prayer to Goddess Lakshmi, then flowers, akshat, kumkum or chandan as customary. In fuller pujas, devotees offer the sixteen upacharas (services); this shorter guide does not replace that formal sequence." },
    { title: "Offer Incense and Light", description: "Offer dhoop or incense and show the lamp respectfully, where safe. Avoid heavy smoke in enclosed rooms and keep flames away from fabric and children." },
    { title: "Offer Naivedya (Bhog)", description: "Offer fruits, sweets, or family-traditional foods such as khil and batasha. Some households also offer water, betel leaf, or dakshina. Use only offerings appropriate to your own tradition." },
    { title: "Optional Kubera, Saraswati or Account-Book Puja", description: "Some families include Kubera, Saraswati, or business account books (Chopda Puja). These are regional or household additions, not universal requirements." },
    { title: "Chant Mantras and Perform Aarti", description: "Chant a familiar Ganesh or Lakshmi mantra and perform the household's chosen aarti. The Mantra & Aarti tab includes verified short invocations and clearly labelled Aarti openings, not full lyrics." },
    { title: "Conclude, Share Prasad and Light Diyas", description: "Offer thanks, distribute prasad, and place diyas safely if customary. Follow your family's respectful procedure for concluding the puja and clearing offerings. Never leave flames unattended." }
  ],
  notes: [
    "This is a simplified household sequence; there is no single compulsory procedure for all Diwali traditions.",
    "A complete Shodashopachara Puja includes additional invocations and offerings; use a verified ritual manual or priest for that formal method.",
    "Do not copy a city/date-specific Sanskrit sankalpa or muhurat until local Panchang data is independently checked.",
    "The materials listed in Puja Samagri are a practical shopping guide, not a claim that every item is religiously mandatory.",
    "Use safe lamps and ventilation; never leave lit diyas, camphor, or incense unattended."
  ]
};

const DIWALI_SAMAGRI = {
  // 'required' is the UI's name for a practical starter checklist, not a universal mandate.
  required: [
    { name: "Lakshmi and Ganesh images or idols", quantity: "1 set" },
    { name: "Clean chowki or worship surface and cloth", quantity: "1 each" },
    { name: "Diya, cotton wicks and oil or ghee", quantity: "As needed" },
    { name: "Fresh flowers", quantity: "A few" },
    { name: "Akshat (unbroken rice)", quantity: "Small bowl" },
    { name: "Roli / kumkum and haldi", quantity: "Small amounts" },
    { name: "Puja thali and clean water vessel", quantity: "1 each" },
    { name: "Incense or dhoop (if suitable)", quantity: "Optional in smoke-sensitive homes" },
    { name: "Fruit and sweets for naivedya", quantity: "As appropriate" },
    { name: "Chandan or customary tilak paste", quantity: "Small amount" }
  ],
  optional: [
    { name: "Kalash, coconut and suitable leaves", quantity: "If performing Kalash Sthapana" },
    { name: "Mauli / sacred thread", quantity: "If customary" },
    { name: "Panchamrit ingredients", quantity: "If customary" },
    { name: "Betel leaf, supari and dakshina", quantity: "If customary" },
    { name: "Durva grass for Ganesh worship", quantity: "If customary" },
    { name: "Khil (puffed rice) and batasha", quantity: "Regional offering" },
    { name: "Camphor and bell", quantity: "If safely used" },
    { name: "Kubera / Saraswati image", quantity: "For additional family worship" },
    { name: "Account books or business ledger", quantity: "For Chopda Puja" },
    { name: "Rangoli, toran and decorations", quantity: "As desired" }
  ]
};

const DIWALI_KATHA = {
  intro: "The following is a devotional retelling of Rama's homecoming. The Ramayana recounts Rama's exile, Ravana's defeat, and return to Ayodhya; the specific association of rows of Diwali lamps with that return belongs to widely shared later festival tradition, not a verified quotation from the Valmiki Ramayana.",
  paragraphs: [
    "In a widely cherished North Indian tradition, Diwali recalls the return of Lord Rama to Ayodhya after fourteen years of exile. Devotees remember the story as a celebration of dharma, hope, and the return of light after hardship.",
    "Rama, son of King Dasharatha, accepted exile in order to honour his father's promise. Sita and Lakshmana accompanied him, leaving behind the comforts of Ayodhya.",
    "During the exile, Ravana abducted Sita. Rama searched for her with the help of Hanuman, Sugriva, and the Vanara allies. In the great battle in Lanka, Ravana was defeated and Sita was reunited with Rama.",
    "After completing the exile, Rama returned to Ayodhya. Bharata and the people welcomed him with joy, and Rama's coronation is remembered as the beginning of an ideal of just rule, often called Rama Rajya.",
    "Popular Diwali retellings describe the people illuminating Ayodhya with rows of lamps to welcome Rama, Sita, and Lakshmana. The lamp-lit homecoming is a cherished festival association, even though the precise Diwali connection should not be attributed directly to the earliest Ramayana text.",
    "Today, many families light diyas, pray, and gather with loved ones to remember the importance of truth, courage, devotion, and generosity. Other communities understand Diwali through different sacred narratives and observances."
  ],
  variations: [
    "Krishna and Narakasura: Naraka Chaturdashi is associated in several traditions with Krishna's defeat of Narakasura. Accounts differ in how they describe Satyabhama's role.",
    "Goddess Lakshmi and Samudra Manthan: Puranic traditions connect Lakshmi with the churning of the ocean; her worship at Diwali is an important household observance in many regions. Do not present a single emergence date as universally established.",
    "Kali Puja: Many Bengali Hindu communities worship Goddess Kali on the Diwali new-moon night. Kojagari Lakshmi Puja is a separate full-moon observance earlier in the season.",
    "Bali Pratipada: The wider Diwali period includes traditions of King Bali and Vishnu's Vamana incarnation, particularly in some western and southern communities.",
    "Jain observance: For many Jains, Diwali commemorates the nirvana of Lord Mahavira; it has its own distinct religious significance.",
    "Sikh observance: Bandi Chhor Divas, observed around Diwali, recalls Guru Hargobind's release from captivity and has a distinct Sikh significance."
  ]
};

const DIWALI_MANTRA = {
  mantras: [
    { title: "Shri Ganesh Mantra", text: "ॐ गं गणपतये नमः॥", meaning: "Salutations to Lord Ganesha, invoked for auspicious beginnings." },
    { title: "Shri Mahalakshmi Mantra", text: "ॐ महालक्ष्म्यै नमः॥", meaning: "Salutations to Goddess Mahalakshmi." },
    { title: "Lakshmi Gayatri", text: "ॐ महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि तन्नो लक्ष्मीः प्रचोदयात्॥", meaning: "A devotional prayer meditating upon Goddess Lakshmi and seeking her guidance." }
  ],
  aartis: [
    {
      title: "Shri Ganesh Aarti — सुखकर्ता दुखहर्ता (Marathi)",
      text: `सुखकर्ता दुखहर्ता वार्ता विघ्नाची।
नुरवी पुरवी प्रेम कृपा जयाची।
सर्वांगी सुंदर उटी शेंदुराची।
कंठी झळके माळ मुक्ताफळांची॥

जय देव जय देव जय मंगलमूर्ती।
दर्शनमात्रे मनकामना पुरती॥

रत्नखचित फरा तुज गौरीकुमरा।
चंदनाची उटी कुंकुमकेशरा।
हिरेजडित मुकुट शोभतो बरा।
रुणझुणती नूपुरे चरणी घागरिया॥

जय देव जय देव जय मंगलमूर्ती।
दर्शनमात्रे मनकामना पुरती॥

लंबोदर पीतांबर फणिवरबंधना।
सरळ सोंड वक्रतुंड त्रिनयना।
दास रामाचा वाट पाहे सदना।
संकटी पावावे निर्वाणी रक्षावे सुरवरवंदना॥

जय देव जय देव जय मंगलमूर्ती।
दर्शनमात्रे मनकामना पुरती॥`,
      meaning: "Traditional Marathi Ganesh Aarti attributed to Samarth Ramdas. Regional spellings and verses may vary.",
      source: "Restored from the earlier approved JSX; text variants should be checked against a traditional Marathi Aarti collection."
    },
    {
      title: "Shri Lakshmi Aarti — ॐ जय लक्ष्मी माता",
      text: `ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।
तुमको निशिदिन सेवत, हरि विष्णु विधाता॥

उमा, रमा, ब्रह्माणी, तुम ही जग-माता।
सूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता॥

दुर्गा रूप निरंजनी, सुख सम्पत्ति दाता।
जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥

तुम पाताल निवासिनि, तुम ही शुभदाता।
कर्म-प्रभाव-प्रकाशिनी, भवनिधि की त्राता॥

जिस घर में तुम रहती, सब सद्गुण आता।
सब सम्भव हो जाता, मन नहीं घबराता॥

तुम बिन यज्ञ न होते, वस्त्र न कोई पाता।
खान-पान का वैभव, सब तुमसे आता॥

शुभ-गुण मन्दिर सुन्दर, क्षीरोदधि-जाता।
रत्न चतुर्दश तुम बिन, कोई नहीं पाता॥

महालक्ष्मी जी की आरती, जो कोई नर गाता।
उर आनन्द समाता, पाप उतर जाता॥

ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।
तुमको निशिदिन सेवत, हरि विष्णु विधाता॥`,
      meaning: "Traditional Hindi Lakshmi Aarti. Some recited versions contain additional verses or repeated refrains.",
      source: "Cross-checked against Drik Panchang and other traditional Aarti collections; regional wording variants remain possible."
    }
  ]};

const DIWALI_TRADITIONS = {
  fasting: [
    "There is no single Diwali fast observed by every Hindu community. Some devotees observe a voluntary fast or wait until evening puja before eating.",
    "Naraka Chaturdashi is associated with early bathing in some traditions, not a universally required fast.",
    "Those with health or dietary needs can participate through prayer and other customs without fasting."
  ],
  customs: [
    "Cleaning and decorating the home, making rangoli or kolam, and lighting diyas are common customs, but not compulsory for everyone.",
    "Lakshmi-Ganesh Puja and offerings of fruit or sweets are common in many North Indian households; other regions have different primary observances.",
    "Sharing sweets, prasad, gifts, and visits expresses goodwill; fireworks are optional and subject to local safety and legal restrictions.",
    "Chopda Puja (account-book worship) is followed by some Gujarati, Marwari, and business families."
  ],
  regional: [
    "North India: Many households perform Lakshmi-Ganesh Puja and recall the popular story of Rama's return to Ayodhya.",
    "West Bengal: Kali Puja is an important Diwali-night observance among many Bengali Hindu communities. Kojagari Lakshmi Puja is a separate, earlier full-moon festival.",
    "Gujarat: Chopda Puja and Bestu Varas (Gujarati New Year) are significant in many communities; the calendar date must be checked for the relevant year and locality.",
    "Tamil Nadu and parts of South India: Naraka Chaturdashi may be marked by a pre-dawn oil bath (abhyanga snana), special foods, and family celebration; customs vary.",
    "Maharashtra: Vasubaras (Govatsa Dwadashi), Lakshmi Puja, and Bali Pratipada occur within the wider festival season in many families. Gudi Padwa is a separate Chaitra New Year festival.",
    "Nepal: Tihar is a related but distinct multi-day festival that honours animals, Goddess Lakshmi, and siblings.",
    "Govardhan Puja/Annakut and Bhai Dooj are observed in some regions during the broader festival period. They do not necessarily fall on the immediately following civil day."
  ]
};

// The FAQ intentionally excludes unverified city-specific muhurat values.
const DIWALI_FAQ = [
  { question: "What is Diwali or Deepavali?", answer: "Diwali is a festival of lights observed in multiple Hindu and other religious and regional traditions. It commonly represents auspiciousness, renewal, and light overcoming darkness." },
  { question: "Why is Diwali called the Festival of Lights?", answer: "The name Deepavali is associated with rows of lamps. Lighting diyas expresses joy, hope, devotion, and the symbolism of knowledge overcoming ignorance." },
  { question: "When is Diwali celebrated?", answer: "In many North Indian Hindu traditions, Lakshmi Puja is observed on Kartika Amavasya, with the civil date selected using local Panchang rules. The wider festival includes several observances on different lunar days." },
  { question: "Why is Goddess Lakshmi worshipped on Diwali?", answer: "Many Hindu households honour Lakshmi as the goddess of prosperity and auspiciousness. Lighting lamps and offering prayers are ways of welcoming her blessings in those traditions." },
  { question: "Is Rama's lamp-lit return in the Valmiki Ramayana?", answer: "The Ramayana recounts Rama's exile and return to Ayodhya. The particular association of rows of Diwali lamps with his homecoming is a popular later festival tradition and should not be quoted as a passage from the Valmiki Ramayana." },
  { question: "What is Naraka Chaturdashi?", answer: "Naraka Chaturdashi is associated in several traditions with Krishna's defeat of Narakasura and with early ritual bathing. It is linked to Krishna Paksha Chaturdashi, not a full-moon day." },
  { question: "Which deities are worshipped during Diwali?", answer: "Lakshmi and Ganesha are widely worshipped in many North Indian households. Kali Puja is prominent among many Bengali Hindus, and other families may worship Kubera or customary deities." },
  { question: "Is one Diwali ritual compulsory for every family?", answer: "No. Rituals vary across communities, sampradayas, and families. A simple devotional puja and a more elaborate traditional puja are both found in practice." },
  { question: "Why do people light diyas?", answer: "Diyas express the symbolism of light over darkness and the welcoming of auspiciousness. The number and placement of lamps differ among households." },
  { question: "How do Jains and Sikhs observe this period?", answer: "Many Jains commemorate Mahavira's nirvana at Diwali. Sikhs observe Bandi Chhor Divas, associated with Guru Hargobind's release. These are distinct religious observances, not versions of Lakshmi Puja." },
  { question: "Is Diwali associated with the New Year?", answer: "Yes, in some communities, including Gujarat. The Gujarati New Year falls around the Diwali period, while Maharashtra's Gudi Padwa is a different New Year festival in Chaitra." },
  { question: "Why are sweets and gifts exchanged?", answer: "Sharing food, gifts, and hospitality expresses affection and goodwill. These are popular customs, not universal religious obligations." },
  { question: "Is fasting compulsory on Diwali?", answer: "No universal fast applies to all Diwali observances. Some devotees follow voluntary fasting or family-specific food practices; others do not fast." },
  { question: "What is Govardhan Puja?", answer: "Govardhan Puja honours Krishna's protection of the people of Braj through the Govardhan Hill tradition. It is generally associated with Kartika Shukla Pratipada; the civil date must be checked for the year and location." },
  { question: "Why is rangoli made during Diwali?", answer: "Rangoli or kolam is a customary decorative art associated with welcome, celebration, and auspiciousness. Designs and meanings vary by region." },
  { question: "Why do some households avoid sweeping after Lakshmi Puja?", answer: "Some families avoid sweeping after the evening puja as a customary belief about preserving auspiciousness. This is not a universal religious rule." },
  { question: "What is Dhanteras?", answer: "Dhanteras is an observance near the beginning of the Diwali festival period. Traditions include Dhanvantari worship, lamps, and in some communities purchasing utensils or precious metals." },
  { question: "Are fireworks necessary for Diwali?", answer: "No. Fireworks are optional celebrations and are subject to applicable local restrictions. Diyas, worship, food, and family gatherings are other common ways to celebrate." },
  { question: "What are khil and batasha?", answer: "Khil (puffed rice) and batasha (sugar sweets) are offered in some North Indian Lakshmi Puja traditions. Not all households use them." },
  { question: "Are particular foods or clothing forbidden on Diwali?", answer: "There is no single rule shared by all communities. Some households follow vegetarian diets or customary clothing choices on puja days; these should be described as local or family traditions." }
];

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

function VidhiPanel({ section }) {
  return (
    <div className={styles.stack}>
      <Panel title="Worship procedure" Icon={ListChecks}>
        {section.intro && <p className={styles.bodyCopy}>{section.intro}</p>}
        {section.steps.length ? (
          <ol className={styles.stepList}>
            {section.steps.map((step, index) => (
              <li key={index} className={styles.step}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : <EmptyState message="The researched step-by-step Puja Vidhi will appear here." />}
      </Panel>
      <Panel title="Important guidance" Icon={Info}>
        <TextItems items={section.notes} />
      </Panel>
    </div>
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

function TimingsPanel({ content, selectedCity, setSelectedCity }) {
  const [showSelector, setShowSelector] = useState(false);
  const labels = content.timingLabels || {};
  const times = content.verifiedTimings || {};
  const cityName = selectedCity?.city || "Select City";
  const rows = [
    { label: "Festival Date", value: times.festivalDate },
    { label: "Tithi Begins", value: times.tithiStart },
    { label: labels.tithi || "Tithi Ends", value: times.tithiEnd },
    { label: "Sunrise", value: times.sunrise, Icon: Sun },
    { label: "Sunset", value: times.sunset, Icon: Sunset },
    { label: labels.period || "Relevant Kaal", value: times.relevantPeriod },
    { label: labels.puja || "Main Puja Muhurat", value: times.pujaMuhurat, important: true },
  ];
  return (
    <div className={styles.stack}>
      <Panel title="Location & festival timings" Icon={MapPin}>
        <div className={styles.cityRow}>
          <span>Selected city</span>
          <div className={styles.cityControl}>
            <button type="button" className={styles.cityButton}
              aria-expanded={showSelector} onClick={() => setShowSelector(v => !v)}>
              <MapPin size={16}/>{cityName}<ChevronDown size={16}/>
            </button>
            {showSelector && <div className={styles.cityPopup}>
              <CitySelector selectedCity={selectedCity}
                onCitySelect={(city) => { setSelectedCity(city); setShowSelector(false); }} />
            </div>}
          </div>
        </div>
        <div className={styles.timesList}>
          {rows.map(({ label, value, Icon, important }) => (
            <div className={`${styles.timeRow} ${important ? styles.importantTime : ""}`} key={label}>
              <span className={styles.timeLabel}>{Icon && <Icon size={17}/>} {label}</span>
              <strong>{value || "Not yet verified"}</strong>
            </div>
          ))}
        </div>
      </Panel>
      <div className={styles.smallNote}><Info size={18}/>
        <span>Times will be displayed in IST after validation for the selected city. The hero and Overview must use these same verified values when data integration is complete.</span>
      </div>
    </div>
  );
}

function KathaPanel({ section }) {
  return (
    <div className={styles.stack}>
      <Panel title="Festival Katha" Icon={BookOpen}>
        {section.intro && <p className={styles.bodyCopy}>{section.intro}</p>}
        {section.paragraphs.length ? section.paragraphs.map((p, i) => (
          <p key={i} className={styles.storyParagraph}>{p}</p>
        )) : <EmptyState message="The festival Katha will appear here after its sources are reviewed." />}
      </Panel>
      
<Panel
  title="Other Traditions Associated with Diwali"
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

export default function FestivalTabSections({ activeTab, content, selectedCity, setSelectedCity }) {
  const config = TITLES[activeTab];
  if (!config) return null;
  const { title, subtitle, Icon } = config;
  const festivalTitle = String(content?.title || "").trim().toLowerCase();
  const isDiwali = ["diwali", "deepavali", "दीपावली", "दिवाली"].some(
    (name) => festivalTitle.includes(name)
  );

  // Empty arrays from the API should not hide the Diwali editorial drafts.
  // Non-empty arrays supplied in content.sections still take precedence.
  const mergeSection = (defaults, diwaliDraft, supplied = {}) => {
    const merged = { ...defaults, ...(isDiwali ? diwaliDraft : {}), ...supplied };
    if (isDiwali && diwaliDraft) {
      for (const [key, value] of Object.entries(diwaliDraft)) {
        if (Array.isArray(value) && Array.isArray(supplied?.[key]) && supplied[key].length === 0) {
          merged[key] = value;
        }
      }
    }
    return merged;
  };

  const sections = {
    vidhi: mergeSection(DEFAULT_SECTIONS.vidhi, DIWALI_VIDHI, content?.sections?.vidhi),
    samagri: mergeSection(DEFAULT_SECTIONS.samagri, DIWALI_SAMAGRI, content?.sections?.samagri),
    katha: mergeSection(DEFAULT_SECTIONS.katha, DIWALI_KATHA, content?.sections?.katha),
    mantra: mergeSection(DEFAULT_SECTIONS.mantra, DIWALI_MANTRA, content?.sections?.mantra),
    traditions: mergeSection(DEFAULT_SECTIONS.traditions, DIWALI_TRADITIONS, content?.sections?.traditions),
    faq: Array.isArray(content?.sections?.faq) && content.sections.faq.length > 0
      ? content.sections.faq
      : isDiwali ? DIWALI_FAQ : DEFAULT_SECTIONS.faq,
  };


  return (
    <div className={styles.tabRoot}>
      <div className={styles.tabIntro}>
        <div className={styles.introIcon}><Icon size={27} aria-hidden="true" /></div>
        <div><h2>{title} — {content.title}</h2><p>{subtitle}</p></div>
      </div>
      {activeTab === "vidhi" && <VidhiPanel section={sections.vidhi} />}
      {activeTab === "samagri" && <SamagriPanel section={sections.samagri} />}
      {activeTab === "timings" && <TimingsPanel key={selectedCity?.id || "none"} content={content} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />}
      {activeTab === "katha" && <KathaPanel section={sections.katha} />}
      {activeTab === "mantra" && <MantraPanel section={sections.mantra} />}
      {activeTab === "traditions" && <TraditionsPanel section={sections.traditions} />}
      {activeTab === "faq" && <FAQPanel section={sections.faq} />}
    </div>
  );
}
