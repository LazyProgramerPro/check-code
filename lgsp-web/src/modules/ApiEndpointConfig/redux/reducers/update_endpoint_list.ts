import {UpdateEndpointListAction, UpdateEndpointListState} from "../models";
import {EEndpointType} from "../../../../models/common";
import {
  ADD_PRODUCTION_ENDPOINT, ADD_SANDBOX_ENDPOINT,
  CHANGE_FAIL_OVER_ENDPOINT_LIST, CHANGE_HTTP_ENDPOINT_LIST,
  CHANGE_LOAD_BALANCER_ENDPOINT_LIST, INIT_ENDPOINT_DATA_LIST, REMOVE_PRODUCTION_ENDPOINT, REMOVE_SAND_BOX_ENDPOINT
} from "../constants";

const initState: UpdateEndpointListState = {
  params: {
    type: EEndpointType.http,
    productionList: [],
    sandboxList: []
  }
}

export default (state = initState, {type, param, index, endpoint}: UpdateEndpointListAction): UpdateEndpointListState => {
  switch (type){

    case INIT_ENDPOINT_DATA_LIST:
      if(param === undefined){
        return state;
      }
      return {
        ...state,
        params: param
      }

    case CHANGE_HTTP_ENDPOINT_LIST:
      return {
        ...state,
        params: {
          ...state.params,
          type: EEndpointType.http,
          productionList: [],
          sandboxList: []
        }
      }

    case CHANGE_LOAD_BALANCER_ENDPOINT_LIST:
      return {
        ...state,
        params: {
          ...state.params,
          type: EEndpointType.load_balancer,
          productionList: [],
          sandboxList: []
        }
      }

    case CHANGE_FAIL_OVER_ENDPOINT_LIST:
      return {
        ...state,
        params: {
          ...state.params,
          type: EEndpointType.failover,
          productionList: [],
          sandboxList: []
        }
      }

    case ADD_PRODUCTION_ENDPOINT:
      if(endpoint === undefined || endpoint === ''){
        return state;
      }
      return {
        ...state,
        params: {
          ...state.params,
          productionList: [...state.params.productionList, endpoint]
        }
      }

    case REMOVE_PRODUCTION_ENDPOINT:
        if(index === undefined || index < 0){
          return state;
        }
        const newProductionList = [
          ...state.params.productionList.slice(0, index),
          ...state.params.productionList.slice(index+1)
        ]
      return {
          ...state,
        params: {
            ...state.params,
          productionList: newProductionList,
        }
      }

    case ADD_SANDBOX_ENDPOINT:
      if(endpoint === undefined || endpoint === ''){
        return state;
      }
      return {
        ...state,
        params: {
          ...state.params,
          sandboxList: [...state.params.sandboxList, endpoint]
        }
      }

    case REMOVE_SAND_BOX_ENDPOINT:
      if(index === undefined || index < 0){
        return state;
      }
      const newSandboxList = [
        ...state.params.sandboxList.slice(0, index),
        ...state.params.sandboxList.slice(index+1)
      ]
      return {
        ...state,
        params: {
          ...state.params,
          sandboxList: newSandboxList,
        }
      }
    default:
      return state;
  }
}
