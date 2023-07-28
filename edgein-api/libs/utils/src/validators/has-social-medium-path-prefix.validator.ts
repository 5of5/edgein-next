import {
  SocialMediumLink,
  SocialMediumPathPrefix,
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
export class HasSocialMediumPathPrefixConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    const url = new URL(value);
    const object = args.object as SocialMediumRef;
    const prefix = SocialMediumPathPrefix[object.source];
    return !prefix || url.pathname.startsWith(prefix);
  }
}

export function HasSocialMediumPathPrefix<T extends SocialMediumRef>(
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasSocialMediumPathPrefixConstraint,
    });
  };
}
