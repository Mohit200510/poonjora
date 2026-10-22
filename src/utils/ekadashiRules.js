
import * as SunCalc from "suncalc";

export const EKADASHI_STATUS = {
  VERIFIED: "verified",
  NEEDS_REVIEW: "needs_review",
  UNVERIFIED: "unverified"
};

const IST_OFFSET_MS = 330 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const ARUNODAYA_MINUTES = 96;

const EKADASHI_NAMES = new Set([
  "safala",
  "putrada",
  "shattila",
  "jaya",
  "vijaya",
  "aamla",
  "paapamochini",
  "kaamada",
  "varuthini",
  "mohini",
  "apara",
  "nirjala",
  "yogini",
  "devashayani",
  "kaamika",
  "pavitra",
  "aja",
  "padma",
  "indira",
  "paapamkusha",
  "rama",
  "deva-prabodhini",
  "utpanna",
  "mokshada"
]);

const VALID_TRADITIONS = new Set([
  "general",
  "smarta",
  "vaishnava"
]);

/**
 * Create a provisional Ekadashi result.
 *
 * Candidates are calculated from local sunrise and Arunodaya.
 * Special cases remain under review.
 */
export function createEkadashiResult({
  name,
  tithiStart,
  tithiEnd,
  latitude,
  longitude,
  dwadashiStart = null,
  dwadashiEnd = null,
  tradition = "general",
  referenceFastingDate = null,
  fastingDateVerified = false,
  paranaVerified = false
}) {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid Ekadashi name");
  }

  if (!VALID_TRADITIONS.has(tradition)) {
    throw new Error("Invalid Ekadashi tradition");
  }

  if (
    referenceFastingDate !== null &&
    !isValidDateOnly(referenceFastingDate)
  ) {
    throw new Error(
      "referenceFastingDate must use YYYY-MM-DD format"
    );
  }

  if (fastingDateVerified && !referenceFastingDate) {
    throw new Error(
      "A verified fasting date requires referenceFastingDate"
    );
  }

  const classification = classifyEkadashi({
    tithiStart,
    tithiEnd,
    latitude,
    longitude
  });

  const {
    classification: classificationType,
    sunriseDates,
    arunodayaDates
  } = classification;

  let smartaCandidate = null;
  let vaishnavaCandidate = null;
  let observanceRule = "requires_review";

  // One sunrise within the Ekadashi Tithi interval.
  if (
    classificationType === "normal" &&
    sunriseDates.length === 1
  ) {
    smartaCandidate = sunriseDates[0];

    if (arunodayaDates.includes(smartaCandidate)) {
      vaishnavaCandidate = smartaCandidate;
      observanceRule = "normal_arunodaya_present";
    } else {
      // Provisional Arunodaya exception.
      vaishnavaCandidate = addDaysToDateOnly(
        smartaCandidate,
        1
      );

      observanceRule = "arunodaya_exception";
    }
  }

  // Two sunrises: preserve both provisional candidates.
  else if (
    classificationType === "two_sunrise" &&
    sunriseDates.length === 2
  ) {
    smartaCandidate = sunriseDates[0];
    vaishnavaCandidate = sunriseDates[1];
    observanceRule = "two_sunrise";
  }

  // Zero sunrises: preserve provisional candidates.
  else if (
    classificationType === "zero_sunrise" &&
    sunriseDates.length === 0
  ) {
    const start = new Date(tithiStart);

    const tithiStartISTDate = new Date(
      start.getTime() + IST_OFFSET_MS
    ).toISOString().slice(0, 10);

    smartaCandidate = tithiStartISTDate;

    vaishnavaCandidate = addDaysToDateOnly(
      tithiStartISTDate,
      1
    );

    observanceRule = "zero_sunrise";
  }

  // The default general result uses the Smarta candidate.
  const traditionCandidate =
    tradition === "vaishnava"
      ? vaishnavaCandidate
      : smartaCandidate;

  // Reference evidence remains separate from calculated candidates.
  const fastingDateCandidate =
    referenceFastingDate ?? traditionCandidate;

  // Do not accept a fasting date unless explicitly validated.
  const fastingDate = fastingDateVerified
    ? referenceFastingDate
    : null;

  const arunodayaMatchesSunrise =
    sunriseDates.length === 1 &&
    arunodayaDates.includes(sunriseDates[0]);

  const requiresReview =
    classificationType !== "normal" ||
    !arunodayaMatchesSunrise ||
    !fastingDateCandidate;

  let parana = null;

  if (fastingDate && dwadashiStart && dwadashiEnd) {
    parana = calculateGeneralParana({
      paranaDate: addDaysToDateOnly(fastingDate, 1),
      dwadashiStart,
      dwadashiEnd,
      latitude,
      longitude
    });
  }

  return {
    name,
    tradition,
    tithiStart,
    tithiEnd,

    observanceRule,

    observanceCandidates: {
      smarta: smartaCandidate,
      vaishnava: vaishnavaCandidate
    },

    fastingDateCandidate,
    referenceFastingDate,
    fastingDate,

    dwadashiStart,
    dwadashiEnd,

    ...classification,

    paranaStart: parana?.valid
      ? parana.paranaStart
      : null,

    paranaEnd: parana?.valid
      ? parana.paranaEnd
      : null,

    paranaPeriod: parana?.valid
      ? parana.period
      : null,

    paranaVerified: Boolean(
      paranaVerified && parana?.valid
    ),

    status: fastingDateVerified
      ? EKADASHI_STATUS.VERIFIED
      : requiresReview
        ? EKADASHI_STATUS.NEEDS_REVIEW
        : EKADASHI_STATUS.UNVERIFIED
  };
}

