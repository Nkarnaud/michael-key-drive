import { useEffect, useRef, useState } from "react";

// ===== Types =====
type ServiceKey = "key" | "ecm" | "module" | "mechanic" | "roadside" | "toll";
type VehicleKey = "sedan" | "suv" | "truck" | "luxury" | "commercial";
type YearKey = "" | "new" | "mid" | "old";
type UrgencyKey = "" | "standard" | "priority" | "emergency";

type PriceRow = Record<VehicleKey, [number, number]>;
type PriceMatrix = Record<ServiceKey, PriceRow>;

const priceMatrix: PriceMatrix = {
  key:      { sedan: [120, 250], suv: [140, 280], truck: [140, 280], luxury: [250, 450], commercial: [200, 380] },
  ecm:      { sedan: [350, 650], suv: [400, 750], truck: [400, 800], luxury: [600, 1200], commercial: [500, 1000] },
  module:   { sedan: [200, 450], suv: [230, 500], truck: [250, 550], luxury: [400, 850], commercial: [350, 700] },
  mechanic: { sedan: [80, 250],  suv: [100, 280], truck: [100, 300], luxury: [150, 400], commercial: [130, 350] },
  roadside: { sedan: [60, 150],  suv: [70, 170],  truck: [80, 200],  luxury: [80, 200],  commercial: [100, 220] },
  toll:     { sedan: [40, 120],  suv: [40, 120],  truck: [40, 120],  luxury: [50, 150],  commercial: [60, 160] },
};

// ===== Hooks =====
function useScrollReveal(): void {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useHeaderShadow(): void {
  useEffect(() => {
    const onScroll = (): void => {
      const header = document.querySelector("header");
      if (header) {
        (header as HTMLElement).style.boxShadow =
          window.scrollY > 20 ? "var(--shadow-sm)" : "none";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function smoothScrollTo(hash: string, onDone?: () => void): void {
  const target = document.querySelector(hash);
  if (target) {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    onDone?.();
  }
}

// ===== Header =====
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    smoothScrollTo(hash, () => setMenuOpen(false));
  };

  return (
    <header>
      <div className="nav-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <div className="logo-icon"><i className="fas fa-key" /></div>
          <div className="logo-text">
            <span>Michael KeyDrive</span>
            <small>&amp; AUTOMOTIVE</small>
          </div>
        </a>
        <nav>
          <ul id="navMenu" className={menuOpen ? "show" : ""}>
            <li><a href="#services" onClick={(e) => handleAnchor(e, "#services")}>Services</a></li>
            <li><a href="#estimator" onClick={(e) => handleAnchor(e, "#estimator")}>Get a Quote</a></li>
            <li><a href="#area" onClick={(e) => handleAnchor(e, "#area")}>Service Area</a></li>
            <li><a href="#booking" onClick={(e) => handleAnchor(e, "#booking")}>Book Now</a></li>
            <li><a href="#testimonials" onClick={(e) => handleAnchor(e, "#testimonials")}>Reviews</a></li>
          </ul>
        </nav>
        <a href="tel:+19013048123" className="btn btn-primary nav-cta">
          <i className="fas fa-phone" /> Call Now
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <i className="fas fa-bars" />
        </button>
      </div>
    </header>
  );
}

// ===== Hero =====
function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot" /> Available 24/7 — Mobile Service
          </div>
          <h1>
            Mobile Auto Electronics <span className="highlight">&amp; Roadside Help</span> — We Come to You.
          </h1>
          <p className="lead">
            Car key programming, ECM &amp; electronic module repair, mobile mechanic service, and roadside
            assistance. Trusted expertise wherever you are.
          </p>
          <div className="hero-cta">
            <a
              href="#booking"
              className="btn btn-primary btn-large"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#booking"); }}
            >
              <i className="fas fa-calendar-check" /> Request Service
            </a>
            <a href="tel:+19013048123" className="btn btn-outline btn-large">
              <i className="fas fa-phone" /> Call Now
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><span className="num">15+</span><span className="label">Years Experience</span></div>
            <div className="trust-item"><span className="num">30min</span><span className="label">Avg Response</span></div>
            <div className="trust-item"><span className="num">2,500+</span><span className="label">Happy Customers</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-main-circle"><i className="fas fa-car" /></div>
          <div className="hero-card hero-card-1">
            <div className="ico"><i className="fas fa-key" /></div>
            <div>
              <div className="title">Key Programming</div>
              <div className="desc">All makes &amp; models</div>
            </div>
          </div>
          <div className="hero-card hero-card-2">
            <div className="ico"><i className="fas fa-microchip" /></div>
            <div>
              <div className="title">ECM Programming</div>
              <div className="desc">Engine control modules</div>
            </div>
          </div>
          <div className="hero-card hero-card-3">
            <div className="ico"><i className="fas fa-truck-pickup" /></div>
            <div>
              <div className="title">Roadside Help</div>
              <div className="desc">24/7 emergency</div>
            </div>
          </div>
          <div className="hero-card hero-card-4">
            <div className="ico"><i className="fas fa-wrench" /></div>
            <div>
              <div className="title">Mobile Mechanic</div>
              <div className="desc">On-site repairs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Services =====
type Service = { icon: string; title: string; desc: string };
const SERVICES: readonly Service[] = [
  { icon: "fa-key",          title: "Car Key Programming", desc: "Lost your key? We program and cut transponder keys, smart keys, and remotes for virtually any vehicle on-site." },
  { icon: "fa-microchip",    title: "ECM Programming",     desc: "Engine control module diagnostics, programming, repair, and replacement using dealer-level tools." },
  { icon: "fa-bolt",         title: "Electronic Modules",  desc: "BCM, TCM, ABS, airbag, instrument cluster, and other module programming — flashed, coded, and ready to drive." },
  { icon: "fa-wrench",       title: "Mobile Mechanic",     desc: "Brake jobs, diagnostics, batteries, alternators, starters and more — performed at your home, office, or wherever you are." },
  { icon: "fa-truck-pickup", title: "Roadside Assistance", desc: "Jump starts, lockouts, fuel delivery, tire changes, and emergency repairs — 24/7 dispatch when you need us most." },
  { icon: "fa-road",         title: "Toll Services",       desc: "Toll account assistance, transponder setup, and resolution help to keep you moving on the road." },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Services</span>
          <h2>Expert Auto Solutions, Delivered to You</h2>
          <p>Specialized in modern automotive electronics and full-service mobile support — no shop visit required.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card reveal">
              <div className="ico"><i className={`fas ${s.icon}`} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Estimator =====
function Estimator() {
  const [service, setService] = useState<ServiceKey | "">("");
  const [vehicle, setVehicle] = useState<VehicleKey | "">("");
  const [year, setYear] = useState<YearKey>("");
  const [urgency, setUrgency] = useState<UrgencyKey>("");
  const [price, setPrice] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = (): void => {
    if (!service || !vehicle || !year || !urgency) {
      alert("Please complete all fields to get an estimate.");
      return;
    }

    let [low, high] = priceMatrix[service][vehicle];

    if (year === "new") { low *= 1.15; high *= 1.20; }
    else if (year === "old") { low *= 0.90; high *= 0.95; }

    if (urgency === "priority") { low *= 1.10; high *= 1.15; }
    else if (urgency === "emergency") { low *= 1.25; high *= 1.35; }

    setPrice(`$${Math.round(low)} – $${Math.round(high)}`);
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <section className="estimator" id="estimator">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Instant Quote</span>
          <h2>Get a Price Estimate in Seconds</h2>
          <p>Transparent pricing — no surprises. Final quote confirmed before any work begins.</p>
        </div>
        <div className="estimator-card">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="est-service">Service Needed</label>
              <select id="est-service" value={service} onChange={(e) => setService(e.target.value as ServiceKey | "")}>
                <option value="">Select a service...</option>
                <option value="key">Car Key Programming</option>
                <option value="ecm">ECM Programming</option>
                <option value="module">Electronic Module Programming</option>
                <option value="mechanic">Mobile Mechanic Visit</option>
                <option value="roadside">Roadside Assistance</option>
                <option value="toll">Toll Services</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="est-vehicle">Vehicle Type</label>
              <select id="est-vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value as VehicleKey | "")}>
                <option value="">Select vehicle type...</option>
                <option value="sedan">Sedan / Coupe</option>
                <option value="suv">SUV / Crossover</option>
                <option value="truck">Truck</option>
                <option value="luxury">Luxury / European</option>
                <option value="commercial">Commercial Vehicle</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="est-year">Vehicle Year</label>
              <select id="est-year" value={year} onChange={(e) => setYear(e.target.value as YearKey)}>
                <option value="">Select year...</option>
                <option value="new">2015 – Present</option>
                <option value="mid">2005 – 2014</option>
                <option value="old">Before 2005</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="est-urgency">Urgency</label>
              <select id="est-urgency" value={urgency} onChange={(e) => setUrgency(e.target.value as UrgencyKey)}>
                <option value="">Select urgency...</option>
                <option value="standard">Standard (within 24h)</option>
                <option value="priority">Priority (same day)</option>
                <option value="emergency">Emergency (now)</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-large"
            onClick={calculate}
            style={{ width: "100%", justifyContent: "center" }}
          >
            <i className="fas fa-calculator" /> Calculate My Estimate
          </button>
          <div ref={resultRef} className={`estimate-result${price ? " show" : ""}`}>
            <div style={{ color: "var(--gray-600)", fontSize: "0.9rem" }}>Estimated Price Range</div>
            <div className="price">{price ?? "$0 – $0"}</div>
            <div className="note">Final price confirmed on-site after diagnosis. No hidden fees.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Service Area =====
function ServiceArea() {
  return (
    <section className="area" id="area">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Coverage Area</span>
          <h2>Serving the Greater Metro Region</h2>
          <p>We come to you — anywhere within our service zone, day or night.</p>
        </div>
        <div className="area-grid">
          <div className="area-info">
            <h3>We're Right Around the Corner</h3>
            <p>
              Our mobile units cover a wide service radius with fast response times. Outside the main zone? Call
              us — we may still be able to help.
            </p>
            <ul className="coverage-list">
              <li><i className="fas fa-check-circle" /> Downtown &amp; surrounding suburbs</li>
              <li><i className="fas fa-check-circle" /> Major highways &amp; interstates</li>
              <li><i className="fas fa-check-circle" /> Residential &amp; commercial areas</li>
              <li><i className="fas fa-check-circle" /> Available 24/7 for emergencies</li>
              <li><i className="fas fa-check-circle" /> Extended service by appointment</li>
            </ul>
          </div>
          <div className="map-container">
            <svg className="map-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="coverageGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1e6fd9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1e6fd9" stopOpacity="0.05" />
                </radialGradient>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="500" height="420" fill="#f8fafc" />
              <rect width="500" height="420" fill="url(#grid)" />

              {/* Roads */}
              <path d="M 0 180 Q 150 160 250 200 T 500 220" stroke="#cbd5e1" strokeWidth="6" fill="none" />
              <path d="M 250 0 Q 240 100 260 210 T 280 420" stroke="#cbd5e1" strokeWidth="6" fill="none" />
              <path d="M 0 320 L 500 300" stroke="#cbd5e1" strokeWidth="4" fill="none" />
              <path d="M 100 0 L 120 420" stroke="#cbd5e1" strokeWidth="4" fill="none" />
              <path d="M 380 0 L 400 420" stroke="#cbd5e1" strokeWidth="4" fill="none" />

              {/* Coverage zone */}
              <circle cx="250" cy="210" r="170" fill="url(#coverageGrad)" stroke="#1e6fd9" strokeWidth="2" strokeDasharray="6 6" />

              {/* HQ Pin */}
              <g className="map-pin">
                <circle cx="250" cy="210" r="20" fill="#0a2540" />
                <circle cx="250" cy="210" r="20" fill="none" stroke="#0a2540" strokeWidth="2" opacity="0.3">
                  <animate attributeName="r" from="20" to="40" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="216" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">M</text>
              </g>

              {/* Service vehicle pins */}
              <g className="map-pin">
                <path d="M 130 130 L 138 145 L 122 145 Z" fill="#1e6fd9" />
                <circle cx="130" cy="125" r="10" fill="#1e6fd9" />
                <text x="130" y="129" textAnchor="middle" fill="white" fontSize="10">🚐</text>
              </g>
              <g className="map-pin">
                <path d="M 370 280 L 378 295 L 362 295 Z" fill="#10b981" />
                <circle cx="370" cy="275" r="10" fill="#10b981" />
                <text x="370" y="279" textAnchor="middle" fill="white" fontSize="10">✓</text>
              </g>
              <g className="map-pin">
                <path d="M 180 320 L 188 335 L 172 335 Z" fill="#f59e0b" />
                <circle cx="180" cy="315" r="10" fill="#f59e0b" />
                <text x="180" y="319" textAnchor="middle" fill="white" fontSize="10">!</text>
              </g>
              <g className="map-pin">
                <path d="M 340 130 L 348 145 L 332 145 Z" fill="#1e6fd9" />
                <circle cx="340" cy="125" r="10" fill="#1e6fd9" />
              </g>

              {/* Labels */}
              <text x="250" y="60" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="600">
                Service Coverage Zone
              </text>
              <text x="250" y="78" textAnchor="middle" fill="#94a3b8" fontSize="11">~25 mile radius</text>

              <rect x="20" y="370" width="160" height="40" rx="8" fill="white" stroke="#e2e8f0" />
              <circle cx="38" cy="385" r="6" fill="#0a2540" />
              <text x="52" y="389" fill="#1e293b" fontSize="11" fontWeight="600">HQ</text>
              <circle cx="90" cy="385" r="6" fill="#1e6fd9" />
              <text x="104" y="389" fill="#1e293b" fontSize="11" fontWeight="600">Mobile Unit</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Booking =====
const TOTAL_STEPS = 4;

function Booking() {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const next = (): void => {
    if (step === TOTAL_STEPS) {
      setSubmitted(true);
      return;
    }
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };
  const prev = (): void => setStep((s) => Math.max(1, s - 1));

  const stepClass = (n: number): string => {
    if (n < step) return "step completed";
    if (n === step) return "step active";
    return "step";
  };

  return (
    <section className="booking" id="booking">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Book Service</span>
          <h2>Request Service in 4 Easy Steps</h2>
          <p>Fill out the form below and we'll confirm your appointment within 15 minutes.</p>
        </div>
        <div className="booking-card">
          {!submitted && (
            <div className="stepper">
              <div className={stepClass(1)} data-step="1"><div className="step-num">1</div><div className="step-label">Service</div></div>
              <div className={stepClass(2)} data-step="2"><div className="step-num">2</div><div className="step-label">Vehicle</div></div>
              <div className={stepClass(3)} data-step="3"><div className="step-num">3</div><div className="step-label">Location</div></div>
              <div className={stepClass(4)} data-step="4"><div className="step-num">4</div><div className="step-label">Contact</div></div>
            </div>
          )}

          {!submitted && step === 1 && (
            <div className="step-content active">
              <h4>What service do you need?</h4>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>Service Type</label>
                <select defaultValue="">
                  <option value="">Select a service...</option>
                  <option>Car Key Programming</option>
                  <option>ECM Programming</option>
                  <option>Electronic Module Programming</option>
                  <option>Mobile Mechanic Visit</option>
                  <option>Roadside Assistance</option>
                  <option>Toll Services</option>
                </select>
              </div>
              <div className="form-group">
                <label>Brief description of the issue</label>
                <input type="text" placeholder="e.g. Engine light on, need ECM reflashed" />
              </div>
            </div>
          )}

          {!submitted && step === 2 && (
            <div className="step-content active">
              <h4>Tell us about your vehicle</h4>
              <div className="form-row">
                <div className="form-group"><label>Make</label><input type="text" placeholder="e.g. Toyota" /></div>
                <div className="form-group"><label>Model</label><input type="text" placeholder="e.g. Camry" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Year</label><input type="text" placeholder="e.g. 2020" /></div>
                <div className="form-group"><label>VIN (optional)</label><input type="text" placeholder="17-digit VIN" /></div>
              </div>
            </div>
          )}

          {!submitted && step === 3 && (
            <div className="step-content active">
              <h4>Where should we meet you?</h4>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>Street Address</label>
                <input type="text" placeholder="123 Main St" />
              </div>
              <div className="form-row">
                <div className="form-group"><label>City</label><input type="text" placeholder="City" /></div>
                <div className="form-group"><label>ZIP Code</label><input type="text" placeholder="00000" /></div>
              </div>
              <div className="form-group">
                <label>Preferred Time</label>
                <select defaultValue="As soon as possible">
                  <option>As soon as possible</option>
                  <option>Within a few hours</option>
                  <option>Tomorrow</option>
                  <option>Schedule a specific time</option>
                </select>
              </div>
            </div>
          )}

          {!submitted && step === 4 && (
            <div className="step-content active">
              <h4>How can we reach you?</h4>
              <div className="form-row">
                <div className="form-group"><label>Full Name</label><input type="text" placeholder="Your name" /></div>
                <div className="form-group"><label>Phone Number</label><input type="tel" placeholder="(555) 555-5555" /></div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" />
              </div>
            </div>
          )}

          {submitted && (
            <div className="booking-success show">
              <div className="check-circle"><i className="fas fa-check" /></div>
              <h3>Request Received!</h3>
              <p>Thanks for reaching out. We'll contact you within 15 minutes to confirm your appointment and ETA.</p>
            </div>
          )}

          {!submitted && (
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={prev}
                style={{ visibility: step === 1 ? "hidden" : "visible" }}
              >
                <i className="fas fa-arrow-left" /> Back
              </button>
              <button type="button" className="btn btn-primary" onClick={next}>
                {step === TOTAL_STEPS ? (
                  <>Submit Request <i className="fas fa-check" /></>
                ) : (
                  <>Next <i className="fas fa-arrow-right" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ===== Why Choose Us =====
type WhyItem = { icon: string; title: string; desc: string };
const WHY: readonly WhyItem[] = [
  { icon: "fa-certificate",  title: "Certified Technicians",   desc: "Factory-trained on modern automotive electronics and programming systems." },
  { icon: "fa-clock",        title: "Fast Response",           desc: "Average 30-minute arrival within our service zone, 24 hours a day." },
  { icon: "fa-dollar-sign",  title: "Transparent Pricing",     desc: "Upfront estimates with no hidden fees. You approve before any work starts." },
  { icon: "fa-shield-alt",   title: "Workmanship Warranty",    desc: "Every service backed by our quality guarantee for total peace of mind." },
];

function WhyUs() {
  return (
    <section className="why">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Why Us</span>
          <h2>The Trusted Choice for Auto Electronics</h2>
          <p>We bring dealer-level expertise straight to your driveway — at a fraction of the cost.</p>
        </div>
        <div className="why-grid">
          {WHY.map((w) => (
            <div key={w.title} className="why-card reveal">
              <div className="ico"><i className={`fas ${w.icon}`} /></div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Testimonials =====
type Testimonial = { quote: string; initials: string; name: string; service: string };
const TESTIMONIALS: readonly Testimonial[] = [
  { quote: "Lost my only key on a Sunday night. Michael came out within an hour, programmed a new one right in my driveway. Lifesaver!", initials: "JS", name: "James S.", service: "Key Programming" },
  { quote: "Dealer wanted $1,200 for ECM work. Michael did it for half the price, on-site, and was finished in two hours. Highly recommend.", initials: "MR", name: "Maria R.", service: "ECM Programming" },
  { quote: "Stranded on the interstate with a dead battery. Michael was there in 25 minutes with a jump and a new battery. Professional and fair.", initials: "DW", name: "David W.", service: "Roadside Assistance" },
  { quote: "Honest, knowledgeable, and genuinely cares about doing the work right. My go-to mechanic for everything now.", initials: "AL", name: "Angela L.", service: "Mobile Mechanic" },
  { quote: "Had a BCM issue no one else could figure out. Michael diagnosed it in 20 minutes and had the part programmed the next day. The guy knows his stuff.", initials: "RT", name: "Robert T.", service: "Module Programming" },
  { quote: "Convenient, fast, and trustworthy. Booked online, got a confirmation within minutes, and the service was excellent.", initials: "KP", name: "Kelly P.", service: "Mobile Mechanic" },
];

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Reviews</span>
          <h2>What Our Customers Say</h2>
          <p>Real feedback from drivers we've helped get back on the road.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card reveal">
              <div className="stars">★★★★★</div>
              <p>"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="avatar">{t.initials}</div>
                <div className="author-info">
                  <div className="name">{t.name}</div>
                  <div className="service">{t.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CTA Banner =====
function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2>Need Help Right Now?</h2>
        <p>Whether you're locked out, stranded, or just stuck — we're one call away.</p>
        <div className="cta-buttons">
          <a href="tel:+19013048123" className="btn btn-primary btn-large">
            <i className="fas fa-phone" /> Call (901) 304-8123
          </a>
          <a
            href="#booking"
            className="btn btn-outline btn-large"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("#booking"); }}
          >
            <i className="fas fa-calendar-check" /> Schedule Service
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className="logo-icon"><i className="fas fa-key" /></div>
            <div className="logo-text">
              <span style={{ color: "white" }}>Michael KeyDrive</span>
              <small>&amp; AUTOMOTIVE</small>
            </div>
          </a>
          <p>Mobile auto electronics, key programming, and roadside services. We come to you — wherever you are.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="#" aria-label="Google"><i className="fab fa-google" /></a>
            <a href="#" aria-label="Yelp"><i className="fab fa-yelp" /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Key Programming</a></li>
            <li><a href="#services">ECM Programming</a></li>
            <li><a href="#services">Module Programming</a></li>
            <li><a href="#services">Mobile Mechanic</a></li>
            <li><a href="#services">Roadside Assistance</a></li>
            <li><a href="#services">Toll Services</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#area">Service Area</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#booking">Book Service</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><i className="fas fa-phone" /> (901) 304-8123</li>
            <li><i className="fas fa-envelope" /> <a href="mailto:michaelkeydrive41@gmail.com">michaelkeydrive41@gmail.com</a></li>
            <li><i className="fas fa-clock" /> 24/7 Service</li>
            <li><i className="fas fa-map-marker-alt" /> Greater Metro Area</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Michael KeyDrive &amp; Automotive. All rights reserved.
      </div>
    </footer>
  );
}

// ===== App =====
export default function App() {
  useHeaderShadow();
  useScrollReveal();

  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Estimator />
      <ServiceArea />
      <Booking />
      <WhyUs />
      <Testimonials />
      <CtaBanner />
      <Footer />
      <a href="tel:+19013048123" className="floating-call" title="Call now" aria-label="Call now">
        <i className="fas fa-phone" />
      </a>
    </>
  );
}
