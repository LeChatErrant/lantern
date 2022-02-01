import { queryProjectConfig, queryProjectName } from './queries';
import { initProject } from './initProject';

import logger from '../../utils/logger';

async function init() {
  const projectName = await queryProjectName();
  const projectOptions = await queryProjectConfig(projectName);

  console.clear();
  await initProject(projectName, projectOptions);
  logger.success(`Successfully generated lantern project ${projectName} !`);
}

export default init;
