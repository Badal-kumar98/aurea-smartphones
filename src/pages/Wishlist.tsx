import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { products } from "../data/products";
import { useStore } from "../lib/store";
import { EmptyState, PageHeader } from "../components/UI";
import ProductCard from "../components/ProductCard";
export default function Wishlist() {
  const { wishlist, addCart, toggleWish } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHeader
        eyebrow="SOMETHING TO COME BACK TO"
        title="Your little list of extraordinary."
        description="The ones that caught your eye. Saved right here, on this device."
      />
      <section className="container wishlist-page">
        {saved.length ? (
          <>
            <div className="results-header">
              <p>
                <strong>{saved.length}</strong>{" "}
                {saved.length === 1 ? "phone worth" : "phones worth"} a second
                look
              </p>
              <button
                className="button button-outline small"
                onClick={() => saved.forEach((p) => addCart(p.id))}
              >
                <ShoppingBag size={15} />
                Add all to bag
              </button>
            </div>
            <div className="product-grid">
              {saved.map((p) => (
                <div key={p.id}>
                  <ProductCard product={p} />
                  <div className="wishlist-card-actions">
                    <button onClick={() => addCart(p.id)}>
                      <ShoppingBag size={14} />
                      Add to bag
                    </button>
                    <button
                      aria-label={`Remove ${p.model} from wishlist`}
                      onClick={() => toggleWish(p.id)}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={<Heart size={32} />}
            title="Some things are worth saving."
            description="Tap the heart on any phone that catches your eye. Your favourites will be waiting here."
          />
        )}
      </section>
    </>
  );
}
