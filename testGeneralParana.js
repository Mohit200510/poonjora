
import * as SunCalc from "suncalc";

const LAT = 30.7334421;
const LON = 76.7797143;

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

function calculateGeneralParana({
  paranaDate,
  dwadashiStartUTC,
  dwadashiEndUTC
}) {
  const { sunrise, sunset } = SunCalc.getTimes(
    new Date(`${paranaDate}T12:00:00+05:30`),
    LAT,
    LON
  );

  const dwadashiStart = new Date(dwadashiStartUTC);
  const dwadashiEnd = new Date(dwadashiEndUTC);

  const hariVasaraEnd = new Date(
    dwadashiStart.getTime() +
    (dwadashiEnd.getTime() - dwadashiStart.getTime()) / 4
  );

  const daylight = sunset.getTime() - sunrise.getTime();

  const pratahEnd = new Date(
    sunrise.getTime() + daylight / 5
  );

  const aparahnaStart = new Date(
    sunrise.getTime() + daylight * 3 / 5
  );

  const aparahnaEnd = new Date(
    sunrise.getTime() + daylight * 4 / 5
  );

  // Experimental rule, not production verified.
  const morningStart = new Date(
    Math.max(sunrise.getTime(), hariVasaraEnd.getTime())
  );

  const morningEnd = new Date(
    Math.min(pratahEnd.getTime(), dwadashiEnd.getTime())
  );

  const morningAvailable = morningStart < morningEnd;

  const period = morningAvailable ? "Morning" : "Afternoon";

  const paranaStart = morningAvailable
    ? morningStart
    : new Date(
        Math.max(aparahnaStart.getTime(), hariVasaraEnd.getTime())
      );

  const paranaEnd = morningAvailable
    ? morningEnd
    : new Date(
        Math.min(aparahnaEnd.getTime(), dwadashiEnd.getTime())
      );

  return {
    period,
    sunrise: formatter.format(sunrise),
    hariVasaraEnd: formatter.format(hariVasaraEnd),
    pratahEnd: formatter.format(pratahEnd),
    paranaStart: formatter.format(paranaStart),
    paranaEnd: formatter.format(paranaEnd),
    valid: paranaStart < paranaEnd
  };
}

// Test 1: Kamada Ekadashi
const result = calculateGeneralParana({
  paranaDate: "2027-04-18",
  dwadashiStartUTC: "2027-04-17T03:58:51Z",
  dwadashiEndUTC: "2027-04-18T02:13:11Z"
});

console.log("\nKamada General Parana:");
console.log(result);



const mokshadaResult = calculateGeneralParana({
  paranaDate: "2027-12-10",
  dwadashiStartUTC: "2027-12-09T21:50:58Z",
  dwadashiEndUTC: "2027-12-10T21:24:18Z"
});

console.log("\nMokshada General Parana:");
console.log(mokshadaResult);


const ramaResult = calculateGeneralParana({
  paranaDate: "2027-10-26",
  dwadashiStartUTC: "2027-10-25T21:53:09Z",
  dwadashiEndUTC: "2027-10-26T19:34:30Z"
});

console.log("\nRama General Parana:");
console.log(ramaResult);


const kaamikaResult = calculateGeneralParana({
  paranaDate: "2027-07-30",
  dwadashiStartUTC: "2027-07-29T23:44:00Z",
  dwadashiEndUTC: "2027-07-30T20:49:16Z"
});

console.log("\nKaamika General Parana:");
console.log(kaamikaResult);

const jayaResult = calculateGeneralParana({
  paranaDate: "2027-02-18",
  dwadashiStartUTC: "2027-02-17T12:02:50Z",
  dwadashiEndUTC: "2027-02-18T08:58:40Z"
});

console.log("\nJaya General Parana:");
console.log(jayaResult);

const amalakiResult = calculateGeneralParana({
  paranaDate: "2027-03-19",
  dwadashiStartUTC: "2027-03-18T20:21:00Z",
  dwadashiEndUTC: "2027-03-19T17:47:00Z"
});

console.log("\nAmalaki General Parana:");
console.log(amalakiResult);


const vijayaResult = calculateGeneralParana({
  paranaDate: "2027-03-05",
  dwadashiStartUTC: "2027-03-04T01:55:20Z",
  dwadashiEndUTC: "2027-03-05T04:23:00Z"
});

console.log("\nVijaya General Parana:");
console.log(vijayaResult);
