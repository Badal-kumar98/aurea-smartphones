import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { getProduct, money, variantPrice } from "../data/products";
import { useStore } from "../lib/store";
import { EmptyState, Modal, PageHeader } from "../components/UI";
export default function Cart() {
  const { cart, changeQuantity, removeCart, coupon, setCoupon, notify } =
    useStore();
  const [code, setCode] = useState(coupon),
    [checkout, setCheckout] = useState(false);
  const subtotal = cart.reduce((s, item) => {
    const p = getProduct(item.id);
    return s + (p ? variantPrice(p, item.storage) * item.quantity : 0);
  }, 0);
  const discount = coupon === "AUREA1000" && subtotal >= 20000 ? 1000 : 0;
  const total = subtotal - discount;
  const applyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === "AUREA1000" && subtotal >= 20000) {
      setCoupon("AUREA1000");
      notify("A little extra, on us. ₹1,000 saved.");
    } else notify("Try AUREA1000 on a bag worth ₹20,000 or more.");
  };
  return (
    <>
      <PageHeader
        eyebrow="ONE STEP CLOSER"
        title="Good choices look good on you."
        description="Your next extraordinary connection is right here."
      />
      <section className="container cart-page">
        {cart.length ? (
          <div className="cart-layout">
            <div>
              <div className="bag-heading">
                <h3>
                  Your bag{" "}
                  <span>({cart.reduce((n, c) => n + c.quantity, 0)})</span>
                </h3>
                <span>
                  <Truck size={15} />
                  Complimentary delivery
                </span>
              </div>
              <div className="cart-items">
                {cart.map((item) => {
                  const p = getProduct(item.id);
                  if (!p) return null;
                  return (
                    <article className="cart-item" key={item.key}>
                      <Link
                        className="cart-product-image"
                        to={`/product/${p.slug}`}
                      >
                        <img src={p.image} alt={p.model} />
                      </Link>
                      <div className="cart-item-info">
                        <span className="eyebrow">{p.brand}</span>
                        <Link to={`/product/${p.slug}`}>
                          <h3>{p.model}</h3>
                        </Link>
                        <p>
                          {item.storage} · {item.color}
                        </p>
                        <span className="in-stock">
                          Brand-sealed · In stock
                        </span>
                        <div className="quantity-control">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => changeQuantity(item.key, -1)}
                            aria-label={`Decrease ${p.model} quantity`}
                          >
                            <Minus size={13} />
                          </button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button
                            disabled={item.quantity >= 5}
                            onClick={() => changeQuantity(item.key, 1)}
                            aria-label={`Increase ${p.model} quantity`}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-end">
                        <strong>
                          {money(variantPrice(p, item.storage) * item.quantity)}
                        </strong>
                        <button
                          onClick={() => removeCart(item.key)}
                          aria-label={`Remove ${p.model} from bag`}
                        >
                          <Trash2 size={15} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              <Link to="/shop" className="text-link continue-link">
                <ArrowLeft size={15} />
                There’s more to discover
              </Link>
              <div className="cart-promise">
                <ShieldCheck size={27} strokeWidth={1.3} />
                <div>
                  <strong>Peace of mind. Packed with every phone.</strong>
                  <p>
                    Genuine products. Brand warranty. Transparent prices. That’s
                    the Aurèa promise.
                  </p>
                </div>
              </div>
            </div>
            <aside className="order-summary">
              <span className="eyebrow">ALL THE DETAILS</span>
              <h2>A little summary.</h2>
              <div className="summary-line">
                <span>Bag subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <div className="summary-line">
                <span>Delivery</span>
                <strong className="green-text">On us</strong>
              </div>
              {discount > 0 && (
                <div className="summary-line">
                  <span>Your welcome privilege</span>
                  <strong className="green-text">− {money(discount)}</strong>
                </div>
              )}
              <form className="coupon-form" onSubmit={applyCoupon}>
                <Tag size={16} />
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Have a privilege code?"
                  aria-label="Discount code"
                />
                <button>{discount ? "Applied ✓" : "Apply"}</button>
              </form>
              {discount > 0 ? (
                <button
                  className="remove-coupon"
                  onClick={() => {
                    setCoupon("");
                    setCode("");
                  }}
                >
                  Remove AUREA1000
                </button>
              ) : (
                <p className="coupon-hint">A warm welcome: try AUREA1000</p>
              )}
              <div className="summary-total">
                <span>Total</span>
                <strong>{money(total)}</strong>
              </div>
              <p className="tax-note">
                Includes GST of approximately{" "}
                {money(Math.round((total * 18) / 118))}
              </p>
              <button
                className="button button-gold full-width"
                onClick={() => setCheckout(true)}
              >
                Continue to demo checkout
                <ArrowRight size={17} />
              </button>
              <div className="secure-note">
                <LockKeyhole size={13} />A safe, no-payment demo experience
              </div>
              <div className="checkout-demo-note">
                This is a frontend demonstration. No real order will be placed
                and no payment is required.
              </div>
            </aside>
          </div>
        ) : (
          <EmptyState
            icon={<ShoppingBag size={34} />}
            title="A little room for extraordinary."
            description="Your bag is waiting for something good. Let’s find your next favourite phone."
          />
        )}
      </section>
      {checkout && (
        <Checkout total={total} onClose={() => setCheckout(false)} />
      )}
    </>
  );
}
function Checkout({ total, onClose }: { total: number; onClose: () => void }) {
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState(1),
    [method, setMethod] = useState("UPI"),
    [order] = useState(
      () => `AU-DEMO-${Date.now().toString(36).slice(-6).toUpperCase()}`,
    );
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pin: "",
  });
  const update = (key: keyof typeof details, value: string) =>
    setDetails({ ...details, [key]: value });
  const [snapshot] = useState(() => cart.map((c) => ({ ...c })));
  return (
    <Modal
      title={
        step === 3 ? "A beautiful choice." : "Make it yours. A demo checkout."
      }
      onClose={onClose}
      wide
    >
      {step < 3 && (
        <>
          <div className="checkout-steps">
            <span className={step === 1 ? "active" : "complete"}>
              <b>{step > 1 ? <Check size={12} /> : 1}</b>Your details
            </span>
            <i />
            <span className={step === 2 ? "active" : ""}>
              <b>2</b>Review & finish
            </span>
          </div>
          <div className="demo-banner">
            <ShieldCheck size={17} />
            Demo only — no payment or real order. Use sample details.
          </div>
        </>
      )}
      {step === 1 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="checkout-form"
        >
          <div className="form-grid">
            <label className="form-label">
              Full name
              <input
                required
                minLength={2}
                autoComplete="name"
                value={details.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Aarav Sharma"
              />
            </label>
            <label className="form-label">
              Mobile number
              <div className="phone-field">
                <span>+91</span>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  title="Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9"
                  maxLength={10}
                  value={details.phone}
                  onChange={(e) =>
                    update("phone", e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="98765 43210"
                />
              </div>
            </label>
            <label className="form-label span-two">
              Email address
              <input
                required
                type="email"
                value={details.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="aarav@example.com"
              />
            </label>
            <label className="form-label span-two">
              Flat, house number, building & street
              <input
                required
                minLength={5}
                value={details.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="12, Palm Grove, 100 Feet Road"
              />
            </label>
            <label className="form-label span-two">
              Landmark <span className="optional">(optional)</span>
              <input
                value={details.landmark}
                onChange={(e) => update("landmark", e.target.value)}
                placeholder="Near the neighbourhood park"
              />
            </label>
            <label className="form-label">
              City
              <input
                required
                value={details.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Bengaluru"
              />
            </label>
            <label className="form-label">
              PIN code
              <input
                required
                inputMode="numeric"
                pattern="[1-8][0-9]{5}"
                title="Enter a valid 6-digit Indian PIN code"
                maxLength={6}
                value={details.pin}
                onChange={(e) =>
                  update("pin", e.target.value.replace(/\D/g, ""))
                }
                placeholder="560038"
              />
            </label>
            <label className="form-label span-two">
              State / Union territory
              <select
                required
                value={details.state}
                onChange={(e) => update("state", e.target.value)}
              >
                <option value="">Select your state</option>
                {[
                  "Andaman and Nicobar Islands",
                  "Andhra Pradesh",
                  "Arunachal Pradesh",
                  "Assam",
                  "Bihar",
                  "Chandigarh",
                  "Chhattisgarh",
                  "Dadra and Nagar Haveli and Daman and Diu",
                  "Delhi",
                  "Goa",
                  "Gujarat",
                  "Haryana",
                  "Himachal Pradesh",
                  "Jammu and Kashmir",
                  "Jharkhand",
                  "Karnataka",
                  "Kerala",
                  "Ladakh",
                  "Lakshadweep",
                  "Madhya Pradesh",
                  "Maharashtra",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Odisha",
                  "Puducherry",
                  "Punjab",
                  "Rajasthan",
                  "Sikkim",
                  "Tamil Nadu",
                  "Telangana",
                  "Tripura",
                  "Uttar Pradesh",
                  "Uttarakhand",
                  "West Bengal",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <p className="fine-print">
            These details stay only in this session and are not sent anywhere.
          </p>
          <button className="button button-gold full-width">
            Review your demo order
            <ArrowRight size={17} />
          </button>
        </form>
      ) : step === 2 ? (
        <div className="checkout-review">
          <div className="review-delivery">
            <div>
              <h3>Your delivery details</h3>
              <button className="text-button" onClick={() => setStep(1)}>
                Edit
              </button>
            </div>
            <strong>{details.name}</strong>
            <p>
              {details.address}
              {details.landmark ? `, ${details.landmark}` : ""}
              <br />
              {details.city}, {details.state} – {details.pin}
              <br />
              +91 {details.phone} · {details.email}
            </p>
          </div>
          <div className="review-products">
            {snapshot.map((item) => {
              const p = getProduct(item.id)!;
              return (
                <div key={item.key}>
                  <img src={p.image} alt="" />
                  <span>
                    <strong>{p.model}</strong>
                    <small>
                      {item.storage} · {item.color} · Qty {item.quantity}
                    </small>
                  </span>
                  <b>{money(variantPrice(p, item.storage) * item.quantity)}</b>
                </div>
              );
            })}
          </div>
          <h3>Choose a demo payment preference</h3>
          <p className="fine-print">
            Visual preference only. No payment information is collected.
          </p>
          <div className="demo-payments">
            {["UPI", "Credit / debit card", "Easy EMI", "Pay at showroom"].map(
              (m) => (
                <button
                  onClick={() => setMethod(m)}
                  className={method === m ? "active" : ""}
                  key={m}
                >
                  <CreditCard size={17} />
                  {m}
                  {method === m && <Check size={13} />}
                </button>
              ),
            )}
          </div>
          <div className="summary-total">
            <span>
              Demo total <small>GST included</small>
            </span>
            <strong>{money(total)}</strong>
          </div>
          <button
            className="button button-gold full-width"
            onClick={() => {
              setStep(3);
              clearCart();
            }}
          >
            Complete demo order
            <Check size={17} />
          </button>
          <p className="secure-note">
            No charge. No delivery. Just an extraordinary demo.
          </p>
        </div>
      ) : (
        <div className="checkout-success">
          <span>
            <CheckCircle2 size={44} strokeWidth={1.3} />
          </span>
          <span className="eyebrow">THE START OF SOMETHING GOOD</span>
          <h2>
            Consider it yours.
            <br />
            <em>In our little demo.</em>
          </h2>
          <p>
            Thank you, {details.name.split(" ")[0]}. You’ve completed the Aurèa
            experience. Your demo order is ready to admire.
          </p>
          <div>
            <span>Demo order reference</span>
            <strong>{order}</strong>
          </div>
          <p className="fine-print">
            No payment was taken, no email was sent, and no real order or
            delivery was created. Your bag has been cleared.
          </p>
          <Link to="/shop" className="button button-gold" onClick={onClose}>
            Keep discovering
            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </Modal>
  );
}
