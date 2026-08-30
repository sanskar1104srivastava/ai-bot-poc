'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
// The 28 slide illustrations, ported from docs/Interactive Animation Slides.
//
// Sanitised on the way in. The Figma source drew a hospital's real-looking
// numbers — collections, patient counts, vitals, lab values, named drugs with
// doses, doctor names and a customer called "City Hospital". On a kiosk facing
// doctors those read as claims about the product, and the prescriptions read as
// clinical advice, so every displayed value was replaced with a neutral
// placeholder. Geometry (bar widths, coordinates) is untouched, so the
// illustrations look exactly as designed.
//
// Keep this in sync with SLIDE_IDS in lib/slides.ts — VISUALS below is keyed by
// slide id and slide-visuals.test would fail if one is missing.
import type { SlideId } from '@/lib/slides';

const C = {
  bg: '#f0f6fc',
  white: '#ffffff',
  navy: '#0f2b4a',
  navyMid: '#1e4976',
  text: '#1a2a3a',
  muted: '#5a7a96',
  border: 'rgba(26,74,120,0.1)',
};

const BLUE = { a: '#1a6cb5', l: '#d6e9f8' };
const TEAL = { a: '#2a9d8f', l: '#d0f0ec' };
const VIOLET = { a: '#6d4fc2', l: '#ebe4f9' };
const CORAL = { a: '#d4622a', l: '#fae3d6' };
const PINE = { a: '#1e7a5c', l: '#ceeee6' };
const INDIGO = { a: '#3b5fc0', l: '#dce4f8' };
const ROSE = { a: '#b5446e', l: '#f8daea' };

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
      {children}
    </svg>
  );
}

function Card({
  x,
  y,
  w,
  h,
  rx,
  a,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  a: string;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx ?? 8}
        fill={a}
        fillOpacity="0.07"
        stroke={a}
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {children}
    </g>
  );
}

function Label({
  x,
  y,
  text,
  size = 7.5,
  weight = 'normal',
  fill = C.text,
  anchor = 'start',
  family = 'Outfit',
}: {
  x: number;
  y: number;
  text: string;
  size?: number;
  weight?: string;
  fill?: string;
  anchor?: string;
  family?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor as 'start'}
      style={{ fontFamily: `'${family}',${family === 'Roboto Slab' ? 'serif' : 'sans-serif'}` }}
    >
      {text}
    </text>
  );
}

function IHub({ a }: { a: string }) {
  const nodes = [
    { label: 'Clinical', ang: -90 },
    { label: 'ABDM', ang: -18 },
    { label: 'Billing', ang: 54 },
    { label: 'AI', ang: 126 },
    { label: 'Ops', ang: 198 },
  ];
  return (
    <Svg>
      <circle
        cx="100"
        cy="100"
        r="22"
        fill={a}
        className="opacity-0-init anim-scale-in delay-100"
      />
      <Label
        x={100}
        y={104}
        text="SAHAI"
        size={10}
        weight="700"
        fill="white"
        anchor="middle"
        family="Roboto Slab"
      />
      {nodes.map(({ label, ang }, i) => {
        const r = 68,
          rad = (ang * Math.PI) / 180;
        const nx = 100 + r * Math.cos(rad),
          ny = 100 + r * Math.sin(rad);
        return (
          <g
            key={label}
            className="opacity-0-init anim-scale-in"
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <line
              x1="100"
              y1="100"
              x2={nx}
              y2={ny}
              stroke={a}
              strokeWidth="1.2"
              strokeOpacity="0.25"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{ animation: `drawLine 0.6s ${0.15 + i * 0.09}s ease forwards` }}
            />
            <circle
              cx={nx}
              cy={ny}
              r="17"
              fill={a}
              fillOpacity="0.1"
              stroke={a}
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <Label x={nx} y={ny + 4} text={label} size={7} fill={a} anchor="middle" />
          </g>
        );
      })}
      <circle
        cx="100"
        cy="100"
        r="86"
        stroke={a}
        strokeWidth="1"
        strokeOpacity="0.1"
        strokeDasharray="4 6"
        fill="none"
        className="opacity-0-init anim-scale-in delay-200"
      />
    </Svg>
  );
}

// 2 · Connected platform: 3 pillars
function IPillars({ a }: { a: string }) {
  const cols = [
    { label: 'Patient Care', sub: 'Clinical workflows', icon: '🏥', h: 100 },
    { label: 'Operations', sub: 'Admin & billing', icon: '⚙️', h: 80 },
    { label: 'Digital Health', sub: 'ABDM & ABHA', icon: '🔗', h: 120 },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={18}
        text="One Platform. Three Pillars."
        size={8}
        weight="600"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {cols.map(({ label, sub, icon, h }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + i * 0.15}s` }}
        >
          <rect
            x={20 + i * 62}
            y={170 - h}
            width="52"
            height={h}
            rx="8"
            fill={a}
            fillOpacity={0.08 + i * 0.04}
            stroke={a}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x={46 + i * 62} y={178 - h + 22} textAnchor="middle" fontSize={16}>
            {icon}
          </text>
          <Label
            x={46 + i * 62}
            y={178 - h + 38}
            text={label}
            size={7}
            weight="600"
            fill={a}
            anchor="middle"
          />
          <Label
            x={46 + i * 62}
            y={178 - h + 50}
            text={sub}
            size={6}
            fill={C.muted}
            anchor="middle"
          />
        </g>
      ))}
      <line
        x1="20"
        y1="172"
        x2="180"
        y2="172"
        stroke={a}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 0.8s 0.6s ease forwards' }}
      />
      <rect
        x="60"
        y="178"
        width="80"
        height="14"
        rx="5"
        fill={a}
        className="opacity-0-init anim-scale-in delay-600"
      />
      <Label
        x={100}
        y={188}
        text="Connected by Design"
        size={7}
        weight="700"
        fill="white"
        anchor="middle"
      />
    </Svg>
  );
}

// 3 · Patient search
function ISearch({ a }: { a: string }) {
  return (
    <Svg>
      {/* Search bar */}
      <rect
        x="20"
        y="30"
        width="160"
        height="28"
        rx="14"
        fill="white"
        stroke={a}
        strokeWidth="1.5"
        className="opacity-0-init anim-scale-in"
      />
      <circle
        cx="40"
        cy="44"
        r="8"
        stroke={a}
        strokeWidth="1.5"
        fill="none"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <line
        x1="46"
        y1="50"
        x2="51"
        y2="55"
        stroke={a}
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <rect
        x="57"
        y="40"
        width="90"
        height="8"
        rx="4"
        fill={a}
        fillOpacity="0.15"
        className="opacity-0-init anim-fade-left delay-200"
      />

      {/* Result cards */}
      {[
        { name: 'Rajesh Kumar', id: 'ABHA·2048·0001', age: '52 M', tag: 'Returning' },
        { name: 'Anita Sharma', id: 'ABHA·3210·0047', age: '38 F', tag: 'New' },
        { name: 'Suresh Nair', id: 'ABHA·1190·0823', age: '61 M', tag: 'Returning' },
      ].map(({ name, id, age, tag }, i) => (
        <g
          key={name}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.3 + i * 0.14}s` }}
        >
          <rect
            x="20"
            y={72 + i * 38}
            width="160"
            height="32"
            rx="8"
            fill={i === 0 ? a : 'white'}
            fillOpacity={i === 0 ? 0.08 : 1}
            stroke={i === 0 ? a : C.border}
            strokeWidth={i === 0 ? 1.2 : 0.8}
          />
          <circle cx="38" cy={88 + i * 38} r="10" fill={a} fillOpacity={i === 0 ? 0.3 : 0.12} />
          <Label
            x={38}
            y={92 + i * 38}
            text={name[0]}
            size={9}
            weight="700"
            fill={a}
            anchor="middle"
          />
          <Label x={53} y={85 + i * 38} text={name} size={8} weight="600" fill={C.text} />
          <Label x={53} y={96 + i * 38} text={id} size={6.5} fill={C.muted} />
          <Label x={168} y={85 + i * 38} text={age} size={7} fill={a} anchor="end" />
          <rect
            x="130"
            y={89 + i * 38}
            width={tag === 'New' ? 26 : 44}
            height="10"
            rx="3"
            fill={tag === 'New' ? TEAL.a : a}
            fillOpacity="0.15"
          />
          <Label
            x={143}
            y={97 + i * 38}
            text={tag}
            size={6.5}
            fill={tag === 'New' ? TEAL.a : a}
            anchor="middle"
          />
        </g>
      ))}
    </Svg>
  );
}

