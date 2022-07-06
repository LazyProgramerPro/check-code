import {IFooterState, IHomePageState} from '../models';
import {combineReducers} from "redux";
import homePage from './homePageReducer';
import footer from "./footerReducer"

export interface IMainPageState{
  homePage: IHomePageState;
  footer: IFooterState
}

export default combineReducers<IMainPageState>({
  homePage: homePage,
  footer: footer
})
