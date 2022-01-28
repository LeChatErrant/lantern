import path from 'path';

import { createFile } from '../../../utils/files';

const content = `
.git
*Dockerfile*
*docker-compose*
node_modules
dist
logs
coverage
`.substring(1);

export default function dockerignoreTemplate(projectName: string) {
  const filePath = path.join(projectName, '.dockerignore');
  createFile(filePath, content);
}
