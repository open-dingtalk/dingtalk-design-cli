import { getOrDownloadIDE, createIdeShellSimpleLauncher, ProjectType, } from './ideLocator';
import { logWithSpinner, successSpinner, } from '../cli-shared-utils/lib/spinner';
import sleep from './sleep';

/**
 * 单纯启动IDE，不进行编译托管
 */
export const launchIDEOnly = async (
  projectPath: string,
  useLite: boolean,
  projectType: ProjectType,
): Promise<void> => {
  const ideInstallRoot = await getOrDownloadIDE();
  logWithSpinner(useLite ? 'IDE Lite模式启动中' : 'IDE启动中');
  createIdeShellSimpleLauncher(ideInstallRoot, {
    isDebug: !!process.env.DEBUG,
  })({
    windowMode: useLite ? 'lite' : 'default',
    projectUri: `file://${encodeURI(projectPath)}`,
    projectType,
    volDriverChannelName: 'mini',
  });
  // 调用启动命令后无法准确获知IDE何时启动成功，因此这里sleep 1s后打印启动成功
  await sleep(1000);
  successSpinner('启动成功！');
};