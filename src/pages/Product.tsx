import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  Camera,
  Check,
  ChevronRight,
  Cpu,
  Heart,
  Maximize2,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Truck,
} from "lucide-react";
import { money, products, variantPrice } from "../data/products";
import { useStore } from "../lib/store";
import { EmptyState, Modal, SectionHeading } from "../components/UI";
import ProductCard from "../components/ProductCard";
export default function Product() {
  const { slug } = useParams();
  const p = products.find((p) => p.slug === slug);
  if (!p)
    return (
      <EmptyState
        title="This phone has wandered off."
        description="Let’s get you back to something extraordinary."
      />
    );
  return <ProductView key={slug} id={p.id} />;
}
function ProductView({ id }: { id: string }) {
  const p = products.find((p) => p.id === id)!;
  const navigate = useNavigate();
  const { wishlist, toggleWish, compare, toggleCompare, addCart } = useStore();
  const [color, setColor] = useState(p.colors[0].name),
    [storage, setStorage] = useState(p.storage[0]),
    [pin, setPin] = useState(""),
    [delivery, setDelivery] = useState(""),
    [zoom, setZoom] = useState(false),
    [view, setView] = useState("Complete view"),
    [emi, setEmi] = useState(false),
    [months, setMonths] = useState(12),
    [tab, setTab] = useState("The details");
  const price = variantPrice(p, storage);
  return (
    <div className="container product-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop">The collection</Link>
        <ChevronRight size={12} />
        <span>{p.model}</span>
      </nav>
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div
            className={`main-product-image ${view === "A closer look" ? "detail-zoom" : ""}`}
          >
            <span className="product-badge">{p.badge}</span>
            <img src={p.image} alt={`${p.model}, product reference finish`} />
            <button
              onClick={() => setZoom(true)}
              className="image-expand"
              aria-label="Enlarge product image"
            >
              <Maximize2 size={19} />
            </button>
            <div className="gallery-caption">
              A closer look at extraordinary.
            </div>
          </div>
          <div className="gallery-thumbs">
            {["Complete view", "A closer look"].map((v) => (
              <button
                className={view === v ? "active" : ""}
                onClick={() => setView(v)}
                key={v}
              >
                <img
                  src={p.image}
                  alt=""
                  style={{
                    transform: v === "A closer look" ? "scale(1.5)" : "none",
                  }}
                />
                <span>{v}</span>
              </button>
            ))}
          </div>
          <p className="image-note">
            Product image shows the reference finish. Selected finish: {color}.
          </p>
        </div>
        <div className="product-details">
          <div className="product-eyebrow-row">
            <Link className="eyebrow" to={`/brands/${p.brand.toLowerCase()}`}>
              THE {p.brand.toUpperCase()} EDIT
            </Link>
            <button
              className={`icon-button ${wishlist.includes(p.id) ? "gold-text" : ""}`}
              aria-label={
                wishlist.includes(p.id)
                  ? "Remove from wishlist"
                  : "Save to wishlist"
              }
              onClick={() => toggleWish(p.id)}
            >
              <Heart
                size={22}
                fill={wishlist.includes(p.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <h1>{p.model}</h1>
          <div className="detail-rating">
            <Star size={14} fill="currentColor" />
            <strong>{p.rating}</strong>
            <span>{p.reviews} illustrative reviews</span>
            <i />
            <span className="in-stock">In stock · Demo</span>
          </div>
          <p className="detail-description">{p.description}</p>
          <div className="detail-price">
            <strong>{money(price)}</strong>
            <del>
              {money(
                p.originalPrice +
                  Math.max(0, p.storage.indexOf(storage)) * 10000,
              )}
            </del>
            <span>Save {money(p.originalPrice - p.price)}</span>
          </div>
          <p className="tax-note">
            Inclusive of all taxes. GST invoice included.
          </p>
          <button className="emi-link" onClick={() => setEmi(true)}>
            From {money(Math.ceil(price / 12))}/month with easy EMI{" "}
            <ArrowUpRight size={13} />
          </button>
          <div className="variant-section">
            <p>
              Colour <strong>{color}</strong>
            </p>
            <div className="detail-swatches">
              {p.colors.map((c) => (
                <button
                  style={{ background: c.hex }}
                  className={color === c.name ? "active" : ""}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  title={c.name}
                  onClick={() => setColor(c.name)}
                  key={c.name}
                >
                  {color === c.name && (
                    <Check
                      size={14}
                      style={{
                        color:
                          c.hex === "#eeede7" || c.hex === "#f0efe7"
                            ? "#343434"
                            : "white",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="variant-section">
            <p>
              Storage <strong>Room for everything you love.</strong>
            </p>
            <div className="storage-options">
              {p.storage.map((s) => (
                <button
                  className={storage === s ? "active" : ""}
                  key={s}
                  onClick={() => setStorage(s)}
                  aria-pressed={storage === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="product-buy-buttons">
            <button
              className="button button-gold"
              onClick={() => addCart(p.id, color, storage)}
            >
              <ShoppingBag size={17} />
              Add to bag
              <ArrowUpRight size={16} />
            </button>
            <button
              className="button button-outline"
              onClick={() => {
                addCart(p.id, color, storage);
                navigate("/cart");
              }}
            >
              Make it yours
              <ArrowRight size={16} />
            </button>
          </div>
          <button
            className="compare-detail"
            onClick={() => toggleCompare(p.id)}
          >
            {compare.includes(p.id) ? <Check size={15} /> : <Plus size={15} />}{" "}
            {compare.includes(p.id)
              ? "Added to your comparison"
              : "Add to compare"}
          </button>
          <div className="delivery-check">
            <div>
              <Truck size={20} />
              <strong>Good things, delivered to your door.</strong>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDelivery(
                  /^[1-8]\d{5}$/.test(pin)
                    ? "Available! Estimated delivery in 3–5 working days. Free shipping. (Demo estimate)"
                    : "Please enter a valid 6-digit Indian PIN code.",
                );
              }}
            >
              <input
                inputMode="numeric"
                maxLength={6}
                aria-label="Delivery PIN code"
                placeholder="Enter your PIN code"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, ""));
                  setDelivery("");
                }}
                required
              />
              <button>Check</button>
            </form>
            {delivery && <p role="status">{delivery}</p>}
          </div>
          <div className="detail-trust">
            <span>
              <ShieldCheck size={16} />
              Brand warranty
            </span>
            <span>
              <Check size={16} />
              100% genuine
            </span>
            <span>
              <Truck size={16} />
              Carefully delivered
            </span>
          </div>
        </div>
      </div>
      <section className="product-information">
        <div className="info-tabs" role="tablist">
          {["The details", "What’s in the box", "Care & warranty"].map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "The details" ? (
          <div className="spec-grid">
            {[
              { icon: Smartphone, label: "Display", value: p.display },
              { icon: Cpu, label: "Processor", value: p.processor },
              { icon: Camera, label: "Camera", value: p.camera },
              { icon: BatteryFull, label: "Battery", value: p.battery },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon size={23} strokeWidth={1.4} />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <p className="spec-disclaimer">
              Illustrative catalogue specifications. RAM: {p.ram} · Operating
              system: {p.os} · Storage selected: {storage}. Verify final
              specifications with the manufacturer before a real purchase.
            </p>
          </div>
        ) : tab === "What’s in the box" ? (
          <div className="info-prose">
            <h3>A fresh start, beautifully packed.</h3>
            <p>
              Your new {p.model}, USB-C charging cable, SIM ejector tool,
              quick-start guide and warranty documentation. Power adapter
              availability varies by brand and region.
            </p>
            <p>
              Everything arrives in its original, manufacturer-sealed packaging.
              Nothing opened. Nothing missing.
            </p>
          </div>
        ) : (
          <div className="info-prose">
            <h3>A little peace of mind, included.</h3>
            <p>
              Our demo catalogue includes a 1-year manufacturer warranty for the
              handset, subject to brand terms. Manufacturing defects are
              supported by the authorised brand service centre.
            </p>
            <p>
              For this frontend demonstration, no real warranty, delivery,
              return or repair service is provided. Have a question about the
              experience? <Link to="/contact">Explore our contact page.</Link>
            </p>
          </div>
        )}
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="KEEP EXPLORING"
          title="There’s more to fall for."
          link="/shop"
        />
        <div className="product-grid">
          {products
            .filter((x) => x.id !== p.id)
            .slice(0, 4)
            .map((x) => (
              <ProductCard product={x} key={x.id} />
            ))}
        </div>
      </section>
      {zoom && (
        <Modal title={p.model} onClose={() => setZoom(false)} wide>
          <div className="zoom-image">
            <img
              src={p.image}
              alt={`${p.model}, enlarged reference product view`}
            />
          </div>
        </Modal>
      )}
      {emi && (
        <Modal title="A little each month." onClose={() => setEmi(false)}>
          <p className="muted">
            Explore an illustrative zero-interest instalment plan for your{" "}
            {p.model}.
          </p>
          <div className="emi-total">
            {money(price)}
            <small>Total phone price, including GST</small>
          </div>
          <label className="form-label">
            Choose your tenure
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            >
              {[3, 6, 9, 12].map((m) => (
                <option value={m} key={m}>
                  {m} months
                </option>
              ))}
            </select>
          </label>
          <div className="emi-result">
            <span>Illustrative monthly instalment</span>
            <strong>
              {money(Math.ceil(price / months))}
              <small>/month</small>
            </strong>
          </div>
          <p className="fine-print">
            This is a calculator, not a financing offer. No credit check,
            lender, application or real EMI facility. Actual bank plans may
            include fees and interest.
          </p>
          <button
            className="button button-gold full-width"
            onClick={() => setEmi(false)}
          >
            That sounds good
            <Check size={16} />
          </button>
        </Modal>
      )}
    </div>
  );
}
