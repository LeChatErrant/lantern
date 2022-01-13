import path from 'path';
import fs from 'fs';
import colors from 'colors';

import { capitalize, insert, npmRun } from '../utils';

import routesTemplate from './template/routes.template';
import controllersTemplate from './template/controllers.template';
import middlewareTemplate from './template/middleware.template';
import prismaTemplate from './template/prisma.template';
import typesTemplate from './template/types.template';
import helpersTemplate from './template/helpers.template';
import specTemplate from './template/spec.template';

const projectPath = path.join('.');
const componentPath = path.join(projectPath, 'src', 'routes');
const prismaPath = path.join(projectPath, 'prisma');

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
  const schemaPath = path.join(prismaPath, 'schema.prisma');
  if (!fs.existsSync(schemaPath)) {
    console.error(`${schemaPath} doesn't exist`);
    return false;
  }
  const initialLength = fs.statSync(schemaPath).size;

  console.log(`Creating ${colors.green(capitalize(singular))} model in ${colors.blue(schemaPath)}`);

  fs.appendFileSync(
    schemaPath,
    prismaTemplate(singular),
  );

  try {
    await npmRun('prisma:format');
    await npmRun('prisma:generate');
    console.log(`Model ${colors.green(capitalize(singular))} created in ${colors.blue(schemaPath)}`);
    return true;
  } catch (error) {
    console.error(`The model ${colors.red(capitalize(singular))} cannon be defined because a model with that name already exists in ${colors.blue(schemaPath)} `);
    fs.truncateSync(schemaPath, initialLength);
    return false;
  }
}

function fillRouter(singular: string, plural: string) {
  const routerPath = path.join(componentPath, 'index.ts');
  console.log(`Filling ${colors.green(routerPath)}...`);
  if (!fs.existsSync(routerPath)) {
    console.error(`${componentPath} doesn't exist.`);
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

export async function templateNewResource(singular: string, plural: string) {
  const resourcePath = path.join(componentPath, singular);

  const folderSuccess = await createFolder(resourcePath);
  if (!folderSuccess) return false;

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
