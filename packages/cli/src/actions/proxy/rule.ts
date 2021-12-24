import * as pth from 'path';
import * as fse from 'fs-extra';
import { IProxyParams, } from '../../lib/common/types';
import { RequestDetail, ResponseDetail, RuleModule, } from 'anyproxy';

let bizType = '';
// 本地代理
// anyproxy --intercept --rule proxy.js
export default function ({ miniAppId, cwd, }: IProxyParams): RuleModule {
  return {
    summary: 'a rule to modify response',
    // eslint-disable-next-line require-yield
    *beforeSendRequest(requestDetail: RequestDetail): any {
      const path = requestDetail.url;
      const headers = requestDetail.requestOptions;

      // 如果是xxx的js，那么就修改为请求本地
      // package.dingtalk.com/5000000001616274/static/JhkXYZcbLh/index.js?pluginId=5000000001616274
      const reg = new RegExp(`.*package\\.dingtalk\\.com/${miniAppId}/static/(\\w*)/index\\.js`, 'i');
      if (path.match(reg)) {
        const newOption = Object.assign({}, requestDetail.requestOptions, {
          hostname: '127.0.0.1', // 本地ip
          port: 3001,
          headers: { ...headers, },
          path: '/index.js',
        });
        return {
          protocol: 'http',
          requestOptions: newOption,
        };
      }
    }, 
    // eslint-disable-next-line require-yield
    *beforeSendResponse(requestDetail: any, responseDetail: ResponseDetail): any {
      const path = requestDetail.url;
      const reqHeaders = requestDetail.requestOptions;
      const newResponse = responseDetail.response;
      // 审批侧规则
      if ((path.indexOf('aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm') > -1 
          || path.indexOf('aflow.dingtalk.com/dingtalk/mobile/homepage.htm') > -1 
          || path.indexOf('aflow.dingtalk.com/dingtalk/web/query/oaDesigner') > -1)
          && newResponse.header['Content-Type']?.indexOf('text/html') > -1
          && reqHeaders.headers['Accept']?.indexOf('html') > -1) {

        if(!bizType) {
          try {
            const config = fse.readJsonSync(pth.join(cwd, './src/plugin/components/config.json'));
            bizType = config.bizType;
          }catch(e){
            console.error('config.json读取失败，请检查后重试', e);
          }   
        }
        let nRes = newResponse.body.toString();
        const script = `<script>window.__SUITE_DEV_MINIAPP={miniAppId:'${miniAppId}',bizType:'${bizType}'}</script>`;
        nRes = nRes.replace(/<head>/i, function(i: string){
          return i + script;
        });
        const buf = Buffer.from(nRes);
        newResponse.body = buf;
        return new Promise((resolve) => {
          resolve({ response: newResponse, });
        });
      }
    },
  };
}