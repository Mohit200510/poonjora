
import {
  cleanEkadashiRecords,
  createEkadashiResult
} from "./src/utils/ekadashiRules.js";

// Cached 2027 Ekadashi records — no API calls.
const records = [
  { ekadashi: "Safala", start: "2027-01-02 08:55:19 UTC", end: "2027-01-03 10:39:29 UTC" },
  { ekadashi: "Putrada", start: "2027-01-18 04:58:05 UTC", end: "2027-01-19 02:20:28 UTC" },
  { ekadashi: "Shattila", start: "2027-02-01 03:12:23 UTC", end: "2027-02-02 05:41:25 UTC" },
  { ekadashi: "Jaya", start: "2027-02-16 14:50:24 UTC", end: "2027-02-17 12:02:50 UTC" },
  { ekadashi: "Vijaya", start: "2027-03-02 23:15:27 UTC", end: "2027-03-04 01:55:20 UTC" },
  { ekadashi: "Aamla", start: "2027-03-17 22:52:23 UTC", end: "2027-03-18 20:22:10 UTC" },
  { ekadashi: "Paapamochini", start: "2027-04-01 19:16:17 UTC", end: "2027-04-02 21:23:06 UTC" },
  { ekadashi: "Kaamada", start: "2027-04-16 05:52:40 UTC", end: "2027-04-17 03:58:51 UTC" },
  { ekadashi: "Varuthini", start: "2027-05-01 13:24:46 UTC", end: "2027-05-02 14:22:59 UTC" },
  { ekadashi: "Vallabhacharya Jayanti", start: "2027-05-01 13:24:46 UTC", end: "2027-05-02 14:22:59 UTC" },
  { ekadashi: "Mohini", start: "2027-05-15 12:48:34 UTC", end: "2027-05-16 11:44:30 UTC" },
  { ekadashi: "Apara", start: "2027-05-31 04:33:33 UTC", end: "2027-06-01 04:10:51 UTC" },
  { ekadashi: "Nirjala", start: "2027-06-13 20:43:12 UTC", end: "2027-06-14 20:39:06 UTC" },
  { ekadashi: "Yogini", start: "2027-06-29 16:35:06 UTC", end: "2027-06-30 15:01:48 UTC" },
  { ekadashi: "Devashayani", start: "2027-07-13 06:39:52 UTC", end: "2027-07-14 07:41:14 UTC" },
  { ekadashi: "Kaamika", start: "2027-07-29 02:05:08 UTC", end: "2027-07-29 23:44:00 UTC" },
  { ekadashi: "Pavitra", start: "2027-08-11 19:29:46 UTC", end: "2027-08-12 21:30:43 UTC" },
  { ekadashi: "Aja", start: "2027-08-27 09:56:23 UTC", end: "2027-08-28 07:13:12 UTC" },
  { ekadashi: "Padma", start: "2027-09-10 11:31:36 UTC", end: "2027-09-11 14:07:16 UTC" },
  { ekadashi: "Indira", start: "2027-09-25 17:01:50 UTC", end: "2027-09-26 14:20:26 UTC" },
  { ekadashi: "Paapamkusha", start: "2027-10-10 06:11:46 UTC", end: "2027-10-11 08:39:43 UTC" },
  { ekadashi: "Rama", start: "2027-10-25 00:11:10 UTC", end: "2027-10-25 21:53:09 UTC" },
  { ekadashi: "Deva-Prabodhini", start: "2027-11-09 02:05:40 UTC", end: "2027-11-10 03:42:19 UTC" },
  { ekadashi: "Utpanna", start: "2027-11-23 08:15:52 UTC", end: "2027-11-24 06:42:22 UTC" },
  { ekadashi: "Mokshada", start: "2027-12-08 21:30:01 UTC", end: "2027-12-09 21:50:58 UTC" },
  { ekadashi: "Safala", start: "2027-12-22 18:11:47 UTC", end: "2027-12-23 17:42:46 UTC" }
];

// Step 1: Clean records.
const cleaned = cleanEkadashiRecords(records);

console.log("Input records:", records.length);
console.log("Cleaned records:", cleaned.length);

// Step 2: Calculate provisional candidates for Chandigarh.
const results = cleaned.map(item => {
  const result = createEkadashiResult({
    name: item.ekadashi,
    tithiStart: item.start,
    tithiEnd: item.end,
    latitude: 30.7334421,
    longitude: 76.7797143
  });

  return {
    name: result.name,
    tithiStart: item.start,
    classification: result.classification,
    fastingDateCandidate: result.fastingDateCandidate,
    status: result.status
  };
});

