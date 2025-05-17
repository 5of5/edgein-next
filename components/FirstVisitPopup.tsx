import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
  en: {
    header: 'You just found yourself in the data.',
    body: "Mentibus is the open data layer for AI + Web3.\nYou didn't ask to be indexed. You just are.\nSeen by investors, builders, agents, and machines.\nOwn it. Control it. Feed it.\nFollow the signal @Mentibus_xyz",
    cta: 'Claim Your Profile — Get Lists. Join Groups. Access the Data.',
    explore: 'Or explore the network.',
  },
  zh: {
    header: '你刚刚在数据中发现了自己。',
    body: 'Mentibus 是 AI + Web3 的开放数据层。\n你没有请求被索引，但你已经被索引了。\n被投资者、建设者、代理人和机器看到。\n拥有它。控制它。滋养它。\n关注 @Mentibus_xyz 获取更多信息。',
    cta: '认领你的个人资料 — 获取名单，加入群组，访问数据。',
    explore: '或者探索整个网络。',
  },
  'zh-TW': {
    header: '你剛剛在數據中發現了自己。',
    body: 'Mentibus 是 AI + Web3 的開放數據層。\n你沒有要求被索引，但你已經被索引了。\n被投資人、建設者、代理人和機器所看見。\n擁有它。控制它。滋養它。\n關注 @Mentibus_xyz 了解更多訊息。',
    cta: '認領你的個人資料 — 獲取名單，加入群組，存取數據。',
    explore: '或者探索整個網路。',
  },
  es: {
    header: 'Acabas de encontrarte en los datos.',
    body: 'Mentibus es la capa de datos abierta para AI + Web3.\nNo pediste ser indexado. Simplemente lo eres.\nVisto por inversores, constructores, agentes y máquinas.\nHazlo tuyo. Contrólalo. Aliméntalo.\nSigue la señal @Mentibus_xyz',
    cta: 'Reclama tu perfil — Obtén listas. Únete a grupos. Accede a los datos.',
    explore: 'O explora la red.',
  },
  nl: {
    header: 'Je hebt jezelf net in de data gevonden.',
    body: 'Mentibus is de open datalaag voor AI + Web3.\nJe hebt niet gevraagd om geïndexeerd te worden. Je bent het gewoon.\nGezien door investeerders, bouwers, agenten en machines.\nBezit het. Controleer het. Voed het.\nVolg het signaal @Mentibus_xyz',
    cta: 'Claim je profiel — Ontvang lijsten. Word lid van groepen. Toegang tot de data.',
    explore: 'Of verken het netwerk.',
  },
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-black/95 border border-green-500/80 rounded-xl p-6 sm:p-8 max-w-2xl w-full mx-4 relative overflow-hidden shadow-2xl">
            {/* Subtle gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black/0 pointer-events-none"></div>

            {/* Close button - moved to be absolutely positioned in the top-right corner with more space */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10 z-10"
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

            <div className="relative text-center space-y-5 sm:space-y-6 pt-5">
              {/* Header with subtle animation - added right padding to avoid overlap with close button */}
              <motion.h2
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-semibold text-white tracking-tight pr-8 sm:pr-10">
                {t.header}
              </motion.h2>

              {/* Body text */}
              <motion.div
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base text-gray-300 whitespace-pre-line leading-relaxed">
                {t.body}
              </motion.div>

              {/* Action buttons with staggered animation */}
              <div className="space-y-3 pt-2">
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleClaim}
                  className="w-full bg-green-500 text-black font-medium py-3 px-6 rounded-lg hover:bg-green-400 transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-green-500/20">
                  {t.cta}
                </motion.button>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleDismiss}
                  className="block text-green-400 hover:text-green-300 transition-colors duration-200 text-sm sm:text-base py-2">
                  <Link href="/" passHref>
                    <span className="inline-flex items-center">
                      {t.explore}
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