// 4 · Patient timeline
function ITimeline({ a }: { a: string }) {
  const events = [
    { label: 'Registration', date: '', color: a },
    { label: 'OPD Visit', date: '', color: TEAL.a },
    { label: 'Lab Reports', date: '', color: VIOLET.a },
    { label: 'Prescription', date: '', color: CORAL.a },
    { label: 'Discharge', date: '', color: PINE.a },
  ];
  return (
    <Svg>
      <line
        x1="50"
        y1="22"
        x2="50"
        y2="185"
        stroke={a}
        strokeWidth="2"
        strokeOpacity="0.2"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 1s 0.2s ease forwards' }}
      />
      {events.map(({ label, date, color }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.25 + i * 0.13}s` }}
        >
          <circle cx="50" cy={30 + i * 34} r="7" fill={color} />
          <rect
            x="66"
            y={22 + i * 34}
            width="106"
            height="22"
            rx="5"
            fill={color}
            fillOpacity="0.08"
            stroke={color}
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
          <Label x={74} y={31 + i * 34} text={label} size={8} weight="600" fill={C.text} />
          <Label x={74} y={41 + i * 34} text={date} size={6.5} fill={C.muted} />
        </g>
      ))}
    </Svg>
  );
}

// 5 · Documents linked
function IDocs({ a }: { a: string }) {
  const docs = [
    { icon: '📋', label: 'Discharge Summary', type: 'Clinical' },
    { icon: '🧪', label: 'Lab Report · CBC', type: 'Diagnostic' },
    { icon: '💊', label: 'Prescription', type: 'Medication' },
    { icon: '🗂️', label: 'Consent Form', type: 'Admin' },
    { icon: '📊', label: 'Vitals Chart', type: 'Nursing' },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={18}
        text="Patient Documents"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {docs.map(({ icon, label, type }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + i * 0.12}s` }}
        >
          <rect
            x="18"
            y={26 + i * 34}
            width="164"
            height="28"
            rx="7"
            fill="white"
            stroke={a}
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
          <text x={30} y={44 + i * 34} fontSize={14}>
            {icon}
          </text>
          <Label x={50} y={37 + i * 34} text={label} size={8} weight="600" fill={C.text} />
          <rect x="118" y={30 + i * 34} width={54} height="12" rx="4" fill={a} fillOpacity="0.1" />
          <Label x={145} y={39 + i * 34} text={type} size={6.5} fill={a} anchor="middle" />
        </g>
      ))}
    </Svg>
  );
}

// 6 · ABHA create
function IAbhaCreate({ a }: { a: string }) {
  return (
    <Svg>
      {/* Registration form */}
      <rect
        x="18"
        y="18"
        width="164"
        height="110"
        rx="10"
        fill="white"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in"
      />
      <rect
        x="18"
        y="18"
        width="164"
        height="22"
        rx="10"
        fill={a}
        fillOpacity="0.12"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <rect x="18" y="31" width="164" height="9" fill={a} fillOpacity="0.12" />
      <Label
        x={100}
        y={32}
        text="Patient Registration"
        size={8}
        weight="700"
        fill={a}
        anchor="middle"
      />
      {[
        ['Name', 'Rajesh Kumar'],
        ['Mobile', '98xxxxxxxx'],
        ['DOB', '14 / 03 / 1972'],
      ].map(([lbl, val], i) => (
        <g
          key={lbl}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.2 + i * 0.12}s` }}
        >
          <Label x={28} y={55 + i * 22} text={lbl} size={6.5} fill={C.muted} />
          <rect x="28" y={58 + i * 22} width="144" height="12" rx="4" fill={a} fillOpacity="0.07" />
          <Label x={34} y={67 + i * 22} text={val} size={7.5} weight="500" fill={C.text} />
        </g>
      ))}

      {/* ABHA generated */}
      <rect
        x="18"
        y="140"
        width="164"
        height="52"
        rx="10"
        fill={a}
        fillOpacity="0.08"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in delay-500"
      />
      <Label x={28} y={158} text="ABHA Created ✓" size={9} weight="700" fill={a} />
      <Label x={28} y={172} text="91-3472-8104-5531" size={9} fill={C.text} />
      <Label x={28} y={184} text="Linked to patient record" size={7} fill={C.muted} />
      <circle
        cx="173"
        cy={158}
        r="10"
        fill={a}
        className="opacity-0-init anim-scale-in delay-600"
      />
      <path
        d="M167 158 L171 162 L179 154"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0-init anim-fade-up delay-700"
      />
    </Svg>
  );
}

// 7 · ABHA identify
function IAbhaId({ a }: { a: string }) {
  return (
    <Svg>
      <Label
        x={100}
        y={18}
        text="Identify Existing ABHA"
        size={8}
        weight="600"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {/* Scan modes */}
      {[
        { icon: '📱', label: 'Scan QR Code', sub: 'From PHR app' },
        { icon: '🔢', label: 'Enter ABHA Number', sub: '14-digit ID' },
        { icon: '📲', label: 'Mobile OTP', sub: 'Linked number' },
      ].map(({ icon, label, sub }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.2 + i * 0.14}s` }}
        >
          <rect
            x="20"
            y={30 + i * 50}
            width="160"
            height="40"
            rx="9"
            fill={i === 0 ? a : 'white'}
            fillOpacity={i === 0 ? 0.1 : 1}
            stroke={i === 0 ? a : C.border}
            strokeWidth={i === 0 ? 1.3 : 0.8}
          />
          <text x={42} y={56 + i * 50} fontSize={16}>
            {icon}
          </text>
          <Label
            x={60}
            y={47 + i * 50}
            text={label}
            size={8.5}
            weight="600"
            fill={i === 0 ? a : C.text}
          />
          <Label x={60} y={59 + i * 50} text={sub} size={7} fill={C.muted} />
        </g>
      ))}
      {/* Result */}
      <rect
        x="20"
        y="182"
        width="160"
        height="14"
        rx="5"
        fill={a}
        fillOpacity="0.12"
        className="opacity-0-init anim-fade-up delay-600"
      />
      <Label
        x={100}
        y={192}
        text="ABHA linked · No duplicate record created"
        size={6.8}
        fill={a}
        anchor="middle"
      />
    </Svg>
  );
}

