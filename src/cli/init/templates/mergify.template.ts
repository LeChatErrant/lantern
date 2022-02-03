import { createFile } from '../../../utils/files';
import ProjectPath from '../../../utils/ProjectPath';
import { removeEmptyLines } from '../../../utils/strings';
import { ProjectConfig, ProjectOption } from '../ProjectConfig';

const lintRule = `
      - status-success=lint
`;

const integrationRule = `
      - status-success=integration-tests
`;

const unitRule = `
      - status-success=unit-tests
`;

const content = (projectConfig: ProjectConfig) => `
pull_request_rules:
  - name: Automated dependabot merge
    conditions:
      - author~=^dependabot(|-preview)\\[bot\\]$
${projectConfig[ProjectOption.LINT_PIPELINE] ? lintRule : ''}
${projectConfig[ProjectOption.UNIT_TESTS_PIPELINE] ? unitRule : ''}
${projectConfig[ProjectOption.INTEGRATION_TESTS_PIPELINE] ? integrationRule : ''}
    actions:
      merge:
        method: merge
`.substring(1);

export default function mergifyTemplate(projectPath: ProjectPath, projectConfig: ProjectConfig) {
  createFile(projectPath.mergify, removeEmptyLines(content(projectConfig)));
}
