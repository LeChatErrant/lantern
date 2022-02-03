import { createFile } from '../../../utils/files';
import ProjectPath from '../../../utils/ProjectPath';

const content = `
version: 2
updates:
- package-ecosystem: npm
  directory: "/"
  schedule:
    interval: daily
  open-pull-requests-limit: 10
  versioning-strategy: increase
`.substring(1);

export default function dependabotTemplate(projectPath: ProjectPath) {
  createFile(projectPath.dependabot, content);
}
