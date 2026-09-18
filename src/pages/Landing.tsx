import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

/* ---------- palette tones for studio scenes ---------- */

const TONES = {
  graphite: ["#3a3d44", "#23252a"] as const,
  champagne: ["#8f8468", "#6b6250"] as const,
  silver: ["#5a5e66", "#42454c"] as const,
  midnight: ["#3a4050", "#2b303c"] as const,
  bronze: ["#6e5f49", "#514637"] as const,
};

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Transformation", href: "#transformation" },
  { label: "Process", href: "#process" },
  { label: "Interior", href: "#interior" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#book" },
];

const SERVICES = [
  {
    index: "01",
    name: "Essential Detail",
    price: "from $149",
    duration: "2–3 hours",
    copy: "The complete reset for a well-kept car — a meticulous hand wash, decontamination and interior refinish, performed to inspection standard.",
    features: [
      "pH-neutral hand wash & foam",
      "Wheel & arch decontamination",
      "Interior vacuum & dressing",
      "Glass, polished and sealed",
    ],
    image: "/process-1.jpg",
    alt: "Foam wash across dark paintwork",
  },
  {
    index: "02",
    name: "Signature Correction",
    price: "from $329",
    duration: "5–6 hours",
    copy: "Single-stage machine polishing that removes swirl marks and restores true depth of gloss, sealed with a twelve-month ceramic layer.",
    features: [
      "Clay & chemical decontamination",
      "Single-stage gloss enhancement",
      "12-month ceramic sealant",
      "Leather feed & interior deep clean",
    ],
    image: "/process-2.jpg",
    alt: "Machine polishing a car panel",
  },
  {
    index: "03",
    name: "Showroom Ceramic",
    price: "from $649",
    duration: "1–2 days",
    copy: "Multi-stage paint correction finished with a certified two-year ceramic coating — the standard we hold our own vehicles to.",
    features: [
      "Multi-stage paint correction",
      "2-year certified ceramic coating",
      "Engine bay & trim restoration",
      "Collection & return available",
    ],
    image: "/process-4.jpg",
    alt: "Hand-applying ceramic coating",
  },
];

const GALLERY = [
  { title: "Correction work — machine polishing", src: "/process-2.jpg", span: "md:col-span-7", aspect: "aspect-[16/10]" },
  { title: "Delivery standard — showroom finish", src: "/hero.jpg", span: "md:col-span-5", aspect: "aspect-[4/3]" },
  { title: "Protection layer — ceramic application", src: "/process-4.jpg", span: "md:col-span-5", aspect: "aspect-[4/3]" },
  { title: "Final inspection — under studio light", src: "/process-3.jpg", span: "md:col-span-7", aspect: "aspect-[16/10]" },
];

const PROCESS = [
  {
    index: "01",
    step: "Step 01 — Wash",
    title: "Wash & Decontamination",
    copy: "pH-neutral foam, two-bucket contact wash, then iron and tar removal across every panel and arch.",
    src: "/process-1.jpg",
    alt: "Detailer rinsing thick foam across dark paintwork",
  },
  {
    index: "02",
    step: "Step 02 — Correct",
    title: "Machine Polishing",
    copy: "Measured compound and polish passes lift swirl marks and restore true depth to the clear coat.",
    src: "/process-2.jpg",
    alt: "Dual-action polisher refining a car panel",
  },
  {
    index: "03",
    step: "Step 03 — Inspect",
    title: "Inspection Under Light",
    copy: "Panels are examined under studio lighting and gloss is measured before any protection is applied.",
    src: "/process-3.jpg",
    alt: "Close inspection of paint under a work light",
  },
  {
    index: "04",
    step: "Step 04 — Protect",
    title: "Ceramic Sealing",
    copy: "A protective coating is applied, cured and quality-checked — locked in for twelve months or more.",
    src: "/process-4.jpg",
    alt: "Ceramic coating being applied by hand",
  },
];

const INTERIOR_FEATURES = [
  "Deep vacuum & crevice extraction",
  "Steam clean — vents, seams & rails",
  "Leather clean, feed & matte finish",
  "Carpet & upholstery shampoo",
  "Glass, trim & switchgear dressed",
];

