import { createFile } from '../../../../utils/files';
import ProjectPath from '../../../../utils/ProjectPath';

const content = `
---
name: Bug report
about: Create a report to help us improve
title: ''
labels: 
  - bug
assignees: ''

---

# Bug report

## Actual behaviour

## Expected behaviour

## Steps to reproduce

## Additional informations

## Suggestions

`.substring(1);

export default function bugReportTemplate(projectPath: ProjectPath) {
  createFile(projectPath.bugReport, content);
}
