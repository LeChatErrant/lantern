import clui from 'clui';

import { queryPluralizedResourceName, queryResourceName } from './queries';
import { templateNewResource } from './templater';

async function create() {
  const resourceName = await queryResourceName();
  const resourceNamePluralized = await queryPluralizedResourceName(resourceName);

  // const spinner = new clui.Spinner('Generating new API resource...');
  // spinner.start();
  const success = await templateNewResource(resourceName, resourceNamePluralized);
  // spinner.stop();

  if (!success) {
    console.error('Aborting...');
    process.exit(1);
  }
}

export default create;