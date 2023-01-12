import { IConfigItem } from '@/config-center/types';

export interface ISystemStraightLine extends IConfigItem {
  //绑定锚点
  bind_anchors: {
    start: IBindAnchors | null;
    end: IBindAnchors | null;
  };
}
export interface IBindAnchors {
  type: ELineBindAnchors;
  target_id: string;
}
export enum ELineBindAnchors {
  TopCenter = 'TopCenter',
  Left = 'Left',
  Right = 'Right',
  BottomCenter = 'BottomCenter'
}
