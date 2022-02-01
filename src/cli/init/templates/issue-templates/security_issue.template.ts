import { createFile } from '../../../../utils/files';
import ProjectPath from '../../../../utils/ProjectPath';

const content = `
---
name: Security issue
about: Signal a security breach
title: ''
labels: security 
assignees: ''

---

# About the security issue

# Suggestions

`.substring(1);

export default function securityIssueTemplate(projectPath: ProjectPath) {
  createFile(projectPath.securityIssue, content);
}
