#!/usr/bin/env node

import clui from 'clui';
import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';

import type { Options } from './new_resource/types';
import { queryOptions, queryPluralizedResourceName, queryResourceName } from './new_resource/cli';
import { templateNewResource } from './new_resource/templater';

async function main() {
  const options: Options = {
    database_model: {
      desc: 'Create a default database model',
      default: true,
    },
    tests: {
      desc: 'Create test files and extend requester',
      default: true,
    },
  };

  clear();
  console.log(
    chalk.green(
      figlet.textSync('Templated   project - CLI', { horizontalLayout: 'full' }),
    ),
  );

  const resourceName = await queryResourceName();
  const resourceNamePluralized = await queryPluralizedResourceName(resourceName);
  // await queryOptions(options);

  const spinner = new clui.Spinner('Generating new API resource...');
  spinner.start();
  const success = await templateNewResource(resourceName, resourceNamePluralized);
  spinner.stop();

  if (!success) {
    console.error('Aborting...');
    process.exit(1);
  }
}

main();
