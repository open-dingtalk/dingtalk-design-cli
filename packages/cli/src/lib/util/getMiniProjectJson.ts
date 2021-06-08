import * as path from 'path';
import * as fs from 'fs';
import { logger, } from '../cli-shared-utils/lib/logger';
import getJson from './getJson';

export default () => {
  const cwd = path.resolve('./');
  const miniProjectJsonPath = path.join(cwd, 'mini.project.json');
  const content = getJson(miniProjectJsonPath, true, null);

  if (content) {
    return {
      content,
      path: miniProjectJsonPath,
    };
  }
  return {
    content: {},
    path: '',
  };
};