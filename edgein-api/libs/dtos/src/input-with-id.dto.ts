import { InputType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

/**
 * Input type with ID attribute.
 */
@InputType()
export class InputWithIdDto {
  @IDField(() => String)
  id: number;
}
