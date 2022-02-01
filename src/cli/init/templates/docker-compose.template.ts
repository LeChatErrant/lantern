import { createFile } from '../../../utils/files';
import { ProjectConfig, ProjectOption } from '../ProjectConfig';
import ProjectPath from '../../../utils/ProjectPath';

const redisService = `
  redis:
    image: bitnami/redis:latest
    environment:
      - REDIS_PASSWORD=\${REDIS_PASS}
    networks:
      - backend
`;

const content = (projectConfig: ProjectConfig) => `
version: '3'

services:
  app:
    build: .
    environment:
      - PORT
      - SESSION_SECRET
      - MODE=dev
      - DEFAULT_ADMIN_EMAIL
      - DEFAULT_ADMIN_PASSWORD
      - DATABASE_URL=postgresql://$DB_USER:$DB_PASS@db:$DB_PORT/$DB_NAME
      - REDIS_PORT
      - REDIS_HOST=redis
      - REDIS_PASS
      - WHITELIST
    ports:
      - "\${PORT}:\${PORT}"
    networks:
      - backend
    volumes:
      - ./logs:/app/logs

  studio:
    build: .
    command:
      - db:studio
    environment:
      - DATABASE_URL=postgresql://$DB_USER:$DB_PASS@db:$DB_PORT/$DB_NAME
      - STUDIO_PORT
    ports:
      - "\${STUDIO_PORT}:\${STUDIO_PORT}"
    networks:
      - backend
${projectConfig[ProjectOption.REDIS_SESSION] ? redisService : ''}
  db:
    image: postgres:alpine
    environment:
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASS}
      - POSTGRES_DB=\${DB_NAME}
    networks:
      - backend
    volumes:
      - db-data:/var/lib/postgresql/data

networks:
  backend:

volumes:
  db-data:
`.substring(1);

export default function dockerComposeTemplate(projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createFile(projectPath.dockerCompose, content(projectConfig));
}