// 8 · ABDM consent
function IConsent({ a }: { a: string }) {
  return (
    <Svg>
      {/* Shield */}
      <path
        d="M100 22 L138 38 L138 78 Q138 110 100 128 Q62 110 62 78 L62 38 Z"
        fill={a}
        fillOpacity="0.08"
        stroke={a}
        strokeWidth="1.5"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 1.2s 0.3s ease forwards' }}
      />
      <path
        d="M84 76 L95 87 L118 64"
        stroke={a}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0-init anim-fade-up delay-600"
      />
      <Label
        x={100}
        y={104}
        text="Consent Granted"
        size={7.5}
        weight="700"
        fill={a}
        anchor="middle"
      />

      {/* Consent details */}
      {[
        { label: 'Requested by', val: 'Requesting hospital' },
        { label: 'Record type', val: 'Discharge Summary' },
        { label: 'Valid until', val: 'As granted' },
        { label: 'Status', val: '✓ Approved' },
      ].map(({ label, val }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.5 + i * 0.1}s` }}
        >
          <Label x={22} y={140 + i * 16} text={label} size={7} fill={C.muted} />
          <Label
            x={178}
            y={140 + i * 16}
            text={val}
            size={7}
            weight="600"
            fill={i === 3 ? PINE.a : C.text}
            anchor="end"
          />
        </g>
      ))}
    </Svg>
  );
}

// 9 · ABDM record exchange
function IExchange({ a }: { a: string }) {
  return (
    <Svg>
      {/* Two hospital nodes */}
      <rect
        x="14"
        y="72"
        width="56"
        height="56"
        rx="10"
        fill={a}
        fillOpacity="0.1"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in"
      />
      <text x={42} y={100} textAnchor="middle" fontSize={22}>
        🏥
      </text>
      <Label x={42} y={116} text="Sahai" size={7} weight="700" fill={a} anchor="middle" />
      <Label x={42} y={126} text="Hospital" size={6.5} fill={C.muted} anchor="middle" />

      <rect
        x="130"
        y="72"
        width="56"
        height="56"
        rx="10"
        fill={TEAL.a}
        fillOpacity="0.1"
        stroke={TEAL.a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in delay-200"
      />
      <text x={158} y={100} textAnchor="middle" fontSize={22}>
        🏥
      </text>
      <Label x={158} y={116} text="Provider" size={7} weight="700" fill={TEAL.a} anchor="middle" />
      <Label x={158} y={126} text="ABDM linked" size={6.5} fill={C.muted} anchor="middle" />

      {/* ABDM cloud */}
      <ellipse
        cx="100"
        cy="100"
        rx="20"
        ry="14"
        fill={INDIGO.a}
        className="opacity-0-init anim-scale-in delay-300"
      />
      <Label x={100} y={104} text="ABDM" size={7.5} weight="700" fill="white" anchor="middle" />

      {/* Arrows */}
      {[
        [70, 97, 80, 97],
        [80, 103, 70, 103],
        [130, 97, 120, 97],
        [120, 103, 130, 103],
      ].map(([x1, y1, x2, y2], i) => (
        <g
          key={i}
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.4 + i * 0.1}s` }}
        >
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i < 2 ? a : TEAL.a}
            strokeWidth="1.8"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{ animation: `drawLine 0.4s ${0.4 + i * 0.08}s ease forwards` }}
          />
          <polygon
            points={`${x2},${y2 - 3} ${x2},${y2 + 3} ${x2 + (i % 2 === 0 ? -4 : 4)},${y2}`}
            fill={i < 2 ? a : TEAL.a}
          />
        </g>
      ))}

      {/* Record types */}
      {['Discharge Summary', 'Lab Reports', 'Prescriptions'].map((r, i) => (
        <g
          key={r}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.6 + i * 0.1}s` }}
        >
          <rect
            x={34 + i * 50}
            y="148"
            width="44"
            height="32"
            rx="6"
            fill={[a, TEAL.a, VIOLET.a][i]}
            fillOpacity="0.08"
            stroke={[a, TEAL.a, VIOLET.a][i]}
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
          <Label x={56 + i * 50} y={161} text={['📋', '🧪', '💊'][i]} size={10} anchor="middle" />
          <Label
            x={56 + i * 50}
            y={174}
            text={r.split(' ')[0]}
            size={6}
            fill={[a, TEAL.a, VIOLET.a][i]}
            anchor="middle"
          />
        </g>
      ))}
    </Svg>
  );
}

// 10 · OPD queue
function IQueue({ a }: { a: string }) {
  const patients = [
    { token: 'A·14', name: 'Kavita Singh', status: 'Waiting', wait: '8 min', color: CORAL.a },
    { token: 'A·13', name: 'Mohan Das', status: 'In Consult', wait: 'Now', color: a },
    { token: 'A·12', name: 'Priya Iyer', status: 'Done', wait: '—', color: PINE.a },
  ];
  return (
    <Svg>
      <rect
        x="18"
        y="14"
        width="164"
        height="18"
        rx="6"
        fill={a}
        className="opacity-0-init anim-scale-in"
      />
      <Label x={100} y={27} text="OPD Queue" size={7.5} weight="700" fill="white" anchor="middle" />
      {patients.map(({ token, name, status, wait, color }, i) => (
        <g
          key={token}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + i * 0.15}s` }}
        >
          <rect
            x="18"
            y={40 + i * 46}
            width="164"
            height="38"
            rx="8"
            fill={color}
            fillOpacity="0.07"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <rect
            x="26"
            y={50 + i * 46}
            width="28"
            height="16"
            rx="4"
            fill={color}
            fillOpacity="0.2"
          />
          <Label
            x={40}
            y={61 + i * 46}
            text={token}
            size={7.5}
            weight="700"
            fill={color}
            anchor="middle"
          />
          <Label x={60} y={53 + i * 46} text={name} size={8.5} weight="600" fill={C.text} />
          <Label x={60} y={66 + i * 46} text={`Wait: ${wait}`} size={7} fill={C.muted} />
          <rect
            x="126"
            y={50 + i * 46}
            width="46"
            height="14"
            rx="4"
            fill={color}
            fillOpacity="0.15"
          />
          <Label x={149} y={60 + i * 46} text={status} size={7} fill={color} anchor="middle" />
        </g>
      ))}
      <rect
        x="18"
        y="184"
        width="164"
        height="12"
        rx="4"
        fill={a}
        fillOpacity="0.08"
        className="opacity-0-init anim-fade-up delay-600"
      />
      <Label
        x={100}
        y={193}
        text="Doctor and front desk — same live view"
        size={7}
        fill={a}
        anchor="middle"
      />
    </Svg>
  );
}

// 11 · Consultation notes
function IConsultNotes({ a }: { a: string }) {
  return (
    <Svg>
      <rect
        x="18"
        y="14"
        width="164"
        height="178"
        rx="10"
        fill="white"
        stroke={a}
        strokeWidth="1"
        className="opacity-0-init anim-scale-in"
      />
      <rect
        x="18"
        y="14"
        width="164"
        height="20"
        rx="10"
        fill={a}
        fillOpacity="0.12"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <rect x="18" y="25" width="164" height="9" fill={a} fillOpacity="0.12" />
      <Label
        x={100}
        y={28}
        text="Consultation · Rajesh Kumar · A·13"
        size={7.5}
        weight="700"
        fill={a}
        anchor="middle"
      />

      {[
        { section: 'Chief Complaint', val: 'Recorded at the visit' },
        { section: 'Vitals', val: 'Recorded at the visit' },
        { section: 'Diagnosis', val: "Doctor's assessment" },
        { section: 'Plan', val: 'Treatment plan and follow-up' },
      ].map(({ section, val }, i) => (
        <g
          key={section}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.25 + i * 0.14}s` }}
        >
          <Label x={26} y={52 + i * 36} text={section} size={6.5} fill={C.muted} />
          <rect x="26" y={55 + i * 36} width="148" height="16" rx="4" fill={a} fillOpacity="0.05" />
          <Label x={32} y={66 + i * 36} text={val} size={7.5} weight="500" fill={C.text} />
        </g>
      ))}

      {/* Rx strip */}
      <rect
        x="18"
        y="170"
        width="164"
        height="22"
        rx="8"
        fill={TEAL.a}
        fillOpacity="0.1"
        className="opacity-0-init anim-fade-up delay-700"
      />
      <Label
        x={100}
        y={185}
        text="Prescription attached to this visit record"
        size={7}
        fill={TEAL.a}
        anchor="middle"
      />
    </Svg>
  );
}

// 12 · Emergency
function IEmergency({ a }: { a: string }) {
  return (
    <Svg>
      <circle
        cx="100"
        cy="52"
        r="32"
        fill={a}
        fillOpacity="0.1"
        stroke={a}
        strokeWidth="1.5"
        className="opacity-0-init anim-scale-in"
      />
      <text x="100" y="60" textAnchor="middle" fontSize={28}>
        🚨
      </text>
      <Label
        x={100}
        y={96}
        text="Emergency Flow"
        size={10}
        weight="700"
        fill={a}
        anchor="middle"
        family="Roboto Slab"
      />

      {[
        { step: '01', label: 'Triage', sub: 'Immediate assessment' },
        { step: '02', label: 'Dedicated queue', sub: 'Separate from OPD' },
        { step: '03', label: 'Record created', sub: 'Linked to patient' },
        { step: '04', label: 'Escalate to IPD', sub: 'One-click admission' },
      ].map(({ step, label, sub }, i) => (
        <g
          key={step}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.3 + i * 0.12}s` }}
        >
          <rect
            x="20"
            y={108 + i * 22}
            width="160"
            height="18"
            rx="5"
            fill={i === 0 ? a : 'white'}
            fillOpacity={i === 0 ? 0.12 : 1}
            stroke={i === 0 ? a : C.border}
            strokeWidth={i === 0 ? 1 : 0.7}
          />
          <rect x="26" y={112 + i * 22} width="18" height="10" rx="3" fill={a} fillOpacity="0.2" />
          <Label
            x={35}
            y={120 + i * 22}
            text={step}
            size={6.5}
            weight="700"
            fill={a}
            anchor="middle"
          />
          <Label x={50} y={120 + i * 22} text={label} size={8} weight="600" fill={C.text} />
          <Label x={168} y={120 + i * 22} text={sub} size={6.5} fill={C.muted} anchor="end" />
        </g>
      ))}
    </Svg>
  );
}

