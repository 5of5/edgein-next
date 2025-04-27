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
  zh: {
    header: '你刚刚在数据中发现了自己。',
    body: "Mentibus 是 AI + Web3 的开放数据层。\n你没有请求被索引，但你已经被索引了。\n被投资者、建设者、代理人和机器看到。\n拥有它。控制它。滋养它。\n关注 @Mentibus_xyz 获取更多信息。",
    cta: '认领你的个人资料 — 获取名单，加入群组，访问数据。',
    explore: '或者探索整个网络。',
  },
  'zh-TW': {
    header: '你剛剛在數據中發現了自己。',
    body: "Mentibus 是 AI + Web3 的開放數據層。\n你沒有要求被索引，但你已經被索引了。\n被投資人、建設者、代理人和機器所看見。\n擁有它。控制它。滋養它。\n關注 @Mentibus_xyz 了解更多訊息。",
    cta: '認領你的個人資料 — 獲取名單，加入群組，存取數據。',
    explore: '或者探索整個網路。',
  },
  es: {
    header: 'Acabas de encontrarte en los datos.',
    body: "Mentibus es la capa de datos abierta para AI + Web3.\nNo pediste ser indexado. Simplemente lo eres.\nVisto por inversores, constructores, agentes y máquinas.\nHazlo tuyo. Contrólalo. Aliméntalo.\nSigue la señal @Mentibus_xyz",
    cta: 'Reclama tu perfil — Obtén listas. Únete a grupos. Accede a los datos.',
    explore: 'O explora la red.',
  },
  nl: {
    header: 'Je hebt jezelf net in de data gevonden.',
    body: "Mentibus is de open datalaag voor AI + Web3.\nJe hebt niet gevraagd om geïndexeerd te worden. Je bent het gewoon.\nGezien door investeerders, bouwers, agenten en machines.\nBezit het. Controleer het. Voed het.\nVolg het signaal @Mentibus_xyz",
    cta: 'Claim je profiel — Ontvang lijsten. Word lid van groepen. Toegang tot de data.',
    explore: 'Of verken het netwerk.',
  }
  // Add more languages as needed
};

const STORAGE_KEY = 'mentibus-popup-seen';

export default function FirstVisitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const lang = navigator.language.slice(0, 2);
  const t = translations[lang as keyof typeof translations] || translations.en;

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window === 'undefined') return;

    try {
      const hasSeenPopup = localStorage.getItem(STORAGE_KEY);
      
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // If localStorage fails, don't show the popup
      return;
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
    setIsVisible(false);
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

          <div className="space-y-4">
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
