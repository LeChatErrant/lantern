#!/usr/bin/env node

import cli from './cli';
import logger from './utils/logger';
import { revertAllFileModifications } from './utils/files';
import { LanternError } from './utils/errors';

async function main() {
  try {
    await cli.parseAsync();
  } catch (err) {
    logger.error(err.message);
    if (!(err instanceof LanternError)) {
      console.error(err);
    }
    logger.error('Aborting...');
    logger.setSilent();
    revertAllFileModifications();
    logger.error('Contact support on https://github.com/LeChatErrant/lantern/issues or directly on Discord @LeChatErrant#6074');
  }
}

main();
