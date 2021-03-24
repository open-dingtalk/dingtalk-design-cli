import { DEFAULT_DIRECTORY_SEPERATOR, } from '../common/config';

/**
 * is valid repo directory
 * @param directoryName 
 * @param appType 
 * @param seperator 
 */
const isValidRepoDirectory = (directoryName: string, appType: string, seperator = DEFAULT_DIRECTORY_SEPERATOR): boolean => {
  return !directoryName.startsWith('.') && directoryName.startsWith(`${appType}${seperator}`);
};

export default isValidRepoDirectory;