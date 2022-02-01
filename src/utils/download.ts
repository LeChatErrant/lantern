import clui from 'clui';
import download from 'download';
import { blue } from './colors';

export async function downloadWithSpinner(url: string) {
  const spinner = new clui.Spinner(`Downloading ${blue(url)}...`);

  spinner.start();
  try {
    const content = await download(url);
    spinner.stop();
    return content.toString();
  } catch (err) {
    spinner.stop();
    throw err;
  }
}
