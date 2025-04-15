import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language Translations
const resources = {
  eng: {
    translation: {
      name: "Paracetamol",
      dose: "500 mg",
      description: "Used for pain relief and fever reduction.",
      barcode: "5017353500809",
      price: "30/Strip",
      expiration_date: "3 year 10 months",
    }
  },
  mar: {
    translation: {
      name: "पॅरासिटामोल",
      barcode: "5017353500809",
      description: "दर्द निवारण आणि ताप कमी करण्यासाठी वापरले जाते.",
      dosage: "500 मि.ग्रॅ.",
      price: "30/पट्टी",
      expiryDate: "3 वर्ष 10 महिने",
    }
  },
  hin: {
    translation: {
      name: "पैरासिटामोल",
      barcode: "5017353500809",
      description: "दर्द निवारण और बुखार कम करने के लिए इस्तेमाल किया जाता है।",
      dosage: "500 मिग्रा",
      price: "30/स्ट्रिप",
      expiryDate: "3 साल 10 महीने",
    }
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "eng", // Default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
