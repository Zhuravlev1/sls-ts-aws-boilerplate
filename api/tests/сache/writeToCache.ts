import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';
const mkDir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

export const tempFolder = path.join(__dirname, '..', '.tmp');

export async function writeToCache(fileName: string, data: any) {
  const fullPath = path.join(tempFolder, fileName);

  if (!fs.existsSync(tempFolder)) {
    await mkDir(tempFolder);
  }
  const jsonData = JSON.stringify(data);

  await writeFile(fullPath, jsonData);
}
