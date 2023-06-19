import { random } from 'lodash';

export const getCreateListPayload = () => {
  const uniqueId = random(1, 800);

  return {
    name: `List ${uniqueId}`,
  };
};
