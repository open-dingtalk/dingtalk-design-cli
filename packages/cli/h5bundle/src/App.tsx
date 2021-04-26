import React, { useEffect, useState } from 'react';
import './App.css';
import * as H5ProComponentReact from './h5pro-component-react';
import componentModule from './bundle';
import sdkCtl from './sdk';
import qs from 'query-string';
import ComponentItem from './components/component-item'

const sdk = sdkCtl.main();
componentModule.main().registerWorktab(sdk);

interface IQueryParams {
  corpId: string;
  mode: string;
}

const standCardDarkModeProps = {
  __useStandardContainer__: {
      backgroundColor: '#1E1E1E',
  },
};

const standCardProps = {
  __useStandardContainer__: {
      marginBottom: 8,
      // pc工作台里，marginLeft和marginRight不需要，瀑布流布局自带固定的间距
      // marginLeft: 8,
      // marginRight: 8,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: '#fff',
      // backgroundColor: 'red',
  },
};

// 应用列表的特殊配置
const appListViewProps = {
  __useStandardContainer__: {
      ...standCardProps.__useStandardContainer__,
      paddingTop: 13,
      paddingBottom: 14,
  },
  specialBorderRadius: true,
};

// 我的全员自己没有卡片样式
const commonAppViewProps = {
  __useStandardContainer__: {
      // 取消默认的16px上间距
      paddingTop: 16,
      paddingBottom: 16,
  },
  specialBorderRadius: true,
};

export enum ComponentNameEnum {
  CONTAINER_VIEW = 'ContainerView',
  // 系统分组组件，里面有我的&精选
  SYSTEM_GROUPS_VIEW = 'SystemGroupsView',
  IMAGE_GRID_VIEW = 'ImageGridView',
  COMMON_APP_VIEW = 'CommonAppView',
  CORP_COMMON_APP_VIEW = 'CorpCommonAppView',
  APP_LIST_VIEW = 'AppListView',
  OTHER_APPS_VIEW = 'OtherAppsView',
  CAROUSEL_ANNOUCE_VIEW = 'CarouselAnnouceView',
  ADD_MORE_COMPONENTS_VIEW = 'AddMoreComponentsView',
  DINGTALK_REPORT_VIEW ='DingTalkReportView',
  DINGTALK_REPORT_WIDGET_VIEW ='dingtalk/workReportWidget',
  DINGTALK_TOOLTIPS ='DingTalkTopTips',
}

function getComponentProps(componentName: string) {
  if (componentName === ComponentNameEnum.APP_LIST_VIEW) {
      return appListViewProps;
  }
  if (
      componentName === ComponentNameEnum.COMMON_APP_VIEW ||
      componentName === ComponentNameEnum.CORP_COMMON_APP_VIEW
  ) {
      return commonAppViewProps;
  }
  return standCardProps;
}
/**
 * 模拟官方标准工作台的注入情况-仅模拟，非真实情况
 * @param {*} componentData 
 * @returns 
 */
 const generateStandardProps = (componentData: any) => {
  if (!componentData) return {};

  const {
      props: originProps,
      quickSetting,
      componentName = '',
  } = componentData || {};
  const {
      useStandardContainer,
      useStandardHead,
      containerType,
  } = quickSetting || {};
  console.log(quickSetting);
  let newProps: any = {
      ...originProps,
  };

  if (useStandardContainer) {
      newProps = {
          ...newProps,
          // 使用卡片样式时
          ...getComponentProps(componentName),
          darkModeProps: {
              ...newProps.darkModeProps,
              ...standCardDarkModeProps,
          },
      };
  }
  if (useStandardHead) {
      newProps = {
          ...newProps,
          // 通用头部时，props里会注入ddWorkspaceComponentHead
          // 这里mock时取本地的配置，实际读的是线上配置，非本地代码，请在线上预览时测试、验证效果
          __useStandardHead__: {
              "icon": componentData.icon,
              "title": componentData.name,
              "link": "https://www.dingtalk.com/",
              "showArrow": true,
              "manage": {
              "leftIcon": "https://gw.alicdn.com/tfs/TB1Ur0md1T2gK0jSZFvXXXnFXXa-66-66.png",
              'link': 'dingtalk://dingtalkclient/page/orginfo?orgId=xxx',
              'text': '管理',
              'rightIcon': '',
              }
          },
      };
  }
  if (containerType) {
      newProps = {
          ...newProps,
          // 通用头部时，props里会注入ddWorkspaceComponentHead
          // 这里mock时取本地的配置，实际读的是线上配置，非本地代码，请在线上预览时测试、验证效果
          __containerType__: {
              height: containerType === 'doubleHeight' ? 408 : 200,
          },
      }
  }

  return newProps;
};

const decodedUrlParams = qs.parse(window.location.search) as unknown as IQueryParams;
const {
  corpId,
  mode,
} = decodedUrlParams

const config =  {
  corpId,
  pageAppType: 'WORKBENCH',
  from: 'standard',
  locale: 'zh_CN',
  mode,
}

const { Component: MiniComponent } = H5ProComponentReact.registerModule(componentModule, () => {
  // 修改这个模块中的 my 变量
  // my.xxx = 1;
});

function App() {
  console.log('config: ', config);
  const { publicComponents, } = componentModule.publicComponents;

  const [componentsData, setComponentsData] = useState(null);

  useEffect(() => {
    import('./miniprogram/mock/componentsData.js').then(res => {
      setComponentsData(res.componentsData);
    });
  }, []); 

  return (
    <div className="App">
      {Object.keys(publicComponents).map(componentName => {
        console.log(componentsData&&componentsData[componentName], generateStandardProps(componentsData && componentsData[componentName]))
        return (
          <ComponentItem
              key={componentName}
              config={config}
              mode={mode}
              componentProps={generateStandardProps(componentsData && componentsData[componentName])}
          >
            <MiniComponent
              // id={componentsData['attend-widget'].id}
              from={config.from}
              mode={config.mode}
              locale={config.locale}
              corpId={config.corpId}
              is={componentName /* 定义在 component.json 中 publicComponents 的字段，不可变 */}
              // componentName={componentsData['carousel-annouce-widget'].componentName}
              componentProps={generateStandardProps(componentsData && componentsData[componentName])}
              config={config}
              // reportWidgetListApi={config.pageAppType === WorktabType.DING_PORTAL ? componentsData['workreport-widget'].props.reportWidgetListApi : undefined}
              // reportWidgetStatusApi={config.pageAppType === WorktabType.DING_PORTAL ? componentsData['workreport-widget'].props.reportWidgetStatusApi : undefined}
              // reportTemplate={config.pageAppType === WorktabType.DING_PORTAL ? componentsData['workreport-widget'].props.reportTemplate : undefined}
            >
              {/* 这里是默认插槽 */}
              <p></p>
              <p></p>
            </MiniComponent>
          </ComponentItem>
        )
      })}
      
    </div>
  );
}

export default App;
