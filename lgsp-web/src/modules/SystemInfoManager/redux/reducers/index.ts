import {
  CreateContentState,
  DeleteInforState,
  GetSystemInfoState,
  InforDetailState,
  ISystemIntroInforState,
  PublicInforState,
  UpdateContentState,
} from '../models';
import { combineReducers } from 'redux';
import systemIntroInforReducer from './SystemIntroInfor';
import { getSystemInfoState } from './get_systeminfo';
import updateState from './update_content';
import { createState } from './create_content';
import { deleteState } from './delete_infor';
import { detailState } from './detail';
import { publicState } from './public_infor';
export interface ISystemInforManager {
  systemIntroInfor: ISystemIntroInforState;
  getSystemInfoState: GetSystemInfoState;
  createState: CreateContentState;
  updateState: UpdateContentState;
  deleteState: DeleteInforState;
  detailState: InforDetailState;
  publicState: PublicInforState;
}

export default combineReducers<ISystemInforManager>({
  systemIntroInfor: systemIntroInforReducer,
  getSystemInfoState: getSystemInfoState,
  createState: createState,
  updateState: updateState,
  deleteState: deleteState,
  detailState: detailState,
  publicState: publicState,
});
