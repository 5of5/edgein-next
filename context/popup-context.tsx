import {
  useState,
  useContext,
  FC,
  Dispatch,
  SetStateAction,
  createContext,
} from 'react';
import { Popups } from '@/components/the-navbar';
import { useRouter } from 'next/router';

type PopupValue = {
  showPopup: Popups;
  setShowPopup: Dispatch<SetStateAction<Popups>>;
};

const PopupContext = createContext<PopupValue>({
  showPopup: false,
  setShowPopup: () => {},
});

const usePopup = () => {
  const contextValue = useContext(PopupContext);
  return contextValue;
};

type Props = {
  children: JSX.Element;
};

const PopupProvider: FC<Props> = props => {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState<Popups>(
    router.asPath.includes('/login/')
      ? router.asPath.includes('?usage=true')
        ? 'usage'
        : 'login'
      : false,
  );

  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      {props.children}
    </PopupContext.Provider>
  );
};

export { PopupProvider, usePopup };
