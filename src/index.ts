#!/usr/bin/env node

import cli from './cli';
import { displayCLIBanner } from './utils/display';
import { LanternError } from './utils/errors';
import logger from './utils/logger';

displayCLIBanner();

async function main() {
  try {
    await cli.parseAsync();
  } catch (err) {
    if (err instanceof LanternError) {
      logger.error(err.message);
      logger.error('Aborting...');
    } else {
      throw err;
    }
  }
}

main();
