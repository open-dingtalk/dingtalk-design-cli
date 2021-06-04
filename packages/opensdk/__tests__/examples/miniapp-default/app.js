App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');

    console.log('language', dd.getLanguageSync());
    console.log('language 2', dd.getSystemInfoSync().language);
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
