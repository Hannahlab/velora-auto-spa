import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  Menu,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------- shared data ---------- */

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Fully insured & IDA certified" },
  { icon: Droplets, label: "pH-neutral, paint-safe chemistry" },
  { icon: Truck, label: "We detail at your home or office" },
  { icon: Star, label: "4.9 from 300+ verified reviews" },
  { icon: Clock, label: "On-time arrival, every booking" },
  { icon: Sparkles, label: "Ceramic protection up to 2 years" },
];

const WHY_US = [
  {
    icon: Truck,
    title: "We come to you",
    text: "A fully-equipped mobile studio van at your home or office. Zero waiting rooms, zero downtime.",
  },
  {
    icon: BadgeCheck,
    title: "Certified detailers",
    text: "IDA-certified, insured technicians with 8+ years on concours and daily drivers alike.",
  },
  {
    icon: Droplets,
    title: "Pro-grade chemistry",
    text: "pH-neutral shampoos, ceramic-infused sealants and paint-safe tools only.",
  },
  {
    icon: Clock,
    title: "On-time, every time",
    text: "Arrival windows you can set your watch to, with live ETA texts the morning of your booking.",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction promise",
    text: "If any panel doesn't meet our standard, we re-detail it free within 7 days.",
  },
  {
    icon: Sparkles,
    title: "Showroom finish",
    text: "A written inspection under 3 light sources before we call it done. Mirror gloss or it's not finished.",
  },
];

const SERVICES = [
  {
    name: "Essential Detail",
    price: 149,
    duration: "2–3 hrs",
    tagline: "A meticulous reset for a well-kept car.",
    features: [
      "Two-bucket hand wash & dry",
      "Wheel, arch & tyre deep clean",
      "Interior vacuum & wipe-down",
      "Streak-free glass, inside & out",
      "6-month paint sealant",
    ],
    featured: false,
  },
  {
    name: "Signature Detail",
    price: 329,
    duration: "5–6 hrs",
    tagline: "Our most-booked full-car transformation.",
    features: [
      "Everything in Essential",
      "Single-stage paint enhancement",
      "Clay bar decontamination",
      "Deep interior shampoo & steam",
      "Leather clean & condition",
      "12-month ceramic sealant",
    ],
    featured: true,
  },
  {
    name: "Showroom Package",
    price: 649,
    duration: "1–2 days",
    tagline: "Concours-level care, entirely at your door.",
    features: [
      "Everything in Signature",
      "Multi-stage paint correction",
      "2-year certified ceramic coating",
      "Engine bay detail",
      "Headlight restoration",
      "Complimentary follow-up wash",
    ],
    featured: false,
  },
];

const GALLERY = [
  { title: "Midnight GT — Paint correction", label: "Exterior" },
  { title: "Alpine White SUV — Interior reset", label: "Interior" },
  { title: "Heritage Roadster — Ceramic coat", label: "Coating" },
  { title: "Coupe S — Wheel-off detail", label: "Wheels" },
  { title: "Executive Sedan — Leather revival", label: "Interior" },
  { title: "Roadster 300 — Full enhancement", label: "Exterior" },
];

const REVIEWS = [
  {
    name: "Amara Chen",
    car: "Porsche 911 Carrera",
    text: "They turned my daily driver into something that looks like it just left the factory. The ceramic coating still beads water months later.",
  },
  {
    name: "Marcus Webb",
    car: "Range Rover Autobiography",
    text: "Booked at 9am, spotless by lunch — in my own driveway. The interior smells and feels brand new. Genuinely impressive operation.",
  },
  {
    name: "Sofia Delgado",
    car: "Tesla Model S",
    text: "Paint correction erased swirls I'd been told were permanent. Detail was obsessive — even the vents and seat rails.",
  },
  {
    name: "James Okafor",
    car: "BMW M4 Competition",
    text: "On time, transparent pricing, unreal gloss. Velora is the only detailer I'll let near the M4 now.",
  },
  {
    name: "Lena Fischer",
    car: "Mercedes G-Wagon",
    text: "Two kids, one muddy dog, and it came back showroom-perfect. Worth every cent of the Signature package.",
  },
  {
    name: "David Ryu",
    car: "Audi RS6 Avant",
    text: "The before/after on my headlights alone justified the price. Professional from quote to final walkaround.",
  },
];

/* ---------- small pieces ---------- */

