export interface SearchParam {
  action: 'sell' | 'buy';
  crypto: string;
  fiat: string;
  payment: string;
}

export interface TabP2PState {
  data: Object;
  searchParam: SearchParam;
  listToken: any;
  listFiat: any;
  listPayment: any;
  amount: any;
}
