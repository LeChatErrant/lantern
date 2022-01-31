import inquirer from 'inquirer';

import { arrayToDisplayableEnum, enumToDisplayable, inputPromptSuffix } from '../../utils/display';
import { dirExists, fileExists } from '../../utils/files';
import { blue, green, red, bold } from '../../utils/colors';

import {
  ProjectConfig,
  ProjectOption,
  ProjectOptionCategories,
  ProjectOptionDefault,
  ProjectOptionDependencies,
  ProjectOptionDescriptions,
} from './ProjectConfig';

export async function queryProjectName() {
  const { projectName } = await inquirer.prompt([{
    name: 'projectName',
    type: 'input',
    message: `How your project should be ${blue('named')} ?`,
    validate: (input: string) => {
      if (input === '') {
        return red('Please enter a project name');
      }
      if (fileExists(input)) {
        return red(`A file named ${bold(input)} already exists`);
      }
      if (dirExists(input)) {
        return red(`A directory named ${bold(input)} already exists`);
      }
      return true;
    },
    suffix: inputPromptSuffix,
  }]);
  return projectName;
}

export async function queryProjectOptions(projectName: string): Promise<ProjectConfig> {
  const answers: ProjectOption[] = (await inquirer.prompt([{
    name: 'options',
    type: 'checkbox',
    message: `What ${green('options')} do you want to add to ${blue(projectName)} ?`,
    validate(input: ProjectOption[]) {
      for (const projectOption of input) {
        const dependencies = ProjectOptionDependencies[projectOption];
        if (dependencies && !dependencies.every((dependency) => input.includes(dependency))) {
          return red(
            'You need to enable '
            + bold(arrayToDisplayableEnum(dependencies))
            + ` to use ${bold(projectOption)}`,
          );
        }
      }
      return true;
    },
    choices: Object
      .entries(ProjectOptionCategories)
      .map(([category, projectOptions]) => [
        new inquirer.Separator(' - ' + category),
        ...projectOptions.map((projectOption) => ({
          name: ProjectOptionDescriptions[projectOption],
          value: projectOption,
          checked: ProjectOptionDefault[projectOption],
        })),
      ])
      .flat(),
    loop: false,
    pageSize: ProjectOptionCategories[Object.keys(ProjectOptionCategories)[0]].length + 1 + 1 + 1, // First separator, whole first category, second separator, first item of next category
  }])).options;

  const projectConfig = Object
    .values(ProjectOption)
    .reduce((acc, val: ProjectOption) => ({
      ...acc,
      [val]: answers.includes(val) ? true : false,
    }), {} as ProjectConfig);

  return projectConfig;
}
