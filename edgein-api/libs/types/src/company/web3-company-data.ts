import { IBaseEntity, Maybe } from '@app/database/types';
import { Coin } from '@app/types/coin';
import { Company } from '@app/types/company';
import { Web3SocialMediumLink } from '@app/types/social-media';

export enum Web3Tags {
  Layer0 = 'Layer 0',
  Layer1 = 'Layer 1',
  Layer2 = 'Layer 2',
  Layer3 = 'Layer 3',
  Layer4 = 'Layer 4',
  Layer5 = 'Layer 5',
  Layer6 = 'Layer 6',
  Api = 'API',
  Platform = 'Platform',
  DevTools = 'Dev Tools',
  ChainTools = 'Chain Tools',
  Analytics = 'Analytics',
  DApps = 'DApps',
  Wallet = 'Wallet',
  Oracle = 'Oracle',
  SideChain = 'Side Chain',
  Database = 'Database',
  Messaging = 'Messaging',
  Asset = 'Asset',
  Storage = 'Storage',
  Marketplace = 'Marketplace',
  Exchange = 'Exchange',
  Gaming = 'Gaming',
  DeFi = 'DeFi',
  Blockchain = 'Blockchain',
  Crypto = 'Crypto',
  Nft = 'NFT',
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  NearOwc = 'NEAR/OWC',
  Cosmos = 'Cosmos',
  Cardano = 'Cardano',
  Owc = 'OWC',
  Dao = 'DAO',
  Centralized = 'Centralized',
  Ai = 'AI',
  Saas = 'SaaS',
  Brand = 'Brand',
  Stablecoin = 'Stablecoin',
  Media = 'Media',
  Event = 'Event',
  Cybersecurity = 'Cybersecurity',
  Solana = 'Solana',
  Polkadot = 'Polkadot',
  Metaverse = 'Metaverse',
  News = 'News',
  ZeroKnowledge = 'Zero Knowledge',
}

export enum Web3Layer {
  Layer0 = 'Layer 0',
  Layer1 = 'Layer 1',
  Layer2 = 'Layer 2',
  Layer3 = 'Layer 3',
  Layer4 = 'Layer 4',
  Layer5 = 'Layer 5',
  Layer6 = 'Layer 6',
}

export interface Web3CompanyData extends IBaseEntity {
  companyId: string;
  company: Company;
  coins: Coin[];
  socialMediaLinks: Web3SocialMediumLink[];
  tags: Web3Tags[];
  layer: Maybe<Web3Layer>;
}
