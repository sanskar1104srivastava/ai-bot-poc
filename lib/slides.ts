// The kiosk deck — 28 slides, matching docs/Interactive Animation Slides and
// docs/sahai-kb-28.md. Sales-led: each slide leads with what the hospital gets,
// not with what the software has.
//
// Every `pitch` and `bullets` line traces to a section of docs/sahai-kb-28.md.
// The Figma source shipped claims the knowledge base does not support — "No
// duplicate records created", "Abnormal values flagged automatically", "Audit
// trail maintained automatically", "No manual reconciliation needed" — and those
// are deliberately absent here. A capability a prospect can check and find
// missing costs more than it wins.
//
// For the same reason there are no figures: the design's mock data (₹84,200
// collected, 184 patients, BP 142/88, "Amlodipine 5mg") is not shown. Numbers
// invite verification, and clinical content on a public kiosk reads as advice.
//
// Keep SLIDE_IDS in sync with the `show_slide` tool's enum in
// backend/src/agent.py — the agent runs in its own container and cannot import
// this file. tests/test_show_slide.py fails if they drift.

export const SLIDE_IDS = [
  'intro',
  'connected',
  'patient-search',
  'patient-timeline',
  'patient-docs',
  'abha-create',
  'abha-identify',
  'abdm-consent',
  'abdm-exchange',
  'opd-queue',
  'opd-notes',
  'emergency',
  'beds',
  'vitals',
  'ot',
  'discharge',
  'pharmacy-rx',
  'pharmacy-inv',
  'lab-orders',
  'lab-reports',
  'journey',
  'ai-summary',
  'appointments',
  'video',
  'billing',
  'dues',
  'reports',
  'roles',
] as const;

export type SlideId = (typeof SLIDE_IDS)[number];

/** Phosphor icon name, resolved in content-panel.tsx. */
export type IconName =
  | 'RocketLaunch'
  | 'SquaresFour'
  | 'MagnifyingGlass'
  | 'ClockCounterClockwise'
  | 'Files'
  | 'IdentificationCard'
  | 'IdentificationBadge'
  | 'ShieldCheck'
  | 'ArrowsLeftRight'
  | 'UsersThree'
  | 'NotePencil'
  | 'Siren'
  | 'Bed'
  | 'Heartbeat'
  | 'FirstAidKit'
  | 'SignOut'
  | 'Pill'
  | 'Package'
  | 'TestTube'
  | 'Flask'
  | 'Path'
  | 'Sparkle'
  | 'CalendarCheck'
  | 'VideoCamera'
  | 'Receipt'
  | 'CurrencyInr'
  | 'ChartLineUp'
  | 'Buildings';

export interface Slide {
  id: SlideId;
  /** Small uppercase eyebrow — the design's `tag`. */
  label: string;
  /** Benefit-led headline. */
  title: string;
  /** The one-line pitch, shown large. */
  pitch: string;
  /** Supporting points. Plain strings, as in the design. */
  bullets: string[];
  /** The quotable line, shown beside the illustration. Straight from the KB. */
  expoLine: string;
  icon: IconName;
  /** Per-slide accent, from the design's palette. */
  accent: string;
  /** Lighter companion tone, for washes and fills. */
  accent2: string;
}

// Palettes lifted from the Figma source so the deck keeps its colour rhythm.
const BLUE = { a: '#1a6cb5', l: '#d6e9f8' };
const TEAL = { a: '#2a9d8f', l: '#d0f0ec' };
const VIOLET = { a: '#6d4fc2', l: '#ebe4f9' };
const CORAL = { a: '#d4622a', l: '#fae3d6' };
const PINE = { a: '#1e7a5c', l: '#ceeee6' };
const INDIGO = { a: '#3b5fc0', l: '#dce4f8' };
const ROSE = { a: '#b5446e', l: '#f8daea' };

export const SLIDES: Slide[] = [
  {
    id: 'intro',
    label: 'What is Sahai',
    title: 'One connected hospital system',
    pitch: 'Patient care, operations, ABDM and AI assistance — all in one platform.',
    bullets: [
      'A connected view of the patient journey',
      'ABDM built into the hospital workflow',
      'AI assistance within the same system',
      'Registration through discharge',
    ],
    expoLine:
      'Sahai is designed so the hospital does not have to manage clinical, administrative and digital-health workflows as disconnected pieces.',
    icon: 'RocketLaunch',
    accent: BLUE.a,
    accent2: BLUE.l,
  },
  {
    id: 'connected',
    label: 'Platform Overview',
    title: 'Three areas, one platform',
    pitch: 'Clinical workflows, hospital operations and digital health — connected by design.',
    bullets: [
      'Patient care — clinical workflows',
      'Hospital operations — admin and billing',
      'Digital health — ABDM and ABHA',
      'All within a single hospital environment',
    ],
    expoLine:
      'Every hospital team stays connected while working in the workspace relevant to their role.',
    icon: 'SquaresFour',
    accent: INDIGO.a,
    accent2: INDIGO.l,
  },
  {
    id: 'patient-search',
    label: 'Patient Records',
    title: 'Find a returning patient quickly',
    pitch:
      'Front desk and doctors find returning patients using the details the hospital already has.',
    bullets: [
      'Find returning patients using common identifiers',
      'The existing record surfaces instead of a new one',
      'Available to staff across hospital departments',
    ],
    expoLine:
      'The value is not just digitising a file - it is giving the doctor a connected patient history inside the hospital.',
    icon: 'MagnifyingGlass',
    accent: BLUE.a,
    accent2: BLUE.l,
  },
  {
    id: 'patient-timeline',
    label: 'Patient Records',
    title: "The patient's full hospital story",
    pitch: 'Every visit, prescription, lab report and discharge note on one connected timeline.',
    bullets: [
      "See the patient's hospital journey in one timeline",
      'OPD and IPD visits visible together',
      'Prescriptions and lab results linked to their visit',
    ],
    expoLine:
      'For a doctor, this is about seeing the patient journey as a whole instead of opening disconnected visits one by one.',
    icon: 'ClockCounterClockwise',
    accent: BLUE.a,
    accent2: BLUE.l,
  },
  {
    id: 'patient-docs',
    label: 'Patient Records',
    title: 'Every document, linked to the patient',
    pitch:
      'Clinical documents, consent forms and hospital records stay attached to the right patient.',
    bullets: [
      'Documents linked to the same patient',
      'Discharge summaries stay on the record',
      'Lab reports stay linked to the patient',
      'Patient consent recorded in the same system',
    ],
    expoLine:
      'The value is not just digitising a file - it is giving the doctor a connected patient history inside the hospital.',
    icon: 'Files',
    accent: TEAL.a,
    accent2: TEAL.l,
  },
  {
    id: 'abha-create',
    label: 'ABHA Registration',
    title: 'Create ABHA during registration',
    pitch: 'Make ABHA part of normal registration, not a separate activity to remember.',
    bullets: [
      'Create an ABHA while registering the patient',
      'The process stays within the hospital system',
      'No separate portal for the registration desk',
    ],
    expoLine: 'Your team does not need to treat ABHA as a completely separate workflow.',
    icon: 'IdentificationCard',
    accent: TEAL.a,
    accent2: TEAL.l,
  },
  {
    id: 'abha-identify',
    label: 'ABHA Registration',
    title: 'Identify an existing ABHA at the desk',
    pitch: 'If the patient already has an ABHA, link it rather than creating another.',
    bullets: [
      'Identify an existing ABHA at registration',
      "Link it to the patient's hospital record",
      'Keeps the process inside the hospital system',
    ],
    expoLine: 'Your team does not need to treat ABHA as a completely separate workflow.',
    icon: 'IdentificationBadge',
    accent: TEAL.a,
    accent2: TEAL.l,
  },
  {
    id: 'abdm-consent',
    label: 'ABDM Integration',
    title: 'Consent-based record sharing',
    pitch: 'Consent for health-record sharing is managed inside Sahai, not a separate ABDM tool.',
    bullets: [
      'Manage consent for health-record sharing',
      "Link the patient's care context with the hospital",
      'Handled in the same platform as the rest of the workflow',
    ],
    expoLine:
      'ABDM is built into Sahai as part of the hospital workflow, not positioned as a separate add-on.',
    icon: 'ShieldCheck',
    accent: PINE.a,
    accent2: PINE.l,
  },
  {
    id: 'abdm-exchange',
    label: 'ABDM Integration',
    title: 'Send and receive health records',
    pitch: 'Share hospital records and receive them from other ABDM-connected providers.',
    bullets: [
      'Share hospital-generated records through ABDM',
      'Receive records from other providers after consent',
      "Records arrive in the patient's context",
    ],
    expoLine:
      'ABDM is built into Sahai as part of the hospital workflow, not positioned as a separate add-on.',
    icon: 'ArrowsLeftRight',
    accent: PINE.a,
    accent2: PINE.l,
  },
  {
    id: 'opd-queue',
    label: 'OPD Flow',
    title: 'Doctor and front desk on the same view',
    pitch: 'Reception and clinical teams share one view of the patient flow.',
    bullets: [
      'A shared view of waiting, consultation and completed visits',
      'Reception and doctors work from the same flow',
      "The patient's position in the flow is visible to the team",
    ],
    expoLine:
      'The doctor and front desk are working from the same patient flow instead of maintaining separate views.',
    icon: 'UsersThree',
    accent: BLUE.a,
    accent2: BLUE.l,
  },
  {
    id: 'opd-notes',
    label: 'OPD Consultation',
    title: 'Consultation notes stay on the record',
    pitch: 'What the doctor records during a visit is there at the next one.',
    bullets: [
      'Consultation notes recorded against the visit',
      'Prescriptions attached to the patient record',
      'Available to the doctor on future visits',
    ],
    expoLine:
      'The doctor and front desk are working from the same patient flow instead of maintaining separate views.',
    icon: 'NotePencil',
    accent: BLUE.a,
    accent2: BLUE.l,
  },
  {
    id: 'emergency',
    label: 'Emergency',
    title: 'Emergency patients in a dedicated flow',
    pitch: 'Urgent patients are handled without being placed in the ordinary OPD queue.',
    bullets: [
      'Emergency patients handled in a dedicated flow',
      'The record is created and linked to the patient',
      "The episode stays part of the patient's journey",
    ],
    expoLine:
      'The doctor and front desk are working from the same patient flow instead of maintaining separate views.',
    icon: 'Siren',
    accent: CORAL.a,
    accent2: CORAL.l,
  },
  {
    id: 'beds',
    label: 'IPD — Bed Management',
    title: 'Know where every patient is',
    pitch: 'Bed occupancy and patient placement, visible across wards.',
    bullets: [
      'See bed occupancy and placement across wards',
      'Patient placed in a bed at admission',
      "Ward transfers reflected in the patient's stay",
    ],
    expoLine:
      'The inpatient stay is managed as one connected journey rather than separate ward, surgery and discharge records.',
    icon: 'Bed',
    accent: VIOLET.a,
    accent2: VIOLET.l,
  },
  {
    id: 'vitals',
    label: 'IPD — Nursing',
    title: 'Vitals and nursing notes on the stay',
    pitch: 'Nursing information stays linked to the admission and visible to the doctor.',
    bullets: [
      'Vitals and nursing information linked to the stay',
      'Observations recorded against the admission',
      'Part of the inpatient picture the doctor sees',
    ],
    expoLine:
      'The inpatient stay is managed as one connected journey rather than separate ward, surgery and discharge records.',
    icon: 'Heartbeat',
    accent: INDIGO.a,
    accent2: INDIGO.l,
  },
  {
    id: 'ot',
    label: 'Operation Theatre',
    title: 'Theatre movement, with the rest of the stay',
    pitch: 'Surgery scheduling and theatre movement sit alongside the inpatient journey.',
    bullets: [
      'Manage transfers and operation-theatre movement',
      'Surgery scheduling within the same platform',
      "Theatre activity linked to the patient's admission",
    ],
    expoLine:
      'The inpatient stay is managed as one connected journey rather than separate ward, surgery and discharge records.',
    icon: 'FirstAidKit',
    accent: VIOLET.a,
    accent2: VIOLET.l,
  },
  {
    id: 'discharge',
    label: 'Discharge',
    title: 'Discharge built into the journey',
    pitch: 'Discharge information stays in the patient record, ready for the next visit.',
    bullets: [
      'Discharge information kept within the patient record',
      'AI can assist with discharge documentation',
      'Available to the doctor when the patient returns',
    ],
    expoLine:
      'The inpatient stay is managed as one connected journey rather than separate ward, surgery and discharge records.',
    icon: 'SignOut',
    accent: TEAL.a,
    accent2: TEAL.l,
  },
  {
    id: 'pharmacy-rx',
    label: 'Pharmacy',
    title: 'Dispensed from the prescription',
    pitch: "Pharmacy works from the doctor's prescription, in the same system.",
    bullets: [
      "Medicines dispensed against the patient's prescription",
      'The pharmacy team works from the linked prescription',
      'Dispensing stays connected to the patient record',
    ],
    expoLine:
      'The doctor gets the clinical context, pharmacy and lab information around the same patient rather than three disconnected workflows.',
    icon: 'Pill',
    accent: BLUE.a,
    accent2: BLUE.l,
  },
  {
    id: 'pharmacy-inv',
    label: 'Pharmacy Inventory',
    title: 'Inventory and expiry visibility',
    pitch: 'The pharmacy team sees hospital inventory in the same system it dispenses from.',
    bullets: [
      'Hospital inventory visibility for the pharmacy team',
      'Expiry visibility as part of inventory',
      'Sits alongside the dispensing workflow',
    ],
    expoLine:
      'The doctor gets the clinical context, pharmacy and lab information around the same patient rather than three disconnected workflows.',
    icon: 'Package',
    accent: CORAL.a,
    accent2: CORAL.l,
  },
  {
    id: 'lab-orders',
    label: 'Laboratory',
    title: 'Lab orders from the consultation',
    pitch: 'A test ordered during a visit reaches the lab without a separate paper process.',
    bullets: [
      'Lab orders stay linked to the patient record',
      'Orders raised in the context of the visit',
      'The laboratory team works from the same system',
    ],
    expoLine:
      'The doctor gets the clinical context, pharmacy and lab information around the same patient rather than three disconnected workflows.',
    icon: 'TestTube',
    accent: TEAL.a,
    accent2: TEAL.l,
  },
  {
    id: 'lab-reports',
    label: 'Laboratory',
    title: 'Results back in the patient context',
    pitch: 'Doctors review diagnostic information alongside the rest of the clinical picture.',
    bullets: [
      'Lab reports stay linked to the patient record',
      'Diagnostic information viewed in the same patient context',
      'Results sit with the order they came from',
    ],
    expoLine:
      'The doctor gets the clinical context, pharmacy and lab information around the same patient rather than three disconnected workflows.',
    icon: 'Flask',
    accent: TEAL.a,
    accent2: TEAL.l,
  },
  {
    id: 'journey',
    label: 'Care Pathways',
    title: 'The clinical picture in one place',
    pitch:
      'Complaints, vitals, investigations, diagnoses and treatment plans, structured as one journey.',
    bullets: [
      'A more complete clinical picture in one place',
      'Department-specific care journeys structured consistently',
      'Previous visits available without switching systems',
    ],
    expoLine:
      'For a doctor, this is about seeing the patient journey as a whole instead of opening disconnected visits one by one.',
    icon: 'Path',
    accent: PINE.a,
    accent2: PINE.l,
  },
  {
    id: 'ai-summary',
    label: 'AI in Sahai',
    title: 'AI inside the workflow, not beside it',
    pitch: 'AI assistance sits in the patient workflow rather than being another standalone tool.',
    bullets: [
      'Ask questions in the context of the patient record',
      'Generate patient and clinical summaries',
      'Assist with discharge-related documentation',
      'Assist with prescription-related work',
    ],
    expoLine:
      'The AI is useful because it sits alongside the patient and hospital workflow instead of asking the doctor to use a separate AI product.',
    icon: 'Sparkle',
    accent: VIOLET.a,
    accent2: VIOLET.l,
  },
  {
    id: 'appointments',
    label: 'Appointments',
    title: 'Every appointment type, one schedule',
    pitch: 'In-person, follow-up, walk-in and video consultations managed together.',
    bullets: [
      "Appointments follow the doctor's configured availability",
      'In-person, follow-up, walk-in and video managed together',
      "Connected to the patient's record",
    ],
    expoLine:
      'The hospital does not have to push the patient into a completely separate meeting tool for a video consultation.',
    icon: 'CalendarCheck',
    accent: INDIGO.a,
    accent2: INDIGO.l,
  },
  {
    id: 'video',
    label: 'Video Consultation',
    title: 'Video consults stay in the platform',
    pitch: 'Patients join through a link, without installing another app.',
    bullets: [
      'Patients join a video consultation through a link',
      'Chat and file sharing alongside the consultation',
      'The consultation stays connected to the patient record',
    ],
    expoLine:
      'The hospital does not have to push the patient into a completely separate meeting tool for a video consultation.',
    icon: 'VideoCamera',
    accent: INDIGO.a,
    accent2: INDIGO.l,
  },
  {
    id: 'billing',
    label: 'Billing',
    title: 'One bill across every service',
    pitch: 'Charges from consultation, IPD, pharmacy and lab come into one patient billing flow.',
    bullets: [
      'Combine charges from multiple hospital services',
      'Support common payment modes and online payment',
      'Billing connected to the services delivered',
    ],
    expoLine:
      'Billing follows the patient journey instead of being maintained separately from the services the hospital has delivered.',
    icon: 'Receipt',
    accent: VIOLET.a,
    accent2: VIOLET.l,
  },
  {
    id: 'dues',
    label: 'Collections & Dues',
    title: 'Collections and dues in one view',
    pitch: 'A consolidated view of invoices, collections, refunds and outstanding dues.',
    bullets: [
      'Track pending dues and collected revenue',
      'Invoices, collections and refunds in one view',
      'Based on services already recorded in the system',
    ],
    expoLine:
      'Billing follows the patient journey instead of being maintained separately from the services the hospital has delivered.',
    icon: 'CurrencyInr',
    accent: CORAL.a,
    accent2: CORAL.l,
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    title: 'Management visibility from your own data',
    pitch: 'Patient activity, revenue, doctor utilisation and OPD/IPD mix, from hospital data.',
    bullets: [
      'See patient activity across major care areas',
      'Track revenue trends, collections and outstanding dues',
      'Review doctor utilisation and patient mix',
      'Export reports when they need to be circulated',
    ],
    expoLine:
      "Management gets a live view from the hospital's own operational data instead of waiting for separate manual reporting.",
    icon: 'ChartLineUp',
    accent: BLUE.a,
    accent2: BLUE.l,
  },
  {
    id: 'roles',
    label: 'Staff & Roles',
    title: 'The right workspace for every role',
    pitch: 'Each team gets the workspace relevant to its job, on one connected platform.',
    bullets: [
      'Doctors see the clinical workspace relevant to them',
      'Reception, nursing, pharmacy and lab in their own areas',
      'The hospital can apply its own branding',
      'Functions stay connected while access remains role-based',
    ],
    expoLine:
      "It works as the hospital's own connected platform, with the right workspace for each team.",
    icon: 'Buildings',
    accent: ROSE.a,
    accent2: ROSE.l,
  },
];

/** Narrow an arbitrary RPC payload to a known slide id. */
export function isValidSlideId(id: string): id is SlideId {
  return SLIDE_IDS.includes(id as SlideId);
}
