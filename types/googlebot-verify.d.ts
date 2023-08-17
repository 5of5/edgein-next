declare module 'googlebot-verify' {
    export function verify(ip: string): Promise<boolean>;
  }
  