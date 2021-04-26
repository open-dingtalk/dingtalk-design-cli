import React from 'react';
import cx from 'classnames';
import './index.css'

interface IProps {
    className?: string;
    config: any;
    componentProps: any;
    children?: any;
    mode?: string
}

export function getRemByPixel(value = 0) {
  const remRootValue = 50;
  return value / remRootValue;
}

/**
 外层传进来的只有props.viewContainerStyle
 getViewContainerStyleStr优先级是最高的，会覆盖老的已生效的props

 兼容方案务必保留，避免大量存量老数据展现出现异常
 老的已存在的props:
 fullWidth,borderRadius,boxShadow,backgroundImageMode,
 backgroundColor,backgroundImage,borderColor,borderWidth,marginBottom,
 */
function getViewContainerStyleStr(componentProps?: any) {
    if (!componentProps) {
        return {};
    }
    // 优先使用最新格式： __useStandardContainer__
    const viewContainerStyle = componentProps.__useStandardContainer__ || componentProps.viewContainerStyle || {};
    const {
        __containerType__ = {},
    } = componentProps;

    // 其中boxShadow是对外层box-shadow的覆盖
    // backgroundSize是对外层backgroundImageMode的覆盖
    return {
        backgroundColor: `${viewContainerStyle.backgroundColor !== undefined ? viewContainerStyle.backgroundColor : componentProps.backgroundColor}`,
        backgroundImage: `url(${viewContainerStyle.backgroundImage !== undefined ? viewContainerStyle.backgroundImage : componentProps.backgroundImage || ''})`,
        borderColor: `${viewContainerStyle.borderColor !== undefined ? viewContainerStyle.borderColor : componentProps.borderColor}`,
        borderWidth: `${viewContainerStyle.borderWidth !== undefined ? viewContainerStyle.borderWidth : componentProps.borderWidth}px`,
        marginBottom: `${viewContainerStyle.marginBottom !== undefined ? viewContainerStyle.marginBottom : componentProps.marginBottom}px`,
        paddingTop: `${viewContainerStyle.paddingTop !== undefined ? viewContainerStyle.paddingTop : componentProps.paddingTop}px`,
        paddingBottom: `${viewContainerStyle.paddingBottom !== undefined ? viewContainerStyle.paddingBottom : componentProps.paddingBottom}px`,
        marginTop: `${viewContainerStyle.marginTop}px`,
        marginLeft: `${viewContainerStyle.marginLeft}px`,
        marginRight: `${viewContainerStyle.marginRight}px`,
        borderTopLeftRadius: `${viewContainerStyle.borderTopLeftRadius}px`,
        borderTopRightRadius: `${viewContainerStyle.borderTopRightRadius}px`,
        borderBottomLeftRadius: `${viewContainerStyle.borderBottomLeftRadius}px`,
        borderBottomRightRadius: `${viewContainerStyle.borderBottomRightRadius}px`,
        boxShadow: `${viewContainerStyle.boxShadow}`,
        backgroundSize: `${viewContainerStyle.backgroundSize}`,
        // 支持基于__containerType__设置高度-为了和组件本身的单位一致，统一转为rem
        height: __containerType__.height !== undefined ? `${getRemByPixel(__containerType__.height)}rem` : undefined,
    };
    // return `
    //   backgroundColor:${viewContainerStyle.backgroundColor !== undefined ? viewContainerStyle.backgroundColor : componentProps.backgroundColor};
    //   backgroundImage:url(${viewContainerStyle.backgroundImage !== undefined ? viewContainerStyle.backgroundImage : componentProps.backgroundImage || ''});
    //   borderColor:${viewContainerStyle.borderColor !== undefined ? viewContainerStyle.borderColor : componentProps.borderColor};
    //   borderWidth:${viewContainerStyle.borderWidth !== undefined ? viewContainerStyle.borderWidth : componentProps.borderWidth};
    //   marginBottom:${viewContainerStyle.marginBottom !== undefined ? viewContainerStyle.marginBottom : componentProps.marginBottom};
    //   paddingTop:${viewContainerStyle.paddingTop !== undefined ? viewContainerStyle.paddingTop : componentProps.paddingTop};
    //   paddingBottom:${viewContainerStyle.paddingBottom !== undefined ? viewContainerStyle.paddingBottom : componentProps.paddingBottom};
    //   marginTop:${viewContainerStyle.marginTop};
    //   marginLeft:${viewContainerStyle.marginLeft};
    //   marginRight:${viewContainerStyle.marginRight};
    //   borderTopLeftRadius:${viewContainerStyle.borderTopLeftRadius};
    //   borderTopRightRadius:${viewContainerStyle.borderTopRightRadius};
    //   borderBottomLeftRadius:${viewContainerStyle.borderBottomLeftRadius};
    //   borderBottomRightRadius:${viewContainerStyle.borderBottomRightRadius};

    //   boxShadow:${viewContainerStyle.boxShadow};
    //   backgroundSize:${viewContainerStyle.backgroundSize};
    // `;
}

export default function ViewContainer(props: IProps) {
    const {
        className,
        componentProps,
        children,
    } = props;

    const {
        fullWidth,
        borderRadius,
        boxShadow,
        backgroundImageMode,
        isTransformLayer,
    } = componentProps || {};

    return <div
        className={cx(
            'custom-widget-container',
            'view-container',
            'component-view-container',
            className,
            // 严格判断，只要fullWidth不为false，就全屏，避免历史兼容的bug
            fullWidth === false ? 'no-full-width' : '',
            borderRadius ? 'border-radius' : '',
            boxShadow ? 'box-shadow' : '',
            `image-mode-${backgroundImageMode}`,
            isTransformLayer ? 'transform-layer' : '',
        )}
        style={getViewContainerStyleStr(componentProps)}
    >
        {children}
    </div>;
}
