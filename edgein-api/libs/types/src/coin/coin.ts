import { IBaseEntity } from '@app/database/types';
import { Web3CompanyData } from '@app/types/company/web3-company-data';
import { Blockchain } from '@app/types/coin/blockchain';

export interface Coin extends IBaseEntity {
  name: string;
  ticker: string;
  blockchain: Blockchain;
  web3CompanyId: string;
  web3Company: Web3CompanyData;
}
