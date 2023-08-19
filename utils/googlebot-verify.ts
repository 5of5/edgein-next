import googlebot from './googlebotjson/googlebot.json';
import specialCrawlers from './googlebotjson/special-crawlers.json';
import userTriggerFetchers from './googlebotjson/user-triggered-fetchers.json';

import { matches } from 'ip-matching';

type Ipv4Prefix = {
  ipv4Prefix: string;
};

type Ipv6Prefix = {
  ipv6Prefix: string;
};

type Googlebot = {
  creationTime: string;
  prefixes: (Ipv4Prefix | Ipv6Prefix)[];
};

// Google recommends using a reverse dn lookup
// this is a library that implments this npm i googlebot-verify
// however this verify is used in middleware, which is executed in an edge environment
// edge environments do not have access to node dns module
// so the back up is to implement an ip lookup based on the prefixes provided by google

export const verify = (ip: string): boolean => {
  const specialCrawlersPrefixes = (specialCrawlers as Googlebot).prefixes;
  const googlebotPrefixes = (googlebot as Googlebot).prefixes;
  const userTriggerFetchersPrefixes = (userTriggerFetchers as Googlebot)
    .prefixes;
  const allPrefixes = [
    ...specialCrawlersPrefixes,
    ...googlebotPrefixes,
    ...userTriggerFetchersPrefixes,
  ];
  const ipv4Prefixes = allPrefixes
    .filter(prefix => 'ipv4Prefix' in prefix)
    .map(prefix => (prefix as Ipv4Prefix).ipv4Prefix);
  const ipv6Prefixes = allPrefixes
    .filter(prefix => 'ipv6Prefix' in prefix)
    .map(prefix => (prefix as Ipv6Prefix).ipv6Prefix);
  return (
    ipv4Prefixes.some(ipv4 => matches(ip, ipv4)) ||
    ipv6Prefixes.some(ipv6 => matches(ip, ipv6))
  );
};
