import React from 'react';
import './App.css';
import * as H5ProComponentReact from './h5pro-component-react';
import componentModule from './bundle';
import sdkCtl from './sdk';
import qs from 'query-string'

const sdk = sdkCtl.main();
componentModule.main().registerWorktab(sdk);

interface IQueryParams {
  corpId: string;
  mode: string;
}

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

  return (
    <div className="App">
      {Object.keys(publicComponents).map(componentName => {
        return (
          <MiniComponent
            // id={componentsData['attend-widget'].id}
            from={config.from}
            mode={config.mode}
            locale={config.locale}
            corpId={config.corpId}
            is={componentName /* 定义在 component.json 中 publicComponents 的字段，不可变 */}
            // componentName={componentsData['carousel-annouce-widget'].componentName}
            // componentProps={componentsData['carousel-annouce-widget'].props}
            config={config}
            // reportWidgetListApi={config.pageAppType === WorktabType.DING_PORTAL ? componentsData['workreport-widget'].props.reportWidgetListApi : undefined}
            // reportWidgetStatusApi={config.pageAppType === WorktabType.DING_PORTAL ? componentsData['workreport-widget'].props.reportWidgetStatusApi : undefined}
            // reportTemplate={config.pageAppType === WorktabType.DING_PORTAL ? componentsData['workreport-widget'].props.reportTemplate : undefined}

          >
            {/* 这里是默认插槽 */}
            <p></p>
            <p></p>
          </MiniComponent>
        )
      })}
      
    </div>
  );
}

export default App;
