import path from 'path';

export default class ProjectPath {
  public readonly root: string;

  constructor(root: string) {
    this.root = root;
  }

  /**
   * root files
   */

  public get dockerCompose() {
    return path.join(this.root, 'docker-compose.yml');
  }

  public get dockerfile() {
    return path.join(this.root, 'Dockerfile');
  }

  public get dockerignore() {
    return path.join(this.root, '.dockerignore');
  }

  public get envrc() {
    return path.join(this.root, '.envrc');
  }

  public get eslintrc() {
    return path.join(this.root, '.eslintrc.js');
  }

  public get gitignore() {
    return path.join(this.root, '.gitignore');
  }

  public get jestConfig() {
    return path.join(this.root, 'jest.config.js');
  }

  public get license() {
    return path.join(this.root, 'LICENSE');
  }

  public get packageJson() {
    return path.join(this.root, 'package.json');
  }

  public get packageLockJson() {
    return path.join(this.root, 'package-lock.json');
  }

  public get nodeModules() {
    return path.join(this.root, 'node_modules');
  }

  public get procfile() {
    return path.join(this.root, 'Procfile');
  }

  public get tsConfig() {
    return path.join(this.root, 'tsconfig.json');
  }

  /**
   * prisma
   */

  public get prisma() {
    return path.join(this.root, 'prisma');
  }

  public get prismaSchema() {
    return path.join(this.prisma, 'schema.prisma');
  }

  /**
   * src/
   */

  public get sources() {
    return path.join(this.root, 'src');
  }

  public get middlewares() {
    return path.join(this.sources, 'middlewares');
  }

  public get routes() {
    return path.join(this.sources, 'routes');
  }

  /**
   * .github/
   */

  public get github() {
    return path.join(this.root, '.github');
  }

  public get dependabot() {
    return path.join(this.github, 'dependabot.yml');
  }

  public get mergify() {
    return path.join(this.github, 'mergify.yml');
  }

  public get issueTemplate() {
    return path.join(this.github, 'ISSUE_TEMPLATE');
  }

  public get featureRequestTemplate() {
    return path.join(this.issueTemplate, 'feature_request.md');
  }

  public get bugReportTemplate() {
    return path.join(this.issueTemplate, 'bug_report.md');
  }

  public get securityIssueTemplate() {
    return path.join(this.issueTemplate, 'security_issue.md');
  }

  public get workflows() {
    return path.join(this.github, 'workflows');
  }

  public get lintWorkflow() {
    return path.join(this.workflows, 'lint.yml');
  }

  public get dockerWorkflow() {
    return path.join(this.workflows, 'build_docker_image.yml');
  }

  public get integrationWorkflow() {
    return path.join(this.workflows, 'integration_tests.yml');
  }

  public get mergeGreetingsWorkflow() {
    return path.join(this.workflows,  'merge_greetings.yml');
  }

  public get tableOfContentsWorkflow() {
    return path.join(this.workflows, 'table_of_contents.yml');
  }
}
