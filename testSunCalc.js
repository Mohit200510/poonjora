
import * as SunCalc from "suncalc";

const latitude = 26.9154576;
const longitude = 75.8189817;

const date = new Date("2026-10-16T12:00:00+05:30");

const result = SunCalc.getTimes(
  date,
  latitude,
  longitude
);

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

const toSeconds = (date) => {
  const parts = Object.fromEntries(
    formatter.formatToParts(date)
      .filter(part => part.type !== "literal")
      .map(part => [part.type, Number(part.value)])
  );

  return parts.hour * 3600 +
    parts.minute * 60 +
    parts.second;
};

const prokeralaSunrise = new Date(
  "2026-10-16T06:30:29+05:30"
);

const prokeralaSunset = new Date(
  "2026-10-16T17:53:49+05:30"
);

console.log("Sunrise comparison:");
console.log("Prokerala:", formatter.format(prokeralaSunrise));
console.log("SunCalc:  ", formatter.format(result.sunrise));
console.log(
  "Difference:",
  Math.abs(toSeconds(result.sunrise) - toSeconds(prokeralaSunrise)),
  "seconds"
);

console.log("\nSunset comparison:");
console.log("Prokerala:", formatter.format(prokeralaSunset));
console.log("SunCalc:  ", formatter.format(result.sunset));
console.log(
  "Difference:",
  Math.abs(toSeconds(result.sunset) - toSeconds(prokeralaSunset)),
  "seconds"
);


const angles = [-0.833, -0.5, -0.3, 0, 0.2];

console.log("\nSolar altitude comparison:");

for (const angle of angles) {
  const name = `test_${String(angle).replace(".", "_")}`;

  SunCalc.addTime(angle, `${name}_rise`, `${name}_set`);

  const times = SunCalc.getTimes(
    date,
    latitude,
    longitude
  );

  console.log(`\nAngle: ${angle}°`);

  console.log(
    "Sunrise:",
    formatter.format(times[`${name}_rise`])
  );

  console.log(
    "Sunset: ",
    formatter.format(times[`${name}_set`])
  );
}

const testLocations = [
  {
    id: 10,
    date: "2026-10-16",
    lat: 30.7333,
    lon: 76.7794,
    sunrise: "06:29:46",
    sunset: "17:46:49"
  },
  {
    id: 9,
    date: "2026-10-15",
    lat: 30.5882408,
    lon: 76.8438542,
    sunrise: "06:28:42",
    sunset: "17:47:48"
  },
  {
    id: 8,
    date: "2026-10-15",
    lat: 30.7334421,
    lon: 76.7797143,
    sunrise: "06:29:04",
    sunset: "17:47:57"
  },
  {
    id: 6,
    date: "2026-10-15",
    lat: 30.7333,
    lon: 76.7794,
    sunrise: "06:29:04",
    sunset: "17:47:57"
  },
  {
    id: 5,
    date: "2026-10-15",
    lat: 30.6425,
    lon: 76.8173,
    sunrise: "06:28:50",
    sunset: "17:47:51"
  }
];

