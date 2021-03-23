#!/usr/bin/env node

import clui from 'clui';
import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';
import { Command } from 'commander';

import { version } from '../package.json';

import generate from './generate';

async function main() {
  const cli = new Command();
  cli.version(version, '-v, --version');

  cli
    .command('generate')
    .description('Generate a new resource API')
    .action(generate);

  cli.parse();
}

main();
