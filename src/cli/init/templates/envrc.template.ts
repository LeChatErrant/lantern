import { createFile } from '../../../utils/files';
import ProjectPath from '../../../utils/ProjectPath';
import { ProjectConfig, ProjectOption } from '../ProjectConfig';

const redisConf = `
export REDIS_PORT=6379
export REDIS_HOST=localhost
export REDIS_PASS=redispass
`;

const adminConf = `
export DEFAULT_ADMIN_EMAIL=admin@api-template.com
export DEFAULT_ADMIN_PASSWORD=admin
`;

const sessionConf = `
export SESSION_SECRET=keyboard_cat
`;

const content = (projectConfig: ProjectConfig) => `
export PORT=8000
export MODE=local
${projectConfig[ProjectOption.SESSION] ? sessionConf : ''}
export WHITELIST=http://localhost,http://127.0.0.1
${projectConfig[ProjectOption.USER_ROLE] ? adminConf : ''}
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=app
export DB_USER=root
export DB_PASS=dbpass
export DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME
${projectConfig[ProjectOption.REDIS_SESSION] ? redisConf : ''}
export STUDIO_PORT=8001
`.substring(1);

export default function envrcTemplate(projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createFile(projectPath.envrc, content(projectConfig));
}
