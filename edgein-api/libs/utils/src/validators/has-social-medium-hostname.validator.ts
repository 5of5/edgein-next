import {
  SocialMediumLink,
  SocialMediumSourceHost,
} from '@app/types/social-media';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export type SocialMediumRef = Pick<SocialMediumLink, 'ref' | 'source'>;

@ValidatorConstraint()
export class HasSocialMediumHostConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    const url = new URL(value);
    const object = args.object as SocialMediumRef;
    return SocialMediumSourceHost[object.source].includes(url.hostname);
  }
}

export function HasSocialMediumHostname<T extends SocialMediumRef>(
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasSocialMediumHostConstraint,
    });
  };
}
