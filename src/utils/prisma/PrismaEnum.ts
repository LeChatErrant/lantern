import { PrismaError } from '../errors';

import { PrismaObject } from './PrismaObject';
import { PrismaIdentifier } from './PrismaIdentifier';

export class PrismaEnum extends PrismaObject {
  public readonly values: string[];

  constructor(name: string, values: string[]) {
    super(PrismaIdentifier.ENUM, name);

    if (values.length === 0) {
      throw new PrismaError(`Prisma enum ${name} should have at least one value`);
    }
    this.values = values;
  }

  static fromFile(name: string, content: string): PrismaEnum {
    // Only one value declaration is possible per line
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    // Remove '{' and '}' around the declaration
    // No field declaration can be on the same line with a bracket,
    // so we're safe to delete the whole line
    lines.shift();
    lines.pop();

    return new PrismaEnum(name, lines);
  }
}
