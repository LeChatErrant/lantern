import path from 'path';

import { createFile } from '../../../utils/files';

const content = `
web: npm run start
`.substring(1);

export default function procfileTemplate(projectName: string) {
  const filePath = path.join(projectName, 'Procfile');
  createFile(filePath, content);
}