// 13 · Bed management
function IBeds({ a }: { a: string }) {
  const wards = [
    { name: 'General Ward', beds: [1, 1, 1, 0, 1, 1, 0, 1], color: a },
    { name: 'Cardiology', beds: [1, 0, 1, 1], color: CORAL.a },
    { name: 'ICU', beds: [1, 1, 0], color: VIOLET.a },
    { name: 'Orthopaedics', beds: [1, 1, 0, 1, 0, 1], color: TEAL.a },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Ward Bed Occupancy"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {wards.map(({ name, beds, color }, wi) => (
        <g
          key={name}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + wi * 0.12}s` }}
        >
          <Label x={18} y={33 + wi * 44} text={name} size={7} fill={C.muted} />
          {beds.map((occ, bi) => (
            <g
              key={bi}
              className="opacity-0-init anim-scale-in"
              style={{ animationDelay: `${0.3 + wi * 0.12 + bi * 0.05}s` }}
            >
              <rect
                x={18 + bi * 20}
                y={37 + wi * 44}
                width="16"
                height="26"
                rx="4"
                fill={occ ? color : 'rgba(90,122,150,0.08)'}
                fillOpacity={occ ? 0.25 : 1}
                stroke={occ ? color : C.border}
                strokeWidth={occ ? 1.2 : 0.7}
              />
              {occ === 1 && (
                <>
                  <rect
                    x={21 + bi * 20}
                    y={41 + wi * 44}
                    width="10"
                    height="8"
                    rx="2"
                    fill={color}
                    fillOpacity="0.45"
                  />
                  <circle cx={28 + bi * 20} cy={42 + wi * 44} r="3" fill={color} />
                </>
              )}
            </g>
          ))}
          <Label
            x={18 + beds.length * 20 + 4}
            y={52 + wi * 44}
            text={`${beds.filter(Boolean).length}/${beds.length}`}
            size={7.5}
            weight="700"
            fill={color}
          />
        </g>
      ))}
    </Svg>
  );
}

// 14 · Vitals & nursing
function IVitals({ a }: { a: string }) {
  const vitals = [
    { label: 'Blood Pressure', val: '—', unit: 'mmHg', trend: '↑', flag: true },
    { label: 'Heart Rate', val: '—', unit: 'bpm', trend: '→', flag: false },
    { label: 'Temperature', val: '—', unit: '°F', trend: '→', flag: false },
    { label: 'SpO₂', val: '—', unit: '%', trend: '↓', flag: false },
  ];
  const hrData = [78, 82, 80, 86, 84, 82, 85];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Vitals & Nursing Record"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {/* Mini chart */}
      <rect
        x="18"
        y="22"
        width="164"
        height="46"
        rx="7"
        fill={a}
        fillOpacity="0.05"
        stroke={a}
        strokeWidth="0.8"
        strokeOpacity="0.2"
        className="opacity-0-init anim-scale-in delay-100"
      />
      {hrData.map((v, i) => {
        const bh = ((v - 74) / 14) * 30;
        return (
          <rect
            key={i}
            x={26 + i * 21}
            y={62 - bh}
            width="14"
            height={bh}
            rx="2"
            fill={a}
            fillOpacity={0.2 + i * 0.04}
            className="opacity-0-init"
            style={{ animation: `fadeSlideUp 0.4s ${0.2 + i * 0.06}s ease forwards` }}
          />
        );
      })}
      <Label
        x={100}
        y={73}
        text="Heart rate — last 7 readings"
        size={6}
        fill={C.muted}
        anchor="middle"
      />

      {vitals.map(({ label, val, unit, trend, flag }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.35 + i * 0.12}s` }}
        >
          <rect
            x="18"
            y={78 + i * 28}
            width="164"
            height="22"
            rx="6"
            fill={flag ? CORAL.a : a}
            fillOpacity="0.05"
            stroke={flag ? CORAL.a : a}
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />
          <Label x={26} y={92 + i * 28} text={label} size={7} fill={C.muted} />
          <Label
            x={168}
            y={92 + i * 28}
            text={`${val} ${unit} ${trend}`}
            size={8}
            weight="700"
            fill={flag ? CORAL.a : a}
            anchor="end"
          />
        </g>
      ))}
    </Svg>
  );
}

// 15 · OT scheduling
function IOT({ a }: { a: string }) {
  const procs = [
    {
      time: '08:30',
      patient: 'Suresh Nair',
      proc: 'Appendectomy',
      ot: 'OT-1',
      status: 'In Progress',
    },
    {
      time: '11:00',
      patient: 'Anita Desai',
      proc: 'Cataract (L)',
      ot: 'OT-2',
      status: 'Scheduled',
    },
    {
      time: '14:00',
      patient: 'Mohan Pillai',
      proc: 'Knee Replacement',
      ot: 'OT-1',
      status: 'Scheduled',
    },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Operation Theatre Schedule"
        size={8.5}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {procs.map(({ time, patient, proc, ot, status }, i) => (
        <g
          key={time}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + i * 0.15}s` }}
        >
          <rect
            x="18"
            y={24 + i * 56}
            width="164"
            height="48"
            rx="9"
            fill={i === 0 ? a : 'white'}
            fillOpacity={i === 0 ? 0.08 : 1}
            stroke={i === 0 ? a : C.border}
            strokeWidth={i === 0 ? 1.3 : 0.8}
          />
          <rect x="26" y={30 + i * 56} width="28" height="14" rx="4" fill={a} fillOpacity="0.2" />
          <Label
            x={40}
            y={40 + i * 56}
            text={time}
            size={7.5}
            weight="700"
            fill={a}
            anchor="middle"
          />
          <Label x={60} y={37 + i * 56} text={patient} size={8.5} weight="600" fill={C.text} />
          <Label x={60} y={49 + i * 56} text={proc} size={7} fill={C.muted} />
          <rect
            x="60"
            y={55 + i * 56}
            width="24"
            height="10"
            rx="3"
            fill={VIOLET.a}
            fillOpacity="0.15"
          />
          <Label x={72} y={63 + i * 56} text={ot} size={6.5} fill={VIOLET.a} anchor="middle" />
          <rect
            x="118"
            y={30 + i * 56}
            width="54"
            height="14"
            rx="4"
            fill={i === 0 ? CORAL.a : TEAL.a}
            fillOpacity="0.15"
          />
          <Label
            x={145}
            y={40 + i * 56}
            text={status}
            size={6.5}
            fill={i === 0 ? CORAL.a : TEAL.a}
            anchor="middle"
          />
        </g>
      ))}
    </Svg>
  );
}

// 16 · Discharge
function IDischarge({ a }: { a: string }) {
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Discharge Management"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {/* Discharge card */}
      <rect
        x="18"
        y="22"
        width="164"
        height="92"
        rx="10"
        fill="white"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <rect
        x="18"
        y="22"
        width="164"
        height="20"
        rx="10"
        fill={a}
        fillOpacity="0.12"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <rect x="18" y="33" width="164" height="9" fill={a} fillOpacity="0.12" />
      <Label
        x={100}
        y={36}
        text="Discharge Summary · Rajesh Kumar"
        size={7.5}
        weight="700"
        fill={a}
        anchor="middle"
      />

      {[
        ['Admitted', '—'],
        ['Discharged', '—'],
        ['Diagnosis', 'HTN + Type 2 DM'],
        ['Follow-up', '—'],
      ].map(([k, v], i) => (
        <g
          key={k}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.3 + i * 0.1}s` }}
        >
          <Label x={26} y={60 + i * 16} text={k} size={7} fill={C.muted} />
          <Label
            x={172}
            y={60 + i * 16}
            text={v}
            size={7.5}
            weight="600"
            fill={C.text}
            anchor="end"
          />
        </g>
      ))}

      {/* AI discharge assist */}
      <rect
        x="18"
        y="120"
        width="164"
        height="36"
        rx="9"
        fill={VIOLET.a}
        fillOpacity="0.08"
        stroke={VIOLET.a}
        strokeWidth="1"
        className="opacity-0-init anim-fade-up delay-600"
      />
      <Label
        x={26}
        y={134}
        text="✦  AI drafted discharge note"
        size={7.5}
        weight="600"
        fill={VIOLET.a}
      />
      <Label
        x={26}
        y={148}
        text="Reviewed and signed by attending doctor"
        size={7}
        fill={C.muted}
      />

      {/* Linked to record */}
      <rect
        x="18"
        y="162"
        width="164"
        height="30"
        rx="9"
        fill={TEAL.a}
        fillOpacity="0.08"
        stroke={TEAL.a}
        strokeWidth="0.8"
        className="opacity-0-init anim-fade-up delay-700"
      />
      <Label
        x={100}
        y={177}
        text="Discharge record stays linked to patient"
        size={7.5}
        fill={TEAL.a}
        anchor="middle"
      />
      <Label x={100} y={187} text="Visible on next visit" size={7} fill={C.muted} anchor="middle" />
    </Svg>
  );
}

