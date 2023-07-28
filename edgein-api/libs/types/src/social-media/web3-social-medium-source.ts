export enum Web3SocialMediumSource {
  BlockchainExplorer = 'BlockchainExplorer',
  BitcoinTalk = 'BitcoinTalk',
}

export const Web3SocialMediumSourceHost: Record<
  Web3SocialMediumSource,
  string[]
> = {
  [Web3SocialMediumSource.BitcoinTalk]: ['bitcointalk.org'],
  [Web3SocialMediumSource.BlockchainExplorer]: ['etherscan.io', 'fio.bloks.io'],
};

export const Web3SocialMediumMigrationAttribute: Record<
  Web3SocialMediumSource,
  string
> = {
  [Web3SocialMediumSource.BitcoinTalk]: 'bitcointalk',
  [Web3SocialMediumSource.BlockchainExplorer]: 'blockchain_explorer',
};
