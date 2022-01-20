import { PrismaObject } from './PrismaObject';
import { PrismaIdentifier } from './PrismaIdentifier';

export class PrismaDataSource extends PrismaObject {
  constructor(name: string) {
    super(PrismaIdentifier.DATASOURCE, name);
  }

  static fromFile(name: string, content: string): PrismaDataSource {
    return new PrismaDataSource(name);
  }
}
