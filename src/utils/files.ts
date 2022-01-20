import fs from 'fs';
import colors from 'colors';
import path from 'path';

import { LanternError } from './errors';
import logger from './logger';

enum ModificationType {
  'CREATE',
  'EDIT',
  'REMOVE',
}

enum FileType {
  'DIR',
  'FILE',
}

type FileModification = {
  modificationType: ModificationType;
  fileType: FileType;
  path: string;
  beforeModification?: string;
};

/**
 * Ordered array storing every file modifications
 * Used to revert to the previous filesystem state in case of errors
 */
const fileModifications: Array<FileModification> = [];

/**
 * Create a new empty directory
 *
 * @param dirPath Path to the directory
 */
export function createDir(dirPath: string) {
  const basePath = path.dirname(dirPath);
  if (!fs.existsSync(basePath)) {
    throw new LanternError(`Cannot create directory ${dirPath} : parent path ${basePath} doesn't exist`);
  }

  if (!fs.statSync(basePath).isDirectory()) {
    throw new LanternError(`Cannot create directory ${dirPath} : parents path ${basePath} is not a directory`);
  }

  if (fs.existsSync(dirPath)) {
    throw new LanternError(`Cannot create directory ${dirPath} : already exists`);
  }

  logger.log(`Creating folder ${colors.blue(dirPath)}`);
  fileModifications.push({
    fileType: FileType.DIR,
    modificationType: ModificationType.CREATE,
    path: dirPath,
  });

  fs.mkdirSync(dirPath);
}

/**
 * Remove an empty directory
 *
 * @param dirPath Path to the directory
 */
export function removeDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    throw new LanternError(`Cannot remove directory ${dirPath} : doesn't exist`);
  }

  if (!fs.statSync(dirPath).isDirectory()) {
    throw new LanternError(`Cannot remove directory ${dirPath} : is not a directory`);
  }

  if (fs.readdirSync(dirPath).length !== 0) {
    throw new LanternError(`Cannot remove directory ${dirPath} : is not empty`);
  }

  logger.log(`Removing folder ${colors.blue(dirPath)}`);
  fileModifications.push({
    fileType: FileType.DIR,
    modificationType: ModificationType.REMOVE,
    path: dirPath,
  });

  fs.rmdirSync(dirPath);
}

/**
 * Create a new file
 *
 * @param filePath Path to the file
 * @param data OPTIONAL Data to write in the file
 */
export function createFile(filePath: string, data?: string) {
  const basePath = path.dirname(filePath);
  if (!fs.existsSync(basePath)) {
    throw new LanternError(`Cannot create file ${filePath} : parent path ${basePath} doesn't exist`);
  }

  if (!fs.statSync(basePath).isDirectory()) {
    throw new LanternError(`Cannot create file ${filePath} : parent path ${basePath} is not a directory`);
  }

  if (fs.existsSync(filePath)) {
    throw new LanternError(`Cannot create file ${filePath} : already exists`);
  }

  logger.log(`Creating ${data ? '' : 'empty '}file ${colors.blue(filePath)}`);
  fileModifications.push({
    fileType: FileType.FILE,
    modificationType: ModificationType.CREATE,
    path: filePath,
  });

  fs.writeFileSync(filePath, data ?? '');
}

/**
 * Write data into a file. Data can be omitted to erase file content
 *
 * @param filePath Path to the file
 * @param data OPTIONAL Data to write in the file
 */
export function editFile(filePath: string, data?: string) {
  if (!fs.existsSync(filePath)) {
    throw new LanternError(`Cannot edit file ${filePath} : doesn't exist`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new LanternError(`Cannot edit file ${filePath} : is not a file`);
  }

  const content = fs.readFileSync(filePath).toString();

  logger.log(`${data ? 'Editing' : 'Erasing content in'} file ${colors.blue(filePath)}`);
  fileModifications.push({
    fileType: FileType.FILE,
    modificationType: ModificationType.EDIT,
    path: filePath,
    beforeModification: content,
  });

  fs.writeFileSync(filePath, data ?? '');
}

/**
 * Append data at the end of a file
 *
 * @param filePath Path to the file
 * @param data Data to append
 */
export function appendToFile(filePath: string, data: string) {
  if (!fs.existsSync(filePath)) {
    throw new LanternError(`Cannot append to file ${filePath} : doesn't exist`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new LanternError(`Cannot append to file ${filePath} : is not a file`);
  }

  const content = fs.readFileSync(filePath).toString();

  logger.log(`Append data to file ${colors.blue(filePath)}`);
  fileModifications.push({
    fileType: FileType.FILE,
    modificationType: ModificationType.EDIT,
    path: filePath,
    beforeModification: content,
  });

  fs.appendFileSync(filePath, data);
}

/**
 * Remove a file
 *
 * @param filePath Path to the file
 */
export function removeFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new LanternError(`Cannot remove file ${filePath} : doesn't exist`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new LanternError(`Cannot remove file ${filePath} : is not a file`);
  }

  const content = fs.readFileSync(filePath).toString();

  logger.log(`Removing file ${colors.blue(filePath)}`);
  fileModifications.push({
    fileType: FileType.FILE,
    modificationType: ModificationType.REMOVE,
    path: filePath,
    beforeModification: content,
  });

  fs.unlinkSync(filePath);
}

/**
 * Revert all file system modification made, from the latest to the oldest
 * Used to restore the file system to its previous state, before running CLI
 */
export function revertAllFileModifications() {
  fileModifications
    .reverse()
    .forEach((f) => {
      switch (f.modificationType) {
        // Here, eslint is trying to prevent us to add side effects
        // which is what we want, so we can disable it

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        case ModificationType.CREATE: f.fileType === FileType.FILE ? removeFile(f.path) : removeDir(f.path);
          break;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        case ModificationType.EDIT: editFile(f.path, f.beforeModification);
          break;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        case ModificationType.REMOVE: f.fileType === FileType.FILE ? createFile(f.path, f.beforeModification) : createDir(f.path);
          break;
      }
    });
}
