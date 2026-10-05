import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { brands, money, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { EmptyState, PageHeader, Reveal } from "../components/UI";
const needLabels: Record<string, string> = {
  flagship: "The flagship life",
  camera: "For the storytellers",
  gaming: "Play without limits",
  value: "Big on value",
  battery: "Go all day. And more.",
};
export default function Shop() {
  const { brand } = useParams();
  const [params, setParams] = useSearchParams();
  const urlQuery = params.get("q") || "";
  const [queryState, setQueryState] = useState({ urlQuery, value: urlQuery });
  const query = queryState.urlQuery === urlQuery ? queryState.value : urlQuery;
  const setQuery = (value: string) => setQueryState({ urlQuery, value });
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(150000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [storage, setStorage] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const need = params.get("need") || "",
    isNew = params.get("collection") === "new";
  const routeBrand = brands.find((b) => b.toLowerCase() === brand);
  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!routeBrand || p.brand === routeBrand) &&
        (!need || p.needs.includes(need)) &&
        (!isNew || p.isNew) &&
        (!selectedBrands.length || selectedBrands.includes(p.brand)) &&
        p.price <= maxPrice &&
        (!storage.length || storage.some((s) => p.storage.includes(s))) &&
        (!minRating || p.rating >= 4.8) &&
        `${p.brand} ${p.model} ${p.processor}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "discount")
      list.sort(
        (a, b) =>
          (b.originalPrice - b.price) / b.originalPrice -
          (a.originalPrice - a.price) / a.originalPrice,
      );
    return list;
  }, [
    routeBrand,
    need,
    isNew,
    selectedBrands,
    maxPrice,
    storage,
    minRating,
    query,
    sort,
  ]);
  const suggestions = query
    ? products
        .filter((p) =>
          (p.brand + " " + p.model).toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 4)
    : [];
  const toggle = (value: string, arr: string[], set: (a: string[]) => void) =>
    set(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
  const reset = () => {
    setSelectedBrands([]);
    setStorage([]);
    setMinRating(false);
    setMaxPrice(150000);
    setQuery("");
    setSort("featured");
    setParams({});
  };
  const filterCount =
    selectedBrands.length +
    storage.length +
    (maxPrice < 150000 ? 1 : 0) +
    (minRating ? 1 : 0) +
    (need ? 1 : 0);
  const filterContents = (
    <>
      <div className="filter-heading">
        <h3>Refine your edit</h3>
        <button onClick={reset}>Reset</button>
      </div>
      {!routeBrand && (
        <fieldset>
          <legend>Brand</legend>
          {brands.map((b) => (
            <label className="check-label" key={b}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggle(b, selectedBrands, setSelectedBrands)}
              />
              <span>{b}</span>
              <small>{products.filter((p) => p.brand === b).length}</small>
            </label>
          ))}
        </fieldset>
      )}
      <fieldset>
        <legend>Your budget</legend>
        <div className="range-values">
          <span>₹0</span>
          <strong>{money(maxPrice)}</strong>
        </div>
        <input
          className="range-input"
          aria-label="Maximum price"
          type="range"
          min="20000"
          max="150000"
          step="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <button
          className={`budget-chip ${maxPrice === 30000 ? "active" : ""}`}
          onClick={() => setMaxPrice(maxPrice === 30000 ? 150000 : 30000)}
        >
          Under ₹30,000
          <Check size={12} />
        </button>
      </fieldset>
      <fieldset>
        <legend>Made for you</legend>
        {Object.entries(needLabels).map(([key, label]) => (
          <label className="check-label" key={key}>
            <input
              type="radio"
              name="need"
              checked={need === key}
              onChange={() => {
                const next = new URLSearchParams(params);
                next.set("need", key);
                setParams(next);
              }}
            />
            <span>{label}</span>
          </label>
        ))}
        {need && (
          <button
            className="clear-need"
            onClick={() => {
              const next = new URLSearchParams(params);
              next.delete("need");
              setParams(next);
            }}
          >
            Clear preference
          </button>
        )}
      </fieldset>
      <fieldset>
        <legend>Storage</legend>
        <div className="storage-filter">
          {["128GB", "256GB", "512GB", "1TB"].map((s) => (
            <button
              className={storage.includes(s) ? "active" : ""}
              key={s}
              aria-pressed={storage.includes(s)}
              onClick={() => toggle(s, storage, setStorage)}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Customer favourites</legend>
        <label className="check-label">
          <input
            type="checkbox"
            checked={minRating}
            onChange={(e) => setMinRating(e.target.checked)}
          />
          <span>4.8 stars & above</span>
        </label>
      </fieldset>
      <div className="filter-help">
        <span>Not sure where to start?</span>
        <p>A little expert advice goes a long way.</p>
        <Link to="/contact#enquiry">
          Let’s talk phones
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </>
  );
  if (brand && !routeBrand)
    return (
      <EmptyState
        title="A new discovery awaits."
        description="We don’t have that brand in our edit. Explore the collection instead."
      />
    );
  return (
    <>
      <PageHeader
        eyebrow={routeBrand ? "THE BRAND EDIT" : "THE AURÈA COLLECTION"}
        title={
          routeBrand
            ? `The ${routeBrand} edit.`
            : isNew
              ? "New here. Made for you."
              : need
                ? needLabels[need] || "Find your extraordinary."
                : "Find your extraordinary."
        }
        description={
          routeBrand
            ? `Everything you love about ${routeBrand}. With a little extra Aurèa care.`
            : "Exceptional smartphones. Thoughtfully chosen. Honestly priced."
        }
      />
      <div className="container shop-container">
        <div className="shop-toolbar">
          <div className="shop-search">
            <div className="search-input">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a phone, brand, or feature…"
                aria-label="Search the collection"
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
              />
              {query && (
                <button
                  className="icon-button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <X size={15} />
                </button>
              )}
            </div>
            {focused && suggestions.length > 0 && (
              <div className="autocomplete">
                {suggestions.map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`}>
                    <img src={p.image} alt="" />
                    <span>
                      {p.model}
                      <small>{p.brand}</small>
                    </span>
                    <b>{money(p.price)}</b>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            className="button button-outline filter-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={17} />
            Filters {filterCount > 0 && `(${filterCount})`}
          </button>
          <label className="sort-select">
            <span>Sort by:</span>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Our recommendations</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Highest rated</option>
              <option value="discount">Biggest savings</option>
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
        <div className="shop-layout">
          <aside
            className={`filter-panel ${filtersOpen ? "open" : ""}`}
            aria-label="Product filters"
          >
            {filterContents}
            <button
              className="button button-gold mobile-apply"
              onClick={() => setFiltersOpen(false)}
            >
              Show {filtered.length} phones
              <Check size={16} />
            </button>
          </aside>
          <div className="shop-results">
            <div className="results-header">
              <p>
                <strong>{filtered.length}</strong> thoughtfully chosen phones
              </p>
              <span>Prices inclusive of GST</span>
            </div>
            {filterCount > 0 && (
              <div className="active-filters">
                {selectedBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggle(b, selectedBrands, setSelectedBrands)}
                  >
                    {b}
                    <X size={12} />
                  </button>
                ))}
                {need && (
                  <button
                    onClick={() => {
                      const n = new URLSearchParams(params);
                      n.delete("need");
                      setParams(n);
                    }}
                  >
                    {needLabels[need]}
                    <X size={12} />
                  </button>
                )}
                {maxPrice < 150000 && (
                  <button onClick={() => setMaxPrice(150000)}>
                    Under {money(maxPrice)}
                    <X size={12} />
                  </button>
                )}
                {storage.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(s, storage, setStorage)}
                  >
                    {s}
                    <X size={12} />
                  </button>
                ))}
                {minRating && (
                  <button onClick={() => setMinRating(false)}>
                    4.8+ stars
                    <X size={12} />
                  </button>
                )}
              </div>
            )}
            {filtered.length ? (
              <div className="product-grid shop-grid">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 0.05}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search size={35} />
                <h2>Let’s broaden the horizon.</h2>
                <p>
                  No phones match all these filters. A small change could reveal
                  your perfect fit.
                </p>
                <button className="button button-gold" onClick={reset}>
                  Reset filters
                </button>
              </div>
            )}
            <div className="shop-end-note">
              <span>✦</span>
              <p>
                A considered collection. Not an endless catalogue.
                <br />
                <strong>Only phones we’d be happy to recommend.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
