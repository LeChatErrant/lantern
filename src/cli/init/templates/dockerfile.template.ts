import path from 'path';

import { createFile } from '../../../utils/files';

const content = `
FROM node:lts

COPY . /app
WORKDIR /app

USER node

RUN npm install --no-optional
RUN npm run build

EXPOSE $PORT

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
`.substring(1);

export default function dockerfileTemplate(projectName: string) {
  const filePath = path.join(projectName, 'Dockerfile');
  createFile(filePath, content);
}
