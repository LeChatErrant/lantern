import colors from 'colors';

export enum ProjectOption {
  USER,
  USER_ROLE, // Role + admin middleware
  USER_AUTH, // Signin, signout + auth middleware (attention, auth sans session = problème)
  USER_ME, // meMiddleware
  USER_OWNERSHIP, // ownershipMiddleware

  SESSION,
  REDIS_SESSION,

  DOCKERFILE,
  DOCKER_COMPOSE,

  HEROKU,
  PRE_COMMIT_HOOKS,
  DEPENDABOT,
  MERGIFY,
  GITHUB_ISSUE_TEMPLATES,
  INTEGRATION_PIPELINE,
  LINT_PIPELINE,
  DOCKER_PIPELINE,
  TOC_PIPELINE,
  GREETINGS_PIPELINE,
}

export const ProjectOptionDependencies: { [key in ProjectOption]?: ProjectOption[] } = {
  [ProjectOption.DOCKER_COMPOSE]: [ProjectOption.DOCKERFILE],
  [ProjectOption.REDIS_SESSION]: [ProjectOption.SESSION],
};

export const ProjectOptionCategories: { [category: string]: ProjectOption[] } = {
  Docker: [
    ProjectOption.DOCKERFILE,
    ProjectOption.DOCKER_COMPOSE,
  ],
  Session: [
    ProjectOption.SESSION,
    ProjectOption.REDIS_SESSION,
  ],
};

export const ProjectOptionDefault: { [key in ProjectOption]?: boolean } = {
  [ProjectOption.USER]: true,
  [ProjectOption.SESSION]: true,
  [ProjectOption.REDIS_SESSION]: true,
  [ProjectOption.DOCKERFILE]: true,
  [ProjectOption.DOCKER_COMPOSE]: true,
  [ProjectOption.HEROKU]: true,
  [ProjectOption.PRE_COMMIT_HOOKS]: true,
};

export const ProjectOptionDescriptions: { [key in ProjectOption]?: string } = {
  [ProjectOption.USER]: `Default ${colors.blue('user')}`,

  [ProjectOption.SESSION]: `${colors.blue('Session')} to persist user connection (useful for example to keen user logged in)`,
  [ProjectOption.REDIS_SESSION]: `${colors.blue('Redis')} based sessions to persist it across multiple instances`,

  [ProjectOption.DOCKERFILE]: `${colors.blue('Dockerfile')} to launch the containerized app`,
  [ProjectOption.DOCKER_COMPOSE]: `${colors.blue('Docker-compose')} file to launch the app, the database, and redis`,

  [ProjectOption.HEROKU]: `${colors.blue('Heroku')} integration, to easily deploy the app`,
  [ProjectOption.PRE_COMMIT_HOOKS]: `${colors.blue('Pre-commit hooks')}, automatically linting your files and validating database schema`,
};

export type ProjectOptionConfig = { [key in ProjectOption]: boolean };
