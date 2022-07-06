import {UpdateEndpointListAction, UpdateEndpointListParam} from "../models";
import {
  ADD_PRODUCTION_ENDPOINT,
  ADD_SANDBOX_ENDPOINT,
  CHANGE_FAIL_OVER_ENDPOINT_LIST,
  CHANGE_HTTP_ENDPOINT_LIST,
  CHANGE_LOAD_BALANCER_ENDPOINT_LIST, INIT_ENDPOINT_DATA_LIST,
  REMOVE_PRODUCTION_ENDPOINT,
  REMOVE_SAND_BOX_ENDPOINT
} from "../constants";

export const initEndpointDataList = (param: UpdateEndpointListParam): UpdateEndpointListAction => {
  return {
    type: INIT_ENDPOINT_DATA_LIST,
    param: param
  }
}

export const changeHttpEndpointList = (): UpdateEndpointListAction => {
  return {
    type: CHANGE_HTTP_ENDPOINT_LIST
  }
}

export const changeLoadBalancerEndpointList = (): UpdateEndpointListAction => {
  return {
    type: CHANGE_LOAD_BALANCER_ENDPOINT_LIST
  }
}
export const changeFailOverEndpointList = (): UpdateEndpointListAction => {
  return {
    type: CHANGE_FAIL_OVER_ENDPOINT_LIST
  }
}
export const addProductionEndpoint = (endpoint: string): UpdateEndpointListAction=> {
    return {
      type: ADD_PRODUCTION_ENDPOINT,
      endpoint: endpoint
    }
}

export const removeProductionEndpoint = (index: number): UpdateEndpointListAction => {
  return {
    type: REMOVE_PRODUCTION_ENDPOINT,
    index: index
  }
}

export const addSandboxEndpoint = (endpoint: string): UpdateEndpointListAction=> {
  return {
    type: ADD_SANDBOX_ENDPOINT,
    endpoint: endpoint
  }
}

export const removeSandboxEndpoint = (index: number): UpdateEndpointListAction => {
  return {
    type: REMOVE_SAND_BOX_ENDPOINT,
    index: index
  }
}
