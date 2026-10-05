import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { StoreProvider } from "./lib/store";
import { Navbar, Footer, GlobalOverlays } from "./components/Layout";
import { EmptyState } from "./components/UI";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Compare from "./pages/Compare";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Offers from "./pages/Offers";
import { About, Contact } from "./pages/Content";

function Application() {
  const location = useLocation();
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar key={location.pathname + location.search} />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/brands/:brand" element={<Shop />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <EmptyState
                  title="A little off the beaten path."
                  description="This page isn’t in our collection, but something extraordinary is waiting for you."
                />
              }
            />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <GlobalOverlays />
    </>
  );
}
export default function App() {
  return (
    <HashRouter>
      <MotionConfig reducedMotion="user">
        <StoreProvider>
          <Application />
        </StoreProvider>
      </MotionConfig>
    </HashRouter>
  );
}
