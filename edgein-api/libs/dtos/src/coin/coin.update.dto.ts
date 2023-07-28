import { InputType, PartialType } from '@nestjs/graphql';
import { CoinCreateDto } from '@app/dtos/coin/coin.create.dto';

@InputType('CoinUpdate')
export class CoinUpdateDto extends PartialType(CoinCreateDto) {}
