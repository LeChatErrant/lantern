import fs from 'fs';
import path from 'path';

import { blue } from './colors';
import { FileError } from './errors';
import logger from './logger';

enum FileType {
  'DIR',
  'FILE',
}

interface FileModification {
  path: string;
  fileType: FileType.FILE;
  modificationType: 'CREATE' | 'EDIT' | 'REMOVE',
  beforeModification?: string;
}

interface DirModification {
  path: string;
  fileType: FileType.DIR;
  modificationType: 'CREATE' | 'REMOVE',
  allowNonEmptyDelete?: boolean;
}

type FSModification = FileModification | DirModification;

/**
 * Ordered array storing every file modifications
 * Used to revert to the previous filesystem state in case of errors
 */
const fsModifications: Array<FSModification> = [];

/**
 * Custom type predicate for `FileModification`
 */
function isFileModification(mod: FSModification): mod is FileModification {
  return mod.fileType === FileType.FILE;
}

/**
 * Custom type predicate for `DirModification`
 */
function isDirModification(mod: FSModification): mod is DirModification {
  return mod.fileType === FileType.DIR;
}

/**
 * Register a file system modification on a directory.
 * If an error happens during the execution of the program, it will be used to revert the file system to its previous state
 *
 * This function is exported so, when a directory is created without using the `files` library, it still can be registered
 * (example : the `node_modules` directory on a `npm install` command)
 *
 * @param mod Directory modification to register
 */
export function registerDirModification(mod: Omit<DirModification, 'fileType'>) {
  fsModifications.push({ ...mod, fileType: FileType.DIR });
}

/**
 * Register a file system modification on a file.
 * If an error happens during the execution of the program, it will be used to revert the file system to its previous state
 *
 * This function is exported so, when a file is created without using the `files` library, it still can be registered
 * (example : the `package-lock.json` directory on a `npm install` command)
 *
 * @param mod File modification to register
 */
export function registerFileModification(mod: Omit<FileModification, 'fileType'>) {
  fsModifications.push({ ...mod, fileType: FileType.FILE });
}

/**
 * Create a new empty directory
 *
 * @param dirPath Path to the directory
 */
export function createDir(dirPath: string) {
  const basePath = path.dirname(dirPath);
  if (!fs.existsSync(basePath)) {
    throw new FileError(`Cannot create directory ${dirPath} : parent path ${basePath} doesn't exist`);
  }

  if (!fs.statSync(basePath).isDirectory()) {
    throw new FileError(`Cannot create directory ${dirPath} : parents path ${basePath} is not a directory`);
  }

  if (fs.existsSync(dirPath)) {
    throw new FileError(`Cannot create directory ${dirPath} : already exists`);
  }

  logger.log(`Creating folder ${blue(dirPath)}`);
  registerDirModification({
    path: dirPath,
    modificationType: 'CREATE',
  });

  fs.mkdirSync(dirPath);
}

/**
 * Check if a directory exists and is a directory
 *
 * @param dirPath Path to the directory
 * @return True if the path exists and is a directory, false otherwise
 */
export function dirExists(dirPath: string) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/**
 * Remove an empty directory
 *
 * @param dirPath Path to the directory
 */
export function removeDir(dirPath: string, allowNonEmptyDelete = false) {
  if (!fs.existsSync(dirPath)) {
    throw new FileError(`Cannot remove directory ${dirPath} : doesn't exist`);
  }

  if (!fs.statSync(dirPath).isDirectory()) {
    throw new FileError(`Cannot remove directory ${dirPath} : is not a directory`);
  }

  if (!allowNonEmptyDelete && fs.readdirSync(dirPath).length !== 0) {
    throw new FileError(`Cannot remove directory ${dirPath} : is not empty`);
  }

  logger.log(`Removing folder ${blue(dirPath)}`);
  registerDirModification({
    path: dirPath,
    modificationType: 'REMOVE',
  });

  if (allowNonEmptyDelete) {
    fs.rmSync(dirPath, { recursive: true });
  } else {
    fs.rmdirSync(dirPath);
  }
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
    throw new FileError(`Cannot create file ${filePath} : parent path ${basePath} doesn't exist`);
  }

  if (!fs.statSync(basePath).isDirectory()) {
    throw new FileError(`Cannot create file ${filePath} : parent path ${basePath} is not a directory`);
  }

  if (fs.existsSync(filePath)) {
    throw new FileError(`Cannot create file ${filePath} : already exists`);
  }

  logger.log(`Creating ${data ? '' : 'empty '}file ${blue(filePath)}`);
  registerFileModification({
    path: filePath,
    modificationType: 'CREATE',
  });

  fs.writeFileSync(filePath, data ?? '');
}

/**
 * Check if file exists and is a file
 *
 * @param filePath Path to the file
 * @return True if the path exists and is a file, false otherwise
 */
export function fileExists(filePath: string) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

/**
 * Read file content
 *
 * @param filePath Path to the file
 * @return Content
 */
export function readFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new FileError(`Cannot read file ${filePath} : doesn't exist`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new FileError(`Cannot read file ${filePath} : is not a file`);
  }

  return fs.readFileSync(filePath).toString();
}

/**
 * Write data into a file. Data can be omitted to erase file content
 *
 * @param filePath Path to the file
 * @param data OPTIONAL Data to write in the file
 */
export function editFile(filePath: string, data?: string) {
  if (!fs.existsSync(filePath)) {
    throw new FileError(`Cannot edit file ${filePath} : doesn't exist`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new FileError(`Cannot edit file ${filePath} : is not a file`);
  }

  const content = fs.readFileSync(filePath).toString();

  logger.log(`${data ? 'Editing' : 'Erasing content in'} file ${blue(filePath)}`);
  registerFileModification({
    path: filePath,
    modificationType: 'EDIT',
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
    throw new FileError(`Cannot append to file ${filePath} : doesn't exist`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new FileError(`Cannot append to file ${filePath} : is not a file`);
  }

  const content = fs.readFileSync(filePath).toString();

  logger.log(`Append data to file ${blue(filePath)}`);
  registerFileModification({
    path: filePath,
    modificationType: 'EDIT',
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
    throw new FileError(`Cannot remove file ${filePath} : doesn't exist`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new FileError(`Cannot remove file ${filePath} : is not a file`);
  }

  const content = fs.readFileSync(filePath).toString();

  logger.log(`Removing file ${blue(filePath)}`);
  registerFileModification({
    path: filePath,
    modificationType: 'REMOVE',
    beforeModification: content,
  });

  fs.unlinkSync(filePath);
}

/**
 * Revert all file system modification made, from the latest to the oldest
 * Used to restore the file system to its previous state, before running CLI
 */
export function revertAllFileModifications() {
  logger.error('Reverting all modifications...');
  fsModifications
    .reverse()
    .forEach((f) => {
      if (isFileModification(f)) {
        switch (f.modificationType) {
          case 'CREATE': removeFile(f.path);
            break;
          case 'EDIT': editFile(f.path, f.beforeModification);
            break;
          case 'REMOVE': createFile(f.path, f.beforeModification);
            break;
        }
      } else {
        switch (f.modificationType) {
          case 'CREATE': removeDir(f.path, f.allowNonEmptyDelete);
            break;
          case 'REMOVE': createDir(f.path);
            break;
        }
      }
    });
}
