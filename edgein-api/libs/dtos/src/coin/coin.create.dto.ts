import { InputType } from '@nestjs/graphql';
import { CreateInputType } from '@app/dtos';
import { CoinDto } from '@app/dtos/coin/coin.dto';

@InputType('CoinCreate')
export class CoinCreateDto extends CreateInputType(CoinDto) {}
