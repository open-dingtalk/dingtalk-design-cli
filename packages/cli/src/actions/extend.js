const injectJsapiScripts = `
// lyra支持153个
window.SUPPORTED_ALIPAY_LYRA_JSAPI = ['setBackgroundAudioOption', 'getBackgroundAudioOption', 'startMonitorBackgroundAudio', 'stopMonitorBackgroundAudio', 'getBackgroundAudioPlayerState', 'seekBackgroundAudio', 'playBackgroundAudio', 'pauseBackgroundAudio', 'stopBackgroundAudio', 'destoryBackgroundAudio', 'fsManage', 'fsManageSync', 'saveFile', 'getSavedFileList', 'getSavedFileInfo', 'getFileInfo', 'removeSavedFile', 'openDocument', 'setTinyLocalStorage', 'getTinyLocalStorage', 'getTinyLocalStorageInfo', 'removeTinyLocalStorage', 'clearTinyLocalStorage', 'setScreenAutolock', 'getDeviceInfo', 'getRunScene', 'navigateToMiniProgram', 'addEventCal', 'navigateBackMiniProgram', 'getServerTime', 'getNetworkType', 'hideKeyboard', 'getCurrentLocation', 'vibrate', 'vibrateLong', 'vibrateShort', 'watchShake', 'scan', 'startMonitorMemoryWarning', 'stopMonitorMemoryWarning', 'addScreenshotListener', 'setScreenBrightness', 'getScreenBrightness', 'setClipboard', 'getClipboard', 'getBatteryInfo', 'getSystemInfo', 'tyroRequest', 'tyroRequestAsync', 'showRemoteDebugPanel', 'showRemoteDebugMask', 'request', 'httpRequest', 'operateRequestTask', 'downloadFile', 'operateDownloadTask', 'uploadFile', 'operateUploadTask', 'rsa', 'getAppInfo', 'makePhoneCall', 'appxrpc', 'shareTinyAppMsg', 'getBusinessAuth', 'getLocalResourceAbsolutePath', 'internal_clearFileCache', 'internal_reLaunchApp', 'measureText', 'sendMtop', 'mtop', 'getTitleAndStatusbarHeight', 'setTitle', 'setTitleColor', 'setBarBottomLineColor', 'getTitleColor', 'showTitleLoading', 'hideTitleLoading', 'setTransparentTitle', 'setBackButton', 'hideOptionMenuItem', 'hideShareMenu', 'setCustomPopMenu', 'setOptionMenu', 'showOptionMenu', 'setTAOptionMenu', 'showTAOptionMenu', 'showBackToHomepage', 'isCollected', 'queryIsFavorite', 'add2Favorite', 'cancelKeepFavorite', 'favoriteNotify', 'enableLeaveConfirm', 'disableLeaveConfirm', 'setBackgroundColor', 'setBackgroundTextStyle', 'setCanPullDown', 'startPullDownRefresh', 'restorePullToRefresh', 'loadCanvasFontFace', 'getBackgroundFetchData', 'setTabBar', 'getOpenUserData', 'startAudioRecord', 'stopAudioRecord', 'pauseAudioRecord', 'resumeAudioRecord', 'rpc', 'connectSocket', 'sendSocketMessage', 'closeSocket', 'lyraInternal_closeAllSockets', 'actionSheet', 'navigateToAlipayPage', 'updateAlipayClient', 'getAuthCode', 'getComponentAuth', 'showAuthGuide', 'getUserInfo', 'getAuthUserInfo', 'startBizService', 'getCities', 'chooseContact', 'contact', 'APSocialNebulaPlugin.selectContactJSAPI', 'addPhoneContact', 'alert', 'confirm', 'prompt', 'imageViewer', 'getImageInfo', 'chooseImage', 'saveImage', 'compressImage', 'generateImageFromCode', 'showLoading', 'hideLoading', 'beehiveGetPOI', 'openLocation', 'tradePay', 'datePicker', 'beehiveOptionsPicker', 'beehiveMultilevelSelect', 'getSetting', 'openSetting', 'startShare', 'startApp', 'toast', 'hideToast', 'registerUpdateManager', 'applyUpdate', 'saveVideoToPhotosAlbum', 'chooseVideo'];

// river支持31个
window.SUPPORTED_ALIPAY_RIVER_JSAPI = ['remoteLog', 'getStartupParams', 'internalAPI', 'pushWindow', 'popWindow', 'switchTab', 'setTabBar', 'popTo', 'reLaunch', 'registerWorker', 'postMessage', 'NBComponent.render', 'NBComponent.remove', 'NBComponent.sendMessage', 'getSystemInfo', 'saveSnapshot', 'handleLoggingAction', 'onAppPerfEvent', 'reportData', 'trackerConfig', 'setAppxVersion', 'getConfig4Appx', 'tinyAppConfig', 'addNotifyListener', 'removeNotifyListener', 'localLog', 'locallog', 'pageMonitor', 'showBackHome', 'hideBackHome', 'tinyDebugConsole'];

// lyra-dingtalk扩展支持/覆盖85个，internal有11个
window.SUPPORTED_DINGTALK_JSAPI = [
  'device.audio.getVolume',
  'device.audio.setVolume',
  'runtime.permission.requestAuthCode',
  'internal.channel.subscribe',
  'internal.channel.unsubscribe',
  'internal.channel.publish',
  'biz.chat.pickConversation',
  'biz.chat.chooseConversationByCorpId',
  'biz.chat.toConversation',
  'biz.chat.openSingleChat',
  'biz.chat.collectSticker',
  'biz.contact.chooseMobileContacts',
  'biz.customContact.multipleChoose',
  'biz.customContact.choose',
  'biz.contact.complexPicker',
  'biz.contact.departmentsPicker',
  'biz.contact.externalComplexPicker',
  'biz.contact.externalEditForm',
  'biz.contact.createGroup',
  'device.connection.getNetworkType',
  'device.notification.vibrate',
  'biz.util.scan',
  'biz.clipboardData.setData',
  'biz.clipboardData.getData',
  'device.base.getWifiStatus',
  'device.base.getPhoneInfo',
  'biz.ding.create',
  'biz.cspace.saveFile',
  'biz.cspace.preview',
  'biz.util.uploadAttachment',
  'biz.cspace.chooseSpaceDir',
  'biz.util.editPicture',
  'internal.request.lwp',
  'biz.user.get',
  'device.base.getUUID',
  'biz.user.secretID',
  'internal.log.add',
  'biz.util.ut',
  'biz.util.traceLogBatch',
  'biz.util.perfBizReady',
  'biz.util.log',
  'biz.util.timestamp',
  'biz.util.getPerfInfo',
  'biz.util.previewImage',
  'internal.util.getOrgIdByCorpId',
  'internal.util.getCorpIdByOrgId',
  'internal.util.getUtdid',
  'internal.util.getDevEnv',
  'internal.util.graySwitch',
  'internal.util.graySwitchLemon',
  'device.geolocation.get',
  'device.geolocation.isEnabled',
  'biz.map.view',
  'internal.notify.send',
  'internal.notify.add',
  'biz.util.openLink',
  'util.domainStorage.setItem',
  'util.domainStorage.getItem',
  'util.domainStorage.removeItem',
  'util.domainStorage.getStorageInfo',
  'util.domainStorage.clearItems',
  'biz.store.inquiry',
  'biz.store.createOrder',
  'biz.store.getPayUrl',
  'biz.store.closeUnpayOrder',
  'biz.telephone.call',
  'biz.telephone.showCallMenu',
  'biz.telephone.checkBizCall',
  'device.notification.toast',
  'device.notification.alert',
  'device.notification.confirm',
  'device.notification.showPreloader',
  'device.notification.hidePreloader',
  'device.notification.actionSheet',
  'biz.util.chosen',
  'biz.util.datepicker',
  'biz.util.timepicker',
  'biz.util.datetimepicker',
  'biz.util.monthPicker',
  'biz.calendar.chooseDateTime',
  'biz.util.open',
  'biz.util.shareImage',
  'biz.verify.openBindIDCard',
  'biz.verify.startAuth',
  'biz.navigation.goBack',
];

/**
 * 判断JSAPI是否被实现
 * @param method 三段式
 * @returns
 */
function isSupport(method = '') {
  const methodSplited = method.split('.');
  const actionName = methodSplited.slice(methodSplited.length - 1, methodSplited.length).join('');

  return {
    alipay: window.SUPPORTED_ALIPAY_LYRA_JSAPI.indexOf(actionName) !== -1 || window.SUPPORTED_ALIPAY_RIVER_JSAPI.indexOf(actionName) !== -1,
    dingtalk: window.SUPPORTED_DINGTALK_JSAPI.indexOf(method) !== -1,
    actionName,
  };
}

const event = new Event('WebViewJavascriptBridgeReady');
document.dispatchEvent(event);

`
// eslint-disable-next-line no-undef
console.log('11111');
const proxyServerUrl = 'http://127.0.0.1:8333';

