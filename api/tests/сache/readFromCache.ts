import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';
import {tempFolder} from './writeToCache';
const readFile = promisify(fs.readFile);

export async function readFromCache<T>(fileName: string): Promise<T> {
  const fullPath = path.join(tempFolder, fileName);
  const result = await readFile(fullPath, 'utf8');

  return JSON.parse(result);
}
