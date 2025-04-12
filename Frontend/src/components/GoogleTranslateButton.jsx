import { useEffect, useState } from 'react';

const GoogleTranslateButton = () => {
  const [showTranslate, setShowTranslate] = useState(false);

  useEffect(() => {
    if (showTranslate) {
      const addScript = () => {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.type = 'text/javascript';
        document.body.appendChild(script);
      };

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      };

      addScript();
    }
  }, [showTranslate]);

  return (
    <div className="text-center">
      <button
        onClick={() => setShowTranslate(!showTranslate)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        🌐 Translate Page
      </button>

      {showTranslate && (
        <div id="google_translate_element" className="mt-2" />
      )}
    </div>
  );
};

export default GoogleTranslateButton;