// 17 · Prescription dispensing
function IDispense({ a }: { a: string }) {
  return (
    <Svg>
      {/* Rx */}
      <Label x={36} y={52} text="Rx" size={38} weight="900" fill={a} family="Roboto Slab" />
      <circle cx={36} cy={24} r={12} fill={a} fillOpacity="0.06" />

      <rect
        x="18"
        y="14"
        width="86"
        height="82"
        rx="8"
        fill="white"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in"
      />
      <Label x={61} y={28} text="Prescription" size={7.5} weight="700" fill={a} anchor="middle" />
      {[
        ['Medicine one', 'As prescribed'],
        ['Atorvastatin', '0-0-1'],
        ['Medicine two', 'As prescribed'],
      ].map(([drug, dose], i) => (
        <g
          key={drug}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.2 + i * 0.1}s` }}
        >
          <rect x="24" y={36 + i * 18} width="74" height="14" rx="4" fill={a} fillOpacity="0.05" />
          <Label x={28} y={46 + i * 18} text={drug} size={6.5} fill={C.text} />
          <Label x={91} y={46 + i * 18} text={dose} size={6.5} fill={a} anchor="end" />
        </g>
      ))}

      {/* Arrow */}
      <path
        d="M108 55 L126 55"
        stroke={a}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 0.5s 0.6s ease forwards' }}
      />
      <polygon
        points="124,51 130,55 124,59"
        fill={a}
        className="opacity-0-init anim-scale-in delay-500"
      />

      {/* Pharmacy shelf */}
      <rect
        x="130"
        y="14"
        width="52"
        height="82"
        rx="8"
        fill="white"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in delay-200"
      />
      {[
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [0, 2],
        [1, 2],
      ].map(([c, r], i) => (
        <rect
          key={i}
          x={138 + c * 20}
          y={24 + r * 22}
          width="14"
          height="18"
          rx="3"
          fill={[a, TEAL.a, VIOLET.a, CORAL.a, PINE.a, INDIGO.a][i]}
          fillOpacity="0.25"
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.4 + i * 0.07}s` }}
        />
      ))}

      {/* Dispensed status */}
      <rect
        x="18"
        y="104"
        width="164"
        height="86"
        rx="10"
        fill="white"
        stroke={TEAL.a}
        strokeWidth="1"
        className="opacity-0-init anim-scale-in delay-500"
      />
      <rect
        x="18"
        y="104"
        width="164"
        height="18"
        rx="10"
        fill={TEAL.a}
        fillOpacity="0.12"
        className="opacity-0-init anim-scale-in delay-500"
      />
      <rect x="18" y="114" width="164" height="8" fill={TEAL.a} fillOpacity="0.12" />
      <Label
        x={100}
        y={117}
        text="Dispensing Record"
        size={7.5}
        weight="700"
        fill={TEAL.a}
        anchor="middle"
      />
      {[
        ['Medicine one', 'Dispensed'],
        ['Atorvastatin', '30 tabs · Dispensed'],
        ['Medicine two', 'Dispensed'],
      ].map(([drug, status], i) => (
        <g
          key={drug}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.65 + i * 0.1}s` }}
        >
          <Label x={26} y={132 + i * 18} text={drug} size={7.5} fill={C.text} />
          <Label x={174} y={132 + i * 18} text={status} size={7} fill={TEAL.a} anchor="end" />
        </g>
      ))}
    </Svg>
  );
}

// 18 · Pharmacy inventory
function IInventory({ a }: { a: string }) {
  const items = [
    { name: 'Medicine one', stock: 340, expiry: 'Mar 2026', flag: false },
    { name: 'Medicine two', stock: 82, expiry: 'Jan 2026', flag: true },
    { name: 'Pantoprazole', stock: 210, expiry: 'Jun 2026', flag: false },
    { name: 'Medicine three', stock: 28, expiry: 'Dec 2025', flag: true },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Pharmacy Inventory"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {items.map(({ name, stock, expiry, flag }, i) => (
        <g
          key={name}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + i * 0.13}s` }}
        >
          <rect
            x="18"
            y={24 + i * 42}
            width="164"
            height="34"
            rx="8"
            fill={flag ? CORAL.a : 'white'}
            fillOpacity={flag ? 0.06 : 1}
            stroke={flag ? CORAL.a : a}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <Label x={26} y={36 + i * 42} text={name} size={8} weight="600" fill={C.text} />
          <Label x={26} y={50 + i * 42} text={`Exp: ${expiry}`} size={6.5} fill={C.muted} />
          {/* Stock bar */}
          <rect x="112" y={29 + i * 42} width="60" height="8" rx="3" fill={C.border} />
          <rect
            x="112"
            y={29 + i * 42}
            width={Math.min(stock / 5, 60)}
            height="8"
            rx="3"
            fill={flag ? CORAL.a : a}
            fillOpacity={flag ? 0.7 : 0.5}
          />
          <Label
            x={174}
            y={48 + i * 42}
            text={`${stock} units`}
            size={6.5}
            weight="600"
            fill={flag ? CORAL.a : a}
            anchor="end"
          />
          {flag && (
            <text x={170} y={37 + i * 42} fontSize={10} textAnchor="end">
              ⚠️
            </text>
          )}
        </g>
      ))}
    </Svg>
  );
}

