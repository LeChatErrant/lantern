import clui from 'clui';
import download from 'download';

export async function downloadWithSpinner(url: string) {
  const spinner = new clui.Spinner(`Downloading ${url}...`);

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
