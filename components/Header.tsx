
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  texts: {
    appTitle: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, texts }) => {
  const ToggleSwitch: React.FC<{
    label1: string;
    label2: string;
    value: string;
    onToggle: (val: string) => void;
  }> = ({ label1, label2, value, onToggle }) => (
    <div className="flex items-center bg-gray-700 rounded-full p-1 text-sm font-medium">
      <button
        onClick={() => onToggle(label1.toLowerCase())}
        className={`px-3 py-1 rounded-full transition-colors duration-300 ${value === label1.toLowerCase() ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
      >
        {label1}
      </button>
      <button
        onClick={() => onToggle(label2.toLowerCase())}
        className={`px-3 py-1 rounded-full transition-colors duration-300 ${value === label2.toLowerCase() ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
      >
        {label2}
      </button>
    </div>
  );

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <h1 className="text-3xl font-bold text-gray-100 tracking-wider">{texts.appTitle}</h1>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <ToggleSwitch
          label1="EN"
          label2="AR"
          value={language}
          onToggle={(lang) => setLanguage(lang as Language)}
        />
      </div>
    </header>
  );
};