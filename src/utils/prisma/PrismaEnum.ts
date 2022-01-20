import PrismaObject from './PrismaObject';
import PrismaIdentifier from './PrismaIdentifier';

export default class PrismaEnum extends PrismaObject {
  constructor(name: string) {
    super(PrismaIdentifier.ENUM, name);
  }

  static fromFile(name: string, content: string): PrismaEnum {
    return new PrismaEnum(name);
  }
}