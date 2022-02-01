import { createFile } from '../../../utils/files';
import ProjectPath from '../../../utils/ProjectPath';

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

export default function dockerfileTemplate(projectPath: ProjectPath) {
  createFile(projectPath.dockerfile, content);
}
