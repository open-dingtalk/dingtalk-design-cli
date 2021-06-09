import { getGlobalGulp, getWorkspaceGulp, } from '../cli-shared-utils/lib/env';

/**
 * 检测tsc位置
 * 
 * 优先级: workspace -> global
 */

export default (cwd: string): string => {
  const workspace = getWorkspaceGulp(cwd);
  if (workspace) return workspace;
  
  const global = getGlobalGulp();
  if (global) return global;

  return '';
};