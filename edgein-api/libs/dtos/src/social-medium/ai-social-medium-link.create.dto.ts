import { InputType } from '@nestjs/graphql';
import { CreateInputType } from '@app/dtos';
import { AiSocialMediumLinkDto } from '@app/dtos/social-medium/ai-social-medium-link.dto';

@InputType('AiSocialMediumLinkCreate')
export class AiSocialMediumLinkCreateDto extends CreateInputType(
  AiSocialMediumLinkDto,
) {}
