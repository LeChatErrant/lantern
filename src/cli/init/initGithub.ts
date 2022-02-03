import { createDir } from '../../utils/files';
import ProjectPath from '../../utils/ProjectPath';

import { ProjectConfig, ProjectOption } from './ProjectConfig';
import featureRequestTemplate from './templates/issue-templates/featureRequest.template';
import securityIssueTemplate from './templates/issue-templates/securityIssue.template';
import bugReportTemplate from './templates/issue-templates/bugReport.template';
import lintWorkflowTemplate from './templates/workflows/lintWorkflow.template';
import dockerWorkflowTemplate from './templates/workflows/dockerWorkflow.template';
import integrationTestsWorkflowTemplate from './templates/workflows/integrationTestsWorkflow.template';
import tableOfContentsWorkflowTemplate from './templates/workflows/tableOfContentsWorkflow.template';
import mergeGreetingsWorkflowTemplate from './templates/workflows/mergeGreetingsWorkflow.template';
import unitTestsWorkflowTemplate from './templates/workflows/unitTestsWorkflow.template';
import dependabotTemplate from './templates/dependabot.template';
import mergifyTemplate from './templates/mergify.template';

function initWorkflows(projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createDir(projectPath.workflows);

  if (projectConfig[ProjectOption.LINT_PIPELINE]) {
    lintWorkflowTemplate(projectPath);
  }
  if (projectConfig[ProjectOption.UNIT_TESTS_PIPELINE]) {
    unitTestsWorkflowTemplate(projectPath);
  }
  if (projectConfig[ProjectOption.INTEGRATION_TESTS_PIPELINE]) {
    integrationTestsWorkflowTemplate(projectPath);
  }
  if (projectConfig[ProjectOption.DOCKER_PIPELINE]) {
    dockerWorkflowTemplate(projectPath);
  }
  if (projectConfig[ProjectOption.TOC_PIPELINE]) {
    tableOfContentsWorkflowTemplate(projectPath);
  }
  if (projectConfig[ProjectOption.GREETINGS_PIPELINE]) {
    mergeGreetingsWorkflowTemplate(projectPath);
  }
}

function initIssueTemplates(projectPath: ProjectPath) {
  createDir(projectPath.issueTemplate);

  featureRequestTemplate(projectPath);
  bugReportTemplate(projectPath);
  securityIssueTemplate(projectPath);
}

function initGithub(projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createDir(projectPath.github);

  if (projectConfig[ProjectOption.DEPENDABOT]) {
    dependabotTemplate(projectPath);
  }
  if (projectConfig[ProjectOption.MERGIFY]) {
    mergifyTemplate(projectPath, projectConfig);
  }

  if (projectConfig[ProjectOption.GITHUB_ISSUE_TEMPLATES]) {
    initIssueTemplates(projectPath);
  }

  const workflowKeys = [
    ProjectOption.LINT_PIPELINE,
    ProjectOption.UNIT_TESTS_PIPELINE,
    ProjectOption.INTEGRATION_TESTS_PIPELINE,
    ProjectOption.DOCKER_PIPELINE,
    ProjectOption.TOC_PIPELINE,
    ProjectOption.GREETINGS_PIPELINE,
  ];

  if (workflowKeys.some((workflowKey) => projectConfig[workflowKey])) {
    initWorkflows(projectPath, projectConfig);
  }
}

export default initGithub;
