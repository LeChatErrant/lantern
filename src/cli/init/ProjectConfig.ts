import colors from 'colors';

export enum ProjectOption {
  USER = 'user',
  USER_AUTH = 'user auth',
  USER_ROLE = 'user role',
  USER_ME_MIDDLEWARE = 'user me middleware',
  USER_OWNERSHIP_MIDDLEWARE = 'user ownership middleware',

  SESSION = 'session',
  REDIS_SESSION = 'redis session',

  DOCKERFILE = 'dockerfile',
  DOCKER_COMPOSE = 'docker compos',

  HEROKU = 'heroku',
  PRE_COMMIT_HOOKS = 'pre commit hooks',
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
  [ProjectOption.USER_ROLE]: true,
  [ProjectOption.USER_ME_MIDDLEWARE]: true,
  [ProjectOption.USER_OWNERSHIP_MIDDLEWARE]: true,

  [ProjectOption.SESSION]: true,
  [ProjectOption.REDIS_SESSION]: true,

  [ProjectOption.DOCKERFILE]: true,
  [ProjectOption.DOCKER_COMPOSE]: true,
  [ProjectOption.GITHUB_ISSUE_TEMPLATES]: true,
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
  [ProjectOption.USER]: `Default ${colors.blue('user')}`,
  [ProjectOption.USER_AUTH]: `${colors.blue('Authentification')}, with ${colors.green('signin')} / ${colors.green('signout')} routes and ${colors.green('authentification middleware')} to protect routes`,
  [ProjectOption.USER_ROLE]: `User ${colors.blue('roles')} (by default, ${colors.green('USER')} or ${colors.green('ADMIN')}), with ${colors.green('admin middleware')} to make routes accessibles only by admins`,
  [ProjectOption.USER_ME_MIDDLEWARE]: `${colors.blue("'Me' middleware")}, allowing logged in user to refer to himself like this : ${colors.green('GET /users/me')}, ${colors.green('POST /users/me/posts')}, ...`,
  [ProjectOption.USER_OWNERSHIP_MIDDLEWARE]: `${colors.blue('Ownership middleware')}, allowing to restrict a route to only the user owning the resource (example : posts created under ${colors.green('/users/XXX/posts')} can only be accessed by user ${colors.green('XXX')})`,

  [ProjectOption.SESSION]: `${colors.blue('Session')} to ${colors.green('persist')} user connection (useful for example to keen user logged in)`,
  [ProjectOption.REDIS_SESSION]: `${colors.blue('Redis')} based sessions to persist it across ${colors.green('multiple instances')}`,

  [ProjectOption.DOCKERFILE]: `${colors.blue('Dockerfile')} to launch the ${colors.green('containerized')} app`,
  [ProjectOption.DOCKER_COMPOSE]: `${colors.blue('Docker-compose')} file to launch the ${colors.green('full stack')} ('app, database, and redis if needed')`,
  [ProjectOption.GITHUB_ISSUE_TEMPLATES]: `${colors.blue('Default issue templates')} for ${colors.green('github')} ('feature request, bug report and security issue)`,
  [ProjectOption.HEROKU]: `${colors.blue('Heroku')} integration, to easily ${colors.green('deploy')} the app`,

  [ProjectOption.PRE_COMMIT_HOOKS]: `${colors.blue('Pre-commit hooks')}, automatically ${colors.green('linting')} your files and ${colors.green('validating database schema')}`,
  [ProjectOption.DEPENDABOT]: `${colors.blue('Dependabot')}, automatically creating ${colors.green('pull requests')} to ${colors.green('upgrade dependencies')} when needed`,
  [ProjectOption.MERGIFY]: `${colors.blue('Mergify')} configured to automatically merge ${colors.green('dependabot')} PRs if the CI succeeds`,
  [ProjectOption.INTEGRATION_PIPELINE]: `${colors.blue('Integration tests pipeline')} to test ${colors.green('API endpoints')}`,
  [ProjectOption.LINT_PIPELINE]: `${colors.blue('Lint pipeline')} to validate ${colors.green('code styling')}`,
  [ProjectOption.DOCKER_PIPELINE]: `${colors.blue('Docker pipeline')} to ${colors.green('build and publish docker image')} on releases / pushes on master`,
  [ProjectOption.TOC_PIPELINE]: `${colors.blue('Table of content pipeline')} to update the TOC section of ${colors.green('README.md')} when needed`,
  [ProjectOption.GREETINGS_PIPELINE]: `${colors.blue('Greetings pipeline')} to... greet you each time a pull request is closed ${colors.green('(you deserves it !)')}`,
};
