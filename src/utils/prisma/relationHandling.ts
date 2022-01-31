import { PrismaError } from '../errors';

import { PrismaModel, PrismaModelField, PrismaModelAttribute } from './PrismaModel';

export function addOneToOneRelation(from: PrismaModel, to: PrismaModel) {
  const idField = to.fields.find((field) => field.attributes.find((attr) => attr.type === '@id'));
  if (!idField) {
    throw new PrismaError(`Cannot find any field with attribute @id in model ${to.name}`);
  }

  from.fields.push(
    new PrismaModelField(`${to.name.toLowerCase()}Id`, 'String'),
  );
  from.fields.push(
    new PrismaModelField(to.name.toLowerCase(), to.name, [
      new PrismaModelAttribute('@relation', `fields: [${to.name.toLowerCase()}Id], references: [${idField.name}]`),
    ]),
  );
  const field = new PrismaModelField(from.name.toLowerCase(), `${from.name}?`);
  to.fields.push(field);
}

export function addOneToManyRelation(from: PrismaModel, to: PrismaModel) {
  const idField = to.fields.find((field) => field.attributes.find((attr) => attr.type === '@id'));
  if (!idField) {
    throw new PrismaError(`Cannot find any field with attribute @id in model ${to.name}`);
  }

  from.fields.push(
    new PrismaModelField(`${to.name.toLowerCase()}Id`, 'String'),
  );
  from.fields.push(
    new PrismaModelField(to.name.toLowerCase(), to.name, [
      new PrismaModelAttribute('@relation', `fields: [${to.name.toLowerCase()}Id], references: [${idField.name}]`),
    ]),
  );
  const field = new PrismaModelField(from.plural.toLowerCase(), `${from.name}[]`);
  to.fields.push(field);
}

export function addManyToManyRelation(from: PrismaModel, to: PrismaModel) {
  from.fields.push(
    new PrismaModelField(to.plural.toLowerCase(), `${to.name}[]`),
  );
  to.fields.push(
    new PrismaModelField(from.plural.toLowerCase(), `${from.name}[]`),
  );
}