import { IsString, IsObject, ValidateNested, IsDate } from 'class-validator';
import { Maybe } from '@app/database/types';
import { OpName } from './enums';

export class EventData<T> {
  @IsObject()
  @ValidateNested()
  old: Maybe<T>;

  @IsObject()
  @ValidateNested()
  new: T;
}

export class Event<T> {
  @IsObject()
  @ValidateNested()
  session_variables: {
    'x-hasura-role': string;
  };

  @IsString()
  op: OpName;

  @IsObject()
  @ValidateNested()
  data: EventData<T>;

  @IsObject()
  @ValidateNested()
  trace_context: {
    trace_id: string;
    span_id: string;
  };

  @IsDate()
  created_at: Date;

  @IsString()
  id: string;

  @IsObject()
  @ValidateNested()
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };

  @IsObject()
  @ValidateNested()
  trigger: {
    name: string;
  };

  @IsObject()
  @ValidateNested()
  table: {
    schema: string;
    name: string;
  };
}

export class Payload<T> {
  event: Event<T>;
}
