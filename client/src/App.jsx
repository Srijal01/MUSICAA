import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import ProtectedRoute from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PaymentComponent from "./components/PaymentForm";
import Success from "./components/Success";
import Failure from "./components/Failure";

// New Feature Components
import WishlistPage from './features/wishlist/WishlistPage';
import CompareProductsPage from './features/products/CompareProductsPage';

// Context Providers
import { WishlistProvider } from './features/wishlist/WishlistContext';
import { CompareProvider } from './features/products/CompareContext';
import { NotificationProvider } from './shared/contexts/NotificationContext';


function App() {
  return (
    <NotificationProvider>
      <WishlistProvider>
        <CompareProvider>
          <Router>
            <div className="App min-h-screen">
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/" element={<PaymentComponent />} />
                <Route path="/payment-success" element={<Success />} />
                <Route path="/payment-failure" element={<Failure />} />
                
                {/* New Feature Routes */}
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/compare" element={<CompareProductsPage />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            <Footer />
            </div>
          </Router>
        </CompareProvider>
      </WishlistProvider>
    </NotificationProvider>
  );
}

export default App;