const QUOTES = [
  {
    text: "The paint looks deeper than the day it left the factory. They corrected swirls two other studios told me were permanent.",
    name: "Amara C.",
    car: "911 Carrera",
  },
  {
    text: "They arrived on the minute, worked quietly, and left the car better than new. This is what a premium service feels like.",
    name: "Marcus W.",
    car: "Range Rover Autobiography",
  },
  {
    text: "Every panel inspected, every seam detailed. I have not seen a car presented like this outside a showroom.",
    name: "Sofia D.",
    car: "Model S",
  },
];

const STATS = [
  { value: "1,200+", label: "Details completed" },
  { value: "4.9", label: "Average client rating" },
  { value: "2 yr", label: "Ceramic coating warranty" },
];

/* ---------- studio scene (photographic composition) ---------- */

function CarScene({
  tone,
  horizon = "62%",
  sweep = 0.14,
}: {
  tone: readonly [string, string];
  horizon?: string;
  sweep?: number;
}) {
  const [body, deep] = tone;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* studio wall */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #202225 0%, #2a2d31 68%, #303338 100%)" }}
      />
      {/* ceiling light pool */}
      <div
        className="absolute left-1/2 top-0 h-[55%] w-[85%] -translate-x-1/2"
        style={{ background: "radial-gradient(60% 90% at 50% 0%, rgba(255,246,230,0.09), transparent 70%)" }}
      />
      {/* floor */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ top: horizon, background: "linear-gradient(to bottom, #17181b 0%, #0f1013 100%)" }}
      />
      <div className="absolute inset-x-0 h-px" style={{ top: horizon, background: "rgba(255,255,255,0.07)" }} />

      {/* car silhouette */}
      <div className="absolute" style={{ left: "7%", right: "7%", bottom: `calc(${horizon} - 4px)`, height: "36%" }}>
        {/* floor reflection */}
        <div
          className="absolute inset-x-[4%] top-full h-full rounded-[50%]"
          style={{
            background: `linear-gradient(to bottom, ${deep}55, transparent 70%)`,
            filter: "blur(7px)",
            transform: "scaleY(0.5)",
            transformOrigin: "top",
          }}
        />
        {/* cabin */}
        <div
          className="absolute left-[18%] right-[24%] top-0 h-[60%] rounded-t-[48%]"
          style={{ background: `linear-gradient(to bottom, ${body}, ${deep})` }}
        />
        {/* body */}
        <div
          className="absolute inset-x-0 bottom-0 h-[58%] rounded-[12px_18px_5px_5px]"
          style={{ background: `linear-gradient(to bottom, ${body} 0%, ${deep} 100%)` }}
        />
        {/* roofline highlight */}
        <div
          className="absolute left-[21%] right-[26%] top-[2px] h-[3px] rounded-full"
          style={{ background: "rgba(255,255,255,0.32)" }}
        />
        {/* door light sweep */}
        <div
          className="absolute inset-y-[12%] left-0 w-full"
          style={{ background: `linear-gradient(100deg, transparent 30%, rgba(255,255,255,${sweep}) 46%, transparent 60%)` }}
        />
        {/* wheels */}
        <div
          className="absolute bottom-0 left-[15%] size-[19%] translate-y-[32%] rounded-full"
          style={{ background: "radial-gradient(circle, #0c0d0f 52%, #1b1d20 58%, #0c0d0f 100%)", boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.05)" }}
        />
        <div
          className="absolute bottom-0 right-[15%] size-[19%] translate-y-[32%] rounded-full"
          style={{ background: "radial-gradient(circle, #0c0d0f 52%, #1b1d20 58%, #0c0d0f 100%)", boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.05)" }}
        />
      </div>

      {/* vignette */}
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,0.5)" }} />
    </div>
  );
}

/* ---------- hero photo (drop the file at public/hero.jpg) ---------- */

function HeroPhoto() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <CarScene tone={TONES.graphite} horizon="60%" sweep={0.2} />;
  }
  return (
    <img
      src="/hero.jpg"
      alt="Freshly detailed black sports car in soft natural light"
      className="absolute inset-0 h-full w-full object-cover object-[50%_58%] img-fade"
      onError={() => setFailed(true)}
    />
  );
}

