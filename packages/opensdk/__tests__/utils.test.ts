
import os from 'os';
import path from 'path';

import { friendlyPackageSize, parsePath, } from '../src/utils';


it('friendlyPackageSize', () => {
  expect(friendlyPackageSize(5 * 1024 * 1024 )).toBe('5.0MB');
  expect(friendlyPackageSize(0.55 * 1024 * 1024 )).toBe('0.55MB');
});

it('parsePath', () => {
  expect(parsePath('~/home')).toBe(path.join(os.homedir(), 'home'));
});