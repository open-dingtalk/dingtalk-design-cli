#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs-extra';

import { MiniAppOpenSDK } from '../index';
import { PackagePacker, PackerConfig } from '../PackagePacker';

async function run(opts: {
  accesstoken: string;
  id: string;
  config: string;
  host?: string;
}) {
  try {
    const sdk = new MiniAppOpenSDK();

    sdk.setConfig({ accessToken: opts.accesstoken, host: opts.host  });

    const packer = new PackagePacker({
      filename: `${opts.id}.tar.gz`,
    });

    if (!fs.existsSync(opts.config)) {
      throw new Error(`配置文件不存在: ${opts.config}`);
    }

    const config: PackerConfig = await fs.readJson(opts.config, {
      throws: true,
    });

    if (!config) {
      throw new Error(`配置文件格式错误: ${opts.config}`);
    }

    const { assets = {}, externalAssets = [] } = config;
    const assetKeys = Object.keys(assets);

    for (const assetKey of assetKeys) {
      await packer.appendFile(assetKey, assets[assetKey]);
    }

    for (const externalAsset of externalAssets) {
      await packer.appendUrl(externalAsset);
    }

    const file = await packer.finalize();

    const createResult = await sdk.createPackage({
      miniAppId: opts.id,
      file,
    });

    await sdk.publishPackage({
      miniAppId: opts.id,
      version: createResult.version,
    });
  } catch (error) {
    console.error(error);
  }
}
 
program
  .summary('上传应用离线包资源')
  .name('h5package')
  .version('2.0.0', '-v, --version', 'output the current version')
  .requiredOption('-t, --accesstoken <accessToken>', '开发者后台apiToken')
  .requiredOption('-i, --id <miniAppId>', '离线包ID')
  .option('-h, --host <host>', '网关域名')
  .option('-c, --config <config>', '打包配置', './localresource.json')
  .action(
    async (options: {
      accesstoken: string;
      id: string;
      config: string;
      host?: string;
    }) => {
      return run(options);
    }
  );

program.parseAsync();
