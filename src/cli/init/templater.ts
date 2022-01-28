import { createDir } from '../../utils/files';

import { ProjectConfig, ProjectOption } from './ProjectConfig';
import dockerfileTemplate from './templates/dockerfile.template';
import dockerignoreTemplate from './templates/dockerignore.template';
import dockerComposeTemplate from './templates/docker-compose.template';
import envrcTemplate from './templates/envrc.template';
import gitignoreTemplate from './templates/gitignore.template';
import jestConfigTemplate from './templates/jest.config.template';
import licenseTemplate from './templates/license.template';
import procfileTemplate from './templates/procfile.template';

export function initTemplate(projectName: string, projectConfig: ProjectConfig) {
  createDir(projectName);

  licenseTemplate(projectName);
  gitignoreTemplate(projectName);
  envrcTemplate(projectName, projectConfig);
  jestConfigTemplate(projectName);

  if (projectConfig[ProjectOption.DOCKERFILE]) {
    dockerfileTemplate(projectName);
    dockerignoreTemplate(projectName);
    if (projectConfig[ProjectOption.DOCKER_COMPOSE]) {
      dockerComposeTemplate(projectName, projectConfig);
    }
  }

  if (projectConfig[ProjectOption.HEROKU]) {
    procfileTemplate(projectName);
  }
}