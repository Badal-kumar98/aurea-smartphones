import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Plus, Check, Star } from "lucide-react";
import { type Product, money } from "../data/products";
import { useStore } from "../lib/store";
export default function ProductCard({ product: p }: { product: Product }) {
  const { wishlist, toggleWish, compare, toggleCompare } = useStore();
  const [color, setColor] = useState(0);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <span className={`product-badge ${p.isNew ? "new" : ""}`}>
          {p.badge}
        </span>
        <button
          className={`wish-button ${wishlist.includes(p.id) ? "selected" : ""}`}
          aria-label={`${wishlist.includes(p.id) ? "Remove" : "Save"} ${p.model} ${wishlist.includes(p.id) ? "from" : "to"} wishlist`}
          onClick={() => toggleWish(p.id)}
        >
          <Heart
            size={17}
            fill={wishlist.includes(p.id) ? "currentColor" : "none"}
          />
        </button>
        <Link to={`/product/${p.slug}`} className="product-image-link">
          <img src={p.image} alt={`${p.brand} ${p.model}`} loading="lazy" />
        </Link>
        <div className="swatch-row">
          {p.colors.map((c, i) => (
            <button
              key={c.name}
              className={`swatch ${color === i ? "active" : ""}`}
              style={{ background: c.hex }}
              title={c.name}
              aria-label={`${p.model} in ${c.name}`}
              aria-pressed={color === i}
              onClick={() => setColor(i)}
            />
          ))}
        </div>
      </div>
      <div className="product-content">
        <div className="product-brand-row">
          <span>{p.brand}</span>
          <span className="rating">
            <Star size={11} fill="currentColor" />
            {p.rating}
            <span>({p.reviews})</span>
          </span>
        </div>
        <Link to={`/product/${p.slug}`}>
          <h3>{p.model}</h3>
        </Link>
        <p className="product-spec">
          {p.storage[0]} <span>·</span> {p.colors[color].name}
        </p>
        <div className="price-row">
          <strong>{money(p.price)}</strong>
          <del>{money(p.originalPrice)}</del>
        </div>
        <p className="emi">
          Or from {money(Math.ceil(p.price / 12))}/month with EMI
        </p>
        <div className="card-bottom">
          <button
            className={`compare-button ${compare.includes(p.id) ? "selected" : ""}`}
            onClick={() => toggleCompare(p.id)}
          >
            {compare.includes(p.id) ? <Check size={13} /> : <Plus size={13} />}
            Compare
          </button>
          <Link
            to={`/product/${p.slug}`}
            className="card-view"
            aria-label={`View ${p.model}`}
          >
            View phone
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
