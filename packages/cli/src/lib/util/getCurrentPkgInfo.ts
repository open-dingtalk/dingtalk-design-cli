let pkgInfo: {
  version: string;
  name: string;
  engines: {
    node: string;
  }
};

export default (): typeof pkgInfo => {
  if (pkgInfo) return pkgInfo;

  const pkgJson = require('../../../package.json');
  const pkgVersion = pkgJson.version;
  const pkgName = pkgJson.name;
  const engines = pkgJson.engines;

  const info = {
    version: pkgVersion,
    name: pkgName,
    engines,
  };
  pkgInfo = info;
  return pkgInfo;
};