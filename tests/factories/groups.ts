import { random } from 'lodash';

export const getCreateGroupPayload = () => {
  const uniqueId = random(1, 800);

  return {
    name: `Edgein wizards ${uniqueId}`,
    description:
      'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  };
};
