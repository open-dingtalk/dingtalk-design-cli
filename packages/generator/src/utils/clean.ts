import { execSync, } from 'child_process';
import * as fs from 'fs';

export default async (filePath: string) => {
  if (!filePath) return;

  if (!fs.existsSync(filePath)) {
    console.warn(`ENOENT ${filePath} is not exist`);
    return;
  }

  const statInfo = fs.statSync(filePath);
  const isDirectory = statInfo.isDirectory();
  if (isDirectory) {
    console.warn(`Clean a directory: ${filePath}`);
  }

  try {
    execSync(`ls ${filePath}`);
  } catch (e) {
    console.warn(`ll exec failed. filePath: ${filePath}`);
  }

  try {
    execSync(`rm -r ${filePath}`);
    console.log(`Clean success. filePath: ${filePath}`);
  } catch (e) {
    console.warn(`Clean failed. filePath: ${filePath}. ${e}`);
  }
};