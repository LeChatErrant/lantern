import inquirer from 'inquirer';
import colors from 'colors';

import { enumToDisplayable, inputPromptSuffix } from '../../utils/display';

import {
  ProjectOptionConfig,
  ProjectOptionDescriptions,
  ProjectOption,
  ProjectOptionCategories, ProjectOptionDefault, ProjectOptionDependencies,
} from './ProjectOptionConfig';

export async function queryProjectName() {
  const { projectName } = await inquirer.prompt([{
    name: 'projectName',
    type: 'input',
    message: `How your project should be ${colors.blue('named')} ?`,
    validate: (input) => input === '' ? colors.red('Please enter a project name') : true,
    suffix: inputPromptSuffix,
  }]);
  return projectName;
}

export async function queryProjectOptions(projectName: string): Promise<ProjectOptionConfig> {
  const projectOptionConfig: ProjectOptionConfig = (await inquirer.prompt([{
    name: 'options',
    type: 'checkbox',
    message: `What ${colors.green('options')} do you want to add to ${colors.blue(projectName)} ?`,
    validate(input: ProjectOption[]) {
      for (const projectOption of input) {
        const dependencies = ProjectOptionDependencies[projectOption];
        if (dependencies && !dependencies.every((dependency) => input.includes(dependency))) {
          return colors.red(
            'You need to enable '
            + colors.bold(dependencies.map((dep) => enumToDisplayable(ProjectOption[dep])).join(', '))
            + ` to use ${colors.bold(enumToDisplayable(ProjectOption[projectOption]))}`,
          );
        }
      }
      return true;
    },
    choices: Object
      .entries(ProjectOptionCategories)
      .map(([category, projectOptions]) => [
        new inquirer.Separator(category),
        ...projectOptions.map((projectOption) => ({
          name: ProjectOptionDescriptions[projectOption],
          value: projectOption,
          checked: ProjectOptionDefault[projectOption],
        })),
      ])
      .flat(),
  }])).options;

  return projectOptionConfig;
}