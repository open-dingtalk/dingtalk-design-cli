import { getOrDownloadIDE, createIdeShellSimpleLauncher, ProjectType, } from './ideLocator';
import { logWithSpinner, successSpinner, } from '../cli-shared-utils/lib/spinner';
import sleep from './sleep';
import { locateMiniStudioBinPath, } from './ideLocator';
import { URI, } from 'vscode-uri';

export const path2Uri = (p: string): string => URI.file(p).toString();

/**
 * 单纯启动IDE，不进行编译托管
 */
export const launchIDEOnly = async (
  projectPath: string,
  useLite: boolean,
  projectType: ProjectType,
  binPath?: string, // 如果传入binPath则使用binPath指定的ide来启动
): Promise<void> => {
  let miniStudioBinPath = '';
  if (binPath) {
    miniStudioBinPath = binPath;
  } else {
    const ideInstallRoot = await getOrDownloadIDE();
    miniStudioBinPath = locateMiniStudioBinPath(ideInstallRoot);
  }

  logWithSpinner(useLite ? 'IDE Lite模式启动中' : 'IDE启动中');
  
  createIdeShellSimpleLauncher(miniStudioBinPath, {
    isDebug: !!process.env.DEBUG,
  })({
    windowMode: useLite ? 'lite' : 'default',
    projectUri: path2Uri(projectPath),
    projectType,
    volDriverChannelName: 'mini',
  });
  // 调用启动命令后无法准确获知IDE何时启动成功，因此这里sleep 1s后打印启动成功
  await sleep(1000);
  successSpinner('启动成功！');
};