function isString(obj) {
  return Object.prototype.toString.call(obj).indexOf('String') !== -1;
}

window.lyraRendererExtendBridge.beforeMount((options) => {
  return {
    ...options,
    ipc: async (params) => {
      if (params.name === 'sendMsg') {
        console.log('xingying test sendMsg', params, superagent);
        const fetchUrl = `${decodeURIComponent(proxyServerUrl)}/sendLwpMsg`;
        let res;
        try {
          res = await superagent.get(fetchUrl).query({
            url: params.params.url,
            headers: params.params.headers,
            params: isString(params.params.body)
              ? params.params.body
              : JSON.stringify(params.params.body),
          });
        } catch(e) {
          console.error('ipc error', e);
        }
        const decodedRes = JSON.parse(res.text);
        console.log('inner ipc', decodedRes, params);
        return decodedRes;
      } else if (params.name === 'biz.user.get') {
        const fetchUrl = `${decodeURIComponent(proxyServerUrl)}/getUserInfo`;
        const res = await superagent.get(fetchUrl);
        const decodedRes = JSON.parse(res.text);
        // console.log('inner ipc', decodedRes, params);
        return decodedRes.data.userProfileExtensionModel;
      } else if (params.name === 'getProfile') {
        const fetchUrl = `${decodeURIComponent(proxyServerUrl)}/getProfile`;
        const res = await superagent.get(fetchUrl);
        const decodedRes = JSON.parse(res.text);
        // console.log('inner ipc', decodedRes, params);
        return decodedRes.data;
      } else if (params.name === 'getMySpaceId') {
        const fetchUrl = `${decodeURIComponent(proxyServerUrl)}/getMySpaceId`;
        const res = await superagent.get(fetchUrl);
        const decodedRes = JSON.parse(res.text);
        // console.log('inner ipc', decodedRes, params);
        return decodedRes.data;
      }
    },
    ext: [
       'https://gw.alipayobjects.com/as/g/lyra/official-extension/0.0.10/',
       `https://g.alicdn.com/dingding/lyra-dingtalk/0.0.2/`,
     ],
     inlineRenderScripts: [
        injectJsapiScripts
     ],
  };
});
