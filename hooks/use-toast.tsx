import { ReactElement } from 'react';
import ReactHotToast from 'react-hot-toast';

type ToastType = 'info' | 'error';

type Message = ReactElement;

const useToast = () => {
  const toast = (message: Message, type: ToastType = 'info') => {
    if (type === 'error') {
      ReactHotToast.custom(
        t => (
          <div
            className={`bg-red-600 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {message}
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    } else {
      ReactHotToast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {message}
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  return { toast };
};

export default useToast;
