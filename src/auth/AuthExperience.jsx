import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  Camera,
  Building2,
  Briefcase,
  Mail,
  ChevronDown,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { AUTH_IMAGES } from "./authConfig";
import { authService } from "./authService";

/* ================================================================== */
/*  CONFIG                                                            */
/* ================================================================== */

const dashboardFor = (role) => `/dashboard/${role}`;

const INTENTS = [
  {
    id: "creator",
    icon: Camera,
    title: "I make content",
    copy: "Instagram, YouTube, or both. Get paid for brand collabs.",
    goal: "find paid collaborations",
  },
  {
    id: "brand",
    icon: Building2,
    title: "I have a business",
    copy: "Discover vetted creators to grow your brand and sales.",
    goal: "find creators for your business",
  },
  {
    id: "agency",
    icon: Briefcase,
    title: "I run an agency",
    copy: "Manage multiple client briefs, rosters, and reports in one place.",
    goal: "run campaigns for clients",
  },
];

const SIDE = {
  default: {
    kicker: "Adrovis Platform",
    title: "Where creators and brands grow together.",
    points: ["Clear briefs & guaranteed payouts", "Direct communication channels", "One place to manage it all"],
  },
  creator: {
    kicker: "For creators",
    title: "Get paid for the content you already make.",
    points: ["See campaign budgets upfront", "Pitch brands and teams directly", "Keep 100% of your listed fee"],
  },
  brand: {
    kicker: "For businesses",
    title: "Find creators who truly convert for your product.",
    points: ["Publish campaigns in under 5 minutes", "Filter creators by niche and verified reach", "Manage all applications in one dashboard"],
  },
  agency: {
    kicker: "For agencies",
    title: "Scale client campaigns with seamless coordination.",
    points: ["Handle briefs across multiple client accounts", "Shortlist creators with 1-click approvals", "Track milestones and deliverables live"],
  },
};

const NICHES = [
  "Fashion",
  "Beauty",
  "Lifestyle",
  "Fitness",
  "Travel",
  "Food",
  "Technology",
  "Gaming",
  "Entertainment",
  "Education",
  "Other",
];

const BRAND_CATEGORIES = [
  "Fashion",
  "Beauty & Personal Care",
  "Food & Beverage",
  "Technology",
  "Health & Fitness",
  "Travel",
  "Lifestyle",
  "Education",
  "Finance",
  "Other",
];

const AGENCY_TYPES = [
  "Influencer Marketing",
  "Digital Marketing",
  "Social Media Management",
  "PR & Communications",
  "Talent Management",
  "Full-Service Agency",
  "Other",
];

const ABOUT = {
  creator: {
    name: "Your content",
    title: "Show brands who you are",
    sub: "Your profile helps matching brands evaluate your creative style.",
    fields: [
      { key: "instagram", kind: "social", social: "instagram", label: "Instagram handle or link", placeholder: "@yourhandle or URL", required: true },
      { key: "niches", kind: "chips", label: "Primary categories", hint: "Choose up to 3 niches", options: NICHES, max: 3, required: true },
      { key: "youtube", kind: "social", social: "youtube", label: "YouTube channel", placeholder: "@channel or link", optional: true },
    ],
  },
  brand: {
    name: "Your business",
    title: "Tell us about your brand",
    sub: "This is what creators see when evaluating your campaigns.",
    fields: [
      { key: "company", label: "Company / Brand name", required: true },
      { key: "category", kind: "select", label: "Industry category", options: BRAND_CATEGORIES, required: true },
      { key: "website", kind: "url", label: "Official website", placeholder: "yourbrand.com", optional: true },
      { key: "instagram", kind: "social", social: "instagram", label: "Instagram handle", placeholder: "@yourbrand", optional: true },
    ],
  },
  agency: {
    name: "Your agency",
    title: "Tell us about your agency",
    sub: "Set up your workspace to run campaigns on behalf of clients.",
    fields: [
      { key: "company", label: "Agency name", required: true },
      { key: "agencyType", kind: "select", label: "Agency specialty", options: AGENCY_TYPES, required: true },
      { key: "website", kind: "url", label: "Agency website", placeholder: "agencyname.com", optional: true },
      { key: "instagram", kind: "social", social: "instagram", label: "Instagram handle", placeholder: "@youragency", optional: true },
    ],
  },
};

