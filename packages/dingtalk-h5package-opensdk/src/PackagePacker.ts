import archiver from 'archiver';
import fs from 'fs-extra';
import path from 'path';
import download from 'download';
import glob from 'glob';

export interface PackerConfig {
  host?: string;
  miniAppId: string;
  accessToken: string;
  assets: Record<string, string>;
  externalAssets?: string[];
  globMappingRules?: Record<string, string>;
}

export function urlToPath(url: string) {
  let uri: URL;

  try {
    uri = new URL(url);
  } catch (error) {
    throw new Error(`无效的资源地址: ${url}`);
  }

  if (uri.protocol !== 'https:') {
    throw new Error(`无效的资源地址: ${url}, 离线包只支持 https 协议`);
  }

  const host = uri.port ? `${uri.hostname}@${uri.port}` : uri.hostname;

  let p = `${host}${uri.pathname}`;

  if (p.endsWith('/')) {
    p = p.slice(0, -1);
  }

  return p;
}

export function pathToUrl(filename: string) {
  const sep = '/';
  const arr = filename.split(sep);
  const host = arr[0];
  const pathname = arr.slice(1).join(sep);

  let p = `https://${host.replace('@', ':')}/${pathname}`;

  if (p.endsWith('/')) {
    p = p.slice(0, -1);
  }

  return p;
}


export class PackagePacker {
  private arch: archiver.Archiver;
  private prom: Promise<void>;
  private output: fs.WriteStream;
  private file: string;
  private bundleMode = 2;
  private includeUrlSet = new Set<string>();
  private resourceConfigFileName = 'localresource.json';

  constructor(readonly options: {
    filename: string;
  }) {
    this.file = path.join(process.cwd(), options.filename);
    this.output = fs.createWriteStream(this.file);
    this.arch = archiver('tar', { gzip: true });
    this.prom = new Promise((r, c) => {
      this.arch.on('error', c);
      this.output.on('close', r);
    });
    this.arch.pipe(this.output);
  }

  async appendFile(url: string, fileOrDirectory: string) {
    const p = path.resolve(fileOrDirectory);
    const stat = await fs.stat(p);

    if (stat.isDirectory()) {    
      await this.appendDirectory(url, p);
    } else if (stat.isFile()) {
      this.arch.file(p, { name: urlToPath(url), });
    } else {
      throw new Error(`无效的文件或目录: ${p}`);
    }
  }

  async appendDirectory(url: string, directory: string) {
    const prefixURL = new URL(url);
    const prefixPathname = prefixURL.pathname;
    const files = glob.sync('**/*', { cwd: directory, nodir: true, });

    for (const file of files) {
      const fullPathname = path.join(prefixPathname, file);
      const fullUrl = new URL(fullPathname, prefixURL.origin).toString();

      this.arch.file(path.join(directory, file), { name: urlToPath(fullUrl), });
      this.includeUrlSet.add(fullUrl);
    }
  }

  async appendUrl(url: string) {
    const content = await download(url);

    this.arch.append(content, { name: urlToPath(url) });
  }

  // 暂时不支持
  // async appendGlobMapping(globPartten: string, file: string) {}

  async finalize() {
    await this.arch.append(JSON.stringify({ 
      bundleMode: this.bundleMode,
      includeUrls: Array.from(this.includeUrlSet),
      globMappingRules: [],
    }), { name: this.resourceConfigFileName, });

    await this.arch.finalize();
    return Promise.resolve(this.prom)
      .then(() => this.file);
  }
}