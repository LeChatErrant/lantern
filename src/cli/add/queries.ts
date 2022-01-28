import inquirer from 'inquirer';
import colors from 'colors';
import pluralize from 'pluralize';

import { capitalize } from '../../utils/strings';
import {
  PrismaEnum,
  PrismaModel,
  PrismaModelAttribute,
  PrismaModelField,
  PrismaSchema,
} from '../../utils/prisma';
import { addManyToManyRelation, addOneToManyRelation, addOneToOneRelation } from '../../utils/prisma/relationHandling';
import { displayModel } from '../../utils/display';
import { customPrompt, cancelPrompt, inputPromptSuffix } from '../../utils/display';

/**
 * Prompt the user for the name of the resource to be created
 *
 * @return Resource name (lowercase)
 */
export async function queryResourceName(schema: PrismaSchema) {
  const { resourceName } = await inquirer.prompt([{
    name: 'resourceName',
    type: 'input',
    message: `How should your new API resource be ${colors.green('named')} ? ${colors.red('(singular)')}`,
    validate: (input) => {
      if (input === '') {
        return colors.red('Please enter resource name (example : user)');
      }
      if (schema.objects.find((o) => o.name === input || o.name === capitalize(input))) {
        return colors.red(`Model ${input} already exists in schema.prisma`);
      }
      return true;
    },
    suffix: inputPromptSuffix,
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
    message: `Is '${colors.blue(guess)}' the correct ${colors.green('plural form')} ?`,
    choices: ['Yes', 'No'],
  }]);

  if (isPluralCorrect === 'Yes') {
    return guess.toLowerCase();
  }

  const { pluralizedResourceName } = await inquirer.prompt([{
    name: 'pluralizedResourceName',
    type: 'input',
    message: `Write it in the ${colors.green('plural form')} :`,
    validate: (input) => input !== '' ? true : colors.red('Please enter pluralized form (example : users)'),
    suffix: inputPromptSuffix,
  }]);
  return pluralizedResourceName.toLowerCase();
}

/**
 * Prompt the user to know if the model should be stored in database or not
 *
 * @param resourceName Resource name
 * @return True is a data model is needed, false otherwise
 */
export async function queryIfDatabaseModelIsNeeded(resourceName: string) {
  const { isDbModelNeeded } = await inquirer.prompt([{
    name: 'isDbModelNeeded',
    type: 'list',
    message: `Do you need to store ${colors.blue(capitalize(resourceName))} in ${colors.green('database')} ?`,
    choices: ['Yes', 'No'],
  }]);
  return isDbModelNeeded === 'Yes';
}

export async function queryDefaultFields(model: PrismaModel) {
  displayModel(model);

  const defaultFieldsChoices = [
    new PrismaModelField('createdAt', 'DateTime', [
      new PrismaModelAttribute('@default', 'now()'),
    ]),
    new PrismaModelField('updatedAt', 'DateTime', [
      new PrismaModelAttribute('@updatedAt'),
    ]),
  ];

  const { selected } = await inquirer.prompt([{
    name: 'selected',
    type: 'checkbox',
    message: `Select ${colors.green('default fields')} to add to ${colors.blue(model.name)}`,
    default: [true, true],
    choices: defaultFieldsChoices.map((field, index) => ({
      name: field.name,
      value: index,
      checked: true,
    })),
  }]);

  for (const index of selected) {
    model.fields.push(defaultFieldsChoices[index]);
  }
}

