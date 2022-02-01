import { capitalize } from '../../utils/strings';
import ProjectPath from '../../utils/ProjectPath';
import { PrismaSchema, PrismaModel, PrismaModelField, PrismaModelAttribute } from '../../utils/prisma';

import {
  queryDefaultFields, queryFields,
  queryPluralizedResourceName,
  queryRelation,
  queryResourceName,
} from './queries';
import { displayModel } from '../../utils/display';

async function add() {
  const projectPath = new ProjectPath('.');
  const schema = PrismaSchema.fromFile(projectPath.prismaSchema);

  const singular = await queryResourceName(schema);
  const plural = await queryPluralizedResourceName(singular);

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
