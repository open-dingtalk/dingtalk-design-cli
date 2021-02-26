import { execSync, } from 'child_process';
import * as semver from 'semver';

export function hasYarn (): boolean {
  try {
    execSync('yarn --version', { stdio: 'ignore', });
    return true;
  } catch (e) {
    return false;
  }
}

export function hasNpm (): boolean {
  try {
    execSync('npm --version', { stdio: 'ignore', });
    return true;
  } catch (e) {
    return false;
  }
}

export function hasPnpm (): boolean {
  try {
    execSync('npm --version', { stdio: 'ignore', });
    return true;
  } catch (e) {
    return false;
  }
}

export function getPnpmVersion (): string {
  let pnpmversion;
  try {
    pnpmversion = execSync('pnpm --version', {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
    // there's a critical bug in pnpm 2
    // https://github.com/pnpm/pnpm/issues/1678#issuecomment-469981972
    // so we only support pnpm >= 3.0.0
  } finally {
    pnpmversion = pnpmversion || '0.0.0';
  }
  return pnpmversion;
}

export function hasPnpmVersionOrLater (version: string): boolean  {
  return semver.gte(getPnpmVersion(), version);
}
  
export  function hasPnpm3OrLater (): boolean  {
  return hasPnpmVersionOrLater('3.0.0');
}



