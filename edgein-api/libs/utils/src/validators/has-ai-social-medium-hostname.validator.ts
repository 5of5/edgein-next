import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  AiSocialMediumLink,
  AiSocialMediumSourceHost,
} from '@app/types/social-media';

export type SocialMediumRef = Pick<AiSocialMediumLink, 'ref' | 'source'>;

@ValidatorConstraint()
export class HasAiSocialMediumHostConstraint
  implements ValidatorConstraintInterface
{
  validate(url: URL, args: ValidationArguments) {
    const object = args.object as SocialMediumRef;
    return AiSocialMediumSourceHost[object.source].includes(url.hostname);
  }
}

export function HasAiSocialMediumHostname<T extends SocialMediumRef>(
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasAiSocialMediumHostConstraint,
    });
  };
}
