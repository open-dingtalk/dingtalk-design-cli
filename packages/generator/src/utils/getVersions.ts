import Store from './store';
import * as semver from 'semver';
import getRemoteVersion from './getRemoteVersion';
import { reset, } from 'chalk';

const localStore = new Store();

type VersionOutput = {
  current: string;
  latest: string;
  error: string | null;
}

async function getVersions (): Promise<VersionOutput> {
  const localConfig = localStore.getAll();
  const pkg = require('../../package.json');
  const pkgVersion = pkg.version;
  const pkgName = pkg.name;
  const daysPassed = (Date.now() - localConfig.lastUpdateCheck || 0) / (60 * 60 * 1000 * 24);
  const res: VersionOutput = {
    current: pkgVersion,
    latest: localConfig.latestVersion || pkgVersion,
    error: null,
  };

  try {
    // won't repeatly check in a day
    if (daysPassed > 1) {
      res.latest = semver.gt(localConfig.latestVersion, pkgVersion) ? localConfig.latestVersion : pkgVersion;
    } else {
      const latestVersion = await getRemoteVersion(pkgName) as string;
      localStore.setAll({
        lastUpdateCheck: Date.now(),
        latestVersion,
      });
      res.latest = latestVersion;
    }
  } catch(e) {
    res.error = e.message;
  }
  return res;
}

export default getVersions;