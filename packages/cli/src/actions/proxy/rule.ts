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
  };
}