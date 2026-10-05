/* eslint-disable react-refresh/only-export-components -- The store provider and its typed consumer hook intentionally share this module. */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "../data/products";
export type CartItem = {
  id: string;
  color: string;
  storage: string;
  quantity: number;
  key: string;
};
function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function usePersist<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => load(key, initial));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Browsers that block storage retain a fully functional in-memory session.
    }
  }, [value, key]);
  return [value, setValue] as const;
}
type Store = {
  wishlist: string[];
  compare: string[];
  cart: CartItem[];
  coupon: string;
  toast: string;
  notify: (s: string) => void;
  toggleWish: (id: string) => void;
  toggleCompare: (id: string) => void;
  addCart: (id: string, color?: string, storage?: string) => void;
  changeQuantity: (key: string, delta: number) => void;
  removeCart: (key: string) => void;
  clearCart: () => void;
  setCoupon: (s: string) => void;
  clearCompare: () => void;
};
const StoreContext = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = usePersist<string[]>("aurea-wishlist", []);
  const [compare, setCompare] = usePersist<string[]>("aurea-compare", []);
  const [cart, setCart] = usePersist<CartItem[]>("aurea-cart", []);
  const [coupon, setCoupon] = usePersist<string>("aurea-coupon", "");
  const [toast, setToast] = useState("");
  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(""), 3200);
      return () => clearTimeout(id);
    }
  }, [toast]);
  const notify = (s: string) => setToast(s);
  const toggleWish = (id: string) => {
    const exists = wishlist.includes(id);
    setWishlist(exists ? wishlist.filter((x) => x !== id) : [...wishlist, id]);
    notify(
      exists
        ? "Removed from your wishlist"
        : "A little something for later. Saved to wishlist.",
    );
  };
  const toggleCompare = (id: string) => {
    if (compare.includes(id)) {
      setCompare(compare.filter((x) => x !== id));
      return;
    }
    if (compare.length === 4) {
      notify("You can compare up to 4 phones. Remove one to add another.");
      return;
    }
    setCompare([...compare, id]);
    notify("Added to your comparison");
  };
  const addCart = (id: string, color?: string, storage?: string) => {
    const p = getProduct(id);
    if (!p) return;
    const c = color || p.colors[0].name,
      s = storage || p.storage[0],
      key = `${id}-${c}-${s}`;
    setCart((prev) => {
      const exists = prev.find((x) => x.key === key);
      return exists
        ? prev.map((x) =>
            x.key === key ? { ...x, quantity: Math.min(5, x.quantity + 1) } : x,
          )
        : [...prev, { id, color: c, storage: s, quantity: 1, key }];
    });
    notify("Good choice. Added to your bag.");
  };
  const changeQuantity = (key: string, delta: number) =>
    setCart((prev) =>
      prev.map((x) =>
        x.key === key
          ? { ...x, quantity: Math.max(1, Math.min(5, x.quantity + delta)) }
          : x,
      ),
    );
  return (
    <StoreContext.Provider
      value={{
        wishlist,
        compare,
        cart,
        coupon,
        toast,
        notify,
        toggleWish,
        toggleCompare,
        addCart,
        changeQuantity,
        removeCart: (key) => setCart(cart.filter((x) => x.key !== key)),
        clearCart: () => {
          setCart([]);
          setCoupon("");
        },
        setCoupon,
        clearCompare: () => setCompare([]),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("StoreProvider is required");
  return context;
}
