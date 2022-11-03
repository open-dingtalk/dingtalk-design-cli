import { program, createCommand } from 'commander';
import { MiniAppOpenSDK } from '../index';

async function run(opts: {
  token: string;
  appId?: string;
  agentId?: string;
  input: string;
  homeUrl?: string;
}) {
  const sdk = new MiniAppOpenSDK();

  sdk.setConfig({ accessToken: opts.token });

  const createResult = await sdk.createPackage(opts);

  await sdk.publishPackage({
    appId: opts.appId,
    agentId: opts.agentId,
    version: createResult.version,
  });
}

const inner = createCommand('inner');
const provider = createCommand('provider');

inner
  .summary('上传企业自建应用离线包资源')
  .requiredOption('-t, --accesstoken <accessToken>', '开发者后台apiToken')
  .requiredOption('-a, --id <agentId>', '企业自建应用的agentId')
  .requiredOption('-u, --url <url>', '离线包对应应用的入口地址')
  .option('-d, --dir <dir>', '要打包上传的离线包资源目录', './')
  .action(async (options) => {
    return run({
      token: options.accesstoken,
      agentId: options.id,
      input: options.dir,
      homeUrl: options.url,
    });
  });

provider
  .summary('上传第三方企业应用离线包资源')
  .requiredOption('-t, --accesstoken <accessToken>', '开发者后台apiToken')
  .requiredOption('-a, --id <agentId>', '企业自建应用的agentId')
  .requiredOption('-u, --url <url>', '离线包对应应用的入口地址')
  .option('-d, --dir <dir>', '要打包上传的离线包资源目录', './')
  .action(async (options) => {
    return run({
      token: options.accesstoken,
      appId: options.id,
      input: options.dir,
      homeUrl: options.url,
    });
  });

program
  .name('h5package')
  .version('0.0.1', '-v, --version', 'output the current version')
  .addCommand(inner)
  .addCommand(provider);

program.parseAsync();
