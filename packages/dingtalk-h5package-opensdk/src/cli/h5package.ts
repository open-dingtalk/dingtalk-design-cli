import { program, createCommand } from 'commander';
import { MiniAppOpenSDK } from '../index';

async function run(opts: {
  token: string;
  appId?: string;
  agentId?: string;
  input?: string;
}) {
  const sdk = new MiniAppOpenSDK();

  sdk.setConfig({ accessToken: opts.token });

  const createResult = await sdk.createPackage({
    appId: opts.appId,
    agentId: opts.agentId,
    input: opts.input, // 在此目录下的所有文件会作为H5离线包的静态资源，压缩上传并创建H5离线包
  });

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
  .option('-d, --dir <dir>', '要打包上传的离线包资源目录', './')
  .action(async (options) => {
    return run({
      token: options.accesstoken,
      agentId: options.id,
      input: options.dir,
    });
  });

provider
  .summary('上传第三方企业应用离线包资源')
  .requiredOption('-t, --accesstoken <accessToken>', '开发者后台apiToken')
  .requiredOption('-a, --id <agentId>', '企业自建应用的agentId')
  .option('-d, --dir <dir>', '要打包上传的离线包资源目录', './')
  .action(async (options) => {
    return run({
      token: options.accesstoken,
      appId: options.id,
      input: options.dir,
    });
  });

program
  .name('h5package')
  .version('0.0.1', '-v, --version', 'output the current version')
  .addCommand(inner)
  .addCommand(provider);

program.parseAsync();
