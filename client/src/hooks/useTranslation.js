import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation not found
      }
    }
    
    return value[language] || value.en || key;
  };

  return { t, language };
};