#!/usr/bin/env node

import cli from './cli';
import { LanternError } from './utils/errors';
import logger from './utils/logger';
import { revertAllFileModifications } from './utils/files';

async function main() {
  try {
    await cli.parseAsync();
    logger.success('Success !');
  } catch (err) {
    if (err instanceof LanternError) {
      logger.error(err.message);
      logger.error('Aborting...');
      logger.setSilent();
      revertAllFileModifications();
      logger.error('Contact support on https://github.com/LeChatErrant/lantern/issues or directly on Discord @LeChatErrant#6074');
    } else {
      throw err;
    }
  }
}

main();
