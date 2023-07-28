import { ValueTransformer } from 'typeorm';

export class URLTransformer implements ValueTransformer {
  from(value: URL): string {
    return value ? value.href : '';
  }
  to(value: string): URL | null {
    return value ? new URL(value) : null;
  }
}
