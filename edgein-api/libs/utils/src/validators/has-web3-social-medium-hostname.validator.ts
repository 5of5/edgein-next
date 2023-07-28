import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  Web3SocialMediumLink,
  Web3SocialMediumSourceHost,
} from '@app/types/social-media';

export type SocialMediumRef = Pick<Web3SocialMediumLink, 'ref' | 'source'>;

@ValidatorConstraint()
export class HasWeb3SocialMediumHostConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    const url = new URL(value);
    const object = args.object as SocialMediumRef;
    return Web3SocialMediumSourceHost[object.source].includes(url.hostname);
  }
}

export function HasWeb3SocialMediumHostname<T extends SocialMediumRef>(
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasWeb3SocialMediumHostConstraint,
    });
  };
}
