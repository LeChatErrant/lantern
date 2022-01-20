import PrismaObject from './PrismaObject';
import PrismaIdentifier from './PrismaIdentifier';

export default class PrismaGenerator extends PrismaObject {
  constructor(name: string) {
    super(PrismaIdentifier.GENERATOR, name);
  }

  static fromFile(name: string, content: string): PrismaGenerator {
    return new PrismaGenerator(name);
  }
}