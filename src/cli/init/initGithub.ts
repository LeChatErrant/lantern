import { createDir } from '../../utils/files';

import { ProjectConfig, ProjectOption } from './ProjectConfig';
import featureRequestTemplate from './templates/issue-templates/feature_request.template';
import securityIssueTemplate from './templates/issue-templates/security_issue.template';
import bugReportTemplate from './templates/issue-templates/bug_report.template';
import ProjectPath from '../../utils/ProjectPath';

function initGithub(projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createDir(projectPath.github);

  if (projectConfig[ProjectOption.GITHUB_ISSUE_TEMPLATES]) {
    createDir(projectPath.issueTemplate);

    featureRequestTemplate(projectPath);
    bugReportTemplate(projectPath);
    securityIssueTemplate(projectPath);
  }
}

export default initGithub;
