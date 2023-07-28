import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';
import { getSdk } from '@app/sdk/generated/graphql';

@Injectable()
export class SdkService {
  public readonly sdk: ReturnType<typeof getSdk>;

  constructor(private readonly config: ConfigService) {
    const client = new GraphQLClient('http://localhost:3000/graphql');
    this.sdk = getSdk(client);
  }
}
