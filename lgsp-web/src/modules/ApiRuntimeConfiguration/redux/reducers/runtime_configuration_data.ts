import { ApiRuntimeConfigurationDataAction, ApiRuntimeConfigurationDataState } from '../models';
import {
  ADD_FILE_CERTIFICATE_TO_LIST,
  API_RUNTIME_CONFIGURATION_CHANGE_TRANSPORT_TYPE,
  API_RUNTIME_CONFIGURATION_DATA_INIT,
  API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_CACHING,
  DELETE_FILE_CERTIFICATE_FROM_LIST,
  API_RUNTIME_CONFIGURATION_CHANGE_CACHING_VALUE,
  API_RUNTIME_CONFIGURATION_CHANGE_THROUGHPUT_TYPE,
  API_RUNTIME_CONFIGURATION_CHANGE_PRODUCTION_THROUGHPUT_VALUE,
  API_RUNTIME_CONFIGURATION_CHANGE_SANDBOX_THROUGHPUT_VALUE,
  SHOW_CERTIFICATE_FILE_INFORMATION,
  SHOW_ADD_CERTIFICATE_FILE_FORM,
  API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_SSL,
  RELOAD_API,
} from '../constants';
import { EThroughput } from '../../../../models/common';

const initState: ApiRuntimeConfigurationDataState = {
  loading: false,
  error: undefined,
  showCertDetail: false,
  certDetail: undefined,
  data: {
    transports: [],
    enabledSsl: false,
    cacheTimeout: 300,
    enabledCaching: true,
    throughputType: EThroughput.UNLIMITED,
    maxTps: undefined,
    certificateList: [],
  },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  {
    type,
    transportType,
    throughputType,
    certFile,
    showAddCert,
    cachingValue,
    throughputValue,
    showCertDetail,
    data,
    error,
  }: ApiRuntimeConfigurationDataAction,
): ApiRuntimeConfigurationDataState => {
  switch (type) {
    case API_RUNTIME_CONFIGURATION_DATA_INIT:
      if (data === undefined) {
        return state;
      }
      return {
        ...state,
        data: data,
      };

    case API_RUNTIME_CONFIGURATION_CHANGE_TRANSPORT_TYPE:
      return {
        ...state,
        data: {
          ...state.data,
          transports: transportType || [],
        },
      };

    case API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_SSL:
      return {
        ...state,
        data: {
          ...state.data,
          enabledSsl: !state.data.enabledSsl,
        },
      };

    case ADD_FILE_CERTIFICATE_TO_LIST:
      if (certFile === undefined) {
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          certificateList: [...state.data.certificateList, certFile],
        },
      };

    case DELETE_FILE_CERTIFICATE_FROM_LIST:
      if (certFile === undefined) {
        return state;
      }
      const oldCertList = state.data.certificateList;
      const newCertList = oldCertList.filter(item => item.alias !== certFile.alias);
      return {
        ...state,
        data: {
          ...state.data,
          certificateList: newCertList,
        },
      };

    case API_RUNTIME_CONFIGURATION_CHANGE_ENABLE_CACHING:
      return {
        ...state,
        data: {
          ...state.data,
          enabledCaching: !state.data.enabledCaching,
        },
      };

    case API_RUNTIME_CONFIGURATION_CHANGE_CACHING_VALUE:
      if (cachingValue === undefined || cachingValue <= 0) {
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          cacheTimeout: cachingValue,
        },
      };

    case API_RUNTIME_CONFIGURATION_CHANGE_THROUGHPUT_TYPE: {
      return {
        ...state,
        data: {
          ...state.data,
          throughputType: throughputType,
        },
      };
    }

    case API_RUNTIME_CONFIGURATION_CHANGE_PRODUCTION_THROUGHPUT_VALUE:
      if (state.data.throughputType === EThroughput.UNLIMITED) {
        return state;
      }
      if (throughputValue === undefined || throughputValue <= 0) {
        return state;
      }
      if (state.data.maxTps == undefined) {
        return {
          ...state,
          data: {
            ...state.data,
            maxTps: {
              sandbox: 0,
              production: throughputValue,
            },
          },
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            maxTps:
              {
                ...state.data.maxTps,
                production: throughputValue,
              } || undefined,
          },
        };
      }

    case API_RUNTIME_CONFIGURATION_CHANGE_SANDBOX_THROUGHPUT_VALUE:
      if (state.data.throughputType === EThroughput.UNLIMITED) {
        return state;
      }
      if (throughputValue === undefined || throughputValue <= 0) {
        return state;
      }
      if (state.data.maxTps == undefined) {
        return {
          ...state,
          data: {
            ...state.data,
            maxTps: {
              production: 0,
              sandbox: throughputValue,
            },
          },
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            maxTps:
              {
                ...state.data.maxTps,
                sandbox: throughputValue,
              } || undefined,
          },
        };
      }

    case SHOW_CERTIFICATE_FILE_INFORMATION:
      if (certFile === undefined) {
        return {
          ...state,
          showCertDetail: showCertDetail,
        };
      } else {
        return {
          ...state,
          showCertDetail: showCertDetail,
          certDetail: certFile,
        };
      }

    case SHOW_ADD_CERTIFICATE_FILE_FORM:
      return {
        ...state,
        showAddCert: showAddCert,
      };
    case RELOAD_API: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
