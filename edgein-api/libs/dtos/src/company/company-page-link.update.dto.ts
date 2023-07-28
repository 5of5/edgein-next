import { CompanyPageLinkCreateDto } from '@app/dtos/company/company-page-link.create.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('CompanyPageLinkUpdate')
export class CompanyPageLinkUpdateDto extends PartialType(
  CompanyPageLinkCreateDto,
) {}
