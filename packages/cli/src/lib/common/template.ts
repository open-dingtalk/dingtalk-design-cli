export default {
  pluginComponent: {
    axml: `
    <view class="component-template">
      <view>已经成功新建组件模板 <%pluginComponentName%></view>
      <view>你还需要修改<%&configJsonPath%></view>
      <view>以及在<%&dtdConfigPath%>中配置组件本地mock数据</view>
      
      <view>componentName: {{componentName}}</view>
      <view>
      componentProps: 
        <view a:for="{{componentProps}}" a:for-index="key">
          {{key}}: {{item}}
        </view>
      </view>
      <view>
      config: 
        <view a:for="{{config}}" a:for-index="key">
          {{key}}: {{item}}
        </view>
      </view>
    </view>`,
    acss: `
    .component-template {
      line-height: 32rpx;
      font-size:24rpx;
      padding: 24rpx 36rpx;
      border: 1px solid;
      width: 100%;
      margin-bottom: 20rpx;
    }
    `,
    configJson: `
    {
      "pluginComponentName": "<%pluginComponentName%>",
      "name": "<%pluginComponentName%>",
      "icon": "组件的icon地址",
      "previewUrl": "组件的预览图CDN地址",
      "previewHeight": 100,
      "setters": [{
        "propName": "marginBottom",
        "setterName": "SliderSetter",
        "props": {
          "label": "下间距",
          "min": 0,
          "max": 32
        }
      },
      {
        "propName": "gateWayApi",
        "setterName": "SelectApiSetter",
        "props": {
          "label": "数据来源"
        }
      }],
      "props": {
        "marginBottom": 0,
        "gateWayApi": {}
      }
    }
    `,
    js: `
    Component({
      data: {},
      props: {    
        componentName: '',
        componentProps: { // config.json文件中定义的props可以从componentProps中获取，这里可以设置默认值。如果有在设计器里修改，则会被新值覆盖。
    
        },
        config: {
          corpId:'', // 可以通过this.props.config.corpId 获取当前工作台用户的企业corpId
        }
      },
      didMount() {
        // 业务代码写到下方
    
      },
      didUpdate() {
        // 业务代码写到下方
      },
    
      didUnmount() {
        // 业务代码写到下方
      },
      methods: {
      }
    });
    `,
    ts: `
    Component({
      data: {},
      props: {    
        componentName: '',
        componentProps: { // config.json文件中定义的props可以从componentProps中获取，这里可以设置默认值。如果有在设计器里修改，则会被新值覆盖。
    
        },
        config: {
          corpId:'', // 可以通过this.props.config.corpId 获取当前工作台用户的企业corpId
        }
      },
      didMount() {
        // 业务代码写到下方
    
      },
      didUpdate() {
        // 业务代码写到下方
      },
    
      didUnmount() {
        // 业务代码写到下方
      },
      methods: {
      }
    });
    `,
    indexJson: `
    {
      "component": true
    }
    `,
  },
};