export async function queryFields(schema: PrismaSchema, model: PrismaModel, firstCall = true) {
  displayModel(model);

  const { addField } = await inquirer.prompt([{
    name: 'addField',
    type: 'list',
    message: `Add ${!firstCall ? 'another ' : ''}${colors.green('new field')} to ${colors.blue(model.name)} ?`,
    choices: ['Yes', 'No'],
  }]);

  if (addField === 'No') {
    return;
  }

  const { name } = await inquirer.prompt([{
    name: 'name',
    type: 'input',
    message: 'Field name : ',
    validate: (input) => input !== '' ? true : colors.red('Please enter a name for the field'),
    suffix: inputPromptSuffix,
  }]);

  const types = [
    'String', 'Boolean', 'Int', 'BigInt', 'Float', 'Decimal', 'DateTime', 'Json', 'Bytes',
    ...schema.enums.map((e) => ({
      name: colors.green(`${e.name} (enum)`),
      value: e,
    })),
  ];

  let { type } = await inquirer.prompt([{
    name: 'type',
    type: 'list',
    message: 'Type : ',
    choices: [
      ...types,
      customPrompt,
      colors.blue('Create new Enum'),
      cancelPrompt],
    loop: false,
  }]);

  if (type === cancelPrompt) {
    await queryFields(schema, model, false);
    return;
  }

  if (type === customPrompt) {
    const { typeName } = await inquirer.prompt([{
      name: 'typeName',
      type: 'input',
      message: 'Enter the custom type : ',
      validate: (input) => input !== '' ? true : colors.red(`Please enter a custom type for the field ${name}`),
      suffix: inputPromptSuffix,
    }]);
    type = typeName;
  }

  if (type === colors.blue('Create new Enum')) {
    // Create new Enum
  }

  const typeName = type instanceof PrismaEnum ? type.name : type;

  const { modifier } = await inquirer.prompt([{
    name: 'modifier',
    type: 'list',
    message: 'Select modifier',
    choices: [
      {
        name: `Normal : ${colors.red(typeName)}`,
        value: '',
      },
      {
        name: `Optional : ${colors.red(typeName)}?`,
        value: '?',
      },
      {
        name: `List : ${colors.red(typeName)}[]`,
        value: '[]',
      },
    ],
  }]);

  const field = new PrismaModelField(name, typeName + modifier);

  if (modifier !== '[]' && (type instanceof PrismaEnum || type === 'Boolean' || type === 'Int' || type === 'String' || type === 'DateTime')) {
    const { needsDefault } = await inquirer.prompt([{
      name: 'needsDefault',
      type: 'list',
      message: `Do you want to set a default value to ${colors.blue(field.name)} ?`,
      choices: ['Yes', 'No'],
    }]);

    if (needsDefault === 'Yes') {
      let choices: string[] = [];
      if (type instanceof PrismaEnum) {
        choices = type.values;
      } else if (type === 'Boolean') {
        choices = ['true', 'false'];
      } else if (type === 'Int') {
        choices = ['autoincrement()', customPrompt];
      } else if (type === 'String') {
        choices = ['cuid()', 'uuid()', customPrompt];
      } else if (type === 'DateTime') {
        choices = ['now()'];
      }
      let { defaultVal } = await inquirer.prompt([{
        name: 'defaultVal',
        type: 'list',
        message: `Which default value do you want for field ${colors.blue(field.name)}?`,
        choices: [...choices, cancelPrompt],
      }]);
      
      if (defaultVal !== cancelPrompt) {
        if (defaultVal === customPrompt) {
          const { defaultInput } = await inquirer.prompt([{
            name: 'defaultInput',
            type: 'input',
            message: `Enter the default value for ${colors.blue(field.name)} :`,
            validate: (input) => {
              if (input === '') {
                return colors.red(`Enter a default value for field ${field.name}`);
              }
              if (type === 'Int') {
                const num = Number(input);
                if (Number.isNaN(num) || !Number.isInteger(num)) {
                  return colors.red(`${num} is not a valid integer`);
                }
              }
              return true;
            },
            suffix: inputPromptSuffix,
          }]);
          if (type === 'String') {
            defaultVal = `"${defaultInput}"`;
          } else {
            defaultVal = defaultInput;
          }
        }
        field.attributes.push(new PrismaModelAttribute('@default', defaultVal));
      }
    }

  }

  model.fields.push(field);

  await queryFields(schema, model, false);
}

export async function queryRelation(schema: PrismaSchema, model: PrismaModel, firstCall = true) {
  // Remove schema models that are already references in new model
  const availableModels = schema.models.filter(
    (schemaModel) => !model.fields.find((field) => field.type === schemaModel.name),
  );
  if (availableModels.length === 0) {
    return;
  }
  
  displayModel(model);

  const { addRelation } = await inquirer.prompt([{
    name: 'addRelation',
    type: 'list',
    message: `Add ${!firstCall ? 'another ' : ''}${colors.green('relation')} to ${colors.blue(model.name)} ?`,
    choices: ['Yes', 'No'],
  }]);

  if (addRelation === 'No') {
    return;
  }

  const { target } = await inquirer.prompt([{
    name: 'target',
    type: 'list',
    message: 'With ?',
    choices: [...availableModels.map((m) => m.name), cancelPrompt],
  }]);

  if (target === cancelPrompt) {
    await queryRelation(schema, model, false);
    return;
  }

  const relationChoices = [
    `One to one   : ${colors.blue(target)} has one ${colors.blue(model.name)}`,
    `One to many  : ${colors.blue(target)} has many ${colors.blue(model.name)}`,
    `Many to many : ${colors.blue(target)} has many ${colors.blue(model.name)}, and ${colors.blue(model.name)} has many ${colors.blue(target)}`,
  ];

  const targetModel = schema.getModel(target);
  const relationActions = [
    addOneToOneRelation,
    addOneToManyRelation,
    addManyToManyRelation,
  ];

  const { relationType } = await inquirer.prompt([{
    name: 'relationType',
    type: 'list',
    message: 'Of which type ?',
    choices: relationChoices.map((relationChoice, index) => ({
      name: relationChoice,
      value: index,
    })),
  }]);

  relationActions[relationType](model, targetModel);

  await queryRelation(schema, model, false);
}