console.log("\nEkadashi Candidate Results");
console.table(results);

console.log("Total processed:", results.length);
console.log(
  "Needs review:",
  results.filter(item => item.status === "needs_review").length
);

// Step 3: Reference cases.
// These are date-comparison fixtures, not automatic religious verification.
const referenceCases = [
  { name: "Safala", date: "2027-12-23", reference: "2027-12-23", tradition: "general" },
  { name: "Jaya", date: "2027-02-17", reference: "2027-02-17", tradition: "general" },
  { name: "Utpanna", date: "2027-11-24", reference: "2027-11-24", tradition: "general" },
  { name: "Deva-Prabodhini", date: "2027-11-10", reference: "2027-11-10", tradition: "general" },
  { name: "Paapamkusha", date: "2027-10-11", reference: "2027-10-11", tradition: "general" },
  { name: "Indira", date: "2027-09-26", reference: "2027-09-26", tradition: "general" },
  { name: "Padma", date: "2027-09-11", reference: "2027-09-11", tradition: "general" },
  { name: "Aja", date: "2027-08-28", reference: "2027-08-28", tradition: "general" },
  { name: "Pavitra", date: "2027-08-12", reference: "2027-08-12", tradition: "general" },
  { name: "Devashayani", date: "2027-07-14", reference: "2027-07-14", tradition: "general" },
  { name: "Yogini", date: "2027-06-30", reference: "2027-06-30", tradition: "general" },
  { name: "Nirjala", date: "2027-06-14", reference: "2027-06-14", tradition: "general" },
  { name: "Apara", date: "2027-06-01", reference: "2027-06-01", tradition: "general" },
  { name: "Mohini", date: "2027-05-16", reference: "2027-05-16", tradition: "general" },
  { name: "Varuthini", date: "2027-05-02", reference: "2027-05-02", tradition: "general" },
  { name: "Paapamochini", date: "2027-04-02", reference: "2027-04-02", tradition: "general" },
  { name: "Aamla", date: "2027-03-18", reference: "2027-03-18", tradition: "general" },
  { name: "Shattila", date: "2027-02-02", reference: "2027-02-02", tradition: "general" },
  { name: "Safala", date: "2027-01-03", reference: "2027-01-03", tradition: "general" },
  { name: "Putrada", date: "2027-01-18", reference: "2027-01-18", tradition: "general" },
  { name: "Putrada", date: "2027-01-19", reference: "2027-01-19", tradition: "vaishnava" },
  { name: "Vijaya", date: "2027-03-04", reference: "2027-03-04", tradition: "general" },
  { name: "Kaamada", date: "2027-04-17", reference: "2027-04-17", tradition: "general" },
  { name: "Kaamika", date: "2027-07-29", reference: "2027-07-29", tradition: "general" },
  { name: "Rama", date: "2027-10-25", reference: "2027-10-25", tradition: "general" },
  { name: "Mokshada", date: "2027-12-09", reference: "2027-12-09", tradition: "general" }
];


const kaamikaTraditionReferences = [
  {
    name: "Kaamika",
    tradition: "smarta",
    referenceDate: "2027-07-29"
  },
  {
    name: "Kaamika",
    tradition: "vaishnava",
    referenceDate: "2027-07-30"
  }
];

console.log("\nStep 172 — Kaamika Tradition References");
console.table(kaamikaTraditionReferences);

const kaamikaResult = results.find(
  item => item.name === "Kaamika"
);

if (!kaamikaResult) {
  throw new Error("Kaamika record not found");
}

console.log("Engine candidate:", kaamikaResult.fastingDateCandidate);
console.log("Engine classification:", kaamikaResult.classification);
console.log("Engine status:", kaamikaResult.status);

if (kaamikaResult.status !== "needs_review") {
  throw new Error("Kaamika must remain needs_review");
}

console.log("PASS: Kaamika remains flagged for review.");


// Step 4: Compare reference cases to the actual candidate records.
console.log("\nReference Date Comparison");

const matchedReferences = [];
const unmatchedReferences = [];

