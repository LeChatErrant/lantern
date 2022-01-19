import { createDir, editFile, removeFile } from '../../utils/files';

async function edit() {
  createDir('./test/zob');
  editFile('./test/megusta', 'nani');
  createDir('./test/zebi');
  removeFile('./test/misking');
  createDir('./test/dab');
}

export default edit;
