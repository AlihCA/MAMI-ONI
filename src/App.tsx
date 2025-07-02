import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { clerkConfig, isClerkConfigured } from "./lib/clerk";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import WishlistPage from "./pages/WishlistPage";
import FloatingCart from "./components/FloatingCart";
import LiveChat from "./components/LiveChat";

function App() {
  // Check if Clerk is configured
  if (!isClerkConfigured()) {
    console.warn(
      "Clerk is not configured. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file"
    );
  }

  const AppContent = () => (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route
                  path="/products/:category"
                  element={<ProductListingPage />}
                />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingCart />
            <LiveChat />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );

  // Wrap with ClerkProvider if configured
  if (isClerkConfigured()) {
    return (
      <ClerkProvider
        publishableKey={clerkConfig.publishableKey!}
        appearance={clerkConfig.appearance}
      >
        <AppContent />
      </ClerkProvider>
    );
  }

  // Return app without Clerk if not configured
  return <AppContent />;
}

export default App;
