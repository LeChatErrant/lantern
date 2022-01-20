import colors from 'colors';

import { PrismaError } from '../errors';
import { parseBetween } from '../strings';

import { PrismaObject } from './PrismaObject';
import { PrismaIdentifier } from './PrismaIdentifier';

export class PrismaModelAttribute {
  public readonly type: string;

  public readonly content?: string;

  constructor(type: string, content?: string) {
    this.type = type;
    this.content = content;
  }

  public toString() {
    return `${this.type} ${this.content ? '(' + this.content + ')' : ''}`;
  }
}

export type PrismaModelFieldType =
  'String'
  | 'Boolean'
  | 'Int'
  | 'BigInt'
  | 'Float'
  | 'Decimal'
  | 'DateTime'
  | 'Json'
  | 'Bytes'
  | 'Unsupported'
  | string;

export class PrismaModelField {
  public readonly name: string;

  public type: PrismaModelFieldType;

  public readonly attributes: PrismaModelAttribute[];

  constructor(name: string, type: PrismaModelFieldType, attributes: PrismaModelAttribute[] = []) {
    this.name = name;
    this.type = type;
    this.attributes = attributes;
  }

  public toString() {
    return `  ${colors.green(this.name)} ${colors.red(this.type)} ` + this.attributes
      .map((attr) => colors.bold(colors.grey(attr.toString())))
      .join(' ');
  }
}

export class PrismaModel extends PrismaObject {
  public readonly fields: PrismaModelField[];

  public readonly contraints: PrismaModelAttribute[];

  constructor(name: string, fields: PrismaModelField[] = [], constraints: PrismaModelAttribute[] = []) {
    super(PrismaIdentifier.MODEL, name);
    this.fields = fields;
    this.contraints = constraints;
  }

  static fromFile(name: string, content: string): PrismaModel {
    // Only one field declaration are possible per line
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    // Remove '{' and '}' around the declaration
    // No field declaration can be on the same line with a bracket,
    // so we're safe to delete the whole line
    lines.shift();
    lines.pop();

    const results = lines.map(PrismaModel.parseField);
    const fields = results.filter((result) => result instanceof PrismaModelField) as PrismaModelField[];
    const constraints = results.filter((result) => result instanceof PrismaModelAttribute) as PrismaModelAttribute[];

    return new PrismaModel(name, fields, constraints);
  }

  private static parseField(line: string): PrismaModelField | PrismaModelAttribute {
    let content = line;

    // Isolates attribute contents as plain tokens
    const attributes: PrismaModelAttribute[] = [];

    // Parse first attributes with content (example : @default(now())
    for (let a = parseBetween(content, '(', ')'); a !== ''; a = parseBetween(content, '(', ')')) {
      const beforeAttributeContent = content.substring(0, content.indexOf(a) - 1);
      let attributeTypeIndex = beforeAttributeContent.lastIndexOf('@');
      if (attributeTypeIndex > 0 && beforeAttributeContent[attributeTypeIndex - 1] === '@') {
        // Case with @@ instead of @
        attributeTypeIndex -= 1;
      }
      const attributeType = beforeAttributeContent.substring(attributeTypeIndex);
      attributes.push(new PrismaModelAttribute(attributeType.trim(), a));

      // eslint-disable-next-line no-param-reassign
      content = content.replace(attributeType + '(' + a + ')', ' ');
    }

    // Split by sequences of one or more of space or space character
    // Keep only alphanumerics words
    const tokens = content
      .split(/[ \n]+/)
      .filter((token) => token !== '');

    // No field here, only a constraint !
    if (tokens.length === 0) {
      if (attributes.length !== 1) {
        throw new PrismaError(`Error while parsing line ${line} : no field found, but zero or more constraints are presents `);
      }
      return attributes[0];
    }

    // Should be at least of form [name] [type] ...
    if (tokens.length < 2) {
      throw new PrismaError(`Error while parsing line ${line} : needs at least [name] [type] ...`);
    }

    const name = tokens.shift() as string;
    const type = tokens.shift() as PrismaModelFieldType;

    // Retrieve single attributes (@id, @db.text, ...)
    while (tokens.length !== 0) {
      const attributeType = tokens.shift()!;
      attributes.push(new PrismaModelAttribute(attributeType));
    }

    return new PrismaModelField(name, type, attributes);
  }

  public toString() {
    return [
      colors.blue(this.name) + ' {',
      ...this.fields
        .map((field) => field.toString()),
      '}',
    ].join('\n');
  }
}
