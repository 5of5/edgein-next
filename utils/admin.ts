import { NullableInputs } from '@/types/admin';

export const nullInputTransform = (
  inputs: NullableInputs,
  type: string,
  obj: any,
): any => {
  const nullableInputsForType = inputs[type];
  if (nullableInputsForType && obj.data) {
    nullableInputsForType.forEach(input => {
      if (obj.data[input] == '') {
        obj.data[input] = null;
      }
    });
  }
  return obj;
};
