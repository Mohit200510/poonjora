import { cleanEkadashiRecords } from "./src/utils/ekadashiRules.js";
import { createEkadashiResult } from "./src/utils/ekadashiRules.js";

const result = createEkadashiResult({
  name: "Vijaya",
  tithiStart: "2027-03-02T23:15:27Z",
  tithiEnd: "2027-03-04T01:55:20Z",
  latitude: 30.7334421,
  longitude: 76.7797143
});

console.log("\nVijaya Ekadashi Engine Test");
console.log(result);



const kaamika = createEkadashiResult({
  name: "Kaamika",
  tithiStart: "2027-07-29T02:05:08Z",
  tithiEnd: "2027-07-29T23:44:00Z",
  latitude: 30.7334421,
  longitude: 76.7797143
});

console.log("\nKaamika Ekadashi Engine Test");
console.log(kaamika);

const rama = createEkadashiResult({
  name: "Rama",
  tithiStart: "2027-10-25T00:11:10Z",
  tithiEnd: "2027-10-25T21:53:09Z",
  latitude: 30.7334421,
  longitude: 76.7797143
});

console.log("\nRama Ekadashi Engine Test");
console.log(rama);


const kaamada = createEkadashiResult({
  name: "Kaamada",
  tithiStart: "2027-04-16T05:52:40Z",
  tithiEnd: "2027-04-17T03:58:51Z",
  dwadashiStart: "2027-04-17T03:58:51Z",
  dwadashiEnd: "2027-04-18T02:13:11Z",
  latitude: 30.7334421,
  longitude: 76.7797143
});

const ist = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

console.log("\nKaamada Integrated Parana Test");
console.log("Fasting candidate:", kaamada.fastingDateCandidate);
console.log("Parana period:", kaamada.paranaPeriod);
console.log(
  "Parana start:",
  kaamada.paranaStart
    ? ist.format(new Date(kaamada.paranaStart))
    : null
);
console.log(
  "Parana end:",
  kaamada.paranaEnd
    ? ist.format(new Date(kaamada.paranaEnd))
    : null
);
console.log("Status:", kaamada.status);


const sampleRecords = [
  {
    ekadashi: "Varuthini",
    start: "2027-05-01T13:24:46Z",
    end: "2027-05-02T14:22:59Z"
  },
  {
    ekadashi: "Vallabhacharya Jayanti",
    start: "2027-05-01T13:24:46Z",
    end: "2027-05-02T14:22:59Z"
  },
  {
    ekadashi: "Mohini",
    start: "2027-05-15T12:48:34Z",
    end: "2027-05-16T11:44:30Z"
  }
];

const cleaned = cleanEkadashiRecords(sampleRecords);

console.log("\nEkadashi Cleanup Test");
console.log("Before:", sampleRecords.length);
console.log("After:", cleaned.length);
console.log("Names:", cleaned.map(item => item.ekadashi));
