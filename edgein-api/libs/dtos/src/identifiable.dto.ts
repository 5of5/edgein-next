import { ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { Identifiable } from '@app/database/types';

@ObjectType({ isAbstract: true })
export abstract class IdentifiableDto implements Identifiable {
  @IDField(() => String)
  id: string;
}
