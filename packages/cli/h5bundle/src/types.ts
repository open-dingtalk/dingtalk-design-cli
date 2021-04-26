export interface IGlobalConfig {
  corpId: string;
  pageAppType: string;
  from: string;
  locale: string;
  mode: string;
}

export interface ITitleBarModel {
  icon?: string;
  title: string;
  link?: string;
  titleColor: string;
  subLabel?: string;
  showArrow?: boolean;
  manage?: {
    link?: string;
    leftIcon?: string;
  }
}