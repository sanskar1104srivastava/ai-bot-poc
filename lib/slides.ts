// The kiosk deck. Sales-led: each slide leads with what the hospital gets, not
// with what the software has. Content still comes from the real mainline feature
// surface (origin/master) via docs/sahai-features.html, so nothing here promises
// something the product cannot do.
//
// No prices, rates or invented metrics: those are configured per hospital, and a
// number a prospect can check and find wrong costs more than it wins.
//
// Keep SLIDE_IDS in sync with the `show_slide` tool's enum in
// backend/src/agent.py — the agent runs in its own container and cannot import
// this file. tests/test_show_slide.py fails if they drift.

export const SLIDE_IDS = [
  'intro',
  'patients',
  'abha',
  'abdm',
  'opd',
  'ipd',
  'pharmacy',
  'journey',
  'billing',
  'video',
  'reports',
  'platform',
] as const;

export type SlideId = (typeof SLIDE_IDS)[number];

/** Phosphor icon name, resolved in content-panel.tsx. */
export type IconName =
  | 'RocketLaunch'
  | 'IdentificationCard'
  | 'IdentificationBadge'
  | 'ShieldCheck'
  | 'UsersThree'
  | 'Bed'
  | 'Pill'
  | 'Path'
  | 'Receipt'
  | 'VideoCamera'
  | 'ChartLineUp'
  | 'Buildings'
  | 'Flask'
  | 'Lightning'
  | 'Heartbeat'
  | 'Sparkle'
  | 'Timer'
  | 'CurrencyInr'
  | 'MapTrifold'
  | 'CheckCircle'
  | 'Stethoscope';

export interface SlidePoint {
  /** The promise, in a few punchy words. */
  headline: string;
  /** One line of substance behind it. */
  detail: string;
  icon: IconName;
}

export interface Slide {
  id: SlideId;
  /** Small uppercase eyebrow. */
  label: string;
  /** Benefit-led, not feature-led. */
  title: string;
  /** The one-line pitch, shown large. */
  pitch: string;
  /** Roughly what the avatar is saying while this is up. */
  speech: string;
  icon: IconName;
  /** Vibrant per-slide accent. Drives gradients, shapes and glows. */
  accent: string;
  /** Second gradient stop, for depth. */
  accent2: string;
  points?: SlidePoint[];
  /** Sequential steps, drawn as a connected rail. */
  flow?: string[];
}