for (const ref of referenceCases) {
  const result = results.find(item =>
    item.name === ref.name &&
    item.fastingDateCandidate === ref.date
  );

  const matches =
    Boolean(result) &&
    result.fastingDateCandidate === ref.reference;

  const comparison = {
    name: ref.name,
    tradition: ref.tradition,
    candidate: result?.fastingDateCandidate ?? null,
    reference: ref.reference,
    matches
  };

  console.log(comparison);

  if (matches) {
    matchedReferences.push(comparison);
  } else {
    unmatchedReferences.push({
      name: ref.name,
      tradition: ref.tradition,
      expectedDate: ref.reference,
      candidateDate: result?.fastingDateCandidate ?? null
    });
  }
}

// Step 5: Audit summary.
console.log("\nStep 167 — Reference Audit");
console.log("Candidate records:", results.length);
console.log("Reference cases:", referenceCases.length);
console.log("Matching references:", matchedReferences.length);
console.log("Unmatched references:", unmatchedReferences.length);

console.log("\nUnmatched Reference Details");
console.table(unmatchedReferences);

console.log("\nEngine Status Summary");
console.log(
  "Needs review:",
  results.filter(item => item.status === "needs_review").length
);
console.log(
  "Unverified:",
  results.filter(item => item.status === "unverified").length
);



import assert from "node:assert/strict";

console.log("\nStep 170 — Vijaya Safety Test");

const vijaya = results.find(
  item => item.name === "Vijaya"
);

assert.ok(vijaya, "Vijaya Ekadashi record must exist");

assert.equal(
  vijaya.classification,
  "two_sunrise",
  "Vijaya should be classified as two_sunrise"
);

assert.deepEqual(
  createEkadashiResult({
    name: "Vijaya",
    tithiStart: "2027-03-02T23:15:27Z",
    tithiEnd: "2027-03-04T01:55:20Z",
    latitude: 30.7334421,
    longitude: 76.7797143
  }).sunriseDates,
  ["2027-03-03", "2027-03-04"],
  "Both sunrise dates must be detected"
);

assert.equal(
  vijaya.status,
  "needs_review",
  "Vijaya must remain flagged for review"
);

console.log("PASS: Both sunrise dates detected.");
console.log("PASS: Vijaya remains needs_review.");
console.log("PASS: No automatic verification occurred.");

console.log("\nStep 171 — Kaamika Safety Test");

const kaamika = results.find(
  item => item.name === "Kaamika"
);

if (!kaamika) {
  throw new Error("Kaamika Ekadashi record not found");
}

console.log({
  name: kaamika.name,
  tithiStart: kaamika.tithiStart,
  classification: kaamika.classification,
  fastingDateCandidate: kaamika.fastingDateCandidate,
  status: kaamika.status
});

if (kaamika.classification === "zero_sunrise") {
  console.log(
    "PASS: Zero-sunrise case detected; manual rule validation required."
  );
} else {
  throw new Error(
    "Expected Kaamika to be classified as zero_sunrise"
  );
}

if (kaamika.status !== "needs_review") {
  throw new Error(
    "Kaamika must remain needs_review"
  );
}

console.log("PASS: Kaamika remains flagged for review.");


console.log("\nStep 173 — Kaamika Tradition Validation");

const kaamikaReferences = [
  {
    tradition: "smarta",
    referenceDate: "2027-07-29"
  },
  {
    tradition: "vaishnava",
    referenceDate: "2027-07-30"
  }
];
const kaamikaStep173 = results.find(
  item => item.name === "Kaamika"
);

if (!kaamika) {
  throw new Error("Kaamika record not found");
}

console.table(
  kaamikaReferences.map(reference => ({
    name: "Kaamika",
    tradition: reference.tradition,
    engineCandidate: kaamika.fastingDateCandidate,
    referenceDate: reference.referenceDate,
    dateMatches:
      kaamika.fastingDateCandidate === reference.referenceDate,
    engineStatus: kaamika.status
  }))
);

if (kaamika.status !== "needs_review") {
  throw new Error("Kaamika must remain needs_review");
}

console.log("PASS: Both tradition references were compared.");
console.log("PASS: Kaamika remains needs_review.");


console.log("\nStep 174 — Tradition-Specific Result Structure");

const kaamikaStep174 = results.find(
  item => item.name === "Kaamika"
);

if (!kaamikaStep174) {
  throw new Error("Kaamika record not found");
}

