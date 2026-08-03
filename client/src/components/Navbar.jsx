import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaSearch, 
  FaHeart, 
  FaShoppingCart, 
  FaUser, 
  FaHome, 
  FaUtensils, 
  FaTags, 
  FaPhone,
  FaUserCog,
  FaSignOutAlt,
  FaMotorcycle,
  FaGlobe
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { getItemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const isRTL = i18n.language === 'ar';

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const isAdmin = isAuthenticated() && user?.email === 'admin@flavorhouse.dz';
  const isDriver = localStorage.getItem('driverAuth') === 'true';

  // Navigation links with RTL order
  const navLinks = [
    { path: '/', icon: FaHome, label: t('navbar.home') },
    { path: '/menu', icon: FaUtensils, label: t('navbar.menu') },
    { path: '/promotions', icon: FaTags, label: t('navbar.promotions') },
    { path: '/contact', icon: FaPhone, label: t('navbar.contact') },
  ];

  // Reverse links for RTL
  const displayLinks = isRTL ? [...navLinks].reverse() : navLinks;

  return (
    <nav className={`flex items-center justify-between px-6 py-4 bg-white shadow-md ${isRTL ? 'rtl-nav' : ''}`}>
      {/* Logo - à droite en RTL */}
      <div className={`flex items-center ${isRTL ? 'order-2' : ''}`}>
        <a href="/" className="text-left no-underline">
          <h1 className="text-2xl font-bold text-red-800 tracking-wider">FLAVOR HOUSE</h1>
          <p className="text-xs text-gray-500 tracking-[0.2em] -mt-1">{t('navbar.restaurant')}</p>
        </a>
      </div>

      {/* Menu links - ordre inversé en RTL */}
      <div className={`hidden md:flex space-x-8 ${isRTL ? 'order-1 space-x-reverse' : ''}`}>
        {displayLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            className="text-gray-700 hover:text-red-800 font-medium transition flex items-center gap-1"
          >
            <link.icon className="text-sm" /> {link.label}
          </a>
        ))}
      </div>

      {/* Icons - à gauche en RTL */}
      <div className={`flex items-center space-x-5 ${isRTL ? 'order-3 space-x-reverse' : ''}`}>
        <LanguageSwitcher />
        
        <a href="/search">
          <FaSearch className="text-xl cursor-pointer hover:text-red-800 transition" />
        </a>
        
        <a href="/favorites">
          <FaHeart className="text-xl cursor-pointer hover:text-red-800 transition" />
        </a>
        
        <a href="/cart" className="relative">
          <FaShoppingCart className="text-xl cursor-pointer hover:text-red-800 transition" />
          <span className="absolute -top-2 -right-2 bg-red-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getItemCount()}
          </span>
        </a>

        {isDriver && (
          <a href="/driver" className="text-gray-700 hover:text-red-800 transition" title={t('navbar.driver')}>
            <FaMotorcycle className="text-xl" />
          </a>
        )}

        {isAdmin && (
          <a href="/admin" className="text-gray-700 hover:text-red-800 transition" title={t('navbar.admin')}>
            <FaUserCog className="text-xl" />
          </a>
        )}
        
        {isAuthenticated() ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">👋 {user?.name || 'User'}</span>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800 transition" title={t('navbar.logout')}>
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        ) : (
          <a href="/login">
            <button className="bg-red-800 text-white px-4 py-2 rounded-full text-sm hover:bg-red-900 transition">
              {t('navbar.login')}
            </button>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
