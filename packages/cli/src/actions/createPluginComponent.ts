import { ICommandContext, } from '../lib/common/types';
import * as path from 'path';
import * as fs from 'fs';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';
import template from '../lib/common/template';
import getJson from '../lib/util/getJson';
import setJson from '../lib/util/setJson';
import parser from 'fast-xml-parser';
import he from 'he';
import { get, set, isArray, } from 'lodash';
import Mustache from 'mustache';

Mustache.tags = [ '<%', '%>' ];
const monitor = getMonitor(config.yuyanId);

/**
 * 在本地快速创建一个组件
 */
export default (commandContext: ICommandContext, args: any[]): Promise<void> => {
  const {
    miniProgramConfigContent,
    dtdConfig,
    logger,
    cwd,
  } = commandContext;
  const pluginRoot = miniProgramConfigContent.pluginRoot;

  if (!pluginRoot) {
    logger.error('找不到pluginRoot，请检查mini.project.json中是否配置了pluginRoot');
    return;
  }

  const miniprogramRoot = miniProgramConfigContent.miniprogramRoot;
  const isTypescript = dtdConfig.typescript;
  const pluginComponentsPath = path.join(cwd, pluginRoot, 'components');
  const appJsonPath = path.join(cwd, miniprogramRoot, 'app.json');
  const miniprogramAppJson = getJson(appJsonPath, true, {});
  const dtdConfigPath = path.join(cwd, config.workspaceRcName);

  // 该组件名作用于多个地方
  // 1. 组件目录名，以及组件目录下config.json中的pluginComponentName字段
  // 2. ${miniprogramRoot}/page/index/index.json中usingComponents插入的组件名称和路径
  // 3. ${miniprogramRoot}/page/index/index.axml中插入的标签名
  const componentDirName = args[0];

  /** 1. ${pluginRoot}/components目录下新增组件模板 */
  const componentDirPath = path.join(pluginComponentsPath, componentDirName);
  if (!fs.existsSync(componentDirPath)) {
    try {
      fs.mkdirSync(componentDirPath);
    } catch(e) {
      logger.error('创建组件目录失败', e);
      monitor.logJSError(e);
      return;
    }
  }
  try {
    const opts: fs.WriteFileOptions = {
      encoding: 'utf-8',
    };
    const configJsonPath = path.join(componentDirPath, 'config.json');
    const axmlPath = path.join(componentDirPath, 'index.axml');
    const acssPath = path.join(componentDirPath, 'index.acss');
    const indexJsonPath = path.join(componentDirPath, 'index.json');

    fs.writeFileSync(axmlPath, Mustache.render(template.pluginComponent.axml, {
      pluginComponentName: componentDirName,
      dtdConfigPath: path.relative(cwd, dtdConfigPath),
      configJsonPath: path.relative(cwd, configJsonPath),
    }), opts);
    fs.writeFileSync(configJsonPath,  Mustache.render(template.pluginComponent.configJson, {
      pluginComponentName: componentDirName,
    }), opts);
    fs.writeFileSync(acssPath, template.pluginComponent.acss, opts);
    fs.writeFileSync(indexJsonPath, template.pluginComponent.indexJson, opts);
    if (isTypescript) {
      fs.writeFileSync(path.join(componentDirPath, 'index.ts'), template.pluginComponent.ts, opts);
    } else {
      fs.writeFileSync(path.join(componentDirPath, 'index.js'), template.pluginComponent.js, opts);
    }
  } catch(e) {
    logger.error(`往组件目录 ${componentDirPath} 写入文件失败`, e);
    monitor.logJSError(e);
    return;
  }

  /** 2. 在${miniprogramRoot}/pages/index/index.json中插入组件引用  */
  const firstPage = miniprogramAppJson.pages && miniprogramAppJson.pages[0];
  if (!firstPage) {
    logger.error(`找不到小程序页面配置信息，请检查${appJsonPath}是否正确配置字段 pages`);
    return;
  }
  // 把 page/index/index/ 规范为 page/index/index
  const normalizeFirstPath = firstPage.split('/').filter(v=>!!v).join('/');
  const firstPathAbs = path.join(cwd, miniprogramRoot, `${normalizeFirstPath}.json`);
  const pageIndexJson = getJson(firstPathAbs, true, null);
  if (!pageIndexJson) {
    logger.error(`${firstPathAbs} 文件不存在`);
    return;
  }
  try {
    // TODO: plugin://myPlugin写死了，没想到好办法来处理
    set(pageIndexJson, 'usingComponents', {
      ...get(pageIndexJson, 'usingComponents', {}),
      [componentDirName]: `plugin://myPlugin/${componentDirName}`,
    });
    setJson(firstPathAbs, pageIndexJson);
  } catch(e) {
    logger.error(`往 ${firstPathAbs} 插入组件引用失败`, e);
    monitor.logJSError(e);
    return;
  }

  /** 3. 在${pluginRoot}/plugin.json中插入组件引用 */
  const pluginJsonPath = path.join(pluginRoot, 'plugin.json');
  const pluginJson = getJson(pluginJsonPath, true, null);
  if (!pluginJson) {
    logger.error(`${pluginJsonPath} 文件不存在`);
    return;
  }
  set(pluginJson, 'publicComponents', {
    ...get(pluginJson, 'publicComponents', {}),
    [componentDirName]: `components/${componentDirName}/index`,
  });
  setJson(pluginJsonPath, pluginJson);

  /** 4. 在miniprogram/pages/index/index.axml中插入组件axml */
  const pageIndexAxmlPath = path.join(cwd, miniprogramRoot, `${normalizeFirstPath}.axml`);
  const pageIndexAxml = fs.readFileSync(pageIndexAxmlPath, {
    encoding: 'utf-8',
  });

  const parserOpts = {
    attributeNamePrefix : '',
    attrNodeName: 'attr', //default is 'false'
    textNodeName : '#text',
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : true,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    // cdataTagName: '__cdata', //default is 'false'
    // cdataPositionChar: '\\c',
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val) => he.decode(val, { isAttributeValue: true, }), //default is a=>a
    tagValueProcessor : (val) => he.decode(val), //default is a=>a
    format: true,
    // stopNodes: ['parse-me-as-string'],
  };
  const parsedJson = parser.parse(pageIndexAxml, parserOpts);
  const injectComponentOpts = {
    attr: {
      id: `{{componentsData['${componentDirName}'].id}}`,
      componentName: `{{componentsData['${componentDirName}'].componentName}}`,
      componentProps: `{{componentsData['${componentDirName}'].props}}`,
      config: `{{componentsData['${componentDirName}'].config}}`,
      mode: `{{componentsData['${componentDirName}'].mode}}`,
      locale: `{{componentsData['${componentDirName}'].locale}}`,
    },
  };
  const viewOpts = parsedJson['view'];
  const viewContainer = isArray(viewOpts) ? viewOpts[0] : viewOpts;
  if (!viewContainer) {
    logger.error(`${pageIndexAxmlPath} 文件中最外层缺少view组件`);
    return;
  }
  viewContainer[componentDirName] = injectComponentOpts;
  const J2xParser = parser.j2xParser;
  const j2xParser = new J2xParser(parserOpts);
  const newXmlStr = j2xParser.parse(parsedJson);
  fs.writeFileSync(pageIndexAxmlPath, newXmlStr, {
    encoding: 'utf-8',
  });

  /** 5. 在ding.config.json中增加mock配置 */
  set(dtdConfig, 'devConfig.mock.componentsData', {
    ...get(dtdConfig, 'devConfig.mock.componentsData', {}),
    [componentDirName]: {
      id: '',
      mode: 'light',
      componentName: componentDirName,
      componentProps: {},
      locale: 'zh_CN',
      config: {
        corpId: '',
      },
    },
  });

  setJson(dtdConfigPath, dtdConfig);
};