const contactStep = (role) => ({
  name: "Contact",
  title: "How can we reach you?",
  sub: "Used for verified campaign updates and payout notices.",
  fields: [
    {
      key: "phone",
      kind: "phone",
      label: "Mobile phone number",
      required: true,
      hint: role === "creator"
        ? "Brands can view your verified phone number once you accept a brief."
        : "Used for urgent campaign status and billing alerts.",
    },
    {
      key: "city",
      kind: "city",
      label: "Operating city",
      required: true,
      hint: "Select your city to automatically match location-specific briefs.",
    },
  ],
});

const stepsFor = (role) => [ABOUT[role], contactStep(role)];
const TOTAL = 3;

/* ================================================================== */
/*  Helpers & Validation                                              */
/* ================================================================== */

const STATE_CITIES = {
  "Andhra Pradesh": "Visakhapatnam, Vijayawada, Guntur, Tirupati, Nellore, Kurnool, Rajahmundry, Kakinada, Amaravati, Anantapur",
  "Arunachal Pradesh": "Itanagar, Naharlagun",
  "Assam": "Guwahati, Silchar, Dibrugarh, Jorhat, Nagaon, Tezpur",
  "Bihar": "Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga, Purnia, Arrah",
  "Chhattisgarh": "Raipur, Bhilai, Bilaspur, Durg, Korba",
  "Delhi": "New Delhi, Delhi",
  "Goa": "Panaji, Margao, Vasco da Gama, Mapusa",
  "Gujarat": "Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar, Bhavnagar, Jamnagar, Junagadh, Anand, Vapi",
  "Haryana": "Gurugram, Faridabad, Panipat, Ambala, Karnal, Hisar, Rohtak, Sonipat, Panchkula",
  "Himachal Pradesh": "Shimla, Manali, Dharamshala, Solan, Mandi",
  "Jharkhand": "Ranchi, Jamshedpur, Dhanbad, Bokaro, Hazaribagh",
  "Karnataka": "Bengaluru, Mysuru, Mangaluru, Hubballi, Belagavi, Kalaburagi, Davangere, Ballari, Udupi, Shivamogga",
  "Kerala": "Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Kollam, Kannur, Alappuzha, Palakkad",
  "Madhya Pradesh": "Indore, Bhopal, Jabalpur, Gwalior, Ujjain, Sagar, Rewa",
  "Maharashtra": "Mumbai, Pune, Nagpur, Thane, Navi Mumbai, Nashik, Aurangabad, Solapur, Kolhapur, Amravati, Sangli, Nanded, Vasai-Virar, Kalyan, Pimpri-Chinchwad",
  "Manipur": "Imphal",
  "Meghalaya": "Shillong",
  "Mizoram": "Aizawl",
  "Nagaland": "Kohima, Dimapur",
  "Odisha": "Bhubaneswar, Cuttack, Rourkela, Berhampur, Sambalpur, Puri",
  "Punjab": "Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda, Mohali",
  "Rajasthan": "Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, Alwar, Bhilwara",
  "Sikkim": "Gangtok",
  "Tamil Nadu": "Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tirunelveli, Erode, Vellore, Thoothukudi, Tiruppur",
  "Telangana": "Hyderabad, Warangal, Nizamabad, Karimnagar, Khammam, Secunderabad",
  "Tripura": "Agartala",
  "Uttar Pradesh": "Lucknow, Kanpur, Noida, Ghaziabad, Agra, Varanasi, Meerut, Prayagraj, Bareilly, Aligarh, Moradabad, Gorakhpur, Greater Noida, Mathura",
  "Uttarakhand": "Dehradun, Haridwar, Rishikesh, Haldwani, Roorkee",
  "West Bengal": "Kolkata, Howrah, Durgapur, Asansol, Siliguri, Kharagpur",
  "Chandigarh": "Chandigarh",
  "Puducherry": "Puducherry",
  "Jammu and Kashmir": "Srinagar, Jammu",
  "Ladakh": "Leh",
  "Andaman and Nicobar Islands": "Port Blair",
  "Dadra and Nagar Haveli and Daman and Diu": "Daman, Silvassa",
  "Lakshadweep": "Kavaratti",
};

