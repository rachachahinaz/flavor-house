import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'fr', label: '🇫🇷 Français' },
    { code: 'ar', label: '🇩🇿 العربية' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-gray-700 hover:text-red-800 transition">
        <FaGlobe className="text-xl" />
        <span className="text-sm hidden md:inline">
          {languages.find(l => l.code === language)?.label || 'English'}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2 ${
              language === lang.code ? 'bg-red-50 text-red-800 font-bold' : 'text-gray-700'
            }`}
          >
            {lang.label}
            {language === lang.code && ' ✅'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
