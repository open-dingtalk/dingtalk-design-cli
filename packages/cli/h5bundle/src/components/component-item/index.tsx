import React, {PropsWithChildren} from 'react';
import cx from 'classnames';
import { IGlobalConfig } from '../../types';
import ViewContainer from '../view-container';
import './index.css';
import ComponentTitleBar from '../component-title-bar'

interface IProps {
  mode: string;
  componentProps: any;
  config: IGlobalConfig
}

export default function ComponentItem(props: PropsWithChildren<IProps>) {
  const {
    mode,
    componentProps = {},
    config,
    children,
  } = props


  return (
    <div className={cx('ddworkspace-component-item', mode)}>
      <ViewContainer
        mode={mode}
        config={config}
        componentProps={componentProps}
      >
        {componentProps.__useStandardHead__ && (
          <ComponentTitleBar
            mode={mode}
            componentProps={componentProps}
            titleBarModel={componentProps.__useStandardHead__}
          ></ComponentTitleBar>
        )}
        {children}
      </ViewContainer>
    </div>
  )
}