import { queryProjectName, queryProjectOptions } from './queries';
import { initTemplate } from './templater';

async function init() {
  const projectName = await queryProjectName();
  const projectOptions = await queryProjectOptions(projectName);

  console.clear();
  initTemplate(projectName, projectOptions);
}

export default init;
