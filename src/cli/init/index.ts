import { queryProjectConfig, queryProjectName } from './queries';
import { initTemplate } from './templater';

async function init() {
  const projectName = await queryProjectName();
  const projectOptions = await queryProjectConfig(projectName);

  console.clear();
  await initTemplate(projectName, projectOptions);
}

export default init;
