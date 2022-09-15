import { ADAPTER_EVENTS, SafeEventEmitterProvider, WALLET_ADAPTERS ,CHAIN_NAMESPACES} from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { getWalletProvider, IWalletProvider } from "./walletProvider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import { Web3AuthCore } from "@web3auth/core";
export interface IWeb3AuthContext {
  web3Auth: Web3Auth | null;
  provider: IWalletProvider | null;
  isLoading: boolean;
  chain: string;
  user: unknown;
  login: (token: string) => Promise<string|undefined>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  signMessage: () => Promise<any>;
  getAccounts: () => Promise<any>;
  getBalance: () => Promise<any>;
  signTransaction: () => Promise<void>;
  signAndSendTransaction: () => Promise<void>;
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  provider: null,
  isLoading: false,
  chain: "",
  user: null,
  login: async (token: string) => {return ''},
  logout: async () => {},
  getUserInfo: async () => {},
  signMessage: async () => {},
  getAccounts: async () => {},
  getBalance: async () => {},
  signTransaction: async () => {},
  signAndSendTransaction: async () => {},
});

export function useWeb3Auth(): IWeb3AuthContext {
  return useContext(Web3AuthContext);
}

interface IWeb3AuthState {
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
  children: ReactNode;
}
interface IWeb3AuthProps {
  children?: ReactNode;
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
}

export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({ children, web3AuthNetwork, chain }: IWeb3AuthProps) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IWalletProvider | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const clientId = `${process.env.NEXT_PUBLIC_WEB3_CLIENT_ID}`;

  const setWalletProvider = //useCallback(
    (web3authProvider: SafeEventEmitterProvider) => {
    const walletProvider = getWalletProvider(chain, web3authProvider, uiConsole);
    setProvider(walletProvider);
  };//,[chain, web3AuthNetwork])

  const initialise = () => {
    const subscribeAuthEvents = (web3auth1: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth1.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        setWeb3Auth(web3auth1)
        console.log("Yeah!, you are successfully logged in", data);
        setUser(data);
      });
  
      web3auth1.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });
  
      web3auth1.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });
  
      web3auth1.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.error("some error or user has cancelled login request", error);
      });
    };
  
    const currentChainConfig = CHAIN_CONFIG[chain];
  
    try {
      setIsLoading(true);
      const web3AuthInstance = new Web3Auth({
        chainConfig: currentChainConfig,
        // get your client id from https://dashboard.web3auth.io
        clientId,
      });
     
      const adapter = new OpenloginAdapter({ 
        adapterSettings: {
           network: web3AuthNetwork, 
           clientId ,
           loginConfig: {
            jwt: {
              name: "clientResponse",
              verifier: "edgein",
              typeOfLogin: "jwt",
              clientId: `${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}`,
            },
          },
          } });

      web3AuthInstance.configureAdapter(adapter);
      subscribeAuthEvents(web3AuthInstance);
      setWeb3Auth(web3AuthInstance)
      // await web3AuthInstance.initModal();
   
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    initialise()
  }, [chain, web3AuthNetwork]);

  const login = async (token: string) => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3Auth.init();
      if(token){
        try{
          const localProvider = await web3Auth.connectTo(
            WALLET_ADAPTERS.OPENLOGIN,
            {
              //relogin: true,
              loginProvider: 'jwt',
              extraLoginOptions: {
               id_token: token,
                domain: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}`,
                verifierIdField: 'sub',
              },
            },
          )
            setWalletProvider(localProvider!);
            return await getAccount(localProvider)
        }catch(err){
          console.log("connectTo error =", err)
        }
      }
     return ''
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3Auth.getUserInfo();
    console.log("web3auth user ==", user);
    
    uiConsole(user);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.getAccounts();
  };

  const getAccount = async(provider: any) => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const accounts = await web3.eth.getAccounts();
    console.log("web3auth accounts ==", accounts);
    return accounts ? accounts[0] : ''
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.getBalance();
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.signMessage();
  };

  const signTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.signTransaction();
  };

  const signAndSendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.signAndSendTransaction();
  };

  const uiConsole = (...args: unknown[]): void => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  };

  const contextProvider = {
    web3Auth,
    chain,
    provider,
    user,
    isLoading,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
    signTransaction,
    signAndSendTransaction,
  };
  return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;
};
