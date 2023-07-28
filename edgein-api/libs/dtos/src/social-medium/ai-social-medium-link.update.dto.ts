import { InputType, PartialType } from '@nestjs/graphql';
import { AiSocialMediumLinkCreateDto } from '@app/dtos/social-medium/ai-social-medium-link.create.dto';

@InputType('AiSocialMediumLinkUpdate')
export class AiSocialMediumLinkUpdateDto extends PartialType(
  AiSocialMediumLinkCreateDto,
) {}
