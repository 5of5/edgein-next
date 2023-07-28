import { CreateInputType } from '@app/dtos';
import { SocialMediumLinkDto } from '@app/dtos/social-medium/social-medium-link.dto';
import { InputType } from '@nestjs/graphql';

@InputType('SocialMediumLinkCreate')
export class SocialMediumLinkCreateDto extends CreateInputType(
  SocialMediumLinkDto,
) {}
