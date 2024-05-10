import * as dotenv from 'dotenv';
import random from 'lodash/random';
dotenv.config({ path: './.env' });
import { getClient } from './postgres-helpers';

(async () => {
  const client = await getClient();

  const queryResults = await client.query(
    `SELECT id, name, tags, library  FROM companies WHERE tags <> '[]' AND library @> '["Web3", "AI"]'::jsonb`,
  );

  for (let i = 0; i < queryResults.rows.length; i += 1) {
    const record = queryResults.rows[i];

    console.log(`Update tags for company id ${record.id} name ${record.name}`);

    const recordTags = record.tags;
    const normalizedTags = getTagChoicesByLibraries(record.library);

    

    console.log(normalizedTags, recordTags);

    /*   await client.query(
      `UPDATE events SET slug = '${generatedSlug}' WHERE id=${record.id};`,
    ); */
  }

  /*   await client.query('ALTER TABLE events ALTER COLUMN slug SET NOT NULL;'); */

  await client.end();
})();

export const getTagChoicesByLibraries = libraries => {
  if (libraries?.includes('Web3') && libraries?.includes('AI')) {
    return [
      ...aiTags.filter(tag => tag.match(/- AI/g)),
      ...web3Tags.filter(tag => tag.match(/- Web3/g)),
    ];
  }
  return [];
};

const oldTagsWeb3AI = [
  'Analytics',
  'API',
  'Crypto',
  'Cybersecurity',
  'DAO',
  'DApps',
  'Database',
  'Dev Tools',
  'Marketplace',
  'Media',
  'Messaging',
  'Metaverse',
  'News',
  'Platform',
  'SaaS',
  'Storage',
  'Service Partner',
  'Service Partner Legal',
  'Service Partner Accounting',
  'Service Partner Marketing',
  'Service Partner IT Tech Development',
  'Service Partner Accelerator',
  'Service Partner Incubator',
  'Service Partner Finance',
  'Service Partner Recruiting',
  'Service Partner HR',
  'Data',
  'Algorithms',
  'Infrastructure',
  'Applications',
  'Framework',
  'Library',
  'Data Storage and Management',
  'Cloud Infrastructure',
  'Infrastructure Provider',
];

const web3Tags = [
  'Layer 0',
  'Layer 1',
  'Layer 2',
  'Layer 3',
  'Layer 4',
  'Layer 5',
  'Layer 6',
  'AI',
  'Airweave',
  'Algorithms - Web3',
  'Analytics - Web3',
  'API - Web3',
  'Applications - Web3',
  'Aptos',
  'Asset',
  'Avalanche',
  'Binance',
  'Bitcoin',
  'Blockchain',
  'BNB Chain',
  'Brand',
  'Cardano',
  'Celo',
  'Centralized',
  'Chain Tools',
  'Cloud Infrastructure - Web3',
  'Cosmos',
  'Crypto - Web3',
  'Cybersecurity - Web3',
  'DAO - Web3',
  'DApps - Web3',
  'Data - Web3',
  'Data Storage and Management - Web3',
  'Database - Web3',
  'DeFi',
  'Dev Tools - Web3',
  'Elrond Ecosystem',
  'Ethereum',
  'Event',
  'Exchange',
  'FANTOM',
  'Fantom Opera Ecosystem',
  'Framework - Web3',
  'Gaming',
  'Harbor Ecosystem',
  'ICON Ecosystem',
  'Infrastructure - Web3',
  'Kusama Ecosystem',
  'Library - Web3',
  'Marketplace - Web3',
  'Media - Web3',
  'Messaging - Web3',
  'Metaverse - Web3',
  'Moonbeam',
  'NEAR',
  'NEO Ecosystem',
  'News - Web3',
  'NFT',
  'Optimism',
  'Oracle',
  'OWC',
  'Platform - Web3',
  'Polkadot',
  'Polygon',
  'SaaS - Web3',
  'Service Partner - Web3',
  'Service Partner Accelerator - Web3',
  'Service Partner Accounting - Web3',
  'Service Partner Finance - Web3',
  'Service Partner HR - Web3',
  'Service Partner Incubator - Web3',
  'Service Partner IT Tech Development - Web3',
  'Service Partner Legal - Web3',
  'Service Partner Marketing - Web3',
  'Service Partner Recruiting - Web3',
  'Side Chain',
  'Solana',
  'Stablecoin',
  'StarkNet',
  'Stellar',
  'Storage - Web3',
  'Sui',
  'Tezos',
  'Theta Network Ecosystem',
  'Wallet',
  'Zero Knowledge',
  'Zilliqa Ecosystem',
  'zk evm',
  'zk evm Alliance',
  'zk Swap Ecosystem',
  'zk Sync Co-processer',
];

const aiTags = [
  'Algorithms - AI',
  'Analytics - AI',
  'API - AI',
  'Applications - AI',
  'Audio',
  'AudioML',
  'B2B',
  'B2C',
  'Cloud Infrastructure - AI',
  'Code',
  'Computer Vision Layer',
  'Computer Vision Tools',
  'Crypto - AI',
  'Cybersecurity - AI',
  'DAO - AI',
  'DApps - AI',
  'Data - AI',
  'Data Preprocessing and Feature Engineering',
  'Data Storage and Management - AI',
  'Database - AI',
  'Deep Learning Frameworks',
  'Deep Learning Layer',
  'Dev Tools - AI',
  'End 2 End',
  'Explainable AI',
  'Framework - AI',
  'Image',
  'Infrastructure - AI',
  'Library - AI',
  'Machine Learning Algorithms',
  'Machine Learning Layer',
  'Marketplace - AI',
  'Media - AI',
  'Messaging - AI',
  'Metaverse - AI',
  'Model Creator',
  'AutoML',
  'Model Deployment',
  'Model Hub',
  'Model Interpretability',
  'Model Monitoring',
  'Model Selection and Tuning',
  'Multi-modal',
  'Natural Language Processing (NLP) layer',
  'Natural Language Processing (NLP) Tools',
  'News - AI',
  'Open Source',
  'Platform - AI',
  'Reinforcement Learning',
  'Robotics Layer',
  'Robotics Tools',
  'SaaS - AI',
  'Service Partner - AI',
  'Service Partner Accelerator - AI',
  'Service Partner Accounting - AI',
  'Service Partner Finance - AI',
  'Service Partner HR - AI',
  'Service Partner Incubator - AI',
  'Service Partner IT Tech Development - AI',
  'Service Partner Legal - AI',
  'Service Partner Marketing - AI',
  'Service Partner Recruiting - AI',
  'Storage - AI',
  'Text',
  'Video',
];