// 19 · Lab orders
function ILabOrders({ a }: { a: string }) {
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Lab Orders"
        size={10}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {/* Doctor ordering */}
      <rect
        x="18"
        y="24"
        width="74"
        height="58"
        rx="9"
        fill={a}
        fillOpacity="0.08"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in"
      />
      <text x={55} y={51} textAnchor="middle" fontSize={20}>
        👨‍⚕️
      </text>
      <Label x={55} y={66} text="Doctor" size={7.5} weight="600" fill={a} anchor="middle" />
      <Label x={55} y={76} text="orders tests" size={6.5} fill={C.muted} anchor="middle" />

      {/* Arrow */}
      <path
        d="M96 53 L110 53"
        stroke={a}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 0.5s 0.5s ease forwards' }}
      />
      <polygon
        points="108,49 114,53 108,57"
        fill={a}
        className="opacity-0-init anim-scale-in delay-400"
      />

      <rect
        x="114"
        y="24"
        width="68"
        height="58"
        rx="9"
        fill={TEAL.a}
        fillOpacity="0.08"
        stroke={TEAL.a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in delay-200"
      />
      <text x={148} y={51} textAnchor="middle" fontSize={20}>
        🔬
      </text>
      <Label x={148} y={66} text="Lab Team" size={7.5} weight="600" fill={TEAL.a} anchor="middle" />
      <Label x={148} y={76} text="receives order" size={6.5} fill={C.muted} anchor="middle" />

      {/* Test list */}
      {[
        { test: 'Complete Blood Count', dept: 'Haematology' },
        { test: 'Lipid Profile', dept: 'Biochemistry' },
        { test: 'HbA1c', dept: 'Biochemistry' },
        { test: 'Urine R/M', dept: 'Microbiology' },
      ].map(({ test, dept }, i) => (
        <g
          key={test}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.35 + i * 0.12}s` }}
        >
          <rect
            x="18"
            y={94 + i * 25}
            width="164"
            height="20"
            rx="5"
            fill={a}
            fillOpacity="0.05"
            stroke={a}
            strokeWidth="0.7"
            strokeOpacity="0.2"
          />
          <circle cx="30" cy={104 + i * 25} r="4" fill={a} fillOpacity="0.4" />
          <Label x={40} y={107 + i * 25} text={test} size={7.5} fill={C.text} />
          <Label x={174} y={107 + i * 25} text={dept} size={6.5} fill={C.muted} anchor="end" />
        </g>
      ))}
    </Svg>
  );
}

// 20 · Lab reports in context
function ILabReports({ a }: { a: string }) {
  const results = [
    { test: 'Haemoglobin', val: '—', ref: '—', flag: false },
    { test: 'LDL Cholesterol', val: '—', ref: '—', flag: true },
    { test: 'HbA1c', val: '7.4 %', ref: '<5.7', flag: true },
    { test: 'Creatinine', val: '—', ref: '—', flag: false },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Diagnostic Results in Patient Context"
        size={7.5}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {results.map(({ test, val, ref, flag }, i) => (
        <g
          key={test}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + i * 0.14}s` }}
        >
          <rect
            x="18"
            y={24 + i * 38}
            width="164"
            height="30"
            rx="7"
            fill={flag ? CORAL.a : 'white'}
            fillOpacity={flag ? 0.06 : 1}
            stroke={flag ? CORAL.a : a}
            strokeWidth="0.9"
            strokeOpacity="0.3"
          />
          <Label x={26} y={36 + i * 38} text={test} size={8} weight="600" fill={C.text} />
          <Label x={26} y={47 + i * 38} text={`Ref: ${ref}`} size={6.5} fill={C.muted} />
          <Label
            x={174}
            y={36 + i * 38}
            text={val}
            size={9}
            weight="700"
            fill={flag ? CORAL.a : PINE.a}
            anchor="end"
          />
          {flag && (
            <text x={174} y={48 + i * 38} fontSize={9} textAnchor="end">
              ⚠️
            </text>
          )}
        </g>
      ))}
      <rect
        x="18"
        y="178"
        width="164"
        height="18"
        rx="6"
        fill={a}
        fillOpacity="0.08"
        stroke={a}
        strokeWidth="0.8"
        className="opacity-0-init anim-fade-up delay-700"
      />
      <Label
        x={100}
        y={190}
        text="Reports visible to doctor in same patient view"
        size={7}
        fill={a}
        anchor="middle"
      />
    </Svg>
  );
}

// 21 · Care journey
function IJourney({ a }: { a: string }) {
  const steps = [
    { icon: '💬', label: 'Complaints' },
    { icon: '📊', label: 'Vitals' },
    { icon: '🩺', label: 'Diagnosis' },
    { icon: '💊', label: 'Treatment' },
    { icon: '✅', label: 'Discharge' },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Structured Patient Journey"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      <path
        d="M24 80 L176 80"
        stroke={a}
        strokeWidth="2"
        strokeOpacity="0.2"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 0.9s 0.2s ease forwards' }}
      />
      {steps.map(({ icon, label }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.3 + i * 0.12}s` }}
        >
          <circle
            cx={24 + i * 38}
            cy="80"
            r="17"
            fill={a}
            fillOpacity={0.1 + i * 0.03}
            stroke={a}
            strokeWidth="1.3"
          />
          <text x={24 + i * 38} y="84" textAnchor="middle" fontSize={14}>
            {icon}
          </text>
          <Label
            x={24 + i * 38}
            y={106}
            text={label}
            size={7}
            weight="600"
            fill={a}
            anchor="middle"
          />
        </g>
      ))}
      {/* Department consistency note */}
      <rect
        x="18"
        y="116"
        width="164"
        height="26"
        rx="7"
        fill={INDIGO.a}
        fillOpacity="0.08"
        stroke={INDIGO.a}
        strokeWidth="0.8"
        className="opacity-0-init anim-fade-up delay-700"
      />
      <Label
        x={100}
        y={127}
        text="Department-specific care journeys"
        size={7.5}
        fill={INDIGO.a}
        anchor="middle"
      />
      <Label
        x={100}
        y={137}
        text="structured consistently across the hospital"
        size={7}
        fill={C.muted}
        anchor="middle"
      />

      {/* Longitudinal record */}
      <rect
        x="18"
        y="150"
        width="164"
        height="44"
        rx="9"
        fill="white"
        stroke={a}
        strokeWidth="0.8"
        className="opacity-0-init anim-fade-up delay-500"
      />
      <Label
        x={26}
        y={163}
        text="Previous visits also visible on same screen"
        size={7.5}
        fill={C.text}
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={26 + i * 50}
          y="168"
          width="40"
          height="20"
          rx="5"
          fill={a}
          fillOpacity={0.1 - i * 0.02}
          stroke={a}
          strokeWidth="0.7"
          strokeOpacity="0.25"
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.6 + i * 0.1}s` }}
        />
      ))}
      {['Jan 2025', 'Oct 2024', 'Jul 2024'].map((d, i) => (
        <Label key={d} x={46 + i * 50} y={181} text={d} size={6.5} fill={C.muted} anchor="middle" />
      ))}
    </Svg>
  );
}

