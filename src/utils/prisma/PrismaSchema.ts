import { readFile } from '../files';
import { PrismaError } from '../errors';

import PrismaModel from './PrismaModel';
import PrismaEnum from './PrismaEnum';
import PrismaDataSource from './PrismaDataSource';
import PrismaGenerator from './PrismaGenerator';
import PrismaIdentifier from './PrismaIdentifier';
import PrismaObject from './PrismaObject';

export default class PrismaSchema {
  public readonly datasource: PrismaDataSource;

  private readonly objects: PrismaObject[];

  constructor(objects: PrismaObject[]) {
    const datasources = objects.filter((o) => o.identifier === PrismaIdentifier.DATASOURCE);
    if (datasources.length === 0) {
      throw new PrismaError('No datasource detected !');
    }
    if (datasources.length !== 1) {
      throw new PrismaError('Multiple datasources detected !');
    }
    this.datasource = datasources[0];

    this.objects = objects;
  }

  public get generators() {
    return this.objects.filter((o) => o.identifier === PrismaIdentifier.GENERATOR);
  }

  public get models() {
    return this.objects.filter((o) => o.identifier === PrismaIdentifier.MODEL);
  }

  public get enums() {
    return this.objects.filter((o) => o.identifier === PrismaIdentifier.ENUM);
  }

  static fromFile(filePath: string): PrismaSchema {
    let schema = readFile(filePath);
    const objects: PrismaObject[] = [];

    for (let res = PrismaSchema.extractObject(schema) ; res ; res = PrismaSchema.extractObject(schema)) {
      schema = res.schema;
      objects.push(res.object);
    }

    // Everything that is parsed is removed from schema
    // At the end, only spaces and espace characters should be left
    schema = schema.trim();
    if (schema.length !== 0) {
      throw new PrismaError(`Parts of the schema were not parsed : ${schema}`);
    }

    return new PrismaSchema(objects);
  }


  private static extractObject(schema: string) {
    const firstOpeningBracket = schema.indexOf('{');
    const firstClosingBracket = schema.indexOf('}');

    if (firstOpeningBracket === -1 || firstClosingBracket === -1) {
      return null;
    }

    const prismaObjectDeclaration = schema.slice(0, firstOpeningBracket);
    const prismaObjectContent = schema.slice(firstOpeningBracket, firstClosingBracket + 1);

    // Remove parsed part from schema
    // eslint-disable-next-line no-param-reassign
    schema = schema.replace(prismaObjectDeclaration + prismaObjectContent,  '');

    const { identifier, name } = PrismaSchema.extractObjectDeclaration(prismaObjectDeclaration);
    const object = PrismaSchema.parseObject(identifier, name, prismaObjectContent);

    return { schema, object };
  }

  private static parseObject(identifier: PrismaIdentifier, name: string, content: string) {
    switch (identifier) {
      case PrismaIdentifier.DATASOURCE: return PrismaDataSource.fromFile(name, content);
      case PrismaIdentifier.GENERATOR: return PrismaGenerator.fromFile(name, content);
      case PrismaIdentifier.MODEL: return PrismaModel.fromFile(name, content);
      case PrismaIdentifier.ENUM: return PrismaEnum.fromFile(name, content);
    }
  }

  private static extractObjectDeclaration(str: string) {
    // Split by sequences of one or more of space or espace character
    // Keep only alphanumerics words
    const prismaObjectDeclaration = str
      .split(/[ \n]+/)
      .filter((token) => token !== '');

    // Should be of form [identifier] [name] {...}
    if (prismaObjectDeclaration.length !== 2) {
      throw new PrismaError(`Error while parsing prisma declaration ${str} : tokenized to ${JSON.stringify(prismaObjectDeclaration)}`);
    }

    const identifier = prismaObjectDeclaration[0] as PrismaIdentifier;
    if (!Object.values(PrismaIdentifier).includes(identifier)) {
      throw new PrismaError(`Unknown prisma identifier : '${identifier}'`);
    }

    const name = prismaObjectDeclaration[1];
    return { identifier, name };
  }
}
