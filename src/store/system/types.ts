import { IDoneJson } from '../global/types';

export interface EditPrivateStoreState {
  old_done_components: IDoneJson[];
  history_doneComponent: IDoneJson[][];
  history_nowindex: number;
  is_record_history: boolean;
  max_record_times: number;
}
