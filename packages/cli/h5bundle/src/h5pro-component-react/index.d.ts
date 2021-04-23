import * as React from 'react';

interface IRegisterModuleOption4RegisterGlobalSymbol {
  my: unknown;
  getApp(): unknown;
}

interface IAppxH5ComponentPagePublicInstance {
  readonly data: Record<string, any>;
  readonly $viewId: string;
  readonly $id: number;
  $batchedUpdates(fn: () => void): void;
  $spliceData(data: Record<string, any>, callback?: () => void): void;
  setData(data: Record<string, any>, callback?: () => void): void;
  [P: string]: any;
}

interface IRegisterModuleOption {
  onRegisterGlobalSymbol(symbolMap: IRegisterModuleOption4RegisterGlobalSymbol): void | Partial<IRegisterModuleOption4RegisterGlobalSymbol>;
  onPageLoad(payload: {
    page: IAppxH5ComponentPagePublicInstance;
    componentIs: string;
    readonly componentProps: Record<string, unknown>;
  }): void;
}

export declare function Slot<T = unknown>(props: { children?: T }): T | null;
export declare function createComponent(componentModule: any): React.ComponentClass<{ is: string; [P: string]: any }>;
export declare function registerModule<T = unknown>(
  componentModule: any,
  option?: void | Partial<IRegisterModuleOption> | IRegisterModuleOption['onRegisterGlobalSymbol']
): {
  main: T;
  component2: boolean;
  Component: React.ComponentClass<{ is: string; [P: string]: any }>;
  pluginId: string | void;
};
