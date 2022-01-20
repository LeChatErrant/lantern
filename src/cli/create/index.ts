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
  const singular = await queryResourceName();
  const plural = await queryPluralizedResourceName(singular);
  const isDbModelNeed = await queryIfDatabaseModelIsNeeded(singular);

  if (isDbModelNeed) {
    const model = new PrismaModel(capitalize(singular), [
      new PrismaModelField('id', 'String', [
        new PrismaModelAttribute('@id'),
        new PrismaModelAttribute('@default', 'cuid()'),
      ]),
    ]);
    const schema = PrismaSchema.fromFile(prismaSchemaPath);

    const exists = !!schema.objects.find((o) => o.name === model.name);
    if (exists) throw new PrismaError(`Model ${model.name} already exists in schema.prisma`);

    await queryDefaultFields(model);
    await queryRelation(schema, model);
  }
}

export default create;
