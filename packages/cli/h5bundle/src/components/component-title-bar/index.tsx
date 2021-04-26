import React from 'react';
import cx from 'classnames';
import { ITitleBarModel, } from '../../types';
import './index.css';

interface IProps {
  mode: string;
  titleBarModel: ITitleBarModel;
  componentProps: any
}

const PROMOTION_STATE_TRYOUT = 'STANDARD_WORKTAB';

export default function ComponentTitleBar(props: IProps) {
  const {
    mode,
    titleBarModel,
    componentProps,
  } = props;

  const onTitleClick = () => {
    const {
      titleBarModel,
      componentProps = {},
    } = props;
    const {
        link = '',
    } = titleBarModel || {};
    const {
        // 营销态标记
        promotionState,
        // 营销态地址
        tryoutAddress = '',
    } = componentProps;
    
    if (promotionState === PROMOTION_STATE_TRYOUT) {
        if (tryoutAddress) {
            alert({
                content: `打开营销态地址：${tryoutAddress}`,
            });
        }
        return;
    }
    alert({
        content: `打开标题地址：${link}`,
    });
    console.log('点击标题：', link);
  }

  const onManageClick = () => {
    const {
      titleBarModel = {} as ITitleBarModel,
    } = props;
    const {
        manage = {},
    } = titleBarModel;
    const {
        link = '',
    } = manage;

    alert({
        content: `打开管理地址：${link}`,
    });
  }

  return (
    <div className={cx('ddworkspace-title-bar-area', mode)}>
      <div className="main-title" onClick={onTitleClick}>
        {titleBarModel.icon && <img className="logo" src={titleBarModel.icon} style={{objectFit: 'cover'}} />}
        <div className="title text-ellipsis" style={{
          color: titleBarModel.titleColor
        }}>{titleBarModel.title}</div>
        {titleBarModel.subLabel && <div className="sub-title">{titleBarModel.subLabel}</div>}
        {titleBarModel.showArrow && <div className="iconfont icon-next-arrow tips-arrow"></div>}
        {componentProps.promotionState === PROMOTION_STATE_TRYOUT && <div className="demo-label-tag">示例</div>}
      </div>
      <div className="extra-area">
        {titleBarModel.manage && (
          <div className="action action-manage" onClick={onManageClick}>
            <div className="action-icon left-icon" style={{
              backgroundImage: `url('${titleBarModel.manage.leftIcon}')`
            }}></div>
          </div>
        )}
      </div>
    </div>
  )
}