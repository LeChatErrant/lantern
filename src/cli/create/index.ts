import { capitalize } from '../../utils/strings';
import { prismaSchemaPath } from '../../utils/referencePaths';
import { PrismaSchema, PrismaModel, PrismaModelField, PrismaModelAttribute } from '../../utils/prisma';
import { PrismaError } from '../../utils/errors';

import {
  queryDefaultFields,
  queryIfDatabaseModelIsNeeded,
  queryPluralizedResourceName,
  queryRelation,
  queryResourceName,
} from './queries';

async function create() {
  const schema = PrismaSchema.fromFile(prismaSchemaPath);

  const singular = await queryResourceName(schema);
  const plural = await queryPluralizedResourceName(singular);
  const isDbModelNeed = await queryIfDatabaseModelIsNeeded(singular);

  if (isDbModelNeed) {
    const model = new PrismaModel(capitalize(singular), [
      new PrismaModelField('id', 'String', [
        new PrismaModelAttribute('@id'),
        new PrismaModelAttribute('@default', 'cuid()'),
      ]),
    ], [], plural);

    await queryDefaultFields(model);
    await queryRelation(schema, model);
  }
}

export default create;
