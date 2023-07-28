import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseDto } from '@app/dtos';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { Blockchain, Coin } from '@app/types/coin';
import { Web3CompanyDto } from '@app/dtos/company/web3-company.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

registerEnumType(Blockchain, { name: 'Blockchain' });

@ObjectType('Coin')
@Relation('web3Company', () => Web3CompanyDto)
export class CoinDto extends BaseDto implements Omit<Coin, 'web3Company'> {
  @Field(() => Blockchain)
  blockchain: Blockchain;

  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  ticker: string;

  @IsUUID()
  @FilterableField(() => ID)
  web3CompanyId: string;
}
