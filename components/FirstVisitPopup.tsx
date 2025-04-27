import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const translations = {
  en: {
    header: 'You just found yourself in the data.',
    body: "Mentibus is the open data layer for AI + Web3.\nYou didn't ask to be indexed. You just are.\nSeen by investors, builders, agents, and machines.\nOwn it. Control it. Feed it.\nFollow the signal @Mentibus_xyz",
    cta: 'Claim Your Profile — Get Lists. Join Groups. Access the Data.',
    explore: 'Or explore the network.',
  },
  // Add more languages as needed
};

export default function FirstVisitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const lang = navigator.language.slice(0, 2);
  const t = translations[lang as keyof typeof translations] || translations.en;

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('mentibus-popup-seen') === 'true';

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('mentibus-popup-seen', 'true');
  };

  const handleClaim = () => {
    handleDismiss();
    router.push('/claim');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-green-500 rounded-lg p-4 sm:p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white"
          aria-label="Close">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.header}
          </h2>

          <div className="text-sm sm:text-base text-gray-300 whitespace-pre-line">
            {t.body}
          </div>

          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={handleClaim}
              className="w-full bg-green-500 text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded hover:bg-green-600 transition-colors text-sm sm:text-base">
              {t.cta}
            </button>

            <div
              onClick={handleDismiss}
              className="block text-green-500 hover:text-green-400 transition-colors text-sm sm:text-base">
              <Link href="/">{t.explore}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
