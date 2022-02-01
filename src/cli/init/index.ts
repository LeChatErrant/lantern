import { queryProjectConfig, queryProjectName } from './queries';
import initProject from './initProject';

import logger from '../../utils/logger';
import ProjectPath from '../../utils/ProjectPath';

async function init() {
  const projectName = await queryProjectName();
  const projectOptions = await queryProjectConfig(projectName);

  console.clear();

  const projectPath = new ProjectPath(projectName);
  await initProject(projectName, projectPath, projectOptions);

  logger.success(`Successfully generated lantern project ${projectName} !`);
}

export default init;
