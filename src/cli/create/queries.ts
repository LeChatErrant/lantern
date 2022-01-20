import inquirer from 'inquirer';
import colors from 'colors';
import pluralize from 'pluralize';
import { capitalize } from '../../utils/strings';

/**
 * Prompt the user for the name of the resource to be created
 *
 * @return Resource name (lowercase)
 */
export async function queryResourceName() {
  const { resourceName } = await inquirer.prompt([{
    name: 'resourceName',
    type: 'input',
    message: `How should your new API resource be named ? ${colors.red('(singular)')}`,
    validate: (input) => input !== '',
  }]);
  return resourceName.toLowerCase();
}

/**
 * Prompt the user for the plural form of the resource to be created
 * Try first to guess it using grammatical rules
 * If incorrect, let the user write it
 *
 * @param resourceName The singular form of the resource name
 * @return The plural form of the resource name
 */
export async function queryPluralizedResourceName(resourceName: string) {
  const guess = pluralize(resourceName);
  const { isPluralCorrect } = await inquirer.prompt([{
    name: 'isPluralCorrect',
    type: 'list',
    message: `Is '${colors.blue(guess)}' the correct plural form ?`,
    choices: ['Yes', 'No'],
  }]);

  if (isPluralCorrect === 'Yes') {
    return guess.toLowerCase();
  }

  const { pluralizedResourceName } = await inquirer.prompt([{
    name: 'pluralizedResourceName',
    type: 'input',
    message: 'Write it in the plural form :',
    validate: (input) => input !== '',
  }]);
  return pluralizedResourceName.toLowerCase();
}

/**
 * Prompt the user to know if the model should be stored in database or not
 *
 * @param plural Ressource name pluralized
 * @return True is a data model is needed, false otherwise
 */
export async function queryIfDatabaseModelIsNeeded(plural: string) {
  const { isDbModelNeeded } = await inquirer.prompt([{
    name: 'isDbModelNeeded',
    type: 'list',
    message: `Do you need to store '${capitalize(plural)}' in database ?`,
    choices: ['Yes', 'No'],
  }]);
  return isDbModelNeeded === 'Yes';
}