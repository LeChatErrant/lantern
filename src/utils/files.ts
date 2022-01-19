import fs from 'fs';
import colors from 'colors';
import path from 'path';

import { LanternError } from './errors';
import logger from './logger';

export function createDirectory(dirPath: string) {
  const basePath = path.dirname(dirPath);
  if (!fs.existsSync(basePath)) {
    throw new LanternError(`Cannot create directory ${dirPath} : parent directory ${basePath} doesn't exist`);
  }

  if (fs.existsSync(dirPath)) {
    throw new LanternError(`Cannot create directory ${dirPath} : already exists`);
  }

  logger.log(`Creating ${colors.green(dirPath)} folder`);
  fs.mkdirSync(dirPath);
}