const kaamikaTraditionResults = {
  name: "Kaamika",
  candidates: {
    smarta: "2027-07-29",
    vaishnava: "2027-07-30"
  },
  source: "reference_calendar",
  engineStatus: kaamikaStep174.status,
  verified: false
};

console.log(kaamikaTraditionResults);

if (kaamikaTraditionResults.verified !== false) {
  throw new Error("Reference dates must not auto-verify");
}

if (kaamikaStep174.status !== "needs_review") {
  throw new Error("Kaamika must remain needs_review");
}

console.log("PASS: Both traditions represented separately.");
console.log("PASS: Reference dates do not auto-verify.");
console.log("PASS: Original engine status remains unchanged.");

console.log("\nStep 175 — Rama Ekadashi Safety Test");

const ramaStep175 = results.find(
  item => item.name === "Rama"
);

if (!ramaStep175) {
  throw new Error("Rama Ekadashi record not found");
}

console.log({
  name: ramaStep175.name,
  classification: ramaStep175.classification,
  fastingDateCandidate: ramaStep175.fastingDateCandidate,
  status: ramaStep175.status
});

if (ramaStep175.classification !== "normal") {
  throw new Error("Expected Rama classification to be normal");
}

if (ramaStep175.status !== "needs_review") {
  throw new Error("Rama must remain needs_review");
}

console.log("PASS: Rama has one sunrise in the Tithi interval.");
console.log("PASS: Rama remains flagged for review.");


console.log("\n========================================");
console.log("STEP 178 — EKADASHI REVIEW REPORT");
console.log("========================================");

const reviewReportStep178 = [
  {
    name: "Vijaya",
    expectedClassification: "two_sunrise",
    issue: "Two sunrises fall within the Tithi interval",
    nextAction: "Validate tradition-specific fasting dates"
  },
  {
    name: "Kaamika",
    expectedClassification: "zero_sunrise",
    issue: "No sunrise falls within the Tithi interval",
    nextAction: "Validate zero-sunrise observance rules"
  },
  {
    name: "Rama",
    expectedClassification: "normal",
    issue: "One sunrise; Arunodaya falls outside the Tithi",
    nextAction: "Validate the applicable observance rules"
  }
];

const reviewResultsStep178 = reviewReportStep178.map(review => {
  const actual = results.find(
    item => item.name === review.name
  );

  return {
    name: review.name,
    expectedClassification: review.expectedClassification,
    actualClassification: actual?.classification ?? "missing",
    candidateDate: actual?.fastingDateCandidate ?? null,
    status: actual?.status ?? "missing",
    issue: review.issue,
    nextAction: review.nextAction,
    testPassed:
      Boolean(actual) &&
      actual.classification === review.expectedClassification &&
      actual.status === "needs_review"
  };
});

console.table(reviewResultsStep178);

const missingOrUnexpectedStep178 =
  reviewResultsStep178.filter(item => !item.testPassed);

console.log("\nReview Summary");
console.log("Cases expected:", reviewReportStep178.length);
console.log(
  "Cases passing safety checks:",
  reviewResultsStep178.filter(item => item.testPassed).length
);
console.log(
  "Cases requiring investigation:",
  missingOrUnexpectedStep178.length
);

if (missingOrUnexpectedStep178.length > 0) {
  console.error("CHECK FAILED: Review the cases listed above.");
} else {
  console.log("PASS: All three cases remain safely flagged.");
}

console.log("\nNo fasting dates or verification statuses were changed.");



console.log("\nStep 180 — Candidate Safety Regression Test");

const ambiguousCasesStep180 = [
  {
    name: "Vijaya",
    tithiStart: "2027-03-02T23:15:27Z",
    tithiEnd: "2027-03-04T01:55:20Z",
    expectedClassification: "two_sunrise",
    expectedCandidate: "2027-03-03"
  },
  {
    name: "Kaamika",
    tithiStart: "2027-07-29T02:05:08Z",
    tithiEnd: "2027-07-29T23:44:00Z",
    expectedClassification: "zero_sunrise",
    expectedCandidate: "2027-07-29"
  }
];

