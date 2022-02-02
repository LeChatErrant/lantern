import { createFile } from '../../../../utils/files';
import ProjectPath from '../../../../utils/ProjectPath';

const content = `
name: Merge greeting

on:
  pull_request:
    types: [closed]

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:
      - name: Comment PR
        uses: thollander/actions-comment-pull-request@v1
        with:
          message: '![Congratulations](https://github.com/LeChatErrant/API-template/blob/master/.github/assets/congratulation.gif?raw=true)'
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`.substring(1);

export default function mergeGreetingsWorkflowTemplate(projectPath: ProjectPath) {
  createFile(projectPath.mergeGreetingsWorkflow, content);
}
