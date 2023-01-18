import { IDoneJson } from '@/store/global/types';

export interface IVisiableInfo {
  handle_panel: boolean;
  connection_panel: boolean;
  connection_line: boolean;
  select_item: {
    info: null | IDoneJson;
    index: number;
  };
}