// 22 · AI clinical summary
function IAISummary({ a }: { a: string }) {
  return (
    <Svg>
      {/* AI icon */}
      <circle
        cx="100"
        cy="48"
        r="30"
        fill={a}
        fillOpacity="0.1"
        className="opacity-0-init anim-scale-in"
      />
      <text x="100" y="56" textAnchor="middle" fontSize={28}>
        ✦
      </text>
      <Label
        x={100}
        y={90}
        text="AI Clinical Summary"
        size={10}
        weight="700"
        fill={a}
        anchor="middle"
        family="Roboto Slab"
      />

      {/* Summary card */}
      <rect
        x="18"
        y="100"
        width="164"
        height="90"
        rx="10"
        fill="white"
        stroke={a}
        strokeWidth="1"
        className="opacity-0-init anim-scale-in delay-300"
      />
      <rect
        x="18"
        y="100"
        width="164"
        height="18"
        rx="10"
        fill={a}
        fillOpacity="0.1"
        className="opacity-0-init anim-scale-in delay-300"
      />
      <rect x="18" y="110" width="164" height="8" fill={a} fillOpacity="0.1" />
      <Label
        x={100}
        y={113}
        text="Generated summary · Rajesh Kumar"
        size={7}
        fill={a}
        anchor="middle"
      />

      {[
        'Summary drawn from the patient record',
        'BP uncontrolled on previous Rx',
        'LDL elevated · HbA1c 7.4% — trending up',
        'Plan: Rx adjusted, follow-up in 2 weeks',
      ].map((line, i) => (
        <g
          key={i}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.45 + i * 0.1}s` }}
        >
          <circle cx="26" cy={128 + i * 16} r="2.5" fill={a} fillOpacity="0.4" />
          <Label x={34} y={131 + i * 16} text={line} size={7.2} fill={C.text} />
        </g>
      ))}
    </Svg>
  );
}

// 23 · Appointments
function IAppointments({ a }: { a: string }) {
  const appts = [
    { time: '10:00', name: 'Kavita Singh', type: 'Walk-in', color: CORAL.a },
    { time: '10:30', name: 'Mohan Das', type: 'Follow-up', color: a },
    { time: '11:00', name: 'Anita Desai', type: 'In-person', color: PINE.a },
    { time: '11:30', name: 'Priya Iyer', type: 'Video', color: VIOLET.a },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Appointment Scheduling"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {/* Calendar strip */}
      <rect
        x="18"
        y="22"
        width="164"
        height="28"
        rx="8"
        fill={a}
        fillOpacity="0.08"
        stroke={a}
        strokeWidth="0.8"
        className="opacity-0-init anim-scale-in delay-100"
      />
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
        <g
          key={d}
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.15 + i * 0.07}s` }}
        >
          <rect
            x={22 + i * 31}
            y="26"
            width="24"
            height="20"
            rx="5"
            fill={i === 2 ? a : 'white'}
            stroke={i === 2 ? a : C.border}
            strokeWidth="0.8"
          />
          <Label
            x={34 + i * 31}
            y={38}
            text={d}
            size={7}
            weight={i === 2 ? '700' : 'normal'}
            fill={i === 2 ? 'white' : C.muted}
            anchor="middle"
          />
        </g>
      ))}

      {appts.map(({ time, name, type, color }, i) => (
        <g
          key={time}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.3 + i * 0.13}s` }}
        >
          <rect
            x="18"
            y={58 + i * 34}
            width="164"
            height="28"
            rx="7"
            fill={color}
            fillOpacity="0.07"
            stroke={color}
            strokeWidth="0.9"
            strokeOpacity="0.3"
          />
          <Label x={26} y={74 + i * 34} text={time} size={8} weight="700" fill={color} />
          <Label x={70} y={68 + i * 34} text={name} size={8.5} weight="600" fill={C.text} />
          <rect
            x="120"
            y={62 + i * 34}
            width="52"
            height="12"
            rx="4"
            fill={color}
            fillOpacity="0.15"
          />
          <Label x={146} y={71 + i * 34} text={type} size={7} fill={color} anchor="middle" />
          <Label x={70} y={80 + i * 34} text="Doctor" size={7} fill={C.muted} />
        </g>
      ))}
    </Svg>
  );
}

// 24 · Video consultation
function IVideo({ a }: { a: string }) {
  return (
    <Svg>
      {/* Doctor frame */}
      <rect
        x="14"
        y="22"
        width="86"
        height="68"
        rx="9"
        fill={a}
        fillOpacity="0.08"
        stroke={a}
        strokeWidth="1.5"
        className="opacity-0-init anim-scale-in"
      />
      <rect
        x="14"
        y="22"
        width="86"
        height="14"
        rx="9"
        fill={a}
        fillOpacity="0.15"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <rect x="14" y="29" width="86" height="7" fill={a} fillOpacity="0.15" />
      <Label x={57} y={32} text="Doctor" size={7} weight="700" fill={a} anchor="middle" />
      <circle cx="57" cy="64" r="18" fill={a} fillOpacity="0.12" />
      <circle cx="57" cy="58" r="8" fill={a} fillOpacity="0.5" />
      <path d="M42 76 Q57 70 72 76" fill={a} fillOpacity="0.35" />

      {/* Patient frame */}
      <rect
        x="100"
        y="52"
        width="86"
        height="68"
        rx="9"
        fill={TEAL.a}
        fillOpacity="0.08"
        stroke={TEAL.a}
        strokeWidth="1.5"
        className="opacity-0-init anim-scale-in delay-200"
      />
      <rect
        x="100"
        y="52"
        width="86"
        height="14"
        rx="9"
        fill={TEAL.a}
        fillOpacity="0.15"
        className="opacity-0-init anim-scale-in delay-200"
      />
      <rect x="100" y="59" width="86" height="7" fill={TEAL.a} fillOpacity="0.15" />
      <Label
        x={143}
        y={62}
        text="Rajesh Kumar"
        size={7}
        weight="700"
        fill={TEAL.a}
        anchor="middle"
      />
      <circle cx="143" cy="94" r="18" fill={TEAL.a} fillOpacity="0.12" />
      <circle cx="143" cy="88" r="8" fill={TEAL.a} fillOpacity="0.5" />
      <path d="M128 106 Q143 100 158 106" fill={TEAL.a} fillOpacity="0.35" />

      {/* Controls */}
      <rect
        x="50"
        y="100"
        width="56"
        height="14"
        rx="7"
        fill={a}
        fillOpacity="0.12"
        className="opacity-0-init anim-scale-in delay-400"
      />
      {['🎤', '📷', '🔴'].map((icon, i) => (
        <text
          key={i}
          x={62 + i * 14}
          y={111}
          fontSize={8}
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.5 + i * 0.07}s` }}
        >
          {icon}
        </text>
      ))}

      {/* Link note */}
      <rect
        x="14"
        y="126"
        width="172"
        height="24"
        rx="7"
        fill={a}
        fillOpacity="0.07"
        stroke={a}
        strokeWidth="0.8"
        className="opacity-0-init anim-fade-up delay-600"
      />
      <Label
        x={100}
        y={136}
        text="Patient joins via link · no extra app needed"
        size={7.5}
        fill={a}
        anchor="middle"
      />
      <Label
        x={100}
        y={145}
        text="Chat and file sharing included in the call"
        size={7}
        fill={C.muted}
        anchor="middle"
      />

      {/* Record linked */}
      <rect
        x="14"
        y="156"
        width="172"
        height="38"
        rx="8"
        fill="white"
        stroke={TEAL.a}
        strokeWidth="0.8"
        className="opacity-0-init anim-fade-up delay-700"
      />
      <Label
        x={100}
        y={168}
        text="Consultation notes saved to patient record"
        size={7.5}
        fill={TEAL.a}
        anchor="middle"
      />
      <Label
        x={100}
        y={181}
        text="within the same hospital platform"
        size={7}
        fill={C.muted}
        anchor="middle"
      />
    </Svg>
  );
}

// 25 · Consolidated billing
function IBilling({ a }: { a: string }) {
  const items = [
    { label: 'Consultation', amount: '—', color: a },
    { label: 'IPD — 6 nights', amount: '—', color: VIOLET.a },
    { label: 'Pharmacy', amount: '—', color: TEAL.a },
    { label: 'Lab tests', amount: '—', color: CORAL.a },
  ];
  return (
    <Svg>
      <rect
        x="18"
        y="14"
        width="164"
        height="128"
        rx="10"
        fill="white"
        stroke={a}
        strokeWidth="1.2"
        className="opacity-0-init anim-scale-in"
      />
      <rect
        x="18"
        y="14"
        width="164"
        height="22"
        rx="10"
        fill={a}
        fillOpacity="0.12"
        className="opacity-0-init anim-scale-in delay-100"
      />
      <rect x="18" y="27" width="164" height="9" fill={a} fillOpacity="0.12" />
      <Label
        x={100}
        y={30}
        text="Patient Invoice · INV-2025-1847"
        size={8}
        weight="700"
        fill={a}
        anchor="middle"
      />

      {items.map(({ label, amount, color }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.25 + i * 0.12}s` }}
        >
          <circle cx="30" cy={52 + i * 22} r="5" fill={color} fillOpacity="0.4" />
          <Label x={42} y={55 + i * 22} text={label} size={8} fill={C.text} />
          <Label
            x={174}
            y={55 + i * 22}
            text={amount}
            size={8.5}
            weight="700"
            fill={color}
            anchor="end"
          />
        </g>
      ))}

      <line
        x1="26"
        y1="140"
        x2="174"
        y2="140"
        stroke={a}
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 0.5s 0.85s ease forwards' }}
      />
      <Label x={42} y={152} text="Total" size={9} weight="700" fill={C.navy} family="Roboto Slab" />
      <Label
        x={174}
        y={152}
        text="—"
        size={12}
        weight="900"
        fill={a}
        anchor="end"
        family="Roboto Slab"
      />

      {/* Payment row */}
      <rect
        x="18"
        y="160"
        width="164"
        height="34"
        rx="8"
        fill={a}
        fillOpacity="0.05"
        stroke={a}
        strokeWidth="0.7"
        className="opacity-0-init anim-fade-up delay-700"
      />
      {['UPI', 'Card', 'Cash', 'Online'].map((m, i) => (
        <g
          key={m}
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.9 + i * 0.07}s` }}
        >
          <rect
            x={26 + i * 38}
            y="166"
            width="30"
            height="14"
            rx="4"
            fill={i === 0 ? a : 'transparent'}
            stroke={a}
            strokeWidth={i === 0 ? 0 : 0.7}
            strokeOpacity="0.3"
          />
          <Label
            x={41 + i * 38}
            y={176}
            text={m}
            size={7}
            fill={i === 0 ? 'white' : C.muted}
            anchor="middle"
          />
        </g>
      ))}
    </Svg>
  );
}

