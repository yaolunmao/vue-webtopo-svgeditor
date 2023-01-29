import { IDoneJson } from '../global/types';

export interface EditPrivateStoreState {
  old_done_components: IDoneJson[];
  history_doneComponent: IDoneJson[][];
  history_nowindex: number;
  is_record_history: boolean;
  max_record_times: number;
}
export interface ContextMenuStoreState {
  display: boolean;
  info: {
    [key in EContextMenuInfoType]: IContextMenuInfo;
  };
}
export interface IContextMenuInfo {
  title: string;
  hot_key: string;
  enable: boolean;
}
export enum EContextMenuInfoType {
  Copy = 'Copy',
  Delete = 'Delete',
  MoveUpOneLevel = 'MoveUpOneLevel',
  MoveDownOneLevel = 'MoveDownOneLevel',
  MoveUpTopLevel = 'MoveUpTopLevel',
  MoveDownTopLevel = 'MoveDownTopLevel'
}

export enum EShortcutKeyType {
  Copy = 'Copy',
  Delete = 'Delete',
  MoveUpOneLevel = 'MoveUpOneLevel',
  MoveDownOneLevel = 'MoveDownOneLevel',
  MoveUpTopLevel = 'MoveUpTopLevel',
  MoveDownTopLevel = 'MoveDownTopLevel',
  Redo = 'Redo',
  Undo = 'Undo',
  MoveUp = 'MoveUp',
  MoveDown = 'MoveDown',
  MoveLeft = 'MoveLeft',
  MoveRight = 'MoveRight'
}
