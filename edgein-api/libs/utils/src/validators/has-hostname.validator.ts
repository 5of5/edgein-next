import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
export class HasHostnameConstraint implements ValidatorConstraintInterface {
  validate(url: URL, args: ValidationArguments) {
    const [domain] = args.constraints;
    return url.hostname === domain;
  }
}

export function HasHostname<T>(
  domain: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [domain],
      validator: HasHostnameConstraint,
    });
  };
}
