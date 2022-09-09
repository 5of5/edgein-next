import { ADAPTER_EVENTS, SafeEventEmitterProvider, WALLET_ADAPTERS ,CHAIN_NAMESPACES} from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { getWalletProvider, IWalletProvider } from "./walletProvider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthCore } from "@web3auth/core";
export interface IWeb3AuthContext {
  web3Auth: Web3Auth | null;
  provider: IWalletProvider | null;
  isLoading: boolean;
  chain: string;
  user: unknown;
  login: (token: string) => Promise<void>;
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
  login: async (token: string) => {},
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
  const clientId = 'BHw8wzTrWD87CP4HwQHKx-visJIEshLLsCxZSU_oXMxOI27qO36al_wshW817Xs4kx6R-aDxY03aZO2sN4a_ujgBHw8wzTrWD87CP4HwQHKx-visJIEshLLsCxZSU_oXMxOI27qO36al_wshW817Xs4kx6R-aDxY03aZO2sN4a_ujg';
  // const clientId = "BKPxkCtfC9gZ5dj-eg-W6yb5Xfr3XkxHuGZl2o2Bn8gKQ7UYike9Dh6c-_LaXlUN77x0cBoPwcSx-IVm0llVsLA";

  const setWalletProvider = useCallback(
    (web3authProvider: SafeEventEmitterProvider) => {
      const walletProvider = getWalletProvider(chain, web3authProvider, uiConsole);
      setProvider(walletProvider);
    },
    [chain]
  );

  const initialise = async(token) => {
    // const subscribeAuthEvents = (web3auth1: Web3Auth) => {
    //   // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
    //   web3auth1.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
    //     console.log("Yeah!, you are successfully logged in", data);
    //     setUser(data);
    //     setWalletProvider(web3auth1.provider!);
    //   });
  
    //   web3auth1.on(ADAPTER_EVENTS.CONNECTING, () => {
    //     console.log("connecting");
    //   });
  
    //   web3auth1.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    //     console.log("disconnected");
    //     setUser(null);
    //   });
  
    //   web3auth1.on(ADAPTER_EVENTS.ERRORED, (error) => {
    //     console.error("some error or user has cancelled login request", error);
    //   });
    // };
  
    const currentChainConfig = CHAIN_CONFIG[chain];
  
    try {
      setIsLoading(true);
      const web3AuthInstance = new Web3Auth({
        chainConfig: { // this is ethereum chain config, change if other chain(Solana, Polygon)
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x3",
         // rpcTarget: "https://mainnet.infura.io/v3/776218ac4734478c90191dde8cae483c",
         // blockExplorer: "https://etherscan.io/",
          //ticker: "ETH",
          //tickerName: "Ethereum"
      },
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
              verifier: "rainmaker-project",
              typeOfLogin: "jwt",
              clientId: "GQJNcsXDPCbPFo2OGCc1p3sAmY6T0b8p",
            },
          },
          } });

      web3AuthInstance.configureAdapter(adapter);
      //subscribeAuthEvents(web3AuthInstance);
      // await web3AuthInstance.initModal();
      web3AuthInstance.init().then(() => {
        console.log("after init ==")
        if(token){
         // const localProvider = await 
         console.log("after cinnnect to ==")
          web3AuthInstance.connectTo(
            WALLET_ADAPTERS.OPENLOGIN,
            {
              //relogin: true,
              loginProvider: 'jwt',
              extraLoginOptions: {
                id_token: token,
                domain: "https://dev-h9qh-dn9.us.auth0.com",
                verifierIdField: 'ainmaker-project',
              },
            },
          ).then(localProvider => {
            console.log("after localProvider to ==")
            // console.log("after connect to =", localProvider)
            setWalletProvider(localProvider!);
          }).catch(err => {
            console.log("errr in providder =", err)
          })
            
        }
      });
      

      //setWeb3Auth(web3AuthInstance);
      // await web3AuthInstance.initModal();
   
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
   
    //initialise()
  }, [chain, web3AuthNetwork, setWalletProvider]);

  const login = async (token: string) => {
    // if (!web3Auth) {
    //   console.log("web3auth not initialized yet");
    //   uiConsole("web3auth not initialized yet");
    //   return;
    // }
    await initialise(token)
    //await web3Auth.init()
  //  const localProvider = await web3Auth.connect();
   
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
