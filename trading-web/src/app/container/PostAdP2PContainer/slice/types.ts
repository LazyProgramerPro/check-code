export interface DataPostAdP2PState {
  // 1
  orderType?: 0 | 1;
  tokenId?: number;
  fiatId?: number;
  priceType?: 0 | 1;
  price?: number;

  // 2
  amount?: number;
  orderLowerBound?: number;
  orderUpperBound?: number;
  paymentTimeId?: string;
  total?: number;
  paymentIds?: any[];

  // 3
  remarks?: string;
  autoReply?: string;
  kycRequired?: 0 | 1; //0 is not Required / 1 is Required
  registeredRequired?: 0 | 1; //0 is not Required / 1 is Required
  registeredAfterNDays?: number; //Days registered after this number is valid
  holdingBTCRequired?: 0 | 1; //0 is not Required / 1 is Required
  holdingBTCAmount?: number;
  status?: string; //ONLINE, OFFLINE, CLOSED, FILLED, PARTIALLY_FILLED
  // Note: FILLED, PARTIALLY_FILLED are status for SELLER

  accountEmail?: string;

  floatingPercent?: number;
  //
  fiatName?: string;
  tokenName?: string;
  paymentMethodSelected?: any[];
  paymentTime?: any;
}

export interface PostAdP2PState {
  currentStep: number;
  data: DataPostAdP2PState;
}
