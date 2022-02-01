import { ProjectConfig, ProjectOption } from '../ProjectConfig';
import { createFile } from '../../../utils/files';
import { beautifyJson, sortJsonKeys } from '../../../utils/json';
import { downloadWithSpinner } from '../../../utils/download';
import ProjectPath from '../../../utils/ProjectPath';

export default async function packageTemplate(projectName: string, projectPath: ProjectPath, projectConfig: ProjectConfig) {
  const content = await downloadWithSpinner('https://raw.githubusercontent.com/LeChatErrant/API-template/master/package.json');
  const packageJson = JSON.parse(content);

  packageJson.name = projectName.toLowerCase();
  packageJson.version = '1.0.0';
  packageJson.description = 'Modern production-ready typescript API, generated using lantern';
  delete packageJson.author;

  if (!projectConfig[ProjectOption.HEROKU]) {
    delete packageJson.scripts.postinstall;
  }

  if (!projectConfig[ProjectOption.LINT_PIPELINE]) {
    delete packageJson.scripts['lint:ci'];
  }

  if (!projectConfig[ProjectOption.SESSION]) {
    delete packageJson.dependencies['express-session'];
    delete packageJson.devDependencies['@types/express-session'];
  }

  if (!projectConfig[ProjectOption.REDIS_SESSION]) {
    delete packageJson.scripts['dev:redis'];
    delete packageJson.dependencies.redis;
    delete packageJson.dependencies['connect-redis'];
    delete packageJson.devDependencies['@types/redis'];
    delete packageJson.devDependencies['@types/connect-redis'];
  }

  if (!projectConfig[ProjectOption.PRE_COMMIT_HOOKS]) {
    delete packageJson.scripts.prepare;
    delete packageJson['lint-staged'];
    delete packageJson.devDependencies.husky;
    delete packageJson.devDependencies['lint-staged'];
  }

  // Sort dependencies alphabetically
  packageJson.dependencies = sortJsonKeys(packageJson.dependencies);
  packageJson.devDependencies = sortJsonKeys(packageJson.devDependencies);

  createFile(projectPath.packageJson, beautifyJson(packageJson));
}
