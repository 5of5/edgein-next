import { useState, useContext, FC, createContext } from 'react';

type SidebarValue = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarValue>({
  showSidebar: false,
  setShowSidebar: () => {},
});

const useSidebar = () => {
  const contextValue = useContext(SidebarContext);
  return contextValue;
};

type Props = {
  children: JSX.Element;
};

const SideBarProvider: FC<Props> = props => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export { SideBarProvider, useSidebar };