const toTimeSeconds = (time) => {
  const [h, m, s] = time.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

console.log("\n--- MULTI-LOCATION VALIDATION ---");

for (const location of testLocations) {
  const testDate = new Date(
    `${location.date}T12:00:00+05:30`
  );

  const times = SunCalc.getTimes(
    testDate,
    location.lat,
    location.lon
  );

  // The 0-degree event was registered in our previous test.
  const calculatedSunrise = formatter.format(times.test_0_rise);
  const calculatedSunset = formatter.format(times.test_0_set);

  console.log(`\nRecord ID: ${location.id}`);

  console.log(
    "Sunrise:",
    calculatedSunrise,
    "| Prokerala:",
    location.sunrise,
    "| Difference:",
    Math.abs(
      toTimeSeconds(calculatedSunrise) -
      toTimeSeconds(location.sunrise)
    ),
    "seconds"
  );

  console.log(
    "Sunset: ",
    calculatedSunset,
    "| Prokerala:",
    location.sunset,
    "| Difference:",
    Math.abs(
      toTimeSeconds(calculatedSunset) -
      toTimeSeconds(location.sunset)
    ),
    "seconds"
  );
}

console.log("\n--- SAFALA EKADASHI 2027 ---");

const chandigarhLat = 30.7334421;
const chandigarhLon = 76.7797143;

for (const day of ["2027-01-02", "2027-01-03", "2027-01-04"]) {
  const testDate = new Date(`${day}T12:00:00+05:30`);

  const times = SunCalc.getTimes(
    testDate,
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}



console.log("\n--- PUTRADA EKADASHI 2027 ---");

for (const day of ["2027-01-18", "2027-01-19", "2027-01-20"]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}



console.log("\n--- SHATTILA EKADASHI 2027 ---");

for (const day of [
  "2027-02-01",
  "2027-02-02",
  "2027-02-03"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- JAYA EKADASHI 2027 ---");

for (const day of [
  "2027-02-16",
  "2027-02-17",
  "2027-02-18"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- VIJAYA EKADASHI 2027 ---");

for (const day of [
  "2027-03-03",
  "2027-03-04",
  "2027-03-05"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- MARCH 2027 SUNRISE CHECK ---");

for (const day of [
  "2027-03-04",
  "2027-03-05",
  "2027-03-06"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise),
    "| Sunrise (-0.833°):",
    formatter.format(times.sunrise)
  );
}


console.log("\n--- AAMLA EKADASHI 2027 ---");

for (const day of [
  "2027-03-17",
  "2027-03-18",
  "2027-03-19"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- PAAPAMOCHINI EKADASHI 2027 ---");

for (const day of [
  "2027-04-01",
  "2027-04-02",
  "2027-04-03"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}


console.log("\n--- KAAMADA EKADASHI 2027 ---");

for (const day of [
  "2027-04-16",
  "2027-04-17",
  "2027-04-18"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- VARUTHINI EKADASHI 2027 ---");

for (const day of [
  "2027-05-01",
  "2027-05-02",
  "2027-05-03"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- MOHINI EKADASHI 2027 ---");

for (const day of [
  "2027-05-15",
  "2027-05-16",
  "2027-05-17"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- APARA EKADASHI 2027 ---");

for (const day of [
  "2027-05-31",
  "2027-06-01",
  "2027-06-02"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- NIRJALA EKADASHI 2027 ---");

for (const day of [
  "2027-06-13",
  "2027-06-14",
  "2027-06-15"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- YOGINI EKADASHI 2027 ---");

for (const day of [
  "2027-06-29",
  "2027-06-30",
  "2027-07-01"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- DEVASHAYANI EKADASHI 2027 ---");

for (const day of [
  "2027-07-13",
  "2027-07-14",
  "2027-07-15"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- KAAMIKA EKADASHI 2027 ---");

for (const day of [
  "2027-07-29",
  "2027-07-30",
  "2027-07-31"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- PAVITRA EKADASHI 2027 ---");

for (const day of [
  "2027-08-11",
  "2027-08-12",
  "2027-08-13"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- AJA EKADASHI 2027 ---");

for (const day of [
  "2027-08-27",
  "2027-08-28",
  "2027-08-29"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}


console.log("\n--- PADMA EKADASHI 2027 ---");

for (const day of [
  "2027-09-10",
  "2027-09-11",
  "2027-09-12"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- INDIRA EKADASHI 2027 ---");

for (const day of [
  "2027-09-25",
  "2027-09-26",
  "2027-09-27"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- PAAPAMKUSHA EKADASHI 2027 ---");

for (const day of [
  "2027-10-10",
  "2027-10-11",
  "2027-10-12"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- RAMA EKADASHI 2027 ---");

for (const day of [
  "2027-10-24",
  "2027-10-25",
  "2027-10-26"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- DEVA-PRABODHINI EKADASHI 2027 ---");

for (const day of [
  "2027-11-09",
  "2027-11-10",
  "2027-11-11"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}
 

console.log("\n--- UTPANNA EKADASHI 2027 ---");

for (const day of [
  "2027-11-23",
  "2027-11-24",
  "2027-11-25"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- MOKSHADA EKADASHI 2027 ---");

for (const day of [
  "2027-12-08",
  "2027-12-09",
  "2027-12-10"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- SAFALA EKADASHI DECEMBER 2027 ---");

for (const day of [
  "2027-12-22",
  "2027-12-23",
  "2027-12-24"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(
    day,
    "Sunrise (0°):",
    formatter.format(times.test_0_rise)
  );
}

console.log("\n--- RAMA EKADASHI ARUNODAYA TEST ---");

const ramaSunrise = SunCalc.getTimes(
  new Date("2027-10-25T12:00:00+05:30"),
  chandigarhLat,
  chandigarhLon
).test_0_rise;

const arunodaya = new Date(
  ramaSunrise.getTime() - 96 * 60 * 1000
);

const ekadashiStart = new Date("2027-10-25T00:11:10Z");
const ekadashiEnd = new Date("2027-10-25T21:53:09Z");

const tithiAtArunodaya =
  arunodaya >= ekadashiStart &&
  arunodaya < ekadashiEnd
    ? "Ekadashi"
    : arunodaya < ekadashiStart
      ? "Dashami"
      : "Dwadashi";

console.log("Sunrise:", formatter.format(ramaSunrise));
console.log("Arunodaya:", formatter.format(arunodaya));
console.log("Ekadashi starts:", formatter.format(ekadashiStart));
console.log("Tithi at Arunodaya:", tithiAtArunodaya);

console.log("\n--- MOKSHADA EKADASHI ARUNODAYA TEST ---");

const mokshadaSunrise = SunCalc.getTimes(
  new Date("2027-12-09T12:00:00+05:30"),
  chandigarhLat,
  chandigarhLon
).test_0_rise;

const mokshadaArunodaya = new Date(
  mokshadaSunrise.getTime() - 96 * 60 * 1000
);

const mokshadaStart = new Date("2027-12-08T21:30:01Z");
const mokshadaEnd = new Date("2027-12-09T21:50:58Z");

const mokshadaTithi =
  mokshadaArunodaya >= mokshadaStart &&
  mokshadaArunodaya < mokshadaEnd
    ? "Ekadashi"
    : mokshadaArunodaya < mokshadaStart
      ? "Dashami"
      : "Dwadashi";

console.log("Sunrise:", formatter.format(mokshadaSunrise));
console.log("Arunodaya:", formatter.format(mokshadaArunodaya));
console.log("Ekadashi starts:", formatter.format(mokshadaStart));
console.log("Tithi at Arunodaya:", mokshadaTithi);

console.log("\n--- VIJAYA EKADASHI ARUNODAYA TEST ---");

const vijayaStart = new Date("2027-03-02T23:15:27Z");
const vijayaEnd = new Date("2027-03-04T01:55:20Z");

for (const day of ["2027-03-03", "2027-03-04"]) {
  const sunrise = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  ).test_0_rise;

  const arunodaya = new Date(
    sunrise.getTime() - 96 * 60 * 1000
  );

  const tithi =
    arunodaya >= vijayaStart && arunodaya < vijayaEnd
      ? "Ekadashi"
      : arunodaya < vijayaStart
        ? "Dashami"
        : "Dwadashi";

  console.log(
    day,
    "| Sunrise:", formatter.format(sunrise),
    "| Arunodaya:", formatter.format(arunodaya),
    "| Tithi:", tithi
  );
}

console.log("\n--- KAAMIKA EKADASHI ARUNODAYA TEST ---");

const kaamikaStart = new Date("2027-07-29T02:05:08Z");
const kaamikaEnd = new Date("2027-07-29T23:44:00Z");

for (const day of ["2027-07-29", "2027-07-30"]) {
  const sunrise = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  ).test_0_rise;

  const arunodaya = new Date(
    sunrise.getTime() - 96 * 60 * 1000
  );

  const tithi =
    arunodaya >= kaamikaStart && arunodaya < kaamikaEnd
      ? "Ekadashi"
      : arunodaya < kaamikaStart
        ? "Dashami"
        : "Dwadashi";

  console.log(
    day,
    "| Sunrise:", formatter.format(sunrise),
    "| Arunodaya:", formatter.format(arunodaya),
    "| Tithi:", tithi
  );
}



// 

function analyzeEkadashi(date, startUTC, endUTC) {
  const sunrise = SunCalc.getTimes(
    new Date(`${date}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  ).test_0_rise;

  const arunodaya = new Date(
    sunrise.getTime() - 96 * 60 * 1000
  );

  const start = new Date(startUTC);
  const end = new Date(endUTC);

  function getTithi(time) {
    if (time < start) return "Dashami";
    if (time < end) return "Ekadashi";
    return "Dwadashi";
  }

  return {
    date,
    sunrise: formatter.format(sunrise),
    arunodaya: formatter.format(arunodaya),
    sunriseTithi: getTithi(sunrise),
    arunodayaTithi: getTithi(arunodaya)
  };
}

// Test with Rama Ekadashi
console.log("\n--- REUSABLE EKADASHI ANALYZER TEST ---");

console.log(
  analyzeEkadashi(
    "2027-10-25",
    "2027-10-25T00:11:10Z",
    "2027-10-25T21:53:09Z"
  )
);

console.log("\n--- MULTIPLE EKADASHI ANALYZER TEST ---");

// Vijaya Ekadashi
console.log("VIJAYA - 3 March");
console.log(analyzeEkadashi(
  "2027-03-03",
  "2027-03-02T23:15:27Z",
  "2027-03-04T01:55:20Z"
));

console.log("VIJAYA - 4 March");
console.log(analyzeEkadashi(
  "2027-03-04",
  "2027-03-02T23:15:27Z",
  "2027-03-04T01:55:20Z"
));

// Kaamika Ekadashi
console.log("KAAMIKA - 29 July");
console.log(analyzeEkadashi(
  "2027-07-29",
  "2027-07-29T02:05:08Z",
  "2027-07-29T23:44:00Z"
));

console.log("KAAMIKA - 30 July");
console.log(analyzeEkadashi(
  "2027-07-30",
  "2027-07-29T02:05:08Z",
  "2027-07-29T23:44:00Z"
));

// Mokshada Ekadashi
console.log("MOKSHADA - 9 December");
console.log(analyzeEkadashi(
  "2027-12-09",
  "2027-12-08T21:30:01Z",
  "2027-12-09T21:50:58Z"
));


console.log("\n--- SUNRISE CONVENTION COMPARISON ---");

for (const day of [
  "2027-03-04",
  "2027-07-29",
  "2027-12-09"
]) {
  const times = SunCalc.getTimes(
    new Date(`${day}T12:00:00+05:30`),
    chandigarhLat,
    chandigarhLon
  );

  console.log(day);
  console.log("SunCalc 0°:", formatter.format(times.test_0_rise));
  console.log("SunCalc default:", formatter.format(times.sunrise));
}

const paranaDate = new Date("2027-12-10T12:00:00+05:30");

const times = SunCalc.getTimes(
  paranaDate,
  chandigarhLat,
  chandigarhLon
);

const sunrise = times.sunrise;
const sunset = times.sunset;

const oneThirdDaylight = new Date(
  sunrise.getTime() +
  (sunset.getTime() - sunrise.getTime()) / 3
);

const dwadashiEnd = new Date("2027-12-10T21:24:18Z");
const hariVasaraEnd = new Date("2027-12-10T03:44:18Z");

const paranaStart = new Date(
  Math.max(sunrise.getTime(), hariVasaraEnd.getTime())
);

const paranaEnd = new Date(
  Math.min(oneThirdDaylight.getTime(), dwadashiEnd.getTime())
);

console.log("\nMokshada ISKCON Parana Test");
console.log("Sunrise:", formatter.format(sunrise));
console.log("Sunset:", formatter.format(sunset));
console.log("1/3 daylight:", formatter.format(oneThirdDaylight));
console.log("Parana start:", formatter.format(paranaStart));
console.log("Parana end:", formatter.format(paranaEnd));



{
  const date = new Date("2027-10-27T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const sunrise = times.sunrise;
  const sunset = times.sunset;

  const oneThirdDaylight = new Date(
    sunrise.getTime() +
    (sunset.getTime() - sunrise.getTime()) / 3
  );

  console.log("\nRama ISKCON Parana Test");
  console.log("Sunrise:", formatter.format(sunrise));
  console.log("Sunset:", formatter.format(sunset));
  console.log(
    "1/3 daylight:",
    formatter.format(oneThirdDaylight)
  );
}

{
  const date = new Date("2027-03-05T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const sunrise = times.sunrise;
  const sunset = times.sunset;

  const oneThirdDaylight = new Date(
    sunrise.getTime() +
    (sunset.getTime() - sunrise.getTime()) / 3
  );

  console.log("\nVijaya ISKCON Parana Test");
  console.log("Sunrise:", formatter.format(sunrise));
  console.log("Sunset:", formatter.format(sunset));
  console.log(
    "1/3 daylight:",
    formatter.format(oneThirdDaylight)
  );
  console.log("Published Dwadashi end: 09:53 AM");
}

{
  const date = new Date("2027-07-31T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const sunrise = times.sunrise;
  const sunset = times.sunset;

  const oneThirdDaylight = new Date(
    sunrise.getTime() +
    (sunset.getTime() - sunrise.getTime()) / 3
  );

  console.log("\nKaamika ISKCON Parana Test");

  console.log(
    "Sunrise:",
    formatter.format(sunrise)
  );

  console.log(
    "Sunset:",
    formatter.format(sunset)
  );

  console.log(
    "1/3 daylight:",
    formatter.format(oneThirdDaylight)
  );

  console.log(
    "Drik Parana: 05:40 AM - 10:13 AM"
  );
}

{
  const date = new Date("2027-07-30T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const sunrise = times.sunrise;
  const sunset = times.sunset;

  const daylight = sunset.getTime() - sunrise.getTime();

  const oneThird = new Date(
    sunrise.getTime() + daylight / 3
  );

  const midday = new Date(
    sunrise.getTime() + daylight / 2
  );

  const twoThirds = new Date(
    sunrise.getTime() + (daylight * 2) / 3
  );

  console.log("\nKaamika General Parana Test");
  console.log("Sunrise:", formatter.format(sunrise));
  console.log("Sunset:", formatter.format(sunset));
  console.log("1/3 daylight:", formatter.format(oneThird));
  console.log("Midday:", formatter.format(midday));
  console.log("2/3 daylight:", formatter.format(twoThirds));
  console.log("Published General Parana: 13:51–16:35");
}

{
  const date = new Date("2027-07-30T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const sunrise = times.sunrise;
  const sunset = times.sunset;

  const daylight = sunset.getTime() - sunrise.getTime();
  const fifth = daylight / 5;

  console.log("\nKaamika - Five Daytime Divisions");

  for (let i = 0; i <= 5; i++) {
    const boundary = new Date(
      sunrise.getTime() + fifth * i
    );

    console.log(
      `Boundary ${i}:`,
      formatter.format(boundary)
    );
  }

  console.log("Published Parana: 13:51–16:35");
}

{
  const date = new Date("2027-12-10T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const daylight =
    times.sunset.getTime() - times.sunrise.getTime();

  console.log("\nMokshada General Parana Test");

  for (let i = 0; i <= 5; i++) {
    const boundary = new Date(
      times.sunrise.getTime() + daylight * i / 5
    );

    console.log(
      `Boundary ${i}:`,
      formatter.format(boundary)
    );
  }

  console.log("Published General Parana: 13:17–15:19");
}

{
  const date = new Date("2027-10-26T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const daylight =
    times.sunset.getTime() - times.sunrise.getTime();

  const aparahnaStart = new Date(
    times.sunrise.getTime() + daylight * 3 / 5
  );

  const aparahnaEnd = new Date(
    times.sunrise.getTime() + daylight * 4 / 5
  );

  console.log("\nRama General Parana Test");
  console.log(
    "Aparahna starts:",
    formatter.format(aparahnaStart)
  );
  console.log(
    "Aparahna ends:",
    formatter.format(aparahnaEnd)
  );
  console.log("Published: 13:13–15:27");
}

{
  const date = new Date("2027-03-05T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const daylight = times.sunset.getTime() - times.sunrise.getTime();

  console.log("\nVijaya General Parana Test");

  console.log("Sunrise:", formatter.format(times.sunrise));

  console.log(
    "1/5 daylight:",
    formatter.format(
      new Date(times.sunrise.getTime() + daylight / 5)
    )
  );

  console.log(
    "Aparahna start:",
    formatter.format(
      new Date(times.sunrise.getTime() + daylight * 3 / 5)
    )
  );

  console.log("Published General Parana: 06:45–09:05");
}

{
  const date = new Date("2027-02-18T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const daylight =
    times.sunset.getTime() - times.sunrise.getTime();

  const aparahnaStart = new Date(
    times.sunrise.getTime() + daylight * 3 / 5
  );

  const aparahnaEnd = new Date(
    times.sunrise.getTime() + daylight * 4 / 5
  );

  const dwadashiEnd = new Date("2027-02-18T08:58:40Z");

  console.log("\nBhishma Dvadashi Test");
  console.log("Aparahna start:", formatter.format(aparahnaStart));
  console.log("Dwadashi end:", formatter.format(dwadashiEnd));
  console.log("Aparahna end:", formatter.format(aparahnaEnd));

  console.log(
    "Dwadashi ends during Aparahna:",
    dwadashiEnd > aparahnaStart &&
    dwadashiEnd < aparahnaEnd
  );
}

{
  const dwadashiStart = new Date("2027-02-17T12:02:50Z");
  const dwadashiEnd = new Date("2027-02-18T08:58:40Z");

  const hariVasaraEnd = new Date(
    dwadashiStart.getTime() +
    (dwadashiEnd.getTime() - dwadashiStart.getTime()) / 4
  );

  const date = new Date("2027-02-18T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  console.log("\nJaya Parana Investigation");
  console.log("Sunrise:", formatter.format(times.sunrise));
  console.log("Hari Vasara ends:", formatter.format(hariVasaraEnd));
  console.log("Dwadashi ends:", formatter.format(dwadashiEnd));
}

{
  const times = SunCalc.getTimes(
    new Date("2027-02-18T12:00:00+05:30"),
    chandigarhLat,
    chandigarhLon
  );

  const morningEnd = new Date(
    times.sunrise.getTime() +
    (times.sunset.getTime() - times.sunrise.getTime()) / 5
  );

  console.log("\nJaya Morning Parana Test");
  console.log("Sunrise:", formatter.format(times.sunrise));
  console.log("Morning period ends:", formatter.format(morningEnd));
}

{
  const date = new Date("2027-02-18T12:00:00+05:30");
  const { sunrise, sunset } = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const dwadashiStart = new Date("2027-02-17T12:02:50Z");
  const dwadashiEnd = new Date("2027-02-18T08:58:40Z");

  const daylight = sunset.getTime() - sunrise.getTime();
  const hariVasaraEnd = new Date(
    dwadashiStart.getTime() +
    (dwadashiEnd.getTime() - dwadashiStart.getTime()) / 4
  );

  function candidate(start, end) {
    const actualStart = new Date(Math.max(
      start.getTime(),
      dwadashiStart.getTime(),
      hariVasaraEnd.getTime()
    ));

    const actualEnd = new Date(Math.min(
      end.getTime(),
      dwadashiEnd.getTime()
    ));

    return actualStart < actualEnd
      ? `${formatter.format(actualStart)} - ${formatter.format(actualEnd)}`
      : "No eligible overlap";
  }

  console.log("\nJaya General Parana Candidates");

  console.log("Pratah:", candidate(
    sunrise,
    new Date(sunrise.getTime() + daylight / 5)
  ));

  console.log("Aparahna:", candidate(
    new Date(sunrise.getTime() + daylight * 3 / 5),
    new Date(sunrise.getTime() + daylight * 4 / 5)
  ));
}

{
  const cases = [
    {
      name: "Rama",
      paranaDate: "2027-10-26",
      dwadashiStart: "2027-10-25T21:53:09Z",
      dwadashiEnd: "2027-10-26T19:34:30Z"
    },
    {
      name: "Kaamika",
      paranaDate: "2027-07-30",
      dwadashiStart: "2027-07-29T23:44:00Z",
      dwadashiEnd: "2027-07-30T20:49:16Z"
    }
  ];

  for (const item of cases) {
    const start = new Date(item.dwadashiStart);
    const end = new Date(item.dwadashiEnd);

    const hariVasaraEnd = new Date(
      start.getTime() +
      (end.getTime() - start.getTime()) / 4
    );

    const sunrise = SunCalc.getTimes(
      new Date(`${item.paranaDate}T12:00:00+05:30`),
      chandigarhLat,
      chandigarhLon
    ).sunrise;

    console.log(`\n${item.name} Hari Vasara Test`);
    console.log("Sunrise:", formatter.format(sunrise));
    console.log("Hari Vasara ends:", formatter.format(hariVasaraEnd));
    console.log(
      "Hari Vasara ends after sunrise:",
      hariVasaraEnd > sunrise
    );
  }
}

{
  const date = new Date("2027-10-26T12:00:00+05:30");

  const times = SunCalc.getTimes(
    date,
    chandigarhLat,
    chandigarhLon
  );

  const pratahEnd = new Date(
    times.sunrise.getTime() +
    (times.sunset.getTime() - times.sunrise.getTime()) / 5
  );

  const hariVasaraEnd = new Date("2027-10-26T03:18:29Z");

  console.log("\nRama Pratahkal Boundary Test");
  console.log("Sunrise:", formatter.format(times.sunrise));
  console.log("Pratahkal ends:", formatter.format(pratahEnd));
  console.log("Hari Vasara ends:", formatter.format(hariVasaraEnd));
  console.log(
    "Morning Parana possible:",
    hariVasaraEnd < pratahEnd
  );
}

{
  const cases = [
    {
      name: "Mokshada",
      date: "2027-12-10",
      start: "2027-12-09T21:50:58Z",
      end: "2027-12-10T21:24:18Z"
    },
    {
      name: "Kaamika",
      date: "2027-07-30",
      start: "2027-07-29T23:44:00Z",
      end: "2027-07-30T20:49:16Z"
    },
    {
      name: "Rama",
      date: "2027-10-26",
      start: "2027-10-25T21:53:09Z",
      end: "2027-10-26T19:34:30Z"
    },
    {
      name: "Jaya",
      date: "2027-02-18",
      start: "2027-02-17T12:02:50Z",
      end: "2027-02-18T08:58:40Z"
    }
  ];

  for (const item of cases) {
    const { sunrise, sunset } = SunCalc.getTimes(
      new Date(`${item.date}T12:00:00+05:30`),
      chandigarhLat,
      chandigarhLon
    );

    const start = new Date(item.start);
    const end = new Date(item.end);

    const hariVasaraEnd = new Date(
      start.getTime() + (end.getTime() - start.getTime()) / 4
    );

    const pratahEnd = new Date(
      sunrise.getTime() + (sunset.getTime() - sunrise.getTime()) / 5
    );

    console.log(`\n${item.name}`);
    console.log("Sunrise:", formatter.format(sunrise));
    console.log("Pratah ends:", formatter.format(pratahEnd));
    console.log("Hari Vasara ends:", formatter.format(hariVasaraEnd));
    console.log(
      "Hari Vasara within Pratah:",
      hariVasaraEnd > sunrise && hariVasaraEnd < pratahEnd
    );
  }
}

{
  const times = SunCalc.getTimes(
    new Date("2027-03-19T12:00:00+05:30"),
    chandigarhLat,
    chandigarhLon
  );

  const pratahEnd = new Date(
    times.sunrise.getTime() +
    (times.sunset.getTime() - times.sunrise.getTime()) / 5
  );

  console.log("\nAmalaki Parana Test");
  console.log("Sunrise:", formatter.format(times.sunrise));
  console.log("Pratahkal ends:", formatter.format(pratahEnd));
}

{
  const times = SunCalc.getTimes(
    new Date("2027-02-18T12:00:00+05:30"),
    chandigarhLat,
    chandigarhLon
  );

  const daylight = times.sunset.getTime() - times.sunrise.getTime();

  const aparahnaStart = new Date(
    times.sunrise.getTime() + daylight * 3 / 5
  );

  const aparahnaEnd = new Date(
    times.sunrise.getTime() + daylight * 4 / 5
  );

  const dwadashiEnd = new Date("2027-02-18T08:58:40Z");

  const adjustedEnd = new Date(
    Math.min(aparahnaEnd.getTime(), dwadashiEnd.getTime())
  );

  console.log("\nJaya Afternoon Boundary Test");
  console.log("Aparahna starts:", formatter.format(aparahnaStart));
  console.log("Aparahna ends:", formatter.format(aparahnaEnd));
  console.log("Dwadashi ends:", formatter.format(dwadashiEnd));
  console.log("Adjusted end:", formatter.format(adjustedEnd));
  console.log(
    "Afternoon overlap exists:",
    adjustedEnd > aparahnaStart
  );
}

{
  const times = SunCalc.getTimes(
    new Date("2027-12-10T12:00:00+05:30"),
    chandigarhLat,
    chandigarhLon
  );

  const daylight = times.sunset.getTime() - times.sunrise.getTime();

  const aparahnaStart = new Date(
    times.sunrise.getTime() + daylight * 3 / 5
  );

  const aparahnaEnd = new Date(
    times.sunrise.getTime() + daylight * 4 / 5
  );

  const dwadashiEnd = new Date("2027-12-10T21:24:18Z");

  const adjustedEnd = new Date(
    Math.min(aparahnaEnd.getTime(), dwadashiEnd.getTime())
  );

  console.log("\nMokshada Afternoon Parana Test");
  console.log("Aparahna starts:", formatter.format(aparahnaStart));
  console.log("Aparahna ends:", formatter.format(aparahnaEnd));
  console.log("Adjusted Parana ends:", formatter.format(adjustedEnd));
}

{
  const times = SunCalc.getTimes(
    new Date("2027-04-18T12:00:00+05:30"),
    chandigarhLat,
    chandigarhLon
  );

  const dwadashiStart = new Date("2027-04-17T03:58:51Z");
  const dwadashiEnd = new Date("2027-04-18T02:13:11Z");

  const hariVasaraEnd = new Date(
    dwadashiStart.getTime() +
    (dwadashiEnd.getTime() - dwadashiStart.getTime()) / 4
  );

  const pratahEnd = new Date(
    times.sunrise.getTime() +
    (times.sunset.getTime() - times.sunrise.getTime()) / 5
  );

  const paranaStart = new Date(
    Math.max(times.sunrise.getTime(), hariVasaraEnd.getTime())
  );

  const paranaEnd = new Date(
    Math.min(pratahEnd.getTime(), dwadashiEnd.getTime())
  );

  console.log("\nKamada Parana Test");
  console.log("Sunrise:", formatter.format(times.sunrise));
  console.log("Hari Vasara ends:", formatter.format(hariVasaraEnd));
  console.log("Pratahkal ends:", formatter.format(pratahEnd));
  console.log("Dwadashi ends:", formatter.format(dwadashiEnd));
  console.log("Calculated Parana starts:", formatter.format(paranaStart));
  console.log("Calculated Parana ends:", formatter.format(paranaEnd));
  console.log("Valid window:", paranaStart < paranaEnd);
}



{
  const ekadashiStart = new Date("2027-03-02T23:15:27Z");
  const ekadashiEnd = new Date("2027-03-04T01:55:20Z");

  const dates = ["2027-03-03", "2027-03-04"];

  console.log("\nVijaya Fasting Date Test");

  for (const date of dates) {
    const sunrise = SunCalc.getTimes(
      new Date(`${date}T12:00:00+05:30`),
      chandigarhLat,
      chandigarhLon
    ).sunrise;

    const ekadashiAtSunrise =
      sunrise >= ekadashiStart && sunrise < ekadashiEnd;

    console.log({
      date,
      sunrise: formatter.format(sunrise),
      ekadashiAtSunrise
    });
  }
}

{
  const start = new Date("2027-03-02T23:15:27Z");
  const end = new Date("2027-03-04T01:55:20Z");

  const dates = ["2027-03-03", "2027-03-04"];

  const sunriseDates = dates.filter(date => {
    const sunrise = SunCalc.getTimes(
      new Date(`${date}T12:00:00+05:30`),
      chandigarhLat,
      chandigarhLon
    ).sunrise;

    return sunrise >= start && sunrise < end;
  });

  console.log("\nVijaya Classification");
  console.log("Ekadashi sunrise count:", sunriseDates.length);
  console.log("Dates:", sunriseDates);

  if (sunriseDates.length === 2) {
    console.log("Classification: Two-sunrise Ekadashi");
    console.log("Reference General fasting date: 2027-03-04");
  }
}


{
  const start = new Date("2027-07-29T02:05:08Z");
  const end = new Date("2027-07-29T23:44:00Z");

  const dates = ["2027-07-29", "2027-07-30"];

  const sunriseDates = dates.filter(date => {
    const sunrise = SunCalc.getTimes(
      new Date(`${date}T12:00:00+05:30`),
      chandigarhLat,
      chandigarhLon
    ).sunrise;

    return sunrise >= start && sunrise < end;
  });

  console.log("\nKaamika Classification");
  console.log("Ekadashi sunrise count:", sunriseDates.length);
  console.log("Dates:", sunriseDates);

  if (sunriseDates.length === 0) {
    console.log("Classification: Zero-sunrise Ekadashi");
    console.log("Reference General fasting date: 2027-07-29");
    console.log("Reference ISKCON fasting date: 2027-07-30");
  }
}

{
  const start = new Date("2027-07-29T02:05:08Z");
  const end = new Date("2027-07-29T23:44:00Z");

  console.log("\nKaamika Arunodaya Test");

  for (const date of ["2027-07-29", "2027-07-30"]) {
    const sunrise = SunCalc.getTimes(
      new Date(`${date}T12:00:00+05:30`),
      chandigarhLat,
      chandigarhLon
    ).sunrise;

    const arunodaya = new Date(
      sunrise.getTime() - 96 * 60 * 1000
    );

    const getTithi = time => {
      if (time < start) return "Dashami";
      if (time < end) return "Ekadashi";
      return "Dwadashi";
    };

    console.log({
      date,
      sunrise: formatter.format(sunrise),
      arunodaya: formatter.format(arunodaya),
      sunriseTithi: getTithi(sunrise),
      arunodayaTithi: getTithi(arunodaya)
    });
  }
}
