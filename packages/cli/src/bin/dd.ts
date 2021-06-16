#!/usr/bin/env node
/* eslint-disable no-console */
import checkNodeVersion from '../lib/util/checkNodeVersion';
import * as path from 'path';
import Scheduler from '../scheduler';
import { getSchedulerOptionsFromProcessArgv, } from '../scheduler/utils';
import config from '../lib/common/config';
import getCurrentPkgInfo from '../lib/util/getCurrentPkgInfo';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { logger, } from '../lib/cli-shared-utils/lib/logger';

const pkgInfo = getCurrentPkgInfo();
const requiredVersion = pkgInfo.engines.node;
const pkgName = pkgInfo.name;

checkNodeVersion(requiredVersion, pkgName);

const opts = getSchedulerOptionsFromProcessArgv();
const scheduler = new Scheduler({
  ...opts,
  yuyanId: config.yuyanId,
  commandRoot: path.join(__dirname, '../commands'),
});

async function main() {
  const monitor = getMonitor(config.yuyanId);

  process.on('uncaughtException', (err) => {
    logger.debug('uncaughtException', err);
    monitor.logJSError(err);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.debug('unhandledRejection', reason);
    monitor.logJSError(new Error(JSON.stringify(reason)));
  });

  process.on('exit', () => {
    monitor.flush();
  });

  try {
    await scheduler.bootstrap();
  } catch (e) {
    monitor.logJSError(e);
    monitor.flush();
    throw e;
  }
}

main();

