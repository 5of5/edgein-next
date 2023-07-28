import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsLinkedinCompanyPathConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string) {
    const url = new URL(value);
    return url.pathname.startsWith('/company');
  }
}

export function IsLinkedinCompanyPath<T>(
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLinkedinCompanyPathConstraint,
    });
  };
}
