#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs-extra';

import { MiniAppOpenSDK } from '../index';
import { PackagePacker, PackerConfig } from '../PackagePacker';

async function readResourceConfig(opts: { config: string }) {
  if (!fs.existsSync(opts.config)) {
    throw new Error(`配置文件不存在: ${opts.config}`);
  }

  const config: PackerConfig = await fs.readJson(opts.config, {
    throws: true,
  });

  return config;
}

async function pack(opts: { filename: string; config: PackerConfig }) {
  const packer = new PackagePacker({
    filename: opts.filename,
  });

  const { assets = {}, externalAssets = [] } = opts.config;
  const assetKeys = Object.keys(assets);

  for (const assetKey of assetKeys) {
    await packer.appendFile(assetKey, assets[assetKey]);
  }

  for (const externalAsset of externalAssets) {
    await packer.appendUrl(externalAsset);
  }

  const file = await packer.finalize();

  return file;
}

async function run(opts: {
  accesstoken: string;
  id: string;
  config: string;
  host?: string;
}) {
  try {
    const config = await readResourceConfig(opts);
    const miniAppId = opts.id || config.miniAppId;
    const host = opts.host || config.host;
    const accessToken = opts.accesstoken || config.accessToken;
    const sdk = new MiniAppOpenSDK();

    sdk.setConfig({
      accessToken,
      host,
    });

    if (!config) {
      throw new Error(`配置文件格式错误: ${opts.config}`);
    }

    const file = await pack({
      filename: `${miniAppId}.tar.gz`,
      config,
    });

    const createResult = await sdk.createPackage({
      miniAppId,
      file,
    });

    await sdk.publishPackage({
      miniAppId,
      version: createResult.version,
    });

    await fs.remove(file);
  } catch (error) {
    console.error(error);
  }
}

program
  .summary('上传应用离线包资源')
  .version('2.0.0', '-v, --version', 'output the current version')
  .addHelpCommand('help', 'display help for command');

program
  .command('pack')
  .description('打离包线包')
  .option('--config <config>', '打包配置', './localresource.json')
  .action(async function (opts) {
    const config = await readResourceConfig(opts);
    await pack({
      filename: `${config.miniAppId}.tar.gz`,
      config,
    });
  });

program
  .command('deploy', '发布离线包到线上')
  .argument('<version>', '离线包版本')
  .option('--id <miniAppId>', '离线包ID')
  .option('--host <host>', '网关域名')
  .option('--config <config>', '打包配置', './localresource.json')
  .action(async function (version: string) {
    const config = await readResourceConfig(this.opts());
    const sdk = new MiniAppOpenSDK();

    sdk.setConfig({
      accessToken: config.accessToken,
      host: config.host,
    });

    const result = await sdk.publishPackage({
      miniAppId: config.miniAppId,
      version,
    });

    console.log('发布成功: %o', result);
  });

program
  .command('packAndDeploy')
  .description('打包并发布离线包')
  .option('-t, --accesstoken <accessToken>', '开发者后台apiToken')
  .option('-i, --id <miniAppId>', '离线包ID')
  .option('-h, --host <host>', '网关域名')
  .option('--config <config>', '打包配置', './localresource.json')
  .action(async function () {
    await run(this.opts());
  });

program.parseAsync(process.argv);