// 26 · Dues tracking
function IDues({ a }: { a: string }) {
  const data = [
    { label: 'Collected today', val: '—', pct: 78, color: PINE.a },
    { label: 'Pending dues', val: '—', pct: 22, color: CORAL.a },
    { label: 'Refunds issued', val: '—', pct: 10, color: VIOLET.a },
  ];
  return (
    <Svg>
      <Label
        x={100}
        y={16}
        text="Revenue & Dues Tracking"
        size={9}
        weight="700"
        fill={C.navy}
        anchor="middle"
        family="Roboto Slab"
      />
      {data.map(({ label, val, pct, color }, i) => (
        <g
          key={label}
          className="opacity-0-init anim-fade-up"
          style={{ animationDelay: `${0.2 + i * 0.15}s` }}
        >
          <rect
            x="18"
            y={24 + i * 52}
            width="164"
            height="44"
            rx="9"
            fill={color}
            fillOpacity="0.07"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <Label x={26} y={40 + i * 52} text={label} size={7.5} fill={C.muted} />
          <Label
            x={26}
            y={56 + i * 52}
            text={val}
            size={14}
            weight="900"
            fill={color}
            family="Roboto Slab"
          />
          {/* Mini bar */}
          <rect x="108" y={38 + i * 52} width="64" height="10" rx="4" fill={C.border} />
          <rect
            x="108"
            y={38 + i * 52}
            width={pct * 0.64}
            height="10"
            rx="4"
            fill={color}
            fillOpacity="0.5"
          />
          <Label
            x={174}
            y={48 + i * 52}
            text={`${pct}%`}
            size={7.5}
            weight="700"
            fill={color}
            anchor="end"
          />
        </g>
      ))}
      <rect
        x="18"
        y="180"
        width="164"
        height="16"
        rx="6"
        fill={a}
        fillOpacity="0.08"
        className="opacity-0-init anim-fade-up delay-700"
      />
      <Label
        x={100}
        y={191}
        text="Billing stays connected to services delivered"
        size={7}
        fill={a}
        anchor="middle"
      />
    </Svg>
  );
}

// 27 · Operational reports
function IReports({ a }: { a: string }) {
  const bars = [42, 58, 51, 74, 68, 82, 77];
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  return (
    <Svg>
      {/* KPI tiles */}
      {[
        { label: 'Patients Today', val: '—', color: a, x: 18, w: 76 },
        { label: 'OPD', val: '—', color: TEAL.a, x: 100, w: 40 },
        { label: 'IPD', val: '—', color: VIOLET.a, x: 146, w: 36 },
      ].map(({ label, val, color, x, w }) => (
        <g key={label} className="opacity-0-init anim-scale-in delay-100">
          <rect
            x={x}
            y="14"
            width={w}
            height="36"
            rx="8"
            fill={color}
            fillOpacity="0.1"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <Label x={x + w / 2} y={28} text={label} size={6.5} fill={C.muted} anchor="middle" />
          <Label
            x={x + w / 2}
            y={42}
            text={val}
            size={13}
            weight="900"
            fill={color}
            anchor="middle"
            family="Roboto Slab"
          />
        </g>
      ))}

      {/* Bar chart */}
      <rect
        x="18"
        y="56"
        width="164"
        height="76"
        rx="8"
        fill="white"
        stroke={a}
        strokeWidth="0.8"
        strokeOpacity="0.25"
        className="opacity-0-init anim-scale-in delay-200"
      />
      <Label
        x={26}
        y={68}
        text="Monthly OPD — 2025"
        size={7.5}
        weight="600"
        fill={C.navy}
        family="Roboto Slab"
      />
      {bars.map((h, i) => {
        const bh = (h / 100) * 50;
        const bx = 26 + i * 21;
        return (
          <g key={i}>
            <rect
              x={bx}
              y={126 - bh}
              width="14"
              height={bh}
              rx="2"
              fill={i === 5 ? a : a}
              fillOpacity={i === 5 ? 0.75 : 0.22}
              className="opacity-0-init"
              style={{ animation: `fadeSlideUp 0.45s ${0.35 + i * 0.07}s ease forwards` }}
            />
            <Label x={bx + 7} y={132} text={months[i]} size={5.5} fill={C.muted} anchor="middle" />
          </g>
        );
      })}

      {/* Doctor utilisation */}
      <rect
        x="18"
        y="140"
        width="164"
        height="54"
        rx="8"
        fill="white"
        stroke={VIOLET.a}
        strokeWidth="0.8"
        className="opacity-0-init anim-fade-up delay-600"
      />
      <Label x={26} y={152} text="Doctor Utilisation" size={7.5} weight="600" fill={VIOLET.a} />
      {[
        { name: 'Doctor A', pct: 84 },
        { name: 'Doctor B', pct: 71 },
        { name: 'Doctor C', pct: 58 },
      ].map(({ name, pct }, i) => (
        <g
          key={name}
          className="opacity-0-init anim-fade-left"
          style={{ animationDelay: `${0.7 + i * 0.1}s` }}
        >
          <Label x={26} y={163 + i * 11} text={name} size={6.5} fill={C.muted} />
          <rect x="86" y={156 + i * 11} width="72" height="7" rx="3" fill={C.border} />
          <rect
            x="86"
            y={156 + i * 11}
            width={pct * 0.72}
            height="7"
            rx="3"
            fill={VIOLET.a}
            fillOpacity="0.45"
          />
          <Label
            x={162}
            y={163 + i * 11}
            text={`${pct}%`}
            size={6.5}
            weight="700"
            fill={VIOLET.a}
            anchor="end"
          />
        </g>
      ))}
    </Svg>
  );
}

// 28 · Role-based workspaces
function IRoles({ a }: { a: string }) {
  const roles = [
    { role: 'Doctor', icon: '👨‍⚕️', color: a, x: 34, y: 60 },
    { role: 'Nurse', icon: '👩‍⚕️', color: TEAL.a, x: 100, y: 60 },
    { role: 'Reception', icon: '🧑‍💼', color: CORAL.a, x: 166, y: 60 },
    { role: 'Pharmacy', icon: '💊', color: VIOLET.a, x: 34, y: 140 },
    { role: 'Lab', icon: '🔬', color: PINE.a, x: 100, y: 140 },
    { role: 'Admin', icon: '🔐', color: ROSE.a, x: 166, y: 140 },
  ];
  return (
    <Svg>
      <rect
        x="76"
        y="86"
        width="48"
        height="28"
        rx="7"
        fill={a}
        className="opacity-0-init anim-scale-in delay-300"
      />
      <Label
        x={100}
        y={104}
        text="SAHAI"
        size={9}
        weight="700"
        fill="white"
        anchor="middle"
        family="Roboto Slab"
      />
      {roles.map(({ role, icon, color, x, y }, i) => (
        <g
          key={role}
          className="opacity-0-init anim-scale-in"
          style={{ animationDelay: `${0.2 + i * 0.1}s` }}
        >
          <line
            x1={x}
            y1={y}
            x2="100"
            y2="100"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{ animation: `drawLine 0.5s ${0.1 + i * 0.08}s ease forwards` }}
          />
          <rect
            x={x - 24}
            y={y - 24}
            width="48"
            height="48"
            rx="9"
            fill={color}
            fillOpacity="0.08"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x={x} y={y - 6} textAnchor="middle" fontSize={16}>
            {icon}
          </text>
          <Label x={x} y={y + 7} text={role} size={7} weight="600" fill={color} anchor="middle" />
          <rect
            x={x - 16}
            y={y + 12}
            width="32"
            height="8"
            rx="3"
            fill={color}
            fillOpacity="0.15"
          />
          <Label x={x} y={y + 19} text="Role-based" size={5.5} fill={color} anchor="middle" />
        </g>
      ))}
    </Svg>
  );
}

// ──────────────────────────── Slide data ─────────────────────────────────────

/** Slide id -> its illustration. `a` is the slide's accent colour. */
export const VISUALS: Record<SlideId, (props: { a: string }) => React.JSX.Element> = {
  intro: IHub,
  connected: IPillars,
  'patient-search': ISearch,
  'patient-timeline': ITimeline,
  'patient-docs': IDocs,
  'abha-create': IAbhaCreate,
  'abha-identify': IAbhaId,
  'abdm-consent': IConsent,
  'abdm-exchange': IExchange,
  'opd-queue': IQueue,
  'opd-notes': IConsultNotes,
  emergency: IEmergency,
  beds: IBeds,
  vitals: IVitals,
  ot: IOT,
  discharge: IDischarge,
  'pharmacy-rx': IDispense,
  'pharmacy-inv': IInventory,
  'lab-orders': ILabOrders,
  'lab-reports': ILabReports,
  journey: IJourney,
  'ai-summary': IAISummary,
  appointments: IAppointments,
  video: IVideo,
  billing: IBilling,
  dues: IDues,
  reports: IReports,
  roles: IRoles,
};
