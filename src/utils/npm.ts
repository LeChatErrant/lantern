import npm from 'npm';

export async function npmRun(script: string, args: string[] = []) {
  await new Promise<void>((resolve, reject) => {
    npm.load((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  return new Promise<void>((resolve, reject) => {
    npm.commands['run-script']([script, ...args], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
