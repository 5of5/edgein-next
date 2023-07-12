export const generateRandomString = (stringLength = 20): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let result = '';
  for (let i = 0; i < stringLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomChar = alphabet.charAt(randomIndex);
    result += randomChar;
  }

  return result;
};

export const uniqueId = () => {
  return generateRandomString();
};
