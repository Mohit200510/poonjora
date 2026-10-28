
export const getISTDate = (timestamp) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestamp));

  const get = (type) =>
    parts.find((part) => part.type === type)?.value;

  return `${get("year")}-${get("month")}-${get("day")}`;
};

export const formatTime = (dateString) => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const getActiveEntry = (entries, referenceTime) => {
  if (!Array.isArray(entries)) return null;

  const time = new Date(referenceTime).getTime();

  if (Number.isNaN(time)) return null;

  return (
    entries.find((entry) => {
      const start = new Date(entry.start).getTime();
      const end = new Date(entry.end).getTime();

      return start <= time && time < end;
    }) || null
  );
};


export const hindiNames = {
  // Days
  Sunday: "रविवार",
  Monday: "सोमवार",
  Tuesday: "मंगलवार",
  Wednesday: "बुधवार",
  Thursday: "गुरुवार",
  Friday: "शुक्रवार",
  Saturday: "शनिवार",

  // Paksha
  "Shukla Paksha": "शुक्ल पक्ष",
  "Krishna Paksha": "कृष्ण पक्ष",

  // Tithi
  Pratipada: "प्रतिपदा",
  Dwitiya: "द्वितीया",
  Tritiya: "तृतीया",
  Chaturthi: "चतुर्थी",
  Panchami: "पंचमी",
  Shashthi: "षष्ठी",
  Shashti: "षष्ठी",
  Saptami: "सप्तमी",
  Ashtami: "अष्टमी",
  Navami: "नवमी",
  Dashami: "दशमी",
  Ekadashi: "एकादशी",
  Dwadashi: "द्वादशी",
  Trayodashi: "त्रयोदशी",
  Chaturdashi: "चतुर्दशी",
  Purnima: "पूर्णिमा",
  Amavasya: "अमावस्या",

  // Nakshatra
  Ashwini: "अश्विनी",
  Bharani: "भरणी",
  Krittika: "कृत्तिका",
  Rohini: "रोहिणी",
  Mrigashirsha: "मृगशिरा",
  Ardra: "आर्द्रा",
  Punarvasu: "पुनर्वसु",
  Pushya: "पुष्य",
  Ashlesha: "आश्लेषा",
  Magha: "मघा",
  PurvaPhalguni: "पूर्वाफाल्गुनी",
  "Purva Phalguni": "पूर्वाफाल्गुनी",
  UttaraPhalguni: "उत्तराफाल्गुनी",
  "Uttara Phalguni": "उत्तराफाल्गुनी",
  Hasta: "हस्त",
  Chitra: "चित्रा",
  Swati: "स्वाति",
  Vishakha: "विशाखा",
  Anuradha: "अनुराधा",
  Jyeshta: "ज्येष्ठा",
  Mula: "मूल",
  PurvaAshadha: "पूर्वाषाढ़ा",
  "Purva Ashadha": "पूर्वाषाढ़ा",
  UttaraAshadha: "उत्तराषाढ़ा",
  "Uttara Ashadha": "उत्तराषाढ़ा",
  Shravana: "श्रवण",
  Dhanishta: "धनिष्ठा",
  Shatabhisha: "शतभिषा",
  PurvaBhadrapada: "पूर्वाभाद्रपद",
  "Purva Bhadrapada": "पूर्वाभाद्रपद",
  UttaraBhadrapada: "उत्तराभाद्रपद",
  "Uttara Bhadrapada": "उत्तराभाद्रपद",
  Revati: "रेवती",

  // Yoga
  Vishkambha: "विष्कम्भ",
  Priti: "प्रीति",
  Ayushman: "आयुष्मान",
  Saubhagya: "सौभाग्य",
  Shobhana: "शोभन",
  Atiganda: "अतिगण्ड",
  Sukarma: "सुकर्मा",
  Dhriti: "धृति",
  Shula: "शूल",
  Ganda: "गण्ड",
  Vriddhi: "वृद्धि",
  Dhruva: "ध्रुव",
  Vyaghata: "व्याघात",
  Harshana: "हर्षण",
  Vajra: "वज्र",
  Siddhi: "सिद्धि",
  Vyatipata: "व्यतीपात",
  Variyana: "वरीयान",
  Parigha: "परिघ",
  Shiva: "शिव",
  Siddha: "सिद्ध",
  Sadhya: "साध्य",
  Shubha: "शुभ",
  Shukla: "शुक्ल",
  Brahma: "ब्रह्म",
  Indra: "इन्द्र",
  Vaidhriti: "वैधृति",

  // Karana
  Bava: "बव",
  Balava: "बालव",
  Kaulava: "कौलव",
  Taitila: "तैतिल",
  Garaja: "गर",
  Vanija: "वणिज",
  Vishti: "विष्टि (भद्रा)",
  "Vishti / Bhadra": "विष्टि (भद्रा)",
  Shakuni: "शकुनि",
  Chatushpada: "चतुष्पाद",
  Naga: "नाग",
  Kimstughna: "किंस्तुघ्न",
};

export const translate = (value) =>
  hindiNames[value] || value || "—";


export const getRahuKaal = (sunrise, sunset, date) => {
  if (!sunrise || !sunset || !date) return null;

  const start = new Date(sunrise).getTime();
  const end = new Date(sunset).getTime();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    end <= start
  ) {
    return null;
  }

  // Sunday = 0, Monday = 1, etc.
  const weekday = new Date(
    `${date}T12:00:00+05:30`
  ).getUTCDay();

  const rahuSegments = [8, 2, 7, 5, 6, 4, 3];

  const segmentLength = (end - start) / 8;
  const segment = rahuSegments[weekday];

  const rahuStart =
  start + (segment - 1) * segmentLength;

  const rahuEnd = rahuStart + segmentLength;

  return {
    start: rahuStart,
    end: rahuEnd,
    formatted: `${formatTime(rahuStart)} – ${formatTime(rahuEnd)}`,
  };
};
