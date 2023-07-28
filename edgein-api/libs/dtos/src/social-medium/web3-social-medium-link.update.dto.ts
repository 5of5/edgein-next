import { InputType, PartialType } from '@nestjs/graphql';
import { Web3SocialMediumLinkCreateDto } from '@app/dtos/social-medium/web3-social-medium-link.create.dto';

@InputType('Web3SocialMediumLinkUpdate')
export class Web3SocialMediumLinkUpdateDto extends PartialType(
  Web3SocialMediumLinkCreateDto,
) {}