for (const testCase of ambiguousCasesStep180) {
  const result = createEkadashiResult({
    name: testCase.name,
    tithiStart: testCase.tithiStart,
    tithiEnd: testCase.tithiEnd,
    latitude: 30.7334421,
    longitude: 76.7797143
  });

  if (result.classification !== testCase.expectedClassification) {
    throw new Error(
      `${testCase.name}: unexpected classification`
    );
  }

  if (result.fastingDateCandidate !== testCase.expectedCandidate) {
    throw new Error(
      `${testCase.name}: expected provisional candidate ` +
      `${testCase.expectedCandidate}, received ` +
      `${result.fastingDateCandidate ?? "null"}`
    );
  }

  if (result.status !== "needs_review") {
    throw new Error(
      `${testCase.name}: must remain needs_review`
    );
  }

  console.log(
    `PASS: ${testCase.name} has provisional candidate ` +
    `${result.fastingDateCandidate} and remains needs_review.`
  );
}

const finalAuditStep182 = results.map((item, index) => {
  const refs = referenceCases.filter(
    ref =>
      ref.name.trim().toLowerCase() ===
      item.name.trim().toLowerCase()
  );

  const referenceDates = [
    ...new Set(refs.map(ref => ref.reference))
  ];

  const hasReference = referenceDates.length > 0;

  const referenceMatch = hasReference &&
    referenceDates.includes(item.fastingDateCandidate);

  return {
    number: index + 1,
    name: item.name,
    candidate: item.fastingDateCandidate ?? "NONE",
    referenceDates: referenceDates.join(", ") || "NONE",
    referenceMatch: hasReference
      ? referenceMatch
        ? "MATCH"
        : "MISMATCH"
      : "NO REFERENCE",
    classification: item.classification,
    status: item.status
  };
});

console.table(finalAuditStep182);

const matchedStep182 = finalAuditStep182.filter(
  item => item.referenceMatch === "MATCH"
).length;

const mismatchedStep182 = finalAuditStep182.filter(
  item => item.referenceMatch === "MISMATCH"
).length;

const noReferenceStep182 = finalAuditStep182.filter(
  item => item.referenceMatch === "NO REFERENCE"
).length;

const needsReviewStep182 = finalAuditStep182.filter(
  item => item.status === "needs_review"
).length;

const unverifiedStep182 = finalAuditStep182.filter(
  item => item.status === "unverified"
).length;

console.log("\nFINAL AUDIT SUMMARY");
console.log("Total records:", finalAuditStep182.length);
console.log("Reference matches:", matchedStep182);
console.log("Reference mismatches:", mismatchedStep182);
console.log("Without reference:", noReferenceStep182);
console.log("Needs review:", needsReviewStep182);
console.log("Unverified:", unverifiedStep182);

if (finalAuditStep182.length !== 25) {
  console.error("WARNING: Expected 25 records.");
} else {
  console.log("PASS: All 25 records included in the audit.");
}

console.log(
  "NOTE: A reference match is evidence of date agreement,",
  "not automatic verification of observance rules or Parana."
);

console.log("\nSTEP 183 — MISMATCH DETAILS");

console.table(
  finalAuditStep182
    .filter(item => item.referenceMatch === "MISMATCH")
    .map(item => ({
      name: item.name,
      candidate: item.candidate,
      referenceDates: item.referenceDates,
      classification: item.classification,
      status: item.status
    }))
);

console.log("\nSTEP 184 — Reference Evidence Audit");

const specialReferenceCasesStep184 = [
  {
    name: "Vijaya",
    referenceDate: "2027-03-04",
    expectedClassification: "two_sunrise"
  },
  {
    name: "Kaamika",
    referenceDate: "2027-07-29",
    expectedClassification: "zero_sunrise"
  }
];

for (const referenceCase of specialReferenceCasesStep184) {
  const result = results.find(
    item => item.name === referenceCase.name
  );

  if (!result) {
    throw new Error(
      `${referenceCase.name}: record not found`
    );
  }

  console.log({
    name: referenceCase.name,
    referenceDate: referenceCase.referenceDate,
    engineCandidate: result.fastingDateCandidate ?? null,
    classification: result.classification,
    referenceAvailable: true,
    engineIndependentlyMatched:
      result.fastingDateCandidate === referenceCase.referenceDate,
    requiresReview: result.status === "needs_review"
  });

  if (
    result.classification !==
      referenceCase.expectedClassification ||
    result.status !== "needs_review"
  ) {
    throw new Error(
      `${referenceCase.name}: safety status changed unexpectedly`
    );
  }
}

console.log("PASS: Reference evidence retained separately.");
console.log("PASS: Both special cases remain under review.");
