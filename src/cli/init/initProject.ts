import { createDir, registerDirModification, registerFileModification } from '../../utils/files';
import { launch } from '../../utils/subprocess';
import ProjectPath from '../../utils/ProjectPath';

import { ProjectConfig, ProjectOption } from './ProjectConfig';
import initGithub from './initGithub';
import dockerfileTemplate from './templates/dockerfile.template';
import dockerignoreTemplate from './templates/dockerignore.template';
import dockerComposeTemplate from './templates/docker-compose.template';
import envrcTemplate from './templates/envrc.template';
import gitignoreTemplate from './templates/gitignore.template';
import jestConfigTemplate from './templates/jest.config.template';
import licenseTemplate from './templates/license.template';
import procfileTemplate from './templates/procfile.template';
import tsconfigTemplate from './templates/tsconfig.template';
import eslintrcTemplate from './templates/eslintrc.template';
import packageTemplate from './templates/package.template';
import initSources from './templates/initSources';

async function initProject(projectName: string, projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createDir(projectPath.root);

  licenseTemplate(projectPath);
  gitignoreTemplate(projectPath);
  envrcTemplate(projectPath, projectConfig);
  tsconfigTemplate(projectPath);
  eslintrcTemplate(projectPath);
  jestConfigTemplate(projectPath);

  if (projectConfig[ProjectOption.DOCKERFILE]) {
    dockerfileTemplate(projectPath);
    dockerignoreTemplate(projectPath);
    if (projectConfig[ProjectOption.DOCKER_COMPOSE]) {
      dockerComposeTemplate(projectPath, projectConfig);
    }
  }

  if (projectConfig[ProjectOption.HEROKU]) {
    procfileTemplate(projectPath);
  }

  initGithub(projectPath, projectConfig);

  initSources(projectName, projectPath, projectConfig);

  await packageTemplate(projectName, projectPath, projectConfig);

  registerFileModification({
    path: projectPath.packageLockJson,
    modificationType: 'CREATE',
  });
  registerDirModification({
    path: projectPath.nodeModules,
    modificationType: 'CREATE',
    allowNonEmptyDelete: true,
  });
  await launch(projectName, 'npm', 'install');
}

export default initProject;