export const SLIDES: Slide[] = [
  {
    id: 'intro',
    label: 'Sahai',
    title: 'The hospital that runs itself',
    pitch: 'One system for every department, ABDM-ready from day one.',
    speech:
      'Sahai ek intelligent hospital management system hai, jo ABDM ke saath poori tarah integrated hai.',
    icon: 'RocketLaunch',
    accent: '#6366f1',
    accent2: '#a855f7',
    points: [
      {
        headline: 'Go live, not pilot',
        detail: 'Implementation, data migration and staff training come with it.',
        icon: 'Lightning',
      },
      {
        headline: 'Built for Indian hospitals',
        detail: 'ABHA, ABDM and Ayushman Bharat are standard, never an add-on.',
        icon: 'ShieldCheck',
      },
      {
        headline: 'Nothing left in a register',
        detail: 'Registration to discharge on one record, one bill, one timeline.',
        icon: 'Sparkle',
      },
    ],
  },
  {
    id: 'patients',
    label: 'Patient Records',
    title: 'Never ask a patient twice',
    pitch: 'One lifetime record, found by a scan instead of a search.',
    speech: 'Har patient ka ek hi record — UHID, QR card, aur poori timeline ek jagah par.',
    icon: 'IdentificationCard',
    accent: '#14b8a6',
    accent2: '#22d3ee',
    points: [
      {
        headline: 'Scan and go',
        detail: 'A QR patient card or ABHA card checks them in — no re-typing.',
        icon: 'IdentificationBadge',
      },
      {
        headline: 'The whole story, one screen',
        detail: 'Visits, admissions, tests, bills and discharges on one timeline.',
        icon: 'Heartbeat',
      },
      {
        headline: 'Consent on record',
        detail: 'Treatment, billing and sharing consent captured and withdrawable.',
        icon: 'ShieldCheck',
      },
    ],
  },
  {
    id: 'abha',
    label: 'ABHA',
    title: 'An ABHA before they reach the doctor',
    pitch: 'Create a health account at your own front desk, in four steps.',
    speech:
      'Mobile number se shuru, Aadhaar se verify, aur patient ka ABHA card ready ho jaata hai.',
    icon: 'IdentificationBadge',
    accent: '#f59e0b',
    accent2: '#fb7185',
    flow: ['Mobile Check', 'Aadhaar Verification', 'ABHA Address', 'ABHA Card'],
  },
  {
    id: 'abdm',
    label: 'Compliance',
    title: 'ABDM-ready, not ABDM-someday',
    pitch: 'Consent and health records exchanged to the national standard.',
    speech:
      'Consent lena, records fetch karna, aur documents wapas ABDM mein bhejna — sab standards ke according.',
    icon: 'ShieldCheck',
    accent: '#0ea5e9',
    accent2: '#6366f1',
    points: [
      {
        headline: 'Consent, handled',
        detail: 'Raise, track and honour withdrawal without leaving the system.',
        icon: 'ShieldCheck',
      },
      {
        headline: 'Records that follow the patient',
        detail: 'Pull history from other providers once consent is granted.',
        icon: 'Path',
      },
      {
        headline: 'Audit-ready by default',
        detail: 'Care-context linking and document push, logged as you go.',
        icon: 'CheckCircle',
      },
    ],
  },
  {
    id: 'opd',
    label: 'OPD & Emergency',
    title: 'The queue everyone can see',
    pitch: 'Front desk and doctors working from one live list.',
    speech:
      'OPD ka live queue — kaun wait kar raha hai, kaun consultation mein hai, sab ek hi screen par.',
    icon: 'UsersThree',
    accent: '#f43f5e',
    accent2: '#f59e0b',
    points: [
      {
        headline: 'No more "who is next?"',
        detail: 'Waiting, in consultation and done, updating live.',
        icon: 'Timer',
      },
      {
        headline: 'Emergencies jump the line',
        detail: 'A separate triage queue with critical cases flagged.',
        icon: 'Heartbeat',
      },
      {
        headline: 'Notes land on the record',
        detail: 'Consultation notes and prescriptions filed as they are written.',
        icon: 'Stethoscope',
      },
    ],
  },
  {
    id: 'ipd',
    label: 'Inpatient',
    title: 'Know every bed, right now',
    pitch: 'Admission to discharge, with occupancy at a glance.',
    speech:
      'Admission se discharge tak, aur live bed board se pata chalta hai kaun sa bed khaali hai.',
    icon: 'Bed',
    accent: '#8b5cf6',
    accent2: '#ec4899',
    points: [
      {
        headline: 'A live bed board',
        detail: 'Occupancy across wards; assign and vacate as patients move.',
        icon: 'Bed',
      },
      {
        headline: 'Theatre on schedule',
        detail: 'Surgery scheduling and transfers into the operation theatre.',
        icon: 'Timer',
      },
      {
        headline: 'Discharge without the scramble',
        detail: 'Summaries and paperwork generated from the stay itself.',
        icon: 'Receipt',
      },
    ],
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy & Lab',
    title: 'Keep the revenue in the building',
    pitch: 'Your own pharmacy and lab, tied to the patient record.',
    speech:
      'Pharmacy aur lab dono system ke andar — dawai aur report seedha patient ke record se judte hain.',
    icon: 'Pill',
    accent: '#10b981',
    accent2: '#84cc16',
    points: [
      {
        headline: 'Stock that warns you',
        detail: 'Inventory per item, with medicines nearing expiry flagged.',
        icon: 'Pill',
      },
      {
        headline: 'Order to report, tracked',
        detail: 'Payment, sample collection and report upload in stages.',
        icon: 'Flask',
      },
      {
        headline: 'Results reach the doctor',
        detail: 'Reports file straight onto the patient documents.',
        icon: 'Stethoscope',
      },
    ],
  },
  {
    id: 'journey',
    label: 'Care Pathways',
    title: 'Care that follows a plan',
    pitch: 'Every department defines its pathway; every patient is tracked on it.',
    speech:
      'Har department apna care pathway banata hai, aur patient us journey ke through track hota hai.',
    icon: 'Path',
    accent: '#d946ef',
    accent2: '#8b5cf6',
    points: [
      {
        headline: 'Your protocol, encoded',
        detail: 'Journey templates per department, built from reusable stages.',
        icon: 'MapTrifold',
      },
      {
        headline: 'One clinical picture',
        detail: 'Complaints, vitals, investigations, diagnoses and treatment plans.',
        icon: 'Heartbeat',
      },
      {
        headline: 'AI writes the summary',
        detail: 'A clinical summary generated from the record itself.',
        icon: 'Sparkle',
      },
    ],
  },
  {
    id: 'billing',
    label: 'Billing',
    title: 'Nothing leaves unbilled',
    pitch: 'Every charge in the hospital lands on one bill.',
    speech: 'Consultation, admission, pharmacy, lab — sab charges ek hi bill par aa jaate hain.',
    icon: 'CurrencyInr',
    accent: '#f97316',
    accent2: '#facc15',
    points: [
      {
        headline: 'Charges capture themselves',
        detail: 'Consultation, stay, pharmacy and lab flow onto the invoice.',
        icon: 'Receipt',
      },
      {
        headline: 'Paid how they prefer',
        detail: 'Razorpay online, plus cash, card, UPI and payment links.',
        icon: 'CurrencyInr',
      },
      {
        headline: 'Dues you can see',
        detail: 'Outstanding tracked against collected, with a full ledger.',
        icon: 'ChartLineUp',
      },
    ],
  },
  {
    id: 'video',
    label: 'Consultations',
    title: 'Consult beyond your catchment',
    pitch: 'Video visits that run inside Sahai — patients just tap a link.',
    speech: 'Video consultation Sahai ke andar hi chalta hai — patient ko sirf ek link chahiye.',
    icon: 'VideoCamera',
    accent: '#06b6d4',
    accent2: '#3b82f6',
    points: [
      {
        headline: 'No app, no account',
        detail: 'The patient joins from a link you send them.',
        icon: 'VideoCamera',
      },
      {
        headline: 'Booked against real availability',
        detail: 'Doctor schedules and slots, in calendar or list view.',
        icon: 'Timer',
      },
      {
        headline: 'Same record, same bill',
        detail: 'Notes, prescriptions and charges behave like any other visit.',
        icon: 'Receipt',
      },
    ],
  },
  {
    id: 'reports',
    label: 'Insight',
    title: 'Run the hospital on live numbers',
    pitch: 'Census and revenue from the system, not from manual returns.',
    speech:
      'Management ko live census aur revenue analytics milte hain, manual reporting ki zaroorat nahi.',
    icon: 'ChartLineUp',
    accent: '#3b82f6',
    accent2: '#06b6d4',
    points: [
      {
        headline: 'A live census',
        detail: 'OPD, emergency, inpatient, ICU and theatre, right now.',
        icon: 'Heartbeat',
      },
      {
        headline: 'Revenue you can trend',
        detail: 'Collections and dues over any period you choose.',
        icon: 'ChartLineUp',
      },
      {
        headline: 'Board-ready in a click',
        detail: 'Doctor utilisation and the OPD-to-IPD mix, exportable to PDF.',
        icon: 'Receipt',
      },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    title: 'Your hospital, your brand',
    pitch: 'Multi-tenant, role-based and white-labelled to your identity.',
    speech:
      'Har hospital apna tenant hai — apni branding, apne roles, aur apni subscription ke saath.',
    icon: 'Buildings',
    accent: '#a855f7',
    accent2: '#6366f1',
    points: [
      {
        headline: 'Everyone sees their own job',
        detail: 'Seven roles, from SuperAdmin to Pathologist, each scoped.',
        icon: 'UsersThree',
      },
      {
        headline: 'It looks like you',
        detail: 'Your logo, colours and letterhead, onto the screen and documents.',
        icon: 'Sparkle',
      },
      {
        headline: 'Start small, grow later',
        detail: 'Subscription per hospital, paid online, sales for the rest.',
        icon: 'Buildings',
      },
    ],
  },
];

export function isValidSlideId(id: string): id is SlideId {
  return SLIDE_IDS.includes(id as SlideId);
}
