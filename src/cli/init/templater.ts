import { createDir } from '../../utils/files';

import { ProjectConfig, ProjectOption } from './ProjectConfig';
import dockerfileTemplate from './templates/dockerfile.template';
import dockerignoreTemplate from './templates/dockerignore.template';
import dockerComposeTemplate from './templates/docker-compose.template';
import envrcTemplate from './templates/envrc.template';
import gitignoreTemplate from './templates/gitignore.template';

export function initTemplate(projectName: string, projectConfig: ProjectConfig) {
  createDir(projectName);

  gitignoreTemplate(projectName);
  envrcTemplate(projectName, projectConfig);

  if (projectConfig[ProjectOption.DOCKERFILE]) {
    dockerfileTemplate(projectName);
    dockerignoreTemplate(projectName);
    if (projectConfig[ProjectOption.DOCKER_COMPOSE]) {
      dockerComposeTemplate(projectName, projectConfig);
    }
  }
}