function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <p
        className={`text-xs font-semibold tracking-[0.25em] uppercase ${
          dark ? "text-gold-soft" : "text-gold-deep"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-serif-display text-3xl sm:text-4xl md:text-[2.75rem] leading-tight ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/60" : "text-muted-foreground"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden />
      ))}
    </div>
  );
}

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- page ---------- */

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [beforeAfter, setBeforeAfter] = useState(55);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-card border-x-0 border-t-0 shadow-sm"
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-ink text-gold">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-serif-display text-xl font-semibold tracking-tight text-foreground">
                Velora <span className="text-gold-deep">Auto Spa</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button asChild className="bg-ink text-white hover:bg-ink/90">
                <a href="#book">Book Your Detail</a>
              </Button>
            </div>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-card border-x-0 border-b">
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 bg-ink text-white hover:bg-ink/90">
                <a href="#book" onClick={() => setMenuOpen(false)}>
                  Book Your Detail
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 80% -10%, rgba(215,178,110,0.22), transparent 60%), radial-gradient(900px 500px at 10% 110%, rgba(28,27,24,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold-deep"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Premium mobile detailing — we come to you
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-6 font-serif-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-foreground"
              >
                Your car. <em className="text-gradient-gold not-italic">Professionally</em> restored.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
              >
                Concours-level detailing at your driveway — paint correction, ceramic
                protection and interior restoration using pro-grade chemistry. No drop-off.
                No waiting rooms. Just a car that looks better than the day you bought it.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Button asChild size="lg" className="h-12 px-7 bg-ink text-white hover:bg-ink/90 text-base">
                  <a href="#book">
                    Book Your Detail
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
                  <a href="#services">View Services</a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="flex -space-x-2.5">
                  {["A", "M", "S", "J"].map((initial, i) => (
                    <span
                      key={i}
                      className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-gold-soft to-gold text-xs font-bold text-ink"
                    >
                      {initial}
                    </span>
                  ))}
                </div>
                <div>
                  <StarRow />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Trusted by 1,200+ drivers · 4.9 average rating
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Hero visual — interactive before/after slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <BeforeAfterSlider value={beforeAfter} onChange={setBeforeAfter} />

              <div className="absolute -top-4 -left-4 rounded-2xl bg-card border border-border px-4 py-3 shadow-lg">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Gloss reading
                </p>
                <p className="mt-0.5 text-xl font-bold text-foreground">
                  +86<span className="text-sm font-medium text-muted-foreground">%</span>
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-ink px-4 py-3 shadow-lg">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  Coating
                </p>
                <p className="mt-0.5 text-xl font-bold text-gold-soft">2-yr ceramic</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TRUST MARQUEE ================= */}
      <section className="border-y border-border bg-card py-5">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-14 pr-14">
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-muted-foreground"
              >
                <item.icon className="h-4 w-4 text-gold-deep" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEFORE / AFTER ================= */}
      <section id="results" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The Velora difference"
              title={
                <>
                  Before &amp; after, <em className="text-gradient-gold not-italic">no filters</em>
                </>
              }
              sub="Real vehicles, straight from our vans' galleries. Drag the handle to see the transformation for yourself."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 max-w-4xl mx-auto">
              <BeforeAfterSlider value={beforeAfter} onChange={setBeforeAfter} large />
              <div className="mt-4 flex items-center justify-center gap-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Before</span>
                <span className="h-px w-10 bg-border" />
                <span>After</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SERVICES + PRICING ================= */}
      <section id="services" className="bg-sand border-y border-border py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Services & pricing"
              title={
                <>
                  One pass. <em className="text-gradient-gold not-italic">Flawless finish.</em>
                </>
              }
              sub="Transparent, fixed pricing by vehicle size. Every package includes our satisfaction promise."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl p-7 transition-all duration-300 ${
                    service.featured
                      ? "bg-ink text-white shadow-xl shadow-ink/20 lg:-translate-y-3"
                      : "bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  {service.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3.5 py-1 text-xs font-bold tracking-wide text-ink">
                      MOST BOOKED
                    </span>
                  )}
                  <h3 className={`font-serif-display text-2xl ${service.featured ? "text-white" : "text-foreground"}`}>
                    {service.name}
                  </h3>
                  <p className={`mt-1.5 text-sm ${service.featured ? "text-white/60" : "text-muted-foreground"}`}>
                    {service.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className={`font-serif-display text-4xl font-semibold ${service.featured ? "text-gold-soft" : "text-foreground"}`}>
                      ${service.price}
                    </span>
                    <span className={`text-sm ${service.featured ? "text-white/50" : "text-muted-foreground"}`}>
                      / sedan · SUV +$40
                    </span>
                  </div>
                  <p className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${service.featured ? "text-white/50" : "text-muted-foreground"}`}>
                    <Clock className="h-3.5 w-3.5" />
                    {service.duration}
                  </p>

                  <ul className="mt-7 flex-1 space-y-3.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${service.featured ? "text-gold-soft" : "text-gold-deep"}`}
                        />
                        <span className={service.featured ? "text-white/85" : "text-foreground/85"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild
                    className={`mt-8 h-11 w-full text-base ${
                      service.featured
                        ? "bg-gold text-ink hover:bg-gold-soft"
                        : "bg-ink text-white hover:bg-ink/90"
                    }`}
                  >
                    <a href="#book">Book {service.name}</a>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  align="left"
                  eyebrow="Why choose us"
                  title={
                    <>
                      Obsessive about <em className="text-gradient-gold not-italic">the details</em>
                    </>
                  }
                  sub="We built Velora around one idea: the standard you'd expect at a concours event, delivered to your driveway."
                />
                <Button asChild size="lg" className="mt-8 h-12 px-7 bg-ink text-white hover:bg-ink/90 text-base">
                  <a href="#book">
                    Book Your Detail
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {WHY_US.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-ink">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery" className="bg-ink py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Gallery"
              title={
                <>
                  Recent work, <em className="text-gradient-gold not-italic">fresh from the van</em>
                </>
              }
              sub="A rotating look at the cars we've restored this month — from daily drivers to weekend toys."
            />
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <figure className="group relative overflow-hidden rounded-2xl bg-ink-soft">
                  <div
                    className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(135deg, #2a2926 0%, #454239 55%, #8a7a55 100%)"
                          : "linear-gradient(135deg, #26262a 0%, #3d3d42 55%, #777d8a 100%)",
                    }}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <span className="rounded-full border border-white/20 bg-ink/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-soft">
                      {item.label}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section id="reviews" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Reviews"
              title={
                <>
                  Drivers who <em className="text-gradient-gold not-italic">became regulars</em>
                </>
              }
              sub="4.9 out of 5 across 300+ verified bookings. Here's what a few of them said."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <Reveal key={review.name} delay={i * 0.05}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <Quote className="h-6 w-6 text-gold/60" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                    "{review.text}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold text-sm font-bold text-ink">
                      {review.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.car}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRow />
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOKING CTA ================= */}
      <section id="book" className="pb-24 pt-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center shadow-2xl md:px-16 md:py-20">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(800px 400px at 50% -20%, rgba(215,178,110,0.25), transparent 65%)",
                }}
              />
              <div className="relative">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <CalendarCheck className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-serif-display text-3xl md:text-5xl text-white">
                  Ready when <em className="text-gradient-gold not-italic">you are</em>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">
                  Tell us your car and postcode — we'll confirm your slot, arrival window and
                  fixed quote within the hour. Saturdays fill fast.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <Button asChild size="lg" className="h-12 px-8 bg-gold text-ink hover:bg-gold-soft text-base">
                    <a href="mailto:book@veloraautospa.com">
                      Book Your Detail
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <a
                    href="tel:+15550142030"
                    className="rounded-md px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-gold-soft"
                  >
                    or call (555) 014-2030
                  </a>
                </div>
                <p className="mt-6 text-xs text-white/40">
                  Free quotes · No deposit · Reschedule anytime up to 24h before
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-ink text-gold">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-serif-display text-lg font-semibold text-foreground">
                Velora <span className="text-gold-deep">Auto Spa</span>
              </span>
            </a>
            <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-1.5">
              <StarRow />
              <span className="text-sm font-medium text-foreground">4.9</span>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Velora Auto Spa. All rights reserved.</p>
            <p>Serving the metro area, seven days a week · book@veloraautospa.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- before/after slider (module-level, below page) ---------- */

