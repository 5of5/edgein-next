import { v4 as uuidv4 } from 'uuid';

export const uniqueId = () => {
  return uuidv4().replaceAll('-', '');
};
