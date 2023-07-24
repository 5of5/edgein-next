export * from './text';
export * from './ui';
export * from './numbers';
export * from './data';
// export * from "./style";

export const raise = (err: string): never => {
  throw new Error(err);
};
