import { queryProjectName, queryProjectOptions } from './queries';

async function init() {
  const projectName = await queryProjectName();
  const projectOptions = await queryProjectOptions(projectName);

}

export default init;
