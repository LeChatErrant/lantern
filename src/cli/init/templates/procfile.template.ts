import { createFile } from '../../../utils/files';
import ProjectPath from '../../../utils/ProjectPath';

const content = `
web: npm run start
`.substring(1);

export default function procfileTemplate(projectPath: ProjectPath) {
  createFile(projectPath.procfile, content);
}
