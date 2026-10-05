import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  Camera,
  Check,
  CircleHelp,
  CreditCard,
  Gamepad2,
  Gem,
  MapPin,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { brands, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Reveal, SectionHeading } from "../components/UI";
const needs = [
  {
    label: "The flagship life",
    sub: "Nothing but extraordinary",
    icon: Gem,
    value: "flagship",
    class: "flagship",
  },
  {
    label: "For the storytellers",
    sub: "Cameras that see more",
    icon: Camera,
    value: "camera",
    class: "camera",
  },
  {
    label: "Play without limits",
    sub: "Built for your next win",
    icon: Gamepad2,
    value: "gaming",
    class: "gaming",
  },
  {
    label: "Big on value",
    sub: "Brilliant picks under ₹30K",
    icon: Wallet,
    value: "value",
    class: "value",
  },
  {
    label: "Go all day. And more.",
    sub: "Power that keeps up",
    icon: BatteryFull,
    value: "battery",
    class: "battery",
  },
];
export default function Home() {
  const [tab, setTab] = useState("Our favourites");
  const reduce = useReducedMotion();
  const featured =
    tab === "New arrivals"
      ? products.filter((p) => p.isNew)
      : tab === "Best value"
        ? products.filter((p) => p.price < 70000).slice(0, 4)
        : products.slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="hero-art">
          <motion.img
            src="./images/hero-phones.webp"
            alt="Champagne titanium smartphones on a sculptural stone pedestal, framed by a golden halo"
            fetchPriority="high"
            animate={reduce ? {} : { scale: [1, 1.025, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="hero-wash" />
        <div className="container hero-container">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-eyebrow">
              <span />
              EXCEPTIONAL PHONES. HONEST PRICES.
            </div>
            <h1>
              A little more
              <br />
              <em>extraordinary.</em>
            </h1>
            <p>
              The phone you’ve had your eye on.
              <br />
              The experience you’ve always deserved.
            </p>
            <div className="hero-buttons">
              <Link className="button button-gold" to="/shop">
                Find your next phone
                <ArrowUpRight size={17} />
              </Link>
              <Link className="button button-outline" to="/offers">
                Explore offers
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-reassurance">
              <div className="avatar-stack">
                <span>AK</span>
                <span>PS</span>
                <span>RM</span>
                <span>+</span>
              </div>
              <div>
                <div className="hero-stars">
                  ★★★★★ <strong>Loved by 2,000+ happy customers</strong>
                </div>
                <p>Good phones. Even better relationships.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="floating-spec spec-top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="spec-icon">
              <Sparkles size={19} />
            </div>
            <div>
              <span>CRAFTED TO STAND OUT</span>
              <strong>Brilliance. In every detail.</strong>
            </div>
          </motion.div>
          <motion.div
            className="floating-spec spec-bottom"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <ShieldCheck size={25} />
            <div>
              <strong>100% genuine. Zero doubts.</strong>
              <span>Sealed box · Brand warranty · GST bill</span>
            </div>
            <span className="verified-dot">
              <Check size={10} />
            </span>
          </motion.div>
          <div className="hero-bottom-line">
            <span>THE AURÈA PROMISE</span>
            <i />
            <p>A considered collection. An effortless choice.</p>
            <span className="hero-slide">
              01 <b>/</b> THE SIGNATURE EDIT
            </span>
          </div>
        </div>
      </section>
      <section className="trust-rail">
        <div className="container">
          {[
            {
              icon: ShieldCheck,
              title: "Only the real thing",
              sub: "100% genuine, brand-sealed",
            },
            {
              icon: Truck,
              title: "Delivered with care",
              sub: "Free shipping above ₹999",
            },
            {
              icon: CreditCard,
              title: "Your phone. Your terms.",
              sub: "Easy & no-cost EMI options",
            },
            {
              icon: ReceiptText,
              title: "No surprises. Ever.",
              sub: "Transparent pricing. GST included.",
            },
          ].map(({ icon: Icon, title, sub }) => (
            <div className="trust-item" key={title}>
              <Icon size={24} strokeWidth={1.4} />
              <div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section need-section container">
        <Reveal>
          <SectionHeading
            eyebrow="YOUR WORLD. YOUR PHONE."
            title="What’s your kind of extraordinary?"
            link="/shop"
            linkText="Explore the collection"
          />
          <div className="needs-grid">
            {needs.map(({ label, sub, icon: Icon, value, class: cls }, i) => (
              <Link
                key={value}
                to={`/shop?need=${value}`}
                className={`need-card ${cls}`}
              >
                <div className="need-card-top">
                  <span className="need-number">0{i + 1}</span>
                  <ArrowUpRight size={17} />
                </div>
                <div className="need-icon">
                  <Icon size={37} strokeWidth={1.2} />
                </div>
                <h3>{label}</h3>
                <p>{sub}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="section featured-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="THE CURATED EDIT"
              title="Great phones. Picked with purpose."
              description="The ones we love. The ones you’ll love living with."
              link="/shop"
            />
            <div
              className="featured-tabs"
              role="tablist"
              aria-label="Featured phone collections"
            >
              {["Our favourites", "New arrivals", "Best value"].map((t) => (
                <button
                  role="tab"
                  aria-selected={tab === t}
                  className={tab === t ? "active" : ""}
                  key={t}
                  onClick={() => setTab(t)}
                >
                  {t}
                  {t === tab && <span />}
                </button>
              ))}
            </div>
            <div className="product-grid" key={tab}>
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.065}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
            <p className="collection-note">
              <ShieldCheck size={13} /> Every phone. Brand-sealed. India
              warranty. A little peace of mind, included.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="brand-section container">
        <Reveal>
          <div className="brand-section-top">
            <span className="eyebrow">
              EXCEPTIONAL BY NAME. EXTRAORDINARY BY NATURE.
            </span>
            <span>The brands you trust, all in one place.</span>
          </div>
          <div className="brand-grid">
            {brands.map((b) => (
              <Link
                to={`/brands/${b.toLowerCase()}`}
                key={b}
                className={`brand-wordmark brand-${b.toLowerCase()}`}
              >
                {b === "Apple" ? (
                  <>
                    <svg
                      viewBox="0 0 28 32"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20 1c.3 3-2.2 6-5 6-.4-2.7 2.1-5.7 5-6ZM23.7 17.1c0-3 2.4-4.5 2.5-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.7 1.1-4.7 1.1-1 0-2.5-1.1-4.1-1.1-2.1 0-4 1.2-5.1 3-2.2 3.8-.6 9.3 1.5 12.3 1 1.5 2.1 3.1 3.7 3 1.5 0 2.1-1 3.9-1 1.8 0 2.4 1 4 .9 1.7 0 2.7-1.5 3.7-3 .9-1.4 1.3-2.7 1.4-2.8-.1 0-2.4-.9-2.4-5.4Z" />
                    </svg>
                    <span>Apple</span>
                  </>
                ) : b === "OnePlus" ? (
                  <>
                    <b className="oneplus-icon">1⁺</b>OnePlus
                  </>
                ) : b === "Google" ? (
                  <>
                    <b className="google-icon">G</b>Google
                  </>
                ) : b === "Nothing" ? (
                  "NOTHING"
                ) : b === "Vivo" ? (
                  "vivo"
                ) : (
                  b.toUpperCase()
                )}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="section smart-section container">
        <Reveal>
          <div className="smart-layout">
            <div className="smart-intro">
              <span className="eyebrow">A SMARTER WAY TO BUY</span>
              <h2>
                Less guesswork.
                <br />
                <em>More good choices.</em>
              </h2>
              <p>
                A great phone is personal. We’re here to help you find the one
                that feels like you.
              </p>
              <Link className="text-link" to="/about">
                The Aurèa difference
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="smart-cards">
              {[
                {
                  n: "01",
                  icon: SlidersIcon,
                  title: "Find your fit",
                  text: "Tell us what matters. Camera, performance, or a price that feels right.",
                  link: "/shop",
                  cta: "Explore your options",
                },
                {
                  n: "02",
                  icon: CircleHelp,
                  title: "Compare with clarity",
                  text: "The important details, side by side. No jargon. No second-guessing.",
                  link: "/compare",
                  cta: "Find your match",
                },
                {
                  n: "03",
                  icon: PackageCheck,
                  title: "Make it yours",
                  text: "An easy checkout, thoughtful delivery, and support beyond the sale.",
                  link: "/contact",
                  cta: "We’re here to help",
                },
              ].map(({ n, icon: Icon, title, text, link, cta }) => (
                <Link to={link} key={n} className="smart-card">
                  <span className="smart-number">{n}</span>
                  <Icon size={28} strokeWidth={1.3} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span>
                    {cta}
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
      <section className="container offer-section">
        <Reveal className="offer-banner">
          <div className="offer-pattern" aria-hidden="true">
            <div />
            <div />
            <div />
            <span>✦</span>
          </div>
          <div className="offer-copy">
            <span className="eyebrow">MORE PHONE. MORE POSSIBILITIES.</span>
            <h2>
              Your next upgrade,
              <br />
              <em>with a little extra.</em>
            </h2>
            <p>Easy EMI. Thoughtful offers. Better reasons to say yes.</p>
            <Link to="/offers" className="button button-dark">
              Discover your privileges
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="offer-perks">
            <div>
              <CreditCard size={24} strokeWidth={1.4} />
              <span>
                <strong>Little payments. Big possibilities.</strong>
                <small>Explore our illustrative no-cost EMI plans</small>
              </span>
            </div>
            <div>
              <Sparkles size={24} strokeWidth={1.4} />
              <span>
                <strong>A warm welcome, on us.</strong>
                <small>₹1,000 off with AUREA1000 · Demo offer</small>
              </span>
            </div>
            <div>
              <Truck size={24} strokeWidth={1.4} />
              <span>
                <strong>The final mile is our pleasure.</strong>
                <small>Complimentary delivery above ₹999</small>
              </span>
            </div>
            <p>Illustrative offers. Terms apply. No real financing provided.</p>
          </div>
        </Reveal>
      </section>
      <section className="section container local-section">
        <Reveal>
          <div className="local-layout">
            <div className="showroom-image">
              <img
                src="./images/showroom.webp"
                alt="Bright, thoughtfully designed smartphone showroom with open display tables"
                loading="lazy"
              />
              <div className="showroom-caption">
                <span className="status-dot" />A WARM WELCOME AWAITS
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div className="local-copy">
              <span className="eyebrow">ONLINE EASE. NEIGHBOURHOOD HEART.</span>
              <h2>
                A real place.
                <br />
                <em>Real peace of mind.</em>
              </h2>
              <p>
                Some decisions feel better in person. Hold it. Try it. Ask us
                anything. There’s always a seat for you at Aurèa.
              </p>
              <div className="address-block">
                <MapPin size={19} />
                <div>
                  <strong>The Aurèa Showroom · Bengaluru</strong>
                  <span>
                    42, 100 Feet Road, Indiranagar
                    <br />
                    Bengaluru, Karnataka 560038
                  </span>
                  <small>Monday – Sunday · 10:30 AM – 8:30 PM</small>
                </div>
              </div>
              <Link to="/contact" className="button button-outline">
                Come say hello
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="testimonials-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="THE BEST PART OF WHAT WE DO"
              title="The phones are smart. The love is real."
            />
            <div className="testimonial-grid">
              {[
                {
                  name: "Ananya K.",
                  city: "Bengaluru",
                  initials: "AK",
                  quote:
                    "No pushy sales, no confusing offers. Just honest advice and the perfect phone for me. This is how buying a phone should feel.",
                  phone: "iPhone 16 Pro Max",
                },
                {
                  name: "Rohan M.",
                  city: "Hyderabad",
                  initials: "RM",
                  quote:
                    "Compared my shortlist, found a great deal, and had a sealed box at my door. Every little detail felt taken care of.",
                  phone: "OnePlus 13",
                },
                {
                  name: "Priya S.",
                  city: "Pune",
                  initials: "PS",
                  quote:
                    "The pricing was exactly what I saw online. GST invoice, proper warranty, and a team that actually listens. A lovely experience.",
                  phone: "Google Pixel 9 Pro",
                },
              ].map((t) => (
                <article className="testimonial" key={t.name}>
                  <div className="review-stars">
                    ★★★★★<span>“</span>
                  </div>
                  <blockquote>{t.quote}</blockquote>
                  <div className="reviewer">
                    <span>{t.initials}</span>
                    <div>
                      <strong>
                        {t.name}
                        <Check size={12} />
                      </strong>
                      <small>
                        {t.city} · {t.phone}
                      </small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="testimonial-note">
              Illustrative customer stories, created for this showroom demo.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="final-cta container">
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>A better connection awaits.</h2>
        <Link to="/shop" className="button button-gold">
          Meet your next phone
          <ArrowUpRight size={17} />
        </Link>
        <p>Thoughtfully chosen. Genuinely yours.</p>
      </section>
    </>
  );
}
function SlidersIcon({
  size,
  strokeWidth,
}: {
  size: number;
  strokeWidth: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      <path d="M4 7h8m4 0h4M4 17h2m4 0h10" />
      <circle cx="14" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  );
}
