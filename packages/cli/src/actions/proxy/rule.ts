// 本地代理
// anyproxy --intercept --rule proxy.js
export default function ({ miniAppId }) {
  return {
    summary: 'a rule to modify response',
    // eslint-disable-next-line require-yield
    *beforeSendRequest(requestDetail: any) {
      const path = requestDetail.url;
      const headers = requestDetail.requestOptions;

      // 如果是xxx的js，那么就修改为请求本地
      // package.dingtalk.com/5000000001616274/static/JhkXYZcbLh/index.js?pluginId=5000000001616274
      const reg = new RegExp(`.*package\\.dingtalk\\.com\/${miniAppId}\/static\/\(\\w*)\/index.js`,'i');
      if (path.match(reg)) {
        const newOption = Object.assign({}, requestDetail.requestOptions, {
          hostname: '127.0.0.1', // 本地ip
          port: 3001,
          headers: { ...headers },
          path: '/index.js'
        });
        return {
          protocol: 'http',
          requestOptions: newOption,
        };
      }
    }, 
    // eslint-disable-next-line require-yield
    *beforeSendResponse(requestDetail: any, responseDetail: any) {
      const path = requestDetail.url;
      const reqHeaders = requestDetail.requestOptions;
      const newResponse = responseDetail.response;
      // 审批侧规则
      if ((path.indexOf('aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm') > -1 
          || path.indexOf('aflow.dingtalk.com/dingtalk/mobile/homepage.htm') > -1 
          || path.indexOf('aflow.dingtalk.com/dingtalk/web/query/oaDesigner') > -1)
          && newResponse.header['Content-Type']?.indexOf('text/html') > -1
          && reqHeaders.headers['Accept']?.indexOf('html') > -1) {
        let nRes = newResponse.body.toString();
        const script = `<script>window.__SUITE_DEV_MINIAPP={miniAppId:'${miniAppId}'}</script>`;
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