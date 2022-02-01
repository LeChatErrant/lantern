import clui from 'clui';
import download from 'download';

import { blue, underline } from './colors';
import logger from './logger';
import { DownloadError } from './errors';

export async function downloadWithSpinner(url: string) {
  const fileName = url.split('/').pop()!;
  const spinner = new clui.Spinner(`Downloading ${blue(fileName)} from ${underline(url)}...`);

  spinner.start();
  try {
    const content = await download(url);
    spinner.stop();
    logger.log(`Downloaded ${blue(fileName)} from ${underline(url)}`);
    return content.toString();
  } catch (err) {
    spinner.stop();
    throw new DownloadError(`${underline(blue(url))} - ${err.message}`);
  }
}
