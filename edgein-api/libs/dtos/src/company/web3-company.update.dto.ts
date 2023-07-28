import { Web3CompanyCreateDto } from '@app/dtos/company/web3-company.create.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('WebCompanyUpdate')
export class Web3CompanyUpdateDto extends PartialType(Web3CompanyCreateDto) {}
