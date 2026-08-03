import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const languages = [
    { code: 'en', label: '🇬🇧 EN' },
    { code: 'fr', label: '🇫🇷 FR' },
    { code: 'ar', label: '🇩🇿 AR' }
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    
    // RTL / LTR switch
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
      document.body.classList.remove('rtl');
    }
  };

  // Set initial direction on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    if (savedLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = savedLang;
      document.body.classList.remove('rtl');
    }
  }, []);

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-gray-700 hover:text-red-800 transition">
        <FaGlobe className="text-xl" />
        <span className="text-sm hidden md:inline">
          {languages.find(l => l.code === currentLang)?.label || '🌐'}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2 ${
              currentLang === lang.code ? 'bg-red-50 text-red-800 font-bold' : 'text-gray-700'
            }`}
          >
            {lang.label}
            {currentLang === lang.code && ' ✅'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
