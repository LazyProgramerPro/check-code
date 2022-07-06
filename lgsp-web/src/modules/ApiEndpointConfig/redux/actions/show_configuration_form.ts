import {LoadBalancerConfigurationEntity, OAuthConfigurationEntity, ShowConfigurationFormAction} from "../models";
import {SHOW_LOAD_BALANCE_FORM, SHOW_SECURITY_FORM} from "../constants";
import {EEnvironmentType} from "../../../GroupApiEndpoint/models";

export const showSecurityForm = (show: boolean, endpointType?: EEnvironmentType, securityData?: OAuthConfigurationEntity): ShowConfigurationFormAction => {
    if(securityData !== null){
      return {
        type: SHOW_SECURITY_FORM,
        securityShow: show,
        securityData: securityData,
        endpointType: endpointType
      }
    }else {
      return{
        type: SHOW_SECURITY_FORM,
        securityShow: show,
        endpointType: endpointType
      }
    }
}


export const showLoadBalanceForm = (show: boolean, loadBalanceData?: LoadBalancerConfigurationEntity): ShowConfigurationFormAction => {
  if(loadBalanceData !== undefined){
    return{
      type: SHOW_LOAD_BALANCE_FORM,
      loadBalanceShow: show,
      loadBalanceData: loadBalanceData
    }
  }else {
    return{
      type: SHOW_LOAD_BALANCE_FORM,
      loadBalanceShow: show
    }
  }
}