/**
 * Classify Ekadashi Tithi against local sunrise and Arunodaya.
 *
 * This calculates astronomical overlap, not final religious
 * observance. The current implementation uses Indian Standard Time
 * to derive local calendar dates.
 */
export function classifyEkadashi({
  tithiStart,
  tithiEnd,
  latitude,
  longitude
}) {
  const start = new Date(tithiStart);
  const end = new Date(tithiEnd);

  validateCoordinates(latitude, longitude);

  if (
    !Number.isFinite(start.getTime()) ||
    !Number.isFinite(end.getTime()) ||
    start >= end
  ) {
    throw new Error("Invalid Ekadashi input");
  }

  const sunriseDates = [];
  const arunodayaDates = [];
  const sunriseChecks = [];

  const firstDay =
    Math.floor(
      (start.getTime() + IST_OFFSET_MS) / DAY_MS
    ) - 1;

  const lastDay =
    Math.floor(
      (end.getTime() + IST_OFFSET_MS) / DAY_MS
    ) + 1;

  for (let day = firstDay; day <= lastDay; day++) {
    const date = new Date(day * DAY_MS)
      .toISOString()
      .slice(0, 10);

    const times = SunCalc.getTimes(
      new Date(`${date}T12:00:00+05:30`),
      latitude,
      longitude
    );

    const sunrise = times.sunrise;

    if (
      !(sunrise instanceof Date) ||
      !Number.isFinite(sunrise.getTime())
    ) {
      throw new Error(`Sunrise unavailable for ${date}`);
    }

    const arunodaya = new Date(
      sunrise.getTime() -
      ARUNODAYA_MINUTES * 60 * 1000
    );

    sunriseChecks.push({
      date,
      sunrise: sunrise.toISOString(),
      tithiAtSunrise: sunrise >= start && sunrise < end,
      tithiAtArunodaya:
        arunodaya >= start && arunodaya < end
    });

    if (sunrise >= start && sunrise < end) {
      sunriseDates.push(date);
    }

    if (arunodaya >= start && arunodaya < end) {
      arunodayaDates.push(date);
    }
  }

  const sunriseCount = sunriseDates.length;

  let classification;

  if (sunriseCount === 0) {
    classification = "zero_sunrise";
  } else if (sunriseCount === 1) {
    classification = "normal";
  } else if (sunriseCount === 2) {
    classification = "two_sunrise";
  } else {
    classification = "needs_review";
  }

  return {
    classification,
    sunriseCount,
    sunriseDates,
    arunodayaDates,
    sunriseChecks
  };
}

