/*
import path from 'path';
import fs from 'fs';
import colors from 'colors';

import { capitalize, insert } from '../../utils/strings';
import { npmRun } from '../../utils/npm';
import { projectPath, routesPath, prismaPath } from '../../utils/referencePaths';

import routesTemplate from './templates/routes.templates';
import controllersTemplate from './templates/controllers.templates';
import middlewareTemplate from './templates/middleware.templates';
import prismaTemplate from './templates/prisma.templates';
import typesTemplate from './templates/types.templates';
import helpersTemplate from './templates/helpers.templates';
import specTemplate from './templates/spec.templates';
import { appendToFile, createDir } from '../../utils/files';
import logger from '../../utils/logger';

function createFolder(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    console.error(`The directory ${folderPath} already exists`);
    return false;
  }

  console.log(`Creating ${colors.green(folderPath)} folder`);
  fs.mkdirSync(folderPath);
  return true;
}

async function fillPrismaSchema(singular: string) {
  logger.log(`Creating ${colors.green(capitalize(singular))} model in ${colors.blue(schemaPath)}`);

  const schemaPath = path.join(prismaPath, 'schema.prisma');
  appendToFile(schemaPath, prismaTemplate(singular));

  try {
    await npmRun('prisma:format');
    await npmRun('prisma:generate');
    console.log(`Model ${colors.green(capitalize(singular))} created in ${colors.blue(schemaPath)}`);
  } catch (error) {
    console.error(`The model ${colors.red(capitalize(singular))} cannon be defined because a model with that name already exists in ${colors.blue(schemaPath)} `);
  }
}

function fillRouter(singular: string, plural: string) {
  const routerPath = path.join(routesPath, 'index.ts');
  console.log(`Filling ${colors.green(routerPath)}...`);
  if (!fs.existsSync(routerPath)) {
    console.error(`${routesPath} doesn't exist.`);
    return false;
  }

  let content = fs.readFileSync(routerPath).toString();
  const lastImportPos = content.lastIndexOf('import');
  const lineAfterLastImport = content.indexOf('\n', lastImportPos) + 1;
  content = insert(content, lineAfterLastImport, `import ${plural} from './${singular}/${singular}Routes';\n`);

  const lastRouterPos = content.lastIndexOf('router.use(');
  const lineAfterLastRouter = content.indexOf('\n', lastRouterPos) + 1;
  content = insert(content, lineAfterLastRouter, `router.use(${plural});\n`);

  fs.writeFileSync(routerPath, content);
  return true;
}

function createTemplatedFile(directory: string, filename: string, content: string) {
  const filePath = path.join(directory, filename);

  console.log(`Creating ${colors.green(filePath)} file...`);
  fs.writeFileSync(filePath, content);
}

export default async function createResource(singular: string, plural: string) {
  const resourcePath = path.join(routesPath, singular);

  await createDir(resourcePath);

  const prismaSuccess = await fillPrismaSchema(singular);
  if (!prismaSuccess) return false;

  const routerSuccess = fillRouter(singular, plural);
  if (!routerSuccess) return false;

  createTemplatedFile(resourcePath, `${singular}Routes.ts`, routesTemplate(singular, plural));
  createTemplatedFile(resourcePath, `${singular}Controllers.ts`, controllersTemplate(singular, plural));
  createTemplatedFile(resourcePath, `${singular}Middleware.ts`, middlewareTemplate(singular));
  createTemplatedFile(resourcePath, `${singular}Types.ts`, typesTemplate(singular));
  createTemplatedFile(resourcePath, `${singular}Helpers.ts`, helpersTemplate(singular));
  createTemplatedFile(resourcePath, `${singular}.spec.ts`, specTemplate(singular));

  return true;
}
*/
