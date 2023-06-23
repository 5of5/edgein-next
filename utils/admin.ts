import { ValidateForm } from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { NullableInputs } from '@/types/admin';
import { SQL_BLOCK_WORDS } from './constants';

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

export const validateLeadSegmentation: ValidateForm = (values: FieldValues) => {
  const errors: FieldValues = {};
  if (
    values.sql &&
    SQL_BLOCK_WORDS.some(
      v => values.sql && values.sql.toLowerCase().indexOf(v) >= 0,
    )
  ) {
    errors.sql = 'Vulnerable to SQL injection';
  }

  return errors;
};
