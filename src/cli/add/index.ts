import { capitalize } from '../../utils/strings';
import { prismaSchemaPath } from '../../utils/referencePaths';
import { PrismaSchema, PrismaModel, PrismaModelField, PrismaModelAttribute } from '../../utils/prisma';

import {
  queryDefaultFields, queryFields,
  queryPluralizedResourceName,
  queryRelation,
  queryResourceName,
} from './queries';
import { displayModel } from '../../utils/display';

async function add() {
  const schema = PrismaSchema.fromFile(prismaSchemaPath);

  const singular = await queryResourceName(schema);
  const plural = await queryPluralizedResourceName(singular);
  //  const isDbModelNeed = await queryIfDatabaseModelIsNeeded(singular);

  const model = new PrismaModel(capitalize(singular), [
    new PrismaModelField('id', 'String', [
      new PrismaModelAttribute('@id'),
      new PrismaModelAttribute('@default', 'cuid()'),
    ]),
  ], [], plural);

  await queryDefaultFields(model);
  await queryFields(schema, model);
  await queryRelation(schema, model);
  displayModel(model);
}

export default add;
