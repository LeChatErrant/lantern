import { createDir } from '../../utils/files';
import ProjectPath from '../../utils/ProjectPath';

import { ProjectConfig, ProjectOption } from './ProjectConfig';
import featureRequestTemplate from './templates/issue-templates/feature_request.template';
import securityIssueTemplate from './templates/issue-templates/security_issue.template';
import bugReportTemplate from './templates/issue-templates/bug_report.template';
import lintWorkflowTemplate from './templates/workflows/lintWorkflow.template';
import dockerWorkflowTemplate from './templates/workflows/dockerWorkflow.template';
import integrationWorkflowTemplate from './templates/workflows/integrationWorkflow.template';

function initGithub(projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createDir(projectPath.github);

  if (projectConfig[ProjectOption.GITHUB_ISSUE_TEMPLATES]) {
    createDir(projectPath.issueTemplate);

    featureRequestTemplate(projectPath);
    bugReportTemplate(projectPath);
    securityIssueTemplate(projectPath);
  }

  const workflowKeys = [
    ProjectOption.LINT_PIPELINE,
    ProjectOption.INTEGRATION_PIPELINE,
    ProjectOption.DOCKER_PIPELINE,
    ProjectOption.TOC_PIPELINE,
    ProjectOption.GREETINGS_PIPELINE,
  ];

  if (workflowKeys.some((workflowKey) => projectConfig[workflowKey])) {
    createDir(projectPath.workflows);

    if (projectConfig[ProjectOption.LINT_PIPELINE]) {
      lintWorkflowTemplate(projectPath);
    }
    if (projectConfig[ProjectOption.DOCKER_PIPELINE]) {
      dockerWorkflowTemplate(projectPath);
    }
    if (projectConfig[ProjectOption.INTEGRATION_PIPELINE]) {
      integrationWorkflowTemplate(projectPath);
    }
  }
}

export default initGithub;
