/* --- STATE --- */
export interface ChatboxState {
  listMessage: Array<any>;
  pageSize: number;
  pageIndex: number;
  ts: number;
  totalMessage: number;
}
