/* eslint-disable */
import execa from 'execa';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as ini from 'ini';
import {
  hasYarn,
  hasNpm,
  hasPnpm,
} from './cli-shared-utils';
import {
  error,
  debug
} from './logger';
import {
  ERROR_PM_NOT_FOUND
} from '@common/errors';
import request from './request';
import * as semver from 'semver';

// extract the package scope from the full package name
// the result includes the initial @ character
function extractPackageScope (packageName: string) {
  const scopedNameRegExp = /^(@[^\/]+)\/.*$/;
  const result = scopedNameRegExp.exec(packageName);
  
  if (!result) {
    return undefined;
  }
  
  return result[1];
}

function getBin () {
  let bin = '';
  if(hasYarn()) {
    bin = 'yarn';
  } else if (hasPnpm()) {
    bin = 'pnpm';
  } else if (hasNpm()){
    bin = 'npm';
  }
  
  return bin;
}

async function getRegistry (scope?: string) {
  const bin = getBin();
  if(!bin) {
    error(ERROR_PM_NOT_FOUND);
    throw ERROR_PM_NOT_FOUND;
  }
  let registry;
  try {
    if (scope) {
      registry = (await execa(bin, ['config', 'get', scope + ':registry'])).stdout;
    }
    if (!registry || registry === 'undefined') {
      registry = (await execa(bin, ['config', 'get', 'registry'])).stdout;
    }
  } catch (e) {
    // Yarn 2 uses `npmRegistryServer` instead of `registry`
    registry = (await execa(bin, ['config', 'get', 'npmRegistryServer'])).stdout;
  }
  debug(`getRegistry: ${registry}`)
  return registry;
}

async function getAuthToken (scope?: string) {
  // get npmrc (https://docs.npmjs.com/configuring-npm/npmrc.html#files)
  const possibleRcPaths = [
    path.resolve(process.cwd(), '.npmrc'),
    path.resolve(os.homedir(), '.npmrc')
  ];
  if (process.env.PREFIX) {
    possibleRcPaths.push(path.resolve(process.env.PREFIX, '/etc/npmrc'));
  }
  // there's also a '/path/to/npm/npmrc', skipped for simplicity of implementation

  let npmConfig = {} as {
      [key: string]: string
  };
  for (const loc of possibleRcPaths) {
    if (fs.existsSync(loc)) {
      try {
        // the closer config file (the one with lower index) takes higher precedence
        npmConfig = Object.assign({}, ini.parse(fs.readFileSync(loc, 'utf-8')), npmConfig);
      } catch (e) {
        // in case of file permission issues, etc.
      }
    }
  }

  const registry = await getRegistry(scope);
  const registryWithoutProtocol = registry
    .replace(/https?:/, '')     // remove leading protocol
    .replace(/([^/])$/, '$1/');  // ensure ending with slash
  const authTokenKey = `${registryWithoutProtocol}:_authToken`;

  return npmConfig[authTokenKey];
}

// https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
async function getMetadata (packageName: string, { full = false } = {}) {
  const scope = extractPackageScope(packageName);
  const registry = await getRegistry(scope);
  let metadata;

  const headers = {} as {
      Accept: string;
      Authorization: string;
  };
  if (!full) {
    headers.Accept = 'application/vnd.npm.install-v1+json;q=1.0, application/json;q=0.9, */*;q=0.8';
  }

  const authToken = await getAuthToken(scope);
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const url = `${registry.replace(/\/$/g, '')}/${packageName}`;
  try {
    const res = await request.get(url, { headers });
    metadata = res.body;
    if (metadata.error) {
      throw new Error(metadata.error);
    }
    return metadata;
  } catch (e) {
    error(`Failed to get response from ${url}`);
    throw e;
  }
}

export default async function getRemoteVersion (packageName: string, versionRange = 'latest'): Promise<string | semver.SemVer | null> {
  const metadata = await getMetadata(packageName);
  if (Object.keys(metadata['dist-tags']).includes(versionRange)) {
    return metadata['dist-tags'][versionRange];
  }
  const versions = Array.isArray(metadata.versions) ? metadata.versions : Object.keys(metadata.versions);
  return semver.maxSatisfying(versions, versionRange);
}
