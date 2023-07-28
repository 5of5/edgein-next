import { InputType, PartialType } from '@nestjs/graphql';
import { SocialMediumLinkCreateDto } from '@app/dtos/social-medium/social-medium-link.create.dto';

@InputType('SocialMediumLinkUpdate')
export class SocialMediumLinkUpdateDto extends PartialType(
  SocialMediumLinkCreateDto,
) {}
