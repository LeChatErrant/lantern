import { createFile } from '../../../utils/files';
import ProjectPath from '../../../utils/ProjectPath';

const content = `
.git
*Dockerfile*
*docker-compose*
node_modules
dist
logs
coverage
`.substring(1);

export default function dockerignoreTemplate(projectPath: ProjectPath) {
  createFile(projectPath.dockerignore, content);
}
