import { motion } from "motion/react";
import {
  Wind,
  Thermometer,
  Droplets,
  ShieldCheck,
  Wrench,
  Flame,
  GaugeCircle,
  ArrowRight,
  Tag,
  Phone,
  CheckCircle2,
  MapPin,
  Award,
} from "lucide-react";
import { PHONE_LABEL, PHONE_TEL } from "../layout/LandingParts";

// --- Services (6 cards — broad HVAC breadth, matches what top-5 operators show) ---
const Services = () => {
  const list = [
    {
      title: "AC Repair & Diagnostics",
      desc: "Rapid same-day diagnostics on all AC brands and models. We find the problem fast and fix it right the first time.",
      icon: <Wind aria-hidden="true" className="w-7 h-7" />,
    },
    {
      title: "Heating System Repair",
      desc: "Furnace, heat pump, and baseboard heater repair for all makes and models — warrantied and done right.",
      icon: <Flame aria-hidden="true" className="w-7 h-7" />,
    },
    {
      title: "System Installation",
      desc: "Expert installation of eco-friendly, energy-efficient AC and heating systems tailored to your home's exact needs.",
      icon: <GaugeCircle aria-hidden="true" className="w-7 h-7" />,
    },
    {
      title: "Maintenance & Tune-Ups",
      desc: "Preventive care including filter changes, efficiency checks, and full seasonal tune-ups that keep your system running like new.",
      icon: <Wrench aria-hidden="true" className="w-7 h-7" />,
    },
    {
      title: "Energy-Efficient Upgrades",
      desc: "Upgrade to a modern, high-SEER system and cut your energy bill — Domingo specializes in eco-friendly solutions.",
      icon: <Thermometer aria-hidden="true" className="w-7 h-7" />,
    },
    {
      title: "Indoor Air Quality",
      desc: "Improve your home's air with whole-home filtration, purification, and ventilation solutions for year-round comfort.",
      icon: <Droplets aria-hidden="true" className="w-7 h-7" />,
    },
  ];

  return (
    <section id="services" className="section-padding bg-stone border-b border-charcoal/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-luxury-gold text-[10px] font-bold tracking-[0.4em] uppercase block mb-6">Full-Service HVAC</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              Everything your <span className="font-bold italic">home</span> needs <br className="hidden md:block" />— under <span className="font-bold">one roof.</span>
            </h2>
          </div>
          <p className="text-charcoal/60 max-w-sm leading-relaxed text-sm lg:text-base font-light">
            AC, furnaces, heat pumps, air quality, and ductwork from one trusted team — backed by a 100% satisfaction guarantee on every visit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/5 border border-charcoal/5 shadow-2xl">
          {list.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-10 lg:p-14 hover:bg-stone transition-colors duration-700 group relative overflow-hidden flex flex-col"
            >
              <div className="mb-8 text-charcoal group-hover:text-luxury-gold transition-colors duration-500 transform group-hover:scale-110 origin-left">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
              <p className="text-charcoal/60 mb-8 leading-relaxed font-light text-sm flex-1">{item.desc}</p>
              <a
                href="#contact"
                aria-label={`Schedule ${item.title}`}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal group-hover:text-luxury-gold transition-colors"
              >
                Schedule Service <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <div aria-hidden="true" className="absolute top-0 right-0 w-32 h-32 bg-stone/50 translate-x-16 -translate-y-16 rotate-45 group-hover:bg-luxury-gold/5 transition-colors" />
            </motion.article>
          ))}
        </div>

        {/* Reinforcing CTA row under services */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#contact" className="px-10 py-5 bg-charcoal text-white text-[11px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors inline-flex items-center gap-3">
            Book Same-Day Service <ArrowRight aria-hidden="true" size={14} />
          </a>
          <a href={PHONE_TEL} className="px-10 py-5 border border-charcoal/15 text-charcoal text-[11px] font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-colors inline-flex items-center gap-3">
            <Phone aria-hidden="true" size={14} /> Call {PHONE_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Specials (promotional hooks — common across every top-5 site) ---
const Specials = () => {
  const offers = [
    {
      badge: "Diagnostic",
      headline: "$49 Service Call",
      sub: "Waived with any repair. No hidden fees, ever.",
      fine: "New customers · Select areas",
    },
    {
      badge: "Tune-Up",
      headline: "$89 Precision Tune-Up",
      sub: "21-point inspection before the next heatwave — keeps your warranty valid.",
      fine: "Limited spring/fall availability",
    },
    {
      badge: "New Install",
      headline: "Up to $1,500 Off",
      sub: "On qualifying high-efficiency systems, stackable with 0% financing.",
      fine: "Pre-approved in under 60 seconds",
    },
  ];

  return (
    <section id="specials" aria-labelledby="specials-heading" className="section-padding bg-white border-b border-charcoal/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <span className="text-luxury-gold text-[10px] font-bold tracking-[0.4em] uppercase block mb-6 inline-flex items-center gap-2">
            <Tag aria-hidden="true" size={12} /> Current Specials
          </span>
          <h2 id="specials-heading" className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            Premium service, <span className="font-bold italic">honestly</span> priced.
          </h2>
          <p className="mt-6 text-charcoal/60 max-w-xl leading-relaxed">
            Real promos — not gimmicks. Mention any of these when you book, and we'll apply the discount automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative p-10 border border-charcoal/10 bg-stone/40 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col"
            >
              <span className="inline-block text-[9px] font-bold tracking-[0.3em] uppercase text-luxury-gold mb-6">
                {o.badge}
              </span>
              <h3 className="text-3xl lg:text-4xl font-light tracking-tight mb-3 leading-tight">
                <span className="font-bold">{o.headline}</span>
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed mb-8 flex-1">{o.sub}</p>
              <div className="flex items-center justify-between border-t border-charcoal/10 pt-5 mt-auto">
                <p className="text-[9px] tracking-widest uppercase text-charcoal/40">{o.fine}</p>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal group-hover:text-luxury-gold transition-colors">
                  Claim <ArrowRight aria-hidden="true" size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Guarantee (hard guarantee language — a top-5 constant) ---
const Guarantee = () => {
  const promises = [
    { title: "100% Satisfaction", desc: "We don't leave until it's right. If you're not happy, you don't pay." },
    { title: "Upfront Pricing", desc: "Flat-rate quotes approved before we start. No surprise charges, no hourly clock." },
    { title: "On-Time Promise", desc: "We arrive inside your scheduled window or the service call is on us." },
    { title: "2-Year Labor Warranty", desc: "Every repair is covered for 2 full years. Parts warranty matches the manufacturer." },
  ];

  return (
    <section id="guarantee" aria-labelledby="guarantee-heading" className="section-padding bg-charcoal text-white overflow-hidden relative">
      <div aria-hidden="true" className="absolute -top-16 -left-16 w-80 h-80 border-t border-l border-luxury-gold/10 rotate-45" />
      <div aria-hidden="true" className="absolute -bottom-16 -right-16 w-80 h-80 border-b border-r border-luxury-gold/10 rotate-45" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-luxury-gold text-[10px] font-bold tracking-[0.4em] uppercase block mb-6 inline-flex items-center gap-2">
              <Award aria-hidden="true" size={12} /> The DC Heating Promise
            </span>
            <h2 id="guarantee-heading" className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight mb-8">
              Done right, <br /><span className="font-bold italic">guaranteed</span>. In writing.
            </h2>
            <p className="text-white/60 leading-relaxed max-w-md mb-10">
              Every visit is backed by four written guarantees. If we miss on any one of them, you don't pay — period.
            </p>
            <a href="#contact" className="inline-flex items-center gap-3 px-10 py-5 bg-luxury-gold text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors">
              Book With Confidence <ArrowRight aria-hidden="true" size={14} />
            </a>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {promises.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <CheckCircle2 aria-hidden="true" className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold tracking-tight mb-2">{p.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// --- Zoom Image helper — reused by BeforeAfter ---
const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={1280}
        height={720}
        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

// --- Before/After Gallery ---
const BeforeAfter = () => {
  return (
    <section id="transformations" className="bg-charcoal text-white section-padding overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-luxury-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Real Local Installs</span>
          <h2 className="text-4xl md:text-5xl font-light mb-8">System <span className="font-bold italic">Transformations</span></h2>
          <p className="text-white/50">
            Actual before-and-after installs — finished on-time, on-budget, and backed by our Guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {[
            {
              label: "BEFORE",
              status: "AGING UNIT · HIGH ENERGY BILLS",
              alt: "Older HVAC system before DC Heating replacement service in San Jose",
              image: "/brand/service-before.jpg",
            },
            {
              label: "AFTER",
              status: "NEW ECO-FRIENDLY SYSTEM · SAME-DAY INSTALL",
              alt: "Brand-new energy-efficient HVAC system installed by DC Heating and Air Conditioning",
              image: "/brand/install-after.jpg",
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative aspect-video overflow-hidden group rounded-sm shadow-2xl"
            >
              <ZoomImage src={box.image} alt={box.alt} />
              <div aria-hidden="true" className="absolute inset-0 bg-charcoal/40 group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute bottom-6 left-6 p-4 bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-[10px] font-bold tracking-widest mb-1 text-luxury-gold">{box.label}</p>
                <p className="text-xs font-medium tracking-tight uppercase">{box.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Financing Promo ---
const FinancingPromo = () => {
  return (
    <section id="financing" className="relative -mt-24 z-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-luxury-gold p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between text-white gap-12 shadow-2xl relative overflow-hidden"
        >
          <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white/10 -translate-y-32 translate-x-32 rotate-45" />

          <div className="max-w-xl text-center lg:text-left z-10">
            <span className="text-white/70 text-[10px] font-bold tracking-[0.4em] uppercase block mb-4 inline-flex items-center gap-2">
              <ShieldCheck aria-hidden="true" size={12} /> Limited-Time Financing
            </span>
            <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-tight leading-[1.05]">
              $0 Down · <span className="font-bold italic">0% APR</span> · 60 Months
            </h2>
            <p className="text-white/90 text-lg sm:text-xl font-light leading-relaxed">
              On new high-efficiency system installs. Pre-qualify in under 60 seconds — soft credit check only, no impact on your score.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-auto z-10">
            <a href="#contact" className="px-12 py-5 bg-charcoal text-white font-bold uppercase tracking-[0.2em] text-[11px] border border-charcoal hover:bg-white hover:text-charcoal transition-all duration-500 shadow-xl text-center inline-flex items-center justify-center gap-3">
              Check Eligibility <ArrowRight aria-hidden="true" size={14} />
            </a>
            <a href={PHONE_TEL} className="px-12 py-5 border border-white/40 text-white font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-charcoal transition-all duration-500 text-center inline-flex items-center justify-center gap-3">
              <Phone aria-hidden="true" size={14} /> Talk to Financing
            </a>
            <p className="text-[9px] text-center font-mono text-white/70 uppercase tracking-widest leading-none">Subject to credit approval · Terms apply</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Service Areas (local SEO + conversion pattern) ---
const ServiceAreas = () => {
  const areas = [
    "San Jose",
    "Evergreen",
    "East Foothills",
    "Alum Rock",
    "Berryessa",
    "Milpitas",
    "Santa Clara",
    "Sunnyvale",
    "Cupertino",
    "Campbell",
    "Los Gatos",
    "Saratoga",
    "Willow Glen",
    "Blossom Valley",
    "Morgan Hill",
    "Gilroy",
  ];

  return (
    <section id="service-area" aria-labelledby="service-area-heading" className="section-padding bg-stone">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-luxury-gold text-[10px] font-bold tracking-[0.4em] uppercase block mb-6 inline-flex items-center gap-2">
              <MapPin aria-hidden="true" size={12} /> Where We Serve
            </span>
            <h2 id="service-area-heading" className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-6">
              Your South Bay's <span className="font-bold italic">local</span> HVAC expert.
            </h2>
            <p className="text-charcoal/60 leading-relaxed mb-8 max-w-md">
              Based in San Jose with 35+ years serving the greater South Bay Area — most appointments booked the same week you call.
            </p>
            <a href="#contact" className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-white text-[11px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors">
              Confirm My Zip <ArrowRight aria-hidden="true" size={14} />
            </a>
          </div>

          <ul className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10">
            {areas.map((a) => (
              <li key={a} className="bg-white py-5 px-6 text-sm font-medium tracking-tight flex items-center gap-3 hover:bg-stone transition-colors">
                <MapPin aria-hidden="true" size={14} className="text-luxury-gold flex-shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Services, Specials, Guarantee, BeforeAfter, FinancingPromo, ServiceAreas };
