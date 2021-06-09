import * as path from 'path';
import getJson from './getJson';
import { IMiniProjectJson, } from '../common/types';
import { isEmpty, } from 'lodash';

export default (cwd: string): {
  content: IMiniProjectJson,
  path: string
} => {
  const miniProjectJsonPath = path.join(cwd, 'mini.project.json');
  const content = getJson(miniProjectJsonPath, true);
  if (!isEmpty(content)) {
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