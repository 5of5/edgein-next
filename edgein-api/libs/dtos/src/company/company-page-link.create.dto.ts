import { CreateInputType } from '@app/dtos';
import { CompanyPageLinkDto } from '@app/dtos/company/company-page-link.dto';
import { InputType } from '@nestjs/graphql';

@InputType('CompanyPageLinkCreate')
export class CompanyPageLinkCreateDto extends CreateInputType(
  CompanyPageLinkDto,
) {}
