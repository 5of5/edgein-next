import { InputType } from '@nestjs/graphql';
import { CreateInputType } from '@app/dtos';
import { Web3SocialMediumLinkDto } from '@app/dtos/social-medium/web3-social-medium-link.dto';

@InputType('Web3SocialMediumLinkCreate')
export class Web3SocialMediumLinkCreateDto extends CreateInputType(
  Web3SocialMediumLinkDto,
) {}
