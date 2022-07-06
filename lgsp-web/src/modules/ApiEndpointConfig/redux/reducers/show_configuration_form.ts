import {ShowConfigurationFormAction, ShowConfigurationFormState} from "../models";
import {SHOW_LOAD_BALANCE_FORM, SHOW_SECURITY_FORM} from "../constants";
import {EEnvironmentType, ESecurityType} from "../../../GroupApiEndpoint/models";


const initState: ShowConfigurationFormState = {
  productionSecurityShow: false,
  sandboxSecurityShow: false,
  loadBalanceShow: false,
  endpointType: EEnvironmentType.PROD,
  securityData: undefined,
  loadBalanceData: undefined
}

export default (state = initState, {type, securityShow, loadBalanceShow, endpointType, securityData, loadBalanceData}: ShowConfigurationFormAction): ShowConfigurationFormState => {
  switch (type){
    case SHOW_SECURITY_FORM:
      const initSecurityData = {
        grantType: ESecurityType.NONE,
        username: '',
        password: '',
        tokenUrl: '',
        clientId: '',
        clientSecret: ''
      }
      if(securityShow){
        if(securityData == undefined){
          securityData = initSecurityData;
        }
        if(endpointType === EEnvironmentType.PROD){
          return {
            ...state,
            productionSecurityShow: securityShow,
            endpointType: endpointType,
            securityData: securityData
          }
        }else {
          return {
            ...state,
            sandboxSecurityShow: securityShow,
            endpointType: endpointType,
            securityData: securityData
          }
        }

      }else {
        if(endpointType === EEnvironmentType.PROD){
          return {
            ...state,
            productionSecurityShow: securityShow,
            endpointType: endpointType,
            securityData: initSecurityData
          }
        }else {
          return {
            ...state,
            sandboxSecurityShow: securityShow,
            endpointType: endpointType,
            securityData: initSecurityData
          }
        }
      }

    case SHOW_LOAD_BALANCE_FORM:
      if(loadBalanceData !== undefined){
        return {
          ...state,
          loadBalanceShow: loadBalanceShow,
          loadBalanceData: loadBalanceData
        }
      }else {
        return {
          ...state,
          loadBalanceShow: loadBalanceShow
        }
      }

    default:
      return state;
  }
}
