export const getInputFromGqlArgs = <T>(input: { input: { input: T } }): T => {
  return input.input.input;
};
