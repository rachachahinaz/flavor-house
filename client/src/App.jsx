import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LanguageProvider } from './context/LanguageContext';
import Notification from './components/Notification';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import PromotionsPage from './pages/PromotionsPage';
import ContactPage from './pages/ContactPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DriverLoginPage from './pages/DriverLoginPage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import PaymentPage from './pages/PaymentPage';
import SearchPage from './pages/SearchPage';

// Import i18n
import './i18n';

function App() {
  return (
    <Router>
      <LanguageProvider>   {/* ← LanguageProvider en premier */}
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <OrderProvider>
                  <Notification />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/promotions" element={<PromotionsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/driver/login" element={<DriverLoginPage />} />
                    <Route path="/driver" element={<DriverDashboardPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/search" element={<SearchPage />} />
                  </Routes>
                  <Chatbot />
                </OrderProvider>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
