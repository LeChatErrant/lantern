import path from 'path';

import { createFile } from '../../../utils/files';
import { ProjectConfig, ProjectOption } from '../ProjectConfig';
import { beautifyJson, sortJsonKeys } from '../../../utils/json';

const content = () => JSON.parse(JSON.stringify({
  'name': 'api-template',
  'version': '1.0.0',
  'description': 'Modern production-ready typescript API, generated using lantern',
  'license': 'ISC',
  'scripts': {
    'lantern': 'lantern',
    'build': 'tsc',
    'start': 'npm run db:deploy && node dist',
    'test': 'MODE=local && exit 0',
    'integration': 'MODE=test && npm run db:deploy && jest --passWithNoTests --coverage --runInBand --silent --detectOpenHandles',
    'integration:watch': 'MODE=test && npm run db:deploy && jest --passWithNoTests --coverage --runInBand --watch --silent --detectOpenHandles',
    'dev:db': 'docker run --name db -e POSTGRES_PASSWORD=${DB_PASS} -e POSTGRES_USER=${DB_USER} -p ${DB_PORT}:${DB_PORT} -d postgres:alpine',
    'dev:redis': 'docker run --name redis -e REDIS_PASSWORD=${REDIS_PASS} -p ${REDIS_PORT}:${REDIS_PORT} -d bitnami/redis:latest',
    'dev': "npm run db:deploy && concurrently --raw --kill-others 'prisma generate --watch' 'ts-node-dev --respawn --cls --exit-child src'",
    'prisma:generate': 'prisma generate',
    'prisma:format': 'prisma format',
    'db:studio': 'prisma studio --port ${STUDIO_PORT}',
    'db:push': 'prisma db push',
    'db:reset': 'prisma migrate reset',
    'db:migrate': 'prisma migrate dev',
    'db:deploy': 'prisma migrate deploy',
    'lint': "eslint './src/**/*.{ts,tsx}' --fix",
  },
  'dependencies': {
    '@prisma/client': '^3.8.1',
    'bcrypt': '^5.0.1',
    'class-transformer': '^0.5.1',
    'class-validator': '^0.13.1',
    'cors': '^2.8.5',
    'env-var': '^7.1.1',
    'express': '^4.17.2',
    'express-async-handler': '^1.2.0',
    'express-async-router': '^0.1.15',
    'helmet': '^5.0.1',
    'http-errors': '^2.0.0',
    'http-status-codes': '^2.2.0',
    'morgan': '^1.10.0',
    'prisma': '^3.8.1',
    'reflect-metadata': '^0.1.13',
    'typescript': '^4.5.4',
    'winston': '^3.4.0',
  },
  'devDependencies': {
    '@lechaterrant/lantern': '^1.1.0',
    '@types/bcrypt': '^5.0.0',
    '@types/cors': '^2.8.12',
    '@types/express': '^4.17.13',
    '@types/http-errors': '^1.8.2',
    '@types/jest': '^27.4.0',
    '@types/morgan': '^1.9.3',
    '@types/node': '^17.0.10',
    '@types/supertest': '^2.0.11',
    '@typescript-eslint/eslint-plugin': '^4.33.0',
    '@typescript-eslint/parser': '^4.33.0',
    'concurrently': '^7.0.0',
    'eslint': '^7.32.0',
    'eslint-config-airbnb-typescript': '^14.0.2',
    'eslint-plugin-import': '^2.25.4',
    'jest': '^27.4.7',
    'supertest': '^6.2.2',
    'ts-jest': '^27.1.3',
    'ts-node-dev': '^1.1.8',
  },
}));

export default function packageTemplate(projectName: string, projectConfig: ProjectConfig) {
  const packageJson = content();
  packageJson.name = projectName.toLowerCase();

  if (projectConfig[ProjectOption.HEROKU]) {
    packageJson.scripts.postinstall = 'npm run build';
  }

  if (projectConfig[ProjectOption.LINT_PIPELINE]) {
    packageJson.scripts['lint:ci'] = "eslint './src/**/*.{ts,tsx}'";
  }

  if (projectConfig[ProjectOption.SESSION]) {
    packageJson.dependencies['express-session'] = '^1.17.2';
    packageJson.devDependencies['@types/express-session'] = '^1.17.4';
  }

  if (projectConfig[ProjectOption.REDIS_SESSION]) {
    packageJson.dependencies.redis = '^3.1.2';
    packageJson.dependencies['connect-redis'] = '^6.0.0';
    packageJson.devDependencies['@types/redis'] = '^2.8.32';
    packageJson.devDependencies['@types/connect-redis'] = '0.0.18';
  }

  if (projectConfig[ProjectOption.PRE_COMMIT_HOOKS]) {
    packageJson.scripts.prepare = 'husky install';
    packageJson.devDependencies.husky = '^7.0.0';
    packageJson.devDependencies['lint-staged'] = '^12.2.1';

    packageJson['lint-staged'] = {
      '*.@(ts|js)': [
        'eslint --fix',
      ],
      'prisma/schema.prisma': [
        'prisma format --schema',
      ],
    };
  }

  // Sort dependencies alphabetically
  packageJson.dependencies = sortJsonKeys(packageJson.dependencies);
  packageJson.devDependencies = sortJsonKeys(packageJson.devDependencies);

  const filePath = path.join(projectName, 'package.json');
  createFile(filePath, beautifyJson(packageJson));
}
