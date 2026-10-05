import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  CreditCard,
  Gift,
  Sparkles,
  Truck,
} from "lucide-react";
import { products } from "../data/products";
import { useStore } from "../lib/store";
import { PageHeader, Reveal, SectionHeading } from "../components/UI";
import ProductCard from "../components/ProductCard";
export default function Offers() {
  const { notify } = useStore();
  const [copied, setCopied] = useState(false),
    [faq, setFaq] = useState<number | null>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("AUREA1000");
      setCopied(true);
      notify("AUREA1000 copied. A little extra awaits at checkout.");
    } catch {
      notify("Your code is AUREA1000. Enter it in your bag.");
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="A LITTLE EXTRA, JUST FOR YOU"
        title="Good choices. Golden privileges."
        description="Thoughtful extras that make your next upgrade feel even better."
      />
      <div className="container offers-page">
        <Reveal className="welcome-offer">
          <div className="welcome-symbol">
            <Gift size={64} strokeWidth={0.9} />
            <span>✦</span>
          </div>
          <div>
            <span className="eyebrow">YOUR FIRST HELLO</span>
            <h2>
              A warm welcome.
              <br />
              <em>₹1,000 warmer.</em>
            </h2>
            <p>
              A little something towards your next extraordinary phone.
              <br />
              On a demo bag of ₹20,000 or more.
            </p>
            <button className="offer-code" onClick={copy}>
              <span>AUREA1000</span>
              {copied ? <Check size={17} /> : <Copy size={17} />}
              <small>{copied ? "Copied" : "Copy code"}</small>
            </button>
          </div>
          <Link to="/shop" className="button button-dark">
            Find your next phone
            <ArrowUpRight size={17} />
          </Link>
        </Reveal>
        <div className="offer-detail-grid">
          <div>
            <CreditCard size={31} strokeWidth={1.2} />
            <span className="eyebrow">YOUR PHONE. YOUR TERMS.</span>
            <h3>
              Small instalments.
              <br />
              Big possibilities.
            </h3>
            <p>
              Try the easy EMI calculator on any product page. Explore 3, 6, 9
              or 12-month illustrative plans, with absolutely no application.
            </p>
            <Link className="text-link" to="/shop">
              Explore EMI-ready phones
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <div>
            <Truck size={31} strokeWidth={1.2} />
            <span className="eyebrow">THE LAST MILE, ON US</span>
            <h3>
              A thoughtful delivery.
              <br />
              Not an extra cost.
            </h3>
            <p>
              Every demo order above ₹999 enjoys complimentary standard
              delivery. Careful packaging and a little peace of mind, included.
            </p>
            <Link className="text-link" to="/shop">
              Discover the collection
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <div>
            <Sparkles size={31} strokeWidth={1.2} />
            <span className="eyebrow">MORE THAN A PRICE TAG</span>
            <h3>
              Honest savings.
              <br />
              Nothing hidden.
            </h3>
            <p>
              See the price. Know the savings. Every price in our edit includes
              GST, so the number you see is the number in your bag.
            </p>
            <Link className="text-link" to="/shop?need=value">
              Meet the value edit
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <section className="section">
          <SectionHeading
            eyebrow="EXTRAORDINARY VALUE"
            title="A few more reasons to say yes."
            link="/shop"
          />
          <div className="product-grid">
            {[products[1], products[4], products[6], products[7]].map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        <section className="faq-section">
          <div>
            <span className="eyebrow">THE FINE PRINT. MADE SIMPLE.</span>
            <h2>A little more clarity.</h2>
            <p>Good offers shouldn’t come with guesswork.</p>
          </div>
          <div className="faq-list">
            {[
              {
                q: "How do I use my welcome code?",
                a: "Add a phone to your bag and enter AUREA1000 in the privilege code field. On a demo subtotal of ₹20,000 or more, ₹1,000 will be deducted. The code can be used once per demo order and cannot be stacked.",
              },
              {
                q: "Are these real financing and bank offers?",
                a: "No. This is a frontend-only showroom. EMI amounts are illustrative calculations, not offers from a lender. No credit application, bank integration, interest agreement or payment is involved.",
              },
              {
                q: "Are the prices and savings live?",
                a: "No. All prices, original prices and savings are static sample data created for this experience. They are not live market quotes and do not represent an offer for sale.",
              },
              {
                q: "Will my demo order be delivered?",
                a: "No real orders are processed. Checkout is an interactive demonstration only. You can explore every step without making a payment or expecting a delivery.",
              },
            ].map((item, i) => (
              <div
                className={`faq-item ${faq === i ? "open" : ""}`}
                key={item.q}
              >
                <button
                  aria-expanded={faq === i}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {item.q}
                  <ChevronDown size={17} />
                </button>
                {faq === i && <p>{item.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