function BeforeAfterSlider({
  value,
  onChange,
  large = false,
}: {
  value: number;
  onChange: (v: number) => void;
  large?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    onChange(pct);
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden rounded-3xl border border-border shadow-xl ${
        large ? "aspect-[16/8] w-full" : "aspect-[4/3] w-full"
      }`}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onChange(Math.max(0, value - 4));
        if (e.key === "ArrowRight") onChange(Math.min(100, value + 4));
      }}
    >
      {/* AFTER (base layer) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0e0e10 0%, #1d1d21 35%, #3f3e46 70%, #b0a78f 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)",
        }}
      />
      <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-soft">
        After
      </span>

      {/* BEFORE (clipped layer) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - value}% 0 0)`,
          background:
            "linear-gradient(135deg, #2b2b2b 0%, #55524a 40%, #8f8a7c 75%, #c9c4b4 100%)",
          filter: "saturate(0.55) brightness(0.82) contrast(0.92)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - value}% 0 0)`,
          background:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 7px)",
        }}
      />
      <span
        className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80"
        style={{ opacity: value > 18 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        Before
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 w-px bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.55)]"
        style={{ left: `${value}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex size-11 items-center justify-center rounded-full border border-white/70 bg-ink/85 text-white shadow-lg"
        style={{ left: `${value}%` }}
      >
        <ChevronLeft className="h-4 w-4" />
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}
