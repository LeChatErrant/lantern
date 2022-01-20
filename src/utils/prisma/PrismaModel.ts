import PrismaObject from './PrismaObject';
import PrismaIdentifier from './PrismaIdentifier';

export default class PrismaModel extends PrismaObject {
  constructor(name: string) {
    super(PrismaIdentifier.MODEL, name);
  }

  static fromFile(name: string, content: string): PrismaModel {
    return new PrismaModel(name);
  }
}
