import { getGlobalGulp, getWorkspaceGulp, } from '../cli-shared-utils/lib/env';

/**
 * 检测tsc位置
 * 
 * 优先级: workspace -> global
 */

export default (): string => {
  const workspace = getWorkspaceGulp();
  if (workspace) return workspace;
  
  const global = getGlobalGulp();
  if (global) return global;

  return '';
};