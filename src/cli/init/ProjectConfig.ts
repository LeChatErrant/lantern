import { blue, green } from '../../utils/colors';

export enum ProjectOption {
  USER = 'user',
  USER_AUTH = 'user auth',
  USER_ROLE = 'user role',
  USER_ME_MIDDLEWARE = 'user me middleware',
  USER_OWNERSHIP_MIDDLEWARE = 'user ownership middleware',

  SESSION = 'session',
  REDIS_SESSION = 'redis session',

  DOCKERFILE = 'dockerfile',
  DOCKER_COMPOSE = 'docker-compose',

  HEROKU = 'heroku',
  PRE_COMMIT_HOOKS = 'pre-commit hooks',
  DEPENDABOT = 'dependabot',
  MERGIFY = 'mergify',
  GITHUB_ISSUE_TEMPLATES = 'github issue template',
  INTEGRATION_PIPELINE = 'integration pipeline',
  LINT_PIPELINE = 'lint pipeline',
  DOCKER_PIPELINE = 'docker pipeline',
  TOC_PIPELINE = 'toc pipeline',
  GREETINGS_PIPELINE = 'greetings pipeline',
}

export type ProjectConfig = { [key in ProjectOption]: boolean };

export const ProjectOptionDependencies: { [key in ProjectOption]?: ProjectOption[] } = {
  [ProjectOption.USER_AUTH]: [ProjectOption.USER, ProjectOption.SESSION],
  [ProjectOption.USER_ROLE]: [ProjectOption.USER],
  [ProjectOption.USER_ME_MIDDLEWARE]: [ProjectOption.USER],
  [ProjectOption.USER_OWNERSHIP_MIDDLEWARE]: [ProjectOption.USER],

  [ProjectOption.REDIS_SESSION]: [ProjectOption.SESSION],

  [ProjectOption.DOCKER_COMPOSE]: [ProjectOption.DOCKERFILE],

  [ProjectOption.MERGIFY]: [ProjectOption.DEPENDABOT],
  [ProjectOption.DOCKER_PIPELINE]: [ProjectOption.DOCKERFILE],
};

export const ProjectOptionCategories: { [category: string]: ProjectOption[] } = {
  User: [
    ProjectOption.USER,
    ProjectOption.USER_AUTH,
    ProjectOption.USER_ROLE,
    ProjectOption.USER_ME_MIDDLEWARE,
    ProjectOption.USER_OWNERSHIP_MIDDLEWARE,
  ],
  Session: [
    ProjectOption.SESSION,
    ProjectOption.REDIS_SESSION,
  ],
  Configuration: [
    ProjectOption.DOCKERFILE,
    ProjectOption.DOCKER_COMPOSE,
    ProjectOption.GITHUB_ISSUE_TEMPLATES,
    ProjectOption.HEROKU,
  ],
  ['CI and pipelines']: [
    ProjectOption.PRE_COMMIT_HOOKS,
    ProjectOption.DEPENDABOT,
    ProjectOption.MERGIFY,
    ProjectOption.INTEGRATION_PIPELINE,
    ProjectOption.LINT_PIPELINE,
    ProjectOption.DOCKER_PIPELINE,
    ProjectOption.TOC_PIPELINE,
    ProjectOption.GREETINGS_PIPELINE,
  ],
};

export const ProjectOptionDefault: ProjectConfig = {
  [ProjectOption.USER]: true,
  [ProjectOption.USER_AUTH]: true,
  [ProjectOption.USER_ROLE]: false,
  [ProjectOption.USER_ME_MIDDLEWARE]: false,
  [ProjectOption.USER_OWNERSHIP_MIDDLEWARE]: false,

  [ProjectOption.SESSION]: true,
  [ProjectOption.REDIS_SESSION]: true,

  [ProjectOption.DOCKERFILE]: true,
  [ProjectOption.DOCKER_COMPOSE]: true,
  [ProjectOption.GITHUB_ISSUE_TEMPLATES]: false,
  [ProjectOption.HEROKU]: false,

  [ProjectOption.PRE_COMMIT_HOOKS]: true,
  [ProjectOption.DEPENDABOT]: true,
  [ProjectOption.MERGIFY]: true,
  [ProjectOption.INTEGRATION_PIPELINE]: true,
  [ProjectOption.LINT_PIPELINE]: true,
  [ProjectOption.DOCKER_PIPELINE]: true,
  [ProjectOption.TOC_PIPELINE]: true,
  [ProjectOption.GREETINGS_PIPELINE]: false,
};

export const ProjectOptionDescriptions: { [key in ProjectOption]: string } = {
  [ProjectOption.USER]: `Default ${blue('user')}`,
  [ProjectOption.USER_AUTH]: `${blue('Authentification')}, with ${green('signin')} / ${green('signout')} routes and ${green('authentification middleware')} to protect routes`,
  [ProjectOption.USER_ROLE]: `User ${blue('roles')} (by default, ${green('USER')} or ${green('ADMIN')}), with ${green('admin middleware')} to make routes accessibles only by admins`,
  [ProjectOption.USER_ME_MIDDLEWARE]: `${blue("'Me' middleware")}, allowing logged in user to refer to himself like this : ${green('GET /users/me')}, ${green('POST /users/me/posts')}, ...`,
  [ProjectOption.USER_OWNERSHIP_MIDDLEWARE]: `${blue('Ownership middleware')}, allowing to restrict a route to only the user owning the resource (example : posts created under ${green('/users/XXX/posts')} can only be accessed by user ${green('XXX')})`,

  [ProjectOption.SESSION]: `${blue('Session')} to ${green('persist')} user connection, useful for example to keep user logged in`,
  [ProjectOption.REDIS_SESSION]: `${blue('Redis')} based sessions to persist it across ${green('multiple instances')}`,

  [ProjectOption.DOCKERFILE]: `${blue('Dockerfile')} to launch the ${green('containerized')} app`,
  [ProjectOption.DOCKER_COMPOSE]: `${blue('Docker-compose')} file to launch the ${green('full stack')} ('app, database, and redis if needed')`,
  [ProjectOption.GITHUB_ISSUE_TEMPLATES]: `${blue('Default issue templates')} for ${green('github')} ('feature request, bug report and security issue)`,
  [ProjectOption.HEROKU]: `${blue('Heroku')} integration, to easily ${green('deploy')} the app`,

  [ProjectOption.PRE_COMMIT_HOOKS]: `${blue('Pre-commit hooks')}, automatically ${green('linting')} your files and ${green('validating database schema')}`,
  [ProjectOption.DEPENDABOT]: `${blue('Dependabot')}, automatically creating ${green('pull requests')} to ${green('upgrade dependencies')} when needed`,
  [ProjectOption.MERGIFY]: `${blue('Mergify')} configured to automatically merge ${green('dependabot')} PRs if the CI succeeds`,
  [ProjectOption.INTEGRATION_PIPELINE]: `${blue('Integration tests pipeline')} to test ${green('API endpoints')}`,
  [ProjectOption.LINT_PIPELINE]: `${blue('Lint pipeline')} to validate ${green('code styling')}`,
  [ProjectOption.DOCKER_PIPELINE]: `${blue('Docker pipeline')} to ${green('build and publish docker image')} on releases / pushes on master`,
  [ProjectOption.TOC_PIPELINE]: `${blue('Table of content pipeline')} to update the TOC section of ${green('README.md')} when needed`,
  [ProjectOption.GREETINGS_PIPELINE]: `${blue('Greetings pipeline')} to... greet you each time a pull request is closed ${green('(you deserves it !)')}`,
};
