import { Type } from '@nestjs/common';
import { InputType, OmitType } from '@nestjs/graphql';
import { OMIT_IN_CREATE_INPUT } from '@app/dtos';
import { IBaseEntity } from '@app/database/types';

export function CreateInputType<T extends IBaseEntity>(classRef: Type<T>) {
  return OmitType(classRef, OMIT_IN_CREATE_INPUT, InputType);
}
