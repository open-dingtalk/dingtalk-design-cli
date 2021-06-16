import path from 'path';
import { ECompileType, } from '../../src/types';

import { findProjectConfig, } from '../../src/config/projectConfig';

test('findProjectConfig', () => {
  const entry = path.join(__dirname, '../examples/plugin');
  const projectConfig = findProjectConfig(entry);

  expect(projectConfig.miniprogramRoot).toBe('miniprogram');
  expect(projectConfig.pluginRoot).toBe('plugin');
  expect(projectConfig.compileType).toBe(ECompileType.Plugin);
});