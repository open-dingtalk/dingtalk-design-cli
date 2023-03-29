import * as pth from 'path';
import * as fse from 'fs-extra';
import { IProxyParams, } from '../../lib/common/types';
import { RequestDetail, ResponseDetail, RuleModule, } from 'anyproxy';
import config from '../../lib/common/config';

let bizType = '';
// 本地代理
// anyproxy --intercept --rule proxy.js
export default function ({ miniAppId, cwd, }: IProxyParams): RuleModule {
  return {
    summary: 'a rule to modify response',
    // eslint-disable-next-line require-yield
    *beforeDealHttpsRequest(requestDetail) {
      const host = requestDetail.host;
      const whiteList = [
        'aflow.dingtalk.com',
        'package.dingtalk.com',
        'g.alicdn.com',
        'dev.dingtalk.com',
      ];
      return whiteList.some((item) => host.indexOf(item) !== -1);
    },
    // eslint-disable-next-line require-yield
    *beforeSendRequest(requestDetail: RequestDetail): any {
      const path = requestDetail.url;
      const headers = requestDetail.requestOptions;

      // 如果是xxx的js，那么就修改为请求本地
      // package.dingtalk.com/5000000001616274/static/JhkXYZcbLh/index.js?pluginId=5000000001616274
      const reg = new RegExp(`.*package\\.dingtalk\\.com/${miniAppId}/static/(\\w*)/index\\.js`, 'i');
      if (path.match(reg) || path.match(/.*dev\.dingtalk\.com\/main\.bundle\.js/)) {
        const port = config.h5pro.h5bundlePort;
        const newOption = Object.assign({}, requestDetail.requestOptions, {
          hostname: '127.0.0.1', // 本地ip
          port: port,
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


      // h5 调试，因为h5，rocket代理，不走http，导致无法通过 html代理，
      // 也不能代理已存在js，因为有dd_cache
      // 只能在页面中加载错误js，来这里调试，通过灰度key来控制js加载
      if (path.match(/.*dev\.dingtalk\.com\/main\.bundle\.js/) ||
          path.match(/.*g\.alicdn\.com\/code\/npm\/@ali\/dsuite-center\/0\.0\.3\/config\/index\.js/)
      ) {
        if(!bizType) {
          try {
            const config = fse.readJsonSync(pth.join(cwd, './src/plugin/components/config.json'));
            bizType = config.bizType;
          }catch(e){
            console.error('config.json读取失败，请检查后重试', e);
          }   
        }
        const buf = Buffer.from(`
        ;(function(){
          if(typeof eruda == 'undefined'){
            var parent = document.head || document.body || document.documentElement;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.crossOrigin = 'anonymous';
            script.src = '//g.alicdn.com/code/lib/eruda/2.4.1/eruda.min.js';
            script.onload = function () {
              eruda.init();
            };
            parent.appendChild(script);
          }
        })();
        window.__SUITE_DEV_MINIAPP={miniAppId:'${miniAppId}',bizType:'${bizType}'};
        `);
        newResponse.body = buf;
        return new Promise((resolve, reject) => {
          resolve({ response: newResponse, });
        });
      }
      // 审批侧规则
      if ((path.indexOf('aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm') > -1 
          // || path.indexOf('aflow.dingtalk.com/dingtalk/mobile/homepage.htm') > -1 
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
        const script = `
        <script src="https://g.alicdn.com/code/lib/eruda/2.4.1/eruda.min.js"></script>
        <script>
          window.__SUITE_DEV_MINIAPP={miniAppId:'${miniAppId}',bizType:'${bizType}'};
          eruda.init();
        </script>`;
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