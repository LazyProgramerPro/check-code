import {ApiDeploymentDataAction, ApiDeploymentDataState} from "../models";
import {ADD_CURRENT_GATEWAY, DEPLOY_GATEWAY, INIT_DEPLOYMENT_DATA} from "../constants";

const initState: ApiDeploymentDataState = {
  loading: false,
  data: undefined,
  error: undefined,
  deployParam: undefined
}

export default (state = initState, {type, data, currGw, deployParam, error}: ApiDeploymentDataAction): ApiDeploymentDataState => {
  switch (type){
    case INIT_DEPLOYMENT_DATA:
      if(data === undefined){
        return state;
      }
      return {
        ...state,
        data: data
      }

    case ADD_CURRENT_GATEWAY:
      if(currGw === undefined){
        return state;
      }
      const newGatewayList= state.data?.map(item => {
          if(item.name === currGw.name){
            item.current = true;
            return item;
          }else {
            if(item.current){
              item.current = false;
            }
            return item;
          }
      });
      return {
        ...state,
        data: newGatewayList
      }

    case DEPLOY_GATEWAY:
      return {
        ...state,
        loading: true,
        deployParam: deployParam
      }
    default:
      return state;
  }
}