const STATES = Object.keys(STATE_CITIES);
const CITIES = Object.entries(STATE_CITIES).flatMap(([state, list]) =>
  list.split(", ").map((city) => ({ city, state }))
);

const SOCIAL_BASE = { instagram: "https://instagram.com/", youtube: "https://youtube.com/@" };
const isLink = (v) => /^(https?:\/\/|www\.)|instagram\.com|youtube\.com|youtu\.be/i.test(v.trim());
const normalizeUrl = (v) => {
  const t = (v || "").trim();
  return !t ? "" : /^https?:\/\//i.test(t) ? t : `https://${t}`;
};
const normalizeSocial = (v, kind) => {
  const t = (v || "").trim();
  if (!t) return "";
  return isLink(t) ? normalizeUrl(t) : SOCIAL_BASE[kind] + t.replace(/^@/, "");
};

function validateField(f, v, data) {
  if (f.kind === "city") return data.state ? "" : "Select your city from the suggestion list.";
  if (f.kind === "phone") return /^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit mobile number.";
  if (f.kind === "social") {
    const t = String(v).trim();
    const ok = isLink(t)
      ? f.social === "instagram"
        ? /instagram\.com\/[A-Za-z0-9._]+/i.test(t)
        : /(youtube\.com|youtu\.be)\//i.test(t)
      : (f.social === "instagram" ? /^[A-Za-z0-9._]{1,30}$/ : /^[A-Za-z0-9._-]{1,60}$/).test(t.replace(/^@/, ""));
    return ok ? "" : `Enter a valid ${f.social === "instagram" ? "Instagram" : "YouTube"} handle or link.`;
  }
  return "";
}

function checkFields(fields, data) {
  for (const f of fields) {
    const v = data[f.key];
    const empty = f.kind === "chips" ? !v?.length : !String(v || "").trim();
    if (empty) {
      if (f.required) return f.kind === "city" ? "Select your city." : `${f.label} is required.`;
      continue;
    }
    const bad = validateField(f, v, data);
    if (bad) return bad;
  }
  return "";
}

