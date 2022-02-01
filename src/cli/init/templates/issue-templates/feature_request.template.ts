import { createFile } from '../../../../utils/files';
import ProjectPath from '../../../../utils/ProjectPath';

const content = `
---
name: Feature Request
about: This is something we may need.
title: ''
labels: enhancement
assignees: ''

---

# Feature Request

## Actual behaviour

## Expected behaviour

`.substring(1);

export default function featureRequestTemplate(projectPath: ProjectPath) {
  createFile(projectPath.featureRequest, content);
}
