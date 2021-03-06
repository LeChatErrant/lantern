import { createFile } from '../../../../utils/files';
import ProjectPath from '../../../../utils/ProjectPath';

const content = `
name: Build docker image

on:
  push:
    branches:
      - master
    tags:
      - '*'
    paths:
      - Dockerfile
      - package.json
      - package-lock.json
      - prisma/**
      - src/**
      - tsconfig.json
      - .github/workflows/build_docker_image.yml

jobs:
  build-docker-image:
    runs-on: ubuntu-latest

    steps:
    - name: Format branch name
      run: echo "BRANCH=\${GITHUB_REF##*/}" >> $GITHUB_ENV

- name: Format repository name
run: echo "REPOSITORY=\${GITHUB_REPOSITORY,,}" >> $GITHUB_ENV

- name: Compute metadata for Docker image
id: meta
uses: docker/metadata-action@v3
with:
images: ghcr.io/\${{ github.repository }}
        tags: |
          type=semver,pattern={{version}}
          type=sha,format=long,prefix={{branch}}-,enable=\${{ github.ref_type == 'branch' }}

    - name: Debug
      run: |
        echo "TAGS :" "\${{ steps.meta.outputs.tags }}"
        echo "LABELS :" "\${{ steps.meta.outputs.labels }}"
        echo "Repository (using github expression)" "\${{ github.repository }}"
        echo "Repository (using predefined env variable)" $GITHUB_REPOSITORY
        echo "Repository (formatted)" $REPOSITORY
        echo "Branch (formatted)" $BRANCH

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v1

    - name: Login to DockerHub
      uses: docker/login-action@v1
      with:
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}
        registry: ghcr.io

    - name: Build and push the Docker image
      uses: docker/build-push-action@v2
      with:
        push: true
        tags: \${{ steps.meta.outputs.tags }}
        labels: \${{ steps.meta.outputs.labels }}
`.substring(1);

export default function dockerWorkflowTemplate(projectPath: ProjectPath) {
  createFile(projectPath.dockerWorkflow, content);
}
