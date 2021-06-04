import * as fs from 'fs';

/**
 * Load a json object
 * @param filePath
 */
export default function loadJSON<T = Record<string, any>>(
  filePath: string,
  loose = true,
  fallbackValue = {},
): T {
  const isExist = fs.existsSync(filePath);
  if (isExist) {
    try {
      const content = fs.readFileSync(filePath, { encoding: 'utf-8', });
      return JSON.parse(content) as T;
    } catch (e) {
      if (loose) {
        console.error(e);
        return fallbackValue as T;
      }
      throw new Error(`Failed to load: ${filePath}`);
    }
  } else {
    if (loose) {
      return fallbackValue as T;
    }
    throw new Error(`Non-existed path: ${filePath}`);
  }
}