function useToken() {
  const { search, hash } = useLocation();
  return (
    new URLSearchParams(search).get("token") ||
    new URLSearchParams(hash.replace(/^#/, "")).get("token") ||
    ""
  );
}

function routeAfterAuth(navigate, user) {
  if (!user?.role) return navigate("/signup");
  navigate(user.onboardingComplete ? dashboardFor(user.role) : `/onboarding/${user.role}`);
}

/* ================================================================== */
/*  Form Inputs & UI Controls (Blue & White)                          */
/* ================================================================== */

const inputCls =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

const Label = ({ text, optional }) => (
  <span className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700">
    {text}
    {optional && <span className="font-normal text-slate-400">Optional</span>}
  </span>
);

const Hint = ({ children }) =>
  children ? <span className="mt-1.5 block text-[11px] leading-tight text-slate-400">{children}</span> : null;

function Field({ label, optional, hint, value, onChange, ...rest }) {
  return (
    <label className="block">
      <Label text={label} optional={optional} />
      <input className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...rest} />
      <Hint>{hint}</Hint>
    </label>
  );
}

function PhoneField({ label, hint, value, onChange }) {
  return (
    <label className="block">
      <Label text={label} />
      <span className="flex">
        <span className="flex h-12 items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">
          +91
        </span>
        <input
          className={inputCls}
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder="98765 43210"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        />
      </span>
      <Hint>{hint}</Hint>
    </label>
  );
}

function Strength({ value }) {
  if (!value) return null;
  const sc =
    value.length < 8
      ? 0
      : [value.length >= 12, /[A-Z]/.test(value) && /[a-z]/.test(value), /\d/.test(value) || /[^A-Za-z0-9]/.test(value)].filter(Boolean).length + 1;
  const bar = ["bg-slate-200", "bg-rose-500", "bg-amber-400", "bg-blue-500", "bg-emerald-500"][sc];
  return (
    <div className="-mt-1" aria-live="polite">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-200 ${i <= sc ? bar : "bg-slate-200"}`} />
        ))}
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-slate-500">
        {["Must be at least 8 characters", "Weak password", "Fair", "Good", "Strong password"][sc]}
      </p>
    </div>
  );
}

function CityField({ label, hint, data, onPick }) {
  const [q, setQ] = useState(data.city || "");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const term = q.trim().toLowerCase();
  const starts = term ? CITIES.filter((c) => c.city.toLowerCase().startsWith(term)) : [];
  const has = term ? CITIES.filter((c) => !c.city.toLowerCase().startsWith(term) && c.city.toLowerCase().includes(term)) : [];
  const matches = [...starts, ...has].slice(0, 6);
  const options = term.length >= 2 && !matches.some((m) => m.city.toLowerCase() === term) ? [...matches, { city: q.trim(), state: "", custom: true }] : matches;

  const choose = (o) => {
    setQ(o.city);
    setOpen(false);
    onPick({ city: o.city, state: o.state, country: "India" });
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHi((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && open && options[hi]) {
      e.preventDefault();
      choose(options[hi]);
    } else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <Label text={label} />
      <span className="relative block">
        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="city-list"
          autoComplete="off"
          className={`${inputCls} pl-11`}
          placeholder="Search city..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setHi(0);
            if (data.city) onPick({ city: "", state: "" });
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKey}
        />
      </span>
      {open && options.length > 0 && (
        <ul id="city-list" role="listbox" className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
          {options.map((o, i) => (
            <li key={o.city + o.state} role="option" aria-selected={i === hi}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
                onMouseEnter={() => setHi(i)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${i === hi ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}
              >
                <span>{o.custom ? `Use “${o.city}”` : o.city}</span>
                <span className="text-xs text-slate-400">{o.custom ? "Unlisted" : o.state}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {data.city && data.state && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          {data.city}, {data.state}, India
        </p>
      )}
      {data.city && !data.state && (
        <div className="mt-3">
          <SelectField label="Select your state" value={data.state} onChange={(v) => onPick({ state: v, country: "India" })} options={STATES} />
        </div>
      )}
      <Hint>{hint}</Hint>
    </div>
  );
}

function PasswordField({ label, value, onChange, autoComplete, placeholder, aside }) {
  const [show, setShow] = useState(false);
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700">
        {label}
        {aside}
      </span>
      <span className="relative block">
        <input
          className={`${inputCls} pr-12`}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:text-slate-700"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
    </label>
  );
}

function SelectField({ label, optional, value, onChange, options }) {
  return (
    <label className="block">
      <Label text={label} optional={optional} />
      <span className="relative block">
        <select className={`${inputCls} appearance-none pr-10 ${value ? "" : "text-slate-400"}`} value={value || ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select option</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </span>
    </label>
  );
}

function Chips({ label, hint, options, value = [], max, onChange }) {
  const toggle = (o) => onChange(value.includes(o) ? value.filter((x) => x !== o) : value.length < max ? [...value, o] : value);
  return (
    <div>
      <Label text={label} />
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o);
          const locked = !on && value.length >= max;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              disabled={locked}
              onClick={() => toggle(o)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                on
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                  : locked
                  ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      <Hint>{hint}{max ? ` · ${value.length}/${max} selected` : ""}</Hint>
    </div>
  );
}

function Primary({ busy, busyText, children, ...rest }) {
  return (
    <button
      {...rest}
      disabled={busy || rest.disabled}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
    >
      {busy ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          {busyText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

/* Looks identical to the old button; a real (invisible) Google button sits on top
   so the click produces a valid Google ID token for the backend. */
function GoogleButton({ role, busy, setBusy, setError, children }) {
  const navigate = useNavigate();
  const box = useRef(null);

  useEffect(() => {
    let alive = true;
    const width = Math.min(400, Math.max(200, Math.round(box.current?.offsetWidth || 400)));
    authService
      .mountGoogleButton(box.current, width, async (credential) => {
        setError("");
        setBusy(true);
        try {
          const { user } = await authService.google(credential, role);
          routeAfterAuth(navigate, user);
        } catch (err) {
          setError(err.message || "Google sign-in failed. Please try again.");
        } finally {
          if (alive) setBusy(false);
        }
      })
      .catch((err) => alive && setError(err.message));
    return () => {
      alive = false;
    };
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative">
      <button
        type="button"
        tabIndex={-1}
        disabled={busy}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50/70 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
      >
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z" />
        </svg>
        {children}
      </button>
      <div className={`absolute inset-0 overflow-hidden rounded-xl opacity-[0.01] ${busy ? "pointer-events-none" : ""}`}>
        <div ref={box} className="flex h-full w-full items-center justify-center" style={{ transform: "scaleY(1.2)" }} />
      </div>
    </div>
  );
}

const Divider = ({ text }) => (
  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
    <span className="h-px flex-1 bg-slate-200" />
    {text}
    <span className="h-px flex-1 bg-slate-200" />
  </div>
);

const ErrorLine = ({ children }) =>
  children ? (
    <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
      {children}
    </div>
  ) : null;

const Heading = ({ kicker, title, accent, sub }) => (
  <div className="mb-6">
    {kicker && (
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
        {kicker}
      </p>
    )}
    <h1 className="mt-2 text-[2rem] font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-[2.4rem]">
      {title}
      {accent && <span className="text-blue-600"> {accent}</span>}
    </h1>
    {sub && <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500">{sub}</p>}
  </div>
);

const Progress = ({ step, label }) => (
  <div className="mb-6">
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: TOTAL }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${i < step ? "bg-blue-600" : "bg-slate-200"}`}
        />
      ))}
    </div>
    <p className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
      Step {step} of {TOTAL} · <span className="text-slate-700">{label}</span>
    </p>
  </div>
);

function useImage(role) {
  const img = AUTH_IMAGES[role] || AUTH_IMAGES.creator;
  const [ok, setOk] = useState(true);
  useEffect(() => {
    setOk(true);
  }, [img]);
  return { img, ok, fail: () => setOk(false) };
}

/* ================================================================== */
/*  Desktop Right Panel (Locked, Zero-Jitter Sticky Visual)          */
/* ================================================================== */

function VisualPanel({ role }) {
  const s = SIDE[role] || SIDE.default;
  const { img, ok, fail } = useImage(role);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
      {ok && (
        <img
          key={img}
          src={img}
          alt="Adrovis creative workspace"
          onError={fail}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/10 pointer-events-none" />

      <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] xl:p-7">
        <div className="mb-2.5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/90">
            {s.kicker}
          </span>
        </div>

        <h2 className="text-xl font-bold leading-snug tracking-tight text-white xl:text-2xl">
          {s.title}
        </h2>

        <ul className="mt-4 space-y-2.5">
          {s.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-white/90">
              <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full border border-white/30 bg-white/20 text-white">
                <Check className="h-3 w-3 stroke-[2.5]" />
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Layout Container (Fixed Viewport Shell, No Screen Buffer)         */
/* ================================================================== */

function Shell({ children, role, stepIndicator = "STEP 1 / 3" }) {
  return (
    <div className="adrovis-viewport flex min-h-[100dvh] w-full flex-col bg-white text-slate-900 antialiased lg:h-screen lg:overflow-hidden lg:grid lg:grid-cols-2">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .adrovis-viewport {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        .adrovis-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .adrovis-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .adrovis-scroll::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 9999px;
        }
      `}</style>

      <section className="adrovis-scroll flex flex-1 flex-col justify-between px-5 py-6 sm:px-10 lg:px-14 lg:overflow-y-auto">
        <header className="flex items-center justify-between">
          <Link to="/" aria-label="Adrovis home" className="flex items-center gap-2 group">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-base font-extrabold text-white transition group-hover:bg-blue-700">
              a
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">adrovis</span>
          </Link>
          {stepIndicator && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              {stepIndicator}
            </span>
          )}
        </header>

        <div className="mx-auto my-auto w-full max-w-[430px] py-8 sm:py-12">
          {children}
        </div>

        <footer className="text-center text-[11px] text-slate-400">
          By continuing you agree to our{" "}
          <Link to="/terms" className="font-semibold text-slate-700 hover:text-blue-600">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="font-semibold text-slate-700 hover:text-blue-600">
            Privacy Policy
          </Link>
          .
        </footer>
      </section>

      <aside className="hidden h-full p-4 xl:p-6 lg:block">
        <VisualPanel role={role} />
      </aside>
    </div>
  );
}

/* ================================================================== */
/*  Pages                                                             */
/* ================================================================== */

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { user } = await authService.login({ email, password, remember: true });
      routeAfterAuth(navigate, user);
    } catch (err) {
      setError(err.message || "Could not log in. Check your email and password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell stepIndicator="">
      <Heading
        kicker="Welcome Back"
        title="Good to see you"
        accent="again."
        sub="Sign in to your Adrovis account to continue."
      />
      <div className="space-y-4">
        <GoogleButton busy={busy} setBusy={setBusy} setError={setError}>
          Continue with Google
        </GoogleButton>
        <Divider text="or sign in with email" />
        <form onSubmit={submit} className="space-y-4">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@domain.com"
            required
            autoComplete="email"
          />
          <PasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            autoComplete="current-password"
            aside={
              <Link to="/forgot-password" tabIndex={-1} className="font-semibold text-blue-600 hover:text-blue-700">
                Forgot?
              </Link>
            }
          />
          <ErrorLine>{error}</ErrorLine>
          <Primary busy={busy} busyText="Logging in…">
            Log in <ArrowRight className="h-4 w-4" />
          </Primary>
        </form>
        <p className="pt-2 text-center text-xs text-slate-500">
          New to Adrovis?{" "}
          <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700">
            Create an account
          </Link>
        </p>
      </div>
    </Shell>
  );
}

export function SignupPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const role = INTENTS.some((i) => i.id === params.get("role")) ? params.get("role") : "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [peek, setPeek] = useState("");
  const [notice, setNotice] = useState(false);

  // Screen 1: The "What brings you here?" choices
  if (!role) {
    return (
      <Shell role={peek} stepIndicator="STEP 1 / 3">
        <Heading
          kicker="Join Adrovis"
          title="What brings you"
          accent="here?"
          sub="Pick the closest match. We’ll ask the right questions next."
        />
        <div className="space-y-3.5">
          {INTENTS.map((i) => {
            const Icon = i.icon;
            return (
              <button
                key={i.id}
                type="button"
                onClick={() => setParams({ role: i.id })}
                onMouseEnter={() => setPeek(i.id)}
                onFocus={() => setPeek(i.id)}
                onMouseLeave={() => setPeek("")}
                onBlur={() => setPeek("")}
                className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.99]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {i.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                    {i.copy}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-600" />
              </button>
            );
          })}
        </div>
        <p className="mt-7 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </Shell>
    );
  }

  const intent = INTENTS.find((i) => i.id === role);

  // Shown when the backend requires email verification before a session is issued
  if (notice) {
    return (
      <Shell role={role} stepIndicator="STEP 1 / 3">
        <div className="space-y-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Mail className="h-6 w-6" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Verify your email.</h1>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
            We’ve sent a verification link to <b className="text-slate-800">{email}</b>. Open it, then log in to finish setting up your profile.
          </p>
          <ErrorLine>{error}</ErrorLine>
          <button
            type="button"
            onClick={async () => {
              setError("");
              try {
                await authService.resendVerification(email.trim());
              } catch (err) {
                setError(err.message);
              }
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            Resend email
          </button>
          <div className="pt-4">
            <Link to="/login" className="text-xs font-bold text-slate-500 hover:text-slate-800">
              Go to log in
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Please enter your full name.");
    if (password.length < 8) return setError("Use a password with at least 8 characters.");
    setBusy(true);
    try {
      const res = await authService.signup({ name: name.trim(), email: email.trim(), password, role });
      if (res.verificationRequired) setNotice(true);
      else navigate(`/onboarding/${role}`);
    } catch (err) {
      setError(err.message || "Failed to create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell role={role} stepIndicator="STEP 1 / 3">
      <Progress step={1} label="Create login" />
      <Heading
        title="Create your"
        accent="account."
        sub={
          <>
            You’re joining to {intent.goal}.{" "}
            <button
              type="button"
              onClick={() => setParams({})}
              className="font-bold text-blue-600 hover:text-blue-700 underline"
            >
              Change
            </button>
          </>
        }
      />
      <div className="space-y-4">
        <GoogleButton role={role} busy={busy} setBusy={setBusy} setError={setError}>
          Sign up with Google
        </GoogleButton>
        <Divider text="or sign up with email" />
        <form onSubmit={submit} className="space-y-3.5">
          <Field label="Full name" value={name} onChange={setName} placeholder="First and last name" required autoComplete="name" />
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@domain.com" required autoComplete="email" />
          <PasswordField label="Password" value={password} onChange={setPassword} placeholder="At least 8 characters" autoComplete="new-password" />
          <Strength value={password} />
          <ErrorLine>{error}</ErrorLine>
          <Primary busy={busy} busyText="Creating account…">
            Continue <ArrowRight className="h-4 w-4" />
          </Primary>
        </form>
        <p className="pt-2 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </div>
    </Shell>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || "Could not process request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell stepIndicator="">
      {sent ? (
        <div className="space-y-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Mail className="h-6 w-6" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Check your inbox.</h1>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
            If an account exists for <b className="text-slate-800">{email}</b>, we’ve sent instructions to reset your password.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="pt-2 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <>
          <Heading
            kicker="Account Recovery"
            title="Reset your"
            accent="password."
            sub="Enter your registered email and we’ll send a link to reset your account password."
          />
          <form onSubmit={submit} className="space-y-4">
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@domain.com" required autoComplete="email" />
            <ErrorLine>{error}</ErrorLine>
            <Primary busy={busy} busyText="Sending link…">
              Send reset link <ArrowRight className="h-4 w-4" />
            </Primary>
          </form>
        </>
      )}
      <div className="mt-7">
        <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to log in
        </Link>
      </div>
    </Shell>
  );
}

export function ResetPasswordPage() {
  const token = useToken();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!token) return setError("This reset link is invalid or incomplete.");
    if (password.length < 8) return setError("Use a password with at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setBusy(true);
    try {
      await authService.resetPassword({ token, password, confirmPassword: confirm });
      setDone(true);
    } catch (err) {
      setError(err.message || "This link may have expired. Request a new one.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell stepIndicator="">
      {done ? (
        <div className="space-y-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Check className="h-6 w-6" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Password updated.</h1>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-500">You can now log in with your new password.</p>
          <div className="pt-3">
            <Link to="/login" className="text-sm font-bold text-blue-600 hover:text-blue-700">
              Go to log in
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Heading kicker="Account Recovery" title="Choose a new" accent="password." sub="Enter a new password for your Adrovis account." />
          <form onSubmit={submit} className="space-y-3.5">
            <PasswordField label="New password" value={password} onChange={setPassword} placeholder="At least 8 characters" autoComplete="new-password" />
            <Strength value={password} />
            <PasswordField label="Confirm password" value={confirm} onChange={setConfirm} placeholder="Repeat password" autoComplete="new-password" />
            <ErrorLine>{error}</ErrorLine>
            <Primary busy={busy} busyText="Updating…">
              Update password <ArrowRight className="h-4 w-4" />
            </Primary>
          </form>
          <div className="mt-7">
            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to log in
            </Link>
          </div>
        </>
      )}
    </Shell>
  );
}

export function VerifyEmailPage() {
  const token = useToken();
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [error, setError] = useState("");
  const ran = useRef(false); // tokens are single-use: don't fire twice in StrictMode

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (!token) {
      setStatus("error");
      setError("This verification link is invalid.");
      return;
    }
    authService
      .verifyEmail(token)
      .then(() => setStatus("ok"))
      .catch((err) => {
        setStatus("error");
        setError(err.message || "This link may have expired.");
      });
  }, [token]);

  return (
    <Shell stepIndicator="">
      <div className="space-y-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Mail className="h-6 w-6" />
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
          {status === "loading" ? "Verifying your email…" : status === "ok" ? "Email verified." : "Couldn’t verify."}
        </h1>
        {status === "ok" && (
          <p className="text-xs sm:text-sm text-slate-500">Your email is confirmed. Log in to finish setting up your profile.</p>
        )}
        {status === "error" && <ErrorLine>{error}</ErrorLine>}
        {status !== "loading" && (
          <div className="pt-3">
            <Link to="/login" className="text-sm font-bold text-blue-600 hover:text-blue-700">
              Go to log in
            </Link>
          </div>
        )}
      </div>
    </Shell>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ country: "India", niches: [] });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    authService
      .currentUser()
      .then((u) => {
        if (!alive) return;
        if (!u) navigate("/login", { replace: true });
        else if (u.onboardingComplete) navigate(dashboardFor(u.role), { replace: true });
        else setUser(u);
      })
      .catch(() => alive && navigate("/login", { replace: true }));
    return () => {
      alive = false;
    };
  }, [navigate]);

  const role = user?.role || params.role;
  if (!user || !ABOUT[role]) {
    return (
      <Shell role={role} stepIndicator="">
        <p className="text-sm text-slate-400">Loading details…</p>
      </Shell>
    );
  }

  const steps = stepsFor(role);
  const current = steps[step];
  const last = step === steps.length - 1;
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const patch = (o) => setData((d) => ({ ...d, ...o }));

  async function next() {
    const problem = checkFields(current.fields, data);
    if (problem) return setError(problem);
    setError("");
    if (!last) return setStep(step + 1);

    setBusy(true);
    try {
      const clean = {};
      steps.flatMap((s) => s.fields).forEach((f) => {
        const v = data[f.key];
        if (f.kind === "city") {
          clean.city = data.city;
          clean.state = data.state;
          clean.country = data.country || "India";
          return;
        }
        clean[f.key] =
          f.kind === "social"
            ? normalizeSocial(v, f.social)
            : f.kind === "url"
            ? normalizeUrl(v)
            : f.kind === "phone"
            ? v
              ? `+91${v}`
              : ""
            : typeof v === "string"
            ? v.trim()
            : v;
      });
      const result = await authService.completeOnboarding({ role, ...clean });
      navigate(result?.dashboardUrl || dashboardFor(role));
    } catch (err) {
      setError(err.message || "Could not save your information. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell role={role} stepIndicator={`STEP ${step + 2} / ${TOTAL}`}>
      <Progress step={step + 2} label={current.name} />
      <Heading title={current.title} sub={current.sub} />
      <div key={step} className="grid gap-4 sm:grid-cols-3">
        {current.fields.map((f) => (
          <div key={f.key} className={f.col === 1 ? "" : "sm:col-span-3"}>
            {f.kind === "select" ? (
              <SelectField label={f.label} optional={f.optional} value={data[f.key]} onChange={(v) => set(f.key, v)} options={f.options} />
            ) : f.kind === "chips" ? (
              <Chips label={f.label} hint={f.hint} options={f.options} max={f.max} value={data[f.key]} onChange={(v) => set(f.key, v)} />
            ) : f.kind === "city" ? (
              <CityField label={f.label} hint={f.hint} data={data} onPick={patch} />
            ) : f.kind === "phone" ? (
              <PhoneField label={f.label} hint={f.hint} value={data[f.key]} onChange={(v) => set(f.key, v)} />
            ) : (
              <Field label={f.label} optional={f.optional} hint={f.hint} value={data[f.key]} onChange={(v) => set(f.key, v)} placeholder={f.placeholder || f.label} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ErrorLine>{error}</ErrorLine>
      </div>
      <div className="mt-6 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep(step - 1);
            }}
            className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:border-slate-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        <Primary type="button" onClick={next} busy={busy} busyText="Saving…">
          {last ? "Finish and open dashboard" : "Continue"} <ArrowRight className="h-4 w-4" />
        </Primary>
      </div>
    </Shell>
  );
}