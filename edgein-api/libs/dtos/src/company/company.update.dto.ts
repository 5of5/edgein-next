import { CompanyCreateDto } from '@app/dtos/company/company.create.dto';
import { InputType, PartialType, OmitType } from '@nestjs/graphql';

@InputType('CompanyUpdate')
export class CompanyUpdateDto extends PartialType(
  OmitType(CompanyCreateDto, ['socialMediaLinks'] as const),
) {}
