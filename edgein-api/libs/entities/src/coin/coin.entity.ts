import { BaseEntity } from '@app/database';
import { Web3CompanyDataEntity } from '@app/entities/company/web3-company-data.entity';
import { Blockchain, Coin } from '@app/types/coin';
import { Factory } from 'nestjs-seeder';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

@Entity('coins', { schema: 'roman' })
export class CoinEntity extends BaseEntity implements Coin {
  @Factory((faker) => faker.helpers.enumValue(Blockchain))
  @Column({ type: 'enum', enum: Blockchain })
  @Index('idx_blockchain')
  blockchain: Blockchain;

  @Factory((faker) => faker.company.name())
  @Column()
  name: string;

  @Factory((faker) => faker.lorem.word())
  @Column()
  ticker: string;

  @Column({ nullable: false })
  web3CompanyId: string;

  @ManyToOne(() => Web3CompanyDataEntity, (company) => company.coins, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'web3_company_id' })
  web3Company: Relation<Web3CompanyDataEntity>;
}
