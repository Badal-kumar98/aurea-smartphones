import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { brands, products, money } from "../data/products";
import { useStore } from "../lib/store";
import { Modal } from "./UI";
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="Aurèa home"
    >
      <svg viewBox="0 0 36 40" fill="none" aria-hidden="true">
        <path
          d="M3 33 18 4l15 29M9 23h18M12 33l6-12 6 12"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M4 37h28" stroke="currentColor" strokeWidth=".7" />
      </svg>
      <span>
        AURÈA<small>THE SMARTPHONE EDIT</small>
      </span>
    </Link>
  );
}
export function Navbar() {
  const { wishlist, cart } = useStore();
  const [mobile, setMobile] = useState(false),
    [brandOpen, setBrandOpen] = useState(false),
    [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const brandRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(e.target as Node))
        setBrandOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBrandOpen(false);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", key);
    };
  }, []);
  return (
    <>
      <div className="announcement">
        <span>Thoughtfully chosen. Genuinely yours.</span>
        <div>
          Free delivery above ₹999 <i /> Easy EMI available <i /> 100% genuine
          products
        </div>
        <span>
          Made for India <span className="india-dot" />
        </span>
      </div>
      <header className="site-header">
        <div className="nav-container">
          <button
            className="icon-button mobile-menu-toggle"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive && !location.search ? "active" : ""
              }
            >
              Shop
            </NavLink>
            <div className="brands-dropdown" ref={brandRef}>
              <button
                className={
                  location.pathname.startsWith("/brands") ? "active" : ""
                }
                onClick={() => setBrandOpen(!brandOpen)}
                aria-expanded={brandOpen}
              >
                Brands
                <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {brandOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="brand-menu"
                  >
                    <span className="eyebrow">Find your favourite</span>
                    {brands.map((b) => (
                      <Link key={b} to={`/brands/${b.toLowerCase()}`}>
                        {b}
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <NavLink
              to="/shop?collection=new"
              className={() => location.search.includes("new") ? "active" : ""}
            >
              New Arrivals
              <span className="tiny-dot" />
            </NavLink>
            <NavLink to="/offers">Offers</NavLink>
            <NavLink to="/compare">Compare</NavLink>
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button"
              aria-label="Search phones"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <Link
              className="icon-button nav-wishlist"
              aria-label={`Wishlist, ${wishlist.length} phones`}
              to="/wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="count-badge">{wishlist.length}</span>
              )}
            </Link>
            <span className="nav-divider" />
            <Link
              to="/cart"
              className="cart-link"
              aria-label={`Shopping bag, ${cart.reduce((n, c) => n + c.quantity, 0)} items`}
            >
              <ShoppingBag size={20} />
              <span>Bag</span>
              <b>{cart.reduce((n, c) => n + c.quantity, 0)}</b>
            </Link>
          </div>
        </div>
        <AnimatePresence>
          {mobile && (
            <motion.nav
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {[
                ["Shop all phones", "/shop"],
                ["New arrivals", "/shop?collection=new"],
                ["Offers", "/offers"],
                ["Compare phones", "/compare"],
                ["Your wishlist", "/wishlist"],
                ["Our story", "/about"],
                ["Visit our showroom", "/contact"],
              ].map(([label, path]) => (
                <Link to={path} key={path}>
                  {label}
                  <ArrowUpRight size={17} />
                </Link>
              ))}
              <div className="mobile-brands">
                {brands.map((b) => (
                  <Link to={`/brands/${b.toLowerCase()}`} key={b}>
                    {b}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const found = products.filter((p) =>
    (p.brand + " " + p.model).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Modal title="Find something extraordinary." onClose={onClose} wide>
      <form
        className="search-input large"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/shop?q=" + encodeURIComponent(query));
          onClose();
        }}
      >
        <Search size={20} />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a phone, brand, or a little inspiration…"
          aria-label="Search products"
        />
        <button className="icon-button" aria-label="View search results">
          <ArrowRight size={19} />
        </button>
      </form>
      <div className="search-suggestions">
        <span className="eyebrow">
          {query ? `${found.length} matches` : "The most-loved edit"}
        </span>
        {found.length ? (
          found.slice(0, 5).map((p) => (
            <Link key={p.id} to={`/product/${p.slug}`} onClick={onClose}>
              <img src={p.image} alt="" />
              <span>
                <small>{p.brand}</small>
                <strong>{p.model}</strong>
              </span>
              <b>{money(p.price)}</b>
              <ArrowUpRight size={16} />
            </Link>
          ))
        ) : (
          <p>No phones found. Try “Samsung”, “Pixel” or “iPhone”.</p>
        )}
      </div>
      <Link
        to={"/shop?q=" + encodeURIComponent(query)}
        className="text-link"
        onClick={onClose}
      >
        Explore all matching phones
        <ArrowRight size={16} />
      </Link>
    </Modal>
  );
}
export function Footer() {
  const [email, setEmail] = useState(""),
    [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>
              Extraordinary phones.
              <br />
              An experience to match.
            </p>
            <span className="footer-india">
              Thoughtfully curated in India <span>✦</span>
            </span>
          </div>
          <div className="footer-links">
            <h4>The collection</h4>
            <Link to="/shop">All smartphones</Link>
            <Link to="/shop?collection=new">New arrivals</Link>
            <Link to="/offers">Offers & privileges</Link>
            <Link to="/compare">Compare phones</Link>
          </div>
          <div className="footer-links">
            <h4>A little more Aurèa</h4>
            <Link to="/about">Our story</Link>
            <Link to="/contact">Visit the showroom</Link>
            <Link to="/contact#enquiry">Talk to an expert</Link>
            <Link to="/wishlist">Your wishlist</Link>
          </div>
          <div className="footer-newsletter">
            <h4>Good things. First.</h4>
            <p>
              New arrivals, thoughtful edits, and a little gold in your inbox.
            </p>
            {subscribed ? (
              <div className="newsletter-success">
                <Check size={17} /> You're on the list — in this demo.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  aria-label="Email address for newsletter"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button aria-label="Subscribe to newsletter">
                  <ArrowRight size={19} />
                </button>
              </form>
            )}
            <small>A little inspiration. Never the noise.</small>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aurèa. A finer connection.</span>
          <span>All prices include GST.</span>
          <div>
            <span>UPI</span>
            <span>VISA</span>
            <span>RuPay</span>
            <span className="payment-note">Payment options shown for demo</span>
          </div>
        </div>
        <p className="demo-disclaimer">
          A frontend-only showroom demo. Product prices, offers, ratings,
          testimonials and store details are illustrative. No real orders,
          messages or payments are processed.
        </p>
      </div>
    </footer>
  );
}
export function GlobalOverlays() {
  const { toast, compare, clearCompare } = useStore();
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            role="status"
            className="toast"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <span>
              <Check size={16} />
            </span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {compare.length > 0 && location.pathname != "/compare" && (
          <motion.div
            className="compare-tray"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <SlidersHorizontal size={19} />
            <div>
              <strong>
                Your shortlist <span>{compare.length}/4</span>
              </strong>
              <small>
                {compare.length < 2
                  ? "Add one more phone to compare"
                  : "Let’s find your perfect match"}
              </small>
            </div>
            <Link className="button button-dark small" to="/compare">
              Compare
              <ArrowRight size={15} />
            </Link>
            <button
              className="icon-button"
              onClick={clearCompare}
              aria-label="Clear comparison"
            >
              <X size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