/**
 * Calculate provisional general Parana timings.
 *
 * These timings are not automatically religiously verified.
 */
export function calculateGeneralParana({
  paranaDate,
  dwadashiStart,
  dwadashiEnd,
  latitude,
  longitude
}) {
  if (!paranaDate || !dwadashiStart || !dwadashiEnd) {
    return null;
  }

  if (!isValidDateOnly(paranaDate)) {
    throw new Error("Invalid Parana date");
  }

  validateCoordinates(latitude, longitude);

  const start = new Date(dwadashiStart);
  const end = new Date(dwadashiEnd);

  if (
    !Number.isFinite(start.getTime()) ||
    !Number.isFinite(end.getTime()) ||
    start >= end
  ) {
    throw new Error("Invalid Dwadashi timings");
  }

  const { sunrise, sunset } = SunCalc.getTimes(
    new Date(`${paranaDate}T12:00:00+05:30`),
    latitude,
    longitude
  );

  if (
    !Number.isFinite(sunrise.getTime()) ||
    !Number.isFinite(sunset.getTime()) ||
    sunset <= sunrise
  ) {
    throw new Error("Invalid sunrise or sunset");
  }

  const daylight = sunset.getTime() - sunrise.getTime();

  // Provisional first-quarter Dwadashi calculation.
  const hariVasaraEnd = new Date(
    start.getTime() +
    (end.getTime() - start.getTime()) / 4
  );

  // Provisional morning window.
  const pratahEnd = new Date(
    sunrise.getTime() + daylight / 5
  );

  const aparahnaStart = new Date(
    sunrise.getTime() + daylight * 3 / 5
  );

  const aparahnaEnd = new Date(
    sunrise.getTime() + daylight * 4 / 5
  );

  const morningStart = new Date(
    Math.max(sunrise.getTime(), hariVasaraEnd.getTime())
  );

  const morningEnd = new Date(
    Math.min(pratahEnd.getTime(), end.getTime())
  );

  const morningAvailable = morningStart < morningEnd;

  const period = morningAvailable
    ? "morning"
    : "afternoon";

  const paranaStart = morningAvailable
    ? morningStart
    : new Date(
        Math.max(
          aparahnaStart.getTime(),
          hariVasaraEnd.getTime()
        )
      );

  const paranaEnd = morningAvailable
    ? morningEnd
    : new Date(
        Math.min(
          aparahnaEnd.getTime(),
          end.getTime()
        )
      );

  const valid =
    paranaStart < paranaEnd &&
    paranaStart < end &&
    paranaEnd > start;

  return {
    period,
    paranaStart: valid
      ? paranaStart.toISOString()
      : null,
    paranaEnd: valid
      ? paranaEnd.toISOString()
      : null,
    valid
  };
}

/**
 * Clean and deduplicate cached Ekadashi records.
 */
export function cleanEkadashiRecords(records) {
  if (!Array.isArray(records)) {
    throw new Error("Invalid Ekadashi records");
  }

  const seen = new Set();

  return records.filter(item => {
    if (
      !item ||
      typeof item.ekadashi !== "string" ||
      !item.ekadashi.trim() ||
      !item.start ||
      !item.end
    ) {
      return false;
    }

    const name = item.ekadashi.trim().toLowerCase();

    if (!EKADASHI_NAMES.has(name)) {
      return false;
    }

    const start = new Date(item.start);
    const end = new Date(item.end);

    if (
      !Number.isFinite(start.getTime()) ||
      !Number.isFinite(end.getTime()) ||
      start >= end
    ) {
      return false;
    }

    const key =
      `${start.toISOString()}|${end.toISOString()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function validateCoordinates(latitude, longitude) {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("Invalid latitude or longitude");
  }
}

function isValidDateOnly(value) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function addDaysToDateOnly(dateString, days) {
  if (!isValidDateOnly(dateString)) {
    throw new Error("Invalid calendar date");
  }

  const date = new Date(`${dateString}T12:00:00.000Z`);

  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}
