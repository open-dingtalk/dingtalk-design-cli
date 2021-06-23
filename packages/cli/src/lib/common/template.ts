export default {
  pluginComponent: {
    axml: `
    <view class="component-template">
      这个是组件模板，请复制文件夹创建组件，请在模板代码基础上修改
    </view>`,
    acss: `
    .component-template {
      line-height: 32rpx;
      font-size:24rpx;
      padding: 24rpx 36rpx;
    }
    `,
    configJson: `
    {
      "pluginComponentName": "插件中导出的组件英文名，例如 component-template",
      "name": "组件模板",
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