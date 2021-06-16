Page({
  doHttp() {
    dd.httpRequest({
      url: 'http://httpbin.org',
      dataType: 'text',
      success: () => {
        dd.alert({ content: 'success' });
      },
      fail: (r) => {
        dd.alert({ title: 'fail', content: JSON.stringify(r) });
      },
    });
  },
  doDtHttp() {
    dd.httpRequest({
      url: 'http://httpbin.org',
      impl: 'dt',
      dataType: 'text',
      success: () => {
        dd.alert({ content: 'success' });
      },
      fail: (r) => {
        dd.alert({ title: 'fail', content: JSON.stringify(r) });
      },
    });
  },
});
