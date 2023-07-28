import { InputType, PartialType } from '@nestjs/graphql';
import { AiCompanyCreateDto } from '@app/dtos/company/ai-company.create.dto';

@InputType('AiCompanyUpdate')
export class AiCompanyUpdateDto extends PartialType(AiCompanyCreateDto) {}
