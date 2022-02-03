import { createDir } from '../../../utils/files';
import ProjectPath from '../../../utils/ProjectPath';
import { ProjectConfig } from '../ProjectConfig';

function initSources(projectName: string, projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createDir(projectPath.sources);
}

export default initSources;
