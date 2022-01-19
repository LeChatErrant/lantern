#!/usr/bin/env node

import cli from './cli';
import { displayCLIBanner } from './utils/display';

displayCLIBanner();
cli.parse();
