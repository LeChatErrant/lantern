import { createFile } from '../../../../utils/files';
import ProjectPath from '../../../../utils/ProjectPath';

const content = `
name: Integration tests

on:
  push:
    branches-ignore:
     - gh-pages
    paths:
      - package.json
      - package-lock.json
      - prisma/**
      - src/**
      - tsconfig.json
      - jest.config.js
      - .github/workflows/integration-tests.yml

jobs:
  integration-tests:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14.x'

    - name: Install dependencies
      run: npm install

    - name: Launch database
      run: source .envrc; npm run dev:db

    - name: Launch redis
      run: source .envrc; npm run dev:redis

    - name: Run integration tests
      run: source .envrc; npm run integration
`.substring(1);

export default function integrationTestsWorkflowTemplate(projectPath: ProjectPath) {
  createFile(projectPath.integrationWorkflow, content);
}
