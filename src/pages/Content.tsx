import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Gem,
  HeartHandshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, Reveal } from "../components/UI";
export function About() {
  return (
    <>
      <PageHeader
        eyebrow="A FINER CONNECTION"
        title="Great technology. A human touch."
        description="We believe buying a phone should feel every bit as good as using it."
      />
      <div className="container about-page">
        <Reveal className="about-hero">
          <img
            src="./images/showroom.webp"
            alt="An inviting, light-filled smartphone showroom"
          />
          <div>
            <span className="eyebrow">THIS IS AURÈA</span>
            <h2>
              Not just a phone.
              <br />
              <em>Your next chapter.</em>
            </h2>
            <p>
              A first salary. A new venture. A long-awaited upgrade. Behind
              every new phone is a story, and we think it deserves a little
              care.
            </p>
            <p>
              Aurèa was imagined as a different kind of Indian smartphone
              showroom. Less noise, more clarity. A considered edit instead of
              an endless catalogue. Honest advice, whether you’re shopping on a
              screen or sitting across from us.
            </p>
            <p>
              Our name is inspired by the warmth of gold. Not the kind you keep
              behind glass — the kind you find in a genuinely good experience.
            </p>
            <span className="signature">
              Thoughtfully chosen. Genuinely yours.
            </span>
          </div>
        </Reveal>
        <section className="section">
          <div className="center-heading">
            <span className="eyebrow">THE THINGS WE DON’T COMPROMISE ON</span>
            <h2>Three simple promises.</h2>
          </div>
          <div className="values-grid">
            {[
              {
                icon: ShieldCheck,
                title: "Always genuine.",
                text: "Brand-sealed products, manufacturer warranties, and proper GST invoices. Trust isn’t an add-on. It’s where we start.",
              },
              {
                icon: Gem,
                title: "Carefully considered.",
                text: "We choose phones for the people who use them. Camera lovers, late-night gamers, everyday multitaskers. There’s an edit for every kind of extraordinary.",
              },
              {
                icon: HeartHandshake,
                title: "Human, through and through.",
                text: "No pressure. No jargon. Just thoughtful help and a warm welcome. Because a better connection starts with a real conversation.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon size={35} strokeWidth={1.2} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="about-note">
          <span>✦</span>
          <p>
            Aurèa is an original fictional brand, created as a frontend-only
            design and shopping experience. Our showroom, customer stories,
            product pricing and services are illustrative — but our attention to
            the details is very real.
          </p>
        </div>
        <div className="final-cta">
          <h2>Let’s find your extraordinary.</h2>
          <Link to="/shop" className="button button-gold">
            Explore the edit
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </>
  );
}
export function Contact() {
  const [sent, setSent] = useState(false),
    [name, setName] = useState(""),
    [visit, setVisit] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(
        () =>
          document
            .querySelector(location.hash)
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        300,
      );
      return () => clearTimeout(timer);
    }
  }, [location.hash]);
  return (
    <>
      <PageHeader
        eyebrow="A CONVERSATION AWAY"
        title="There’s always a seat for you."
        description="A question, a shortlist, or just a little curiosity. We’d love to help."
      />
      <div className="container contact-page">
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-image">
              <img
                src="./images/showroom.webp"
                alt="Smartphones displayed in a welcoming showroom"
              />
              <span>THE AURÈA SHOWROOM</span>
            </div>
            <h2>
              Online ease.
              <br />
              <em>Neighbourhood heart.</em>
            </h2>
            <div className="contact-detail">
              <MapPin size={21} />
              <div>
                <strong>Find a little extraordinary.</strong>
                <p>
                  42, 100 Feet Road, Indiranagar
                  <br />
                  Bengaluru, Karnataka 560038
                </p>
                <span className="fine-print">
                  Illustrative showroom address — not a real store.
                </span>
              </div>
            </div>
            <div className="contact-detail">
              <Clock3 size={21} />
              <div>
                <strong>Make yourself at home.</strong>
                <p>
                  Monday – Sunday
                  <br />
                  10:30 AM – 8:30 PM IST
                </p>
              </div>
            </div>
            <button
              className="button button-outline"
              onClick={() => setVisit(!visit)}
            >
              <MapPin size={16} />
              {visit ? "Hide visit information" : "Plan a showroom visit"}
              <ArrowUpRight size={15} />
            </button>
            {visit && (
              <div className="visit-details" role="status">
                <strong>Your demo visit guide</strong>
                <p>
                  Explore phones hands-on, bring your shortlist, and allow
                  around 30 minutes for a relaxed conversation. Step-free
                  showroom access is part of our concept.
                </p>
                <p>
                  This is a fictional location. No appointment has been booked.
                  Use the enquiry form to try the request experience.
                </p>
                <a href="#enquiry" className="text-link">
                  Try a visit enquiry
                  <ArrowUpRight size={14} />
                </a>
              </div>
            )}
          </div>
          <div id="enquiry" className="contact-form-card">
            <span className="eyebrow">LET’S TALK PHONES</span>
            <h2>
              A little help.
              <br />A lot of possibility.
            </h2>
            <p>
              Leave a note and explore how a thoughtful conversation begins.
            </p>
            {sent ? (
              <div className="contact-success" role="status">
                <span>
                  <Check size={29} />
                </span>
                <h3>A lovely start, {name.split(" ")[0]}.</h3>
                <p>
                  Your demo enquiry is complete. No message was sent or stored,
                  but you’ve experienced how easy reaching out can be.
                </p>
                <button
                  className="button button-outline"
                  onClick={() => setSent(false)}
                >
                  Write another note
                  <ArrowUpRight size={15} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="form-label">
                  Your name
                  <input
                    required
                    minLength={2}
                    placeholder="What should we call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="form-label">
                  Email address
                  <input required type="email" placeholder="you@example.com" />
                </label>
                <label className="form-label">
                  What brings you here?
                  <select defaultValue="Choosing a phone">
                    <option>Choosing a phone</option>
                    <option>A showroom visit</option>
                    <option>Understanding EMI options</option>
                    <option>Product and warranty questions</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="form-label">
                  A little about what you need
                  <textarea
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Your shortlist, your budget, your questions. We’re all ears."
                  />
                </label>
                <label className="check-label contact-consent">
                  <input type="checkbox" required />
                  <span>
                    I understand this is a demo and no message will actually be
                    sent.
                  </span>
                </label>
                <button className="button button-gold full-width">
                  Send demo enquiry
                  <ArrowUpRight size={17} />
                </button>
                <p className="fine-print">
                  Sample details welcome. Nothing is sent to a server.
                </p>
              </form>
            )}
          </div>
        </div>
        <div className="contact-bottom">
          <ShieldCheck size={28} strokeWidth={1.2} />
          <div>
            <h3>A little reassurance, before you ask.</h3>
            <p>
              Every product in this illustrative collection is presented with
              GST-inclusive pricing, transparent savings and a brand-warranty
              promise. No hidden costs. No hard sell.
            </p>
          </div>
          <Link to="/about" className="text-link">
            Our promises
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
