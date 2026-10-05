import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, Scale, ShoppingBag, X } from "lucide-react";
import { money, products } from "../data/products";
import { useStore } from "../lib/store";
import { PageHeader, Modal } from "../components/UI";
export default function Compare() {
  const { compare, toggleCompare, clearCompare, addCart } = useStore();
  const [selecting, setSelecting] = useState(false),
    [differences, setDifferences] = useState(false);
  const selected = products.filter((p) => compare.includes(p.id));
  const specs = [
    { label: "Price", key: "price" },
    { label: "Brand", key: "brand" },
    { label: "Display", key: "display" },
    { label: "Processor", key: "processor" },
    { label: "Camera", key: "camera" },
    { label: "Battery", key: "battery" },
    { label: "RAM", key: "ram" },
    { label: "Storage options", key: "storage" },
    { label: "Operating system", key: "os" },
    { label: "Customer rating", key: "rating" },
  ] as const;
  return (
    <>
      <PageHeader
        eyebrow="SIDE BY SIDE. CLEAR AS DAY."
        title="A little clarity goes a long way."
        description="Your favourites, side by side. Compare 2–4 phones and find the one that feels right."
      />
      <section className="container compare-page">
        <div className="compare-toolbar">
          <span>
            <Scale size={18} />
            {selected.length} of 4 phones selected
          </span>
          <div>
            <label className="check-label">
              <input
                type="checkbox"
                checked={differences}
                onChange={(e) => setDifferences(e.target.checked)}
              />
              Show differences only
            </label>
            {selected.length > 0 && (
              <button className="text-button" onClick={clearCompare}>
                Clear all
              </button>
            )}
          </div>
        </div>
        {selected.length < 2 && (
          <div className="info-notice">
            <SparkIcon />
            Add{" "}
            {selected.length === 0
              ? "at least two phones"
              : "one more phone"}{" "}
            to discover the differences that matter.
          </div>
        )}
        <div className="compare-scroll">
          <div
            className="compare-table"
            style={{
              gridTemplateColumns: `165px repeat(${Math.max(2, selected.length + (selected.length < 4 ? 1 : 0))}, minmax(200px, 1fr))`,
            }}
          >
            <div className="compare-intro">
              <span className="eyebrow">YOUR SHORTLIST</span>
              <h3>
                Find your
                <br />
                <em>perfect fit.</em>
              </h3>
              <p>
                No jargon.
                <br />
                No second-guessing.
              </p>
            </div>
            {selected.map((p) => (
              <div className="compare-product" key={p.id}>
                <button
                  className="icon-button"
                  aria-label={`Remove ${p.model} from comparison`}
                  onClick={() => toggleCompare(p.id)}
                >
                  <X size={16} />
                </button>
                <Link to={`/product/${p.slug}`}>
                  <img src={p.image} alt={p.model} />
                  <span>{p.brand}</span>
                  <h3>{p.model}</h3>
                </Link>
                <strong>{money(p.price)}</strong>
                <button
                  className="button button-gold small"
                  onClick={() => addCart(p.id)}
                >
                  <ShoppingBag size={14} />
                  Add to bag
                </button>
              </div>
            ))}
            {Array.from(
              {
                length: Math.max(
                  0,
                  Math.max(2, selected.length + (selected.length < 4 ? 1 : 0)) -
                    selected.length,
                ),
              },
              (_, i) => (
                <button
                  className="compare-add"
                  key={`empty-${i}`}
                  onClick={() => setSelecting(true)}
                >
                  <span>
                    <Plus size={24} />
                  </span>
                  <strong>Add a phone</strong>
                  <small>Make room for a possibility.</small>
                </button>
              ),
            )}
            {selected.length >= 2 &&
              specs
                .filter(
                  (s) =>
                    !differences ||
                    new Set(selected.map((p) => JSON.stringify(p[s.key])))
                      .size > 1,
                )
                .map((s) => (
                  <div className="compare-row" key={s.key}>
                    <div className="compare-row-label">{s.label}</div>
                    {selected.map((p) => (
                      <div key={p.id}>
                        {s.key === "price"
                          ? money(p.price)
                          : s.key === "storage"
                            ? p.storage.join(" / ")
                            : s.key === "rating"
                              ? `${p.rating} / 5 ★`
                              : p[s.key]}
                      </div>
                    ))}
                    {selected.length < 4 && (
                      <div className="compare-blank">—</div>
                    )}
                  </div>
                ))}
          </div>
        </div>
        <p className="fine-print comparison-note">
          All product data and ratings are illustrative. Prices include GST.
          Specifications may vary by selected configuration.
        </p>
        <Link to="/shop" className="text-link">
          Back to the full collection
          <ArrowUpRight size={16} />
        </Link>
      </section>
      {selecting && (
        <Modal
          title="Make room for a possibility."
          onClose={() => setSelecting(false)}
          wide
        >
          <p className="muted">
            Choose a phone to add to your side-by-side comparison.
          </p>
          <div className="compare-picker">
            {products
              .filter((p) => !compare.includes(p.id))
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    toggleCompare(p.id);
                    setSelecting(false);
                  }}
                >
                  <img src={p.image} alt="" />
                  <span>
                    <small>{p.brand}</small>
                    <strong>{p.model}</strong>
                    <b>{money(p.price)}</b>
                  </span>
                  <Plus size={18} />
                </button>
              ))}
          </div>
        </Modal>
      )}
    </>
  );
}
function SparkIcon() {
  return <span aria-hidden="true">✦</span>;
}
