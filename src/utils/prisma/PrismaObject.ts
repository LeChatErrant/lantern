import { PrismaIdentifier } from './PrismaIdentifier';

export abstract class PrismaObject {
  public readonly identifier: PrismaIdentifier;

  public readonly name: string;

  protected constructor(identifier: PrismaIdentifier, name: string) {
    this.identifier = identifier;
    this.name = name;
  }
}