/* ---------- motion pieces ---------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- typographic pieces ---------- */

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="text-[0.65rem] tracking-label text-champagne">{index}</span>
      <span className="text-[0.65rem] uppercase tracking-label text-muted-foreground">{title}</span>
    </div>
  );
}

function Wordmark() {
  return (
    <a href="#top" className="inline-flex flex-col leading-none">
      <span className="font-display text-[1.35rem] tracking-[0.22em] text-foreground">VELORA</span>
      <span className="mt-1 text-[0.5rem] tracking-[0.44em] text-muted-foreground">AUTO SPA</span>
    </a>
  );
}

function CtaLink({
  href,
  children,
  solid = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 border px-8 py-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] transition-colors duration-300 ${
        solid
          ? "border-champagne bg-champagne text-ink hover:bg-transparent hover:text-champagne"
          : "border-border text-foreground hover:border-champagne hover:text-champagne"
      } ${className}`}
    >
      {children}
    </a>
  );
}

/* ---------- page ---------- */

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background">
      {/* ================= NAV ================= */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen ? "bg-ink border-b border-border" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Wordmark />

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-champagne"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <CtaLink href="#book" solid className="px-6 py-3">
              Book Your Detail
            </CtaLink>
          </div>

          <button
            className="p-2 text-foreground md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-ink px-6 py-8 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border/60 py-4 font-display text-2xl text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <CtaLink href="#book" solid className="mt-8 w-full justify-center" >
              Book Your Detail
            </CtaLink>
          </nav>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
        <ImageReveal className="absolute inset-0">
          <HeroPhoto />
        </ImageReveal>

        {/* cinematic scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/65" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-24">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[0.65rem] uppercase tracking-label text-champagne"
            >
              Precision mobile detailing — by appointment
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
              className="mt-6 font-display text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-[5.25rem]"
            >
              Your car.
              <br />
              <em className="font-medium text-champagne">Professionally</em> restored.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground"
            >
              Paint correction, ceramic protection and interior restoration — performed at
              your address, to showroom standard.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <CtaLink href="#book" solid>
                Book Your Detail
                <ArrowRight className="h-3.5 w-3.5" />
              </CtaLink>
              <a
                href="tel:+15550142030"
                className="border-b border-border pb-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:border-champagne hover:text-champagne"
              >
                +1 (555) 014-2030
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= INTRO / STATS ================= */}
      <section id="studio" className="hairline-x mx-auto max-w-7xl border-b border-border">
        <div className="grid gap-14 px-6 py-24 lg:grid-cols-[1.2fr_1fr] lg:px-10 lg:py-32">
          <Reveal>
            <SectionLabel index="01" title="The Studio" />
            <h2 className="mt-8 max-w-xl font-display text-4xl leading-[1.08] text-foreground lg:text-5xl">
              A detailing practice built around patience, light and
              <em className="text-champagne"> discipline.</em>
            </h2>
            <p className="mt-8 max-w-lg text-sm font-light leading-loose text-muted-foreground">
              Velora is a mobile atelier. We bring the studio to your driveway — controlled
              lighting, filtered water, museum-grade chemistry — and we do not leave until
              the car passes inspection under three light sources.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-end">
            <dl className="divide-y divide-border border-y border-border">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between py-6">
                  <dt className="order-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-display text-4xl text-champagne">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ================= SERVICES (editorial) ================= */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionLabel index="02" title="Services & Pricing" />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl leading-[1.08] text-foreground lg:text-5xl">
              Three standards of care.
            </h2>
            <p className="max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              Fixed pricing by vehicle size. Every appointment ends with a written
              inspection.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {SERVICES.map((service, i) => (
            <Reveal key={service.index} delay={0.05}>
              <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                {/* photo panel */}
                <ImageReveal
                  className={`relative lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-border">
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover img-fade"
                    />
                    <span className="absolute left-5 top-5 font-display text-lg text-foreground/85">
                      {service.index}
                    </span>
                  </div>
                </ImageReveal>

                {/* copy panel */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne">
                    {service.price} · {service.duration}
                  </p>
                  <h3 className="mt-4 font-display text-3xl text-foreground lg:text-4xl">
                    {service.name}
                  </h3>
                  <p className="mt-5 text-sm font-light leading-loose text-muted-foreground">
                    {service.copy}
                  </p>
                  <ul className="mt-8 divide-y divide-border border-y border-border">
                    {service.features.map((feature) => (
                      <li key={feature} className="py-3.5 text-sm text-foreground/80">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#book"
                    className="group mt-8 inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-foreground transition-colors hover:text-champagne"
                  >
                    Reserve this service
                    <span className="inline-block h-px w-8 bg-champagne transition-all duration-300 group-hover:w-12" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= BEFORE / AFTER ================= */}
      <section id="transformation" className="hairline-x border-y border-border bg-ink-2">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <SectionLabel index="03" title="The Transformation" />
            <h2 className="mt-8 max-w-2xl font-display text-4xl leading-[1.08] text-foreground lg:text-5xl">
              Correction, measured in <em className="text-champagne">light.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
              {/* BEFORE */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                <img
                  src="/hero.jpg"
                  alt="Paint before correction"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_60%] grayscale brightness-75"
                />
                <span className="absolute left-5 top-5 text-[0.6rem] uppercase tracking-[0.32em] text-foreground/60">
                  Before
                </span>
              </div>

              {/* AFTER */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                <img
                  src="/hero.jpg"
                  alt="Paint after correction"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_60%] img-fade"
                />
                <span className="absolute right-5 top-5 text-[0.6rem] uppercase tracking-[0.32em] text-champagne">
                  After
                </span>
              </div>

              {/* center handle */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                <div className="flex size-12 items-center justify-center rounded-full border border-champagne/70 bg-ink/85">
                  <ChevronLeft className="h-3.5 w-3.5 text-champagne" />
                  <ChevronRight className="h-3.5 w-3.5 text-champagne" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-sm font-light leading-loose text-muted-foreground">
              Left: gloss as it arrived. Right: after Signature Correction and ceramic
              sealing. Same panel, same exposure — only the paint differs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section id="process" className="hairline-x mx-auto max-w-7xl border-b border-border px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="04" title="The Process" />
              <h2 className="mt-8 max-w-xl font-display text-4xl leading-[1.08] text-foreground lg:text-5xl">
                Exterior care, in four movements.
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              Every exterior service follows the same disciplined sequence — wash, correct,
              inspect, protect. Nothing skipped, nothing rushed.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PROCESS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <figure className={`group ${i % 2 === 1 ? "lg:mt-12" : ""}`}>
                <ImageReveal>
                  <div className="relative aspect-[4/5] w-full overflow-hidden border border-border">
                    <img
                      src={step.src}
                      alt={step.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover img-fade transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 font-display text-lg text-foreground/90">
                      {step.index}
                    </span>
                  </div>
                </ImageReveal>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne">{step.step}</p>
                  <p className="mt-2.5 text-sm text-foreground">{step.title}</p>
                  <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">{step.copy}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= INTERIOR CARE ================= */}
      <section id="interior" className="hairline-x mx-auto max-w-7xl border-b border-border px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="05" title="Interior Care" />
              <h2 className="mt-8 max-w-xl font-display text-4xl leading-[1.08] text-foreground lg:text-5xl">
                Cabins restored to delivery condition.
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              Steam extraction, leather feeding and trim-safe chemistry — interior work held
              to the same inspection standard as our paint.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* overlapping photo pair */}
          <div className="relative mb-12 lg:col-span-7 lg:mb-0">
            <ImageReveal>
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-border">
                <img
                  src="/interior-2.jpg"
                  alt="Restored luxury car interior"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover img-fade"
                />
                <span className="absolute left-5 top-5 font-display text-lg text-foreground/85">
                  05
                </span>
              </div>
            </ImageReveal>
            <ImageReveal delay={0.25} className="absolute -bottom-12 right-0 w-[46%] lg:-right-10">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-ink shadow-2xl shadow-black/60">
                <img
                  src="/interior-1.jpg"
                  alt="Interior detailing in progress"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover img-fade"
                />
              </div>
            </ImageReveal>
          </div>

          {/* service list */}
          <div className="lg:col-span-5">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne">
              from $129 · 2–4 hours
            </p>
            <h3 className="mt-4 font-display text-3xl text-foreground lg:text-4xl">
              Interior Detail
            </h3>
            <p className="mt-5 text-sm font-light leading-loose text-muted-foreground">
              Available on its own or within any full detail. Every surface — hide, textile,
              vinyl or alcantara — is treated with the chemistry made for it, nothing else.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {INTERIOR_FEATURES.map((feature) => (
                <li key={feature} className="py-3.5 text-sm text-foreground/80">
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#book"
              className="group mt-8 inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-foreground transition-colors hover:text-champagne"
            >
              Reserve this service
              <span className="inline-block h-px w-8 bg-champagne transition-all duration-300 group-hover:w-12" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="06" title="Recent Work" />
              <h2 className="mt-8 font-display text-4xl leading-[1.08] text-foreground lg:text-5xl">
                From the studio floor.
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              A rotating record of cars released through the studio this month.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-12">
          {GALLERY.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className={item.span}>
              <figure className="group">
                <ImageReveal>
                  <div className={`relative ${item.aspect} w-full overflow-hidden border border-border`}>
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover img-fade grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                </ImageReveal>
                <figcaption className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
                  <span className="text-xs tracking-wide text-foreground/80">{item.title}</span>
                  <span className="font-display text-sm text-champagne">0{i + 1}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="hairline-x border-y border-border bg-ink-2">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <SectionLabel index="07" title="Client Words" />
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {QUOTES.map((quote, i) => (
              <Reveal key={quote.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col bg-ink-2 p-10">
                  <span className="h-px w-8 bg-champagne" />
                  <blockquote className="mt-8 flex-1 font-display text-[1.35rem] font-light italic leading-snug text-foreground/90">
                    “{quote.text}”
                  </blockquote>
                  <figcaption className="mt-10">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground">
                      {quote.name}
                    </p>
                    <p className="mt-1.5 text-xs font-light text-muted-foreground">{quote.car}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOKING CTA ================= */}
      <section id="book" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.65rem] uppercase tracking-label text-champagne">
              By appointment only
            </p>
            <h2 className="mt-8 font-display text-4xl leading-[1.06] text-foreground sm:text-5xl lg:text-6xl">
              Book Your Detail.
            </h2>
            <p className="mx-auto mt-8 max-w-md text-sm font-light leading-loose text-muted-foreground">
              Share your vehicle and location. We confirm your slot, arrival window and
              fixed quote within the hour.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <CtaLink href="mailto:book@veloraautospa.com" solid>
                Book Your Detail
                <ArrowRight className="h-3.5 w-3.5" />
              </CtaLink>
              <a
                href="tel:+15550142030"
                className="border-b border-border pb-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:border-champagne hover:text-champagne"
              >
                +1 (555) 014-2030
              </a>
            </div>
            <p className="mt-10 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground/70">
              Free quotes · No deposit · Reschedule up to 24h prior
            </p>
          </div>
        </Reveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border bg-ink-2">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <Wordmark />
              <p className="mt-6 max-w-xs text-xs font-light leading-relaxed text-muted-foreground">
                A mobile detailing atelier. Showroom standards, performed at your address,
                seven days a week.
              </p>
            </div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">Studio</p>
              <ul className="mt-6 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/75 transition-colors hover:text-champagne"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">Contact</p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/75">
                <li>
                  <a href="mailto:book@veloraautospa.com" className="transition-colors hover:text-champagne">
                    book@veloraautospa.com
                  </a>
                </li>
                <li>
                  <a href="tel:+15550142030" className="transition-colors hover:text-champagne">
                    +1 (555) 014-2030
                  </a>
                </li>
                <li className="font-light text-muted-foreground">Mon – Sun · 8:00 – 18:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Velora Auto Spa</p>
            <p>Detailing by appointment only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
