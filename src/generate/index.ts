import clui from 'clui';

import { queryPluralizedResourceName, queryResourceName } from './queries';
import { templateNewResource } from './templater';
import { displayCLIBanner } from '../utils';

async function generate() {
  displayCLIBanner();

  const resourceName = await queryResourceName();
  const resourceNamePluralized = await queryPluralizedResourceName(resourceName);

  const spinner = new clui.Spinner('Generating new API resource...');
  spinner.start();
  const success = await templateNewResource(resourceName, resourceNamePluralized);
  spinner.stop();

  if (!success) {
    console.error('Aborting...');
    process.exit(1);
  }
}

export default generate;
