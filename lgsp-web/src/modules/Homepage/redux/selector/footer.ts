import {RootState} from 'src/redux/reducers';
import {createSelector} from 'reselect'

export const getAddressInfor = (state: RootState) => state.systemInforManager.systemIntroInfor.data;

export const getAddressInforSelector = createSelector(
  [getAddressInfor],
  addresInfor => addresInfor?.find(row => row?.type === 1)
);
