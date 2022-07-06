import {
  ApiResourceDataAction,
  ApiResourceDataState,
  ApiResourceEntity,
  ApiResourceParamEntity,
  ApiResourceResponseEntity,
  ResourceGroup,
} from '../models';
import {
  ADD_NEW_API_RESOURCE,
  ADD_PARAMETER_TO_RESOURCE,
  ADD_RESPONSE_TO_RESOURCE,
  CHANGE_API_POLICY_TYPE,
  CHANGE_DESCRIPTION_RESOURCE,
  CHANGE_POLICY_RESOURCE,
  DELETE_API_RESOURCE,
  DELETE_PARAMETER_FROM_RESOURCE,
  DELETE_RESPONSE_FROM_RESOURCE,
  INIT_API_RESOURCE_DATA,
  RELOAD_API_RESOURCE,
  UPDATE_PARAMETER_TO_RESOURCE,
  UPDATE_RESPONSE_TO_RESOURCE,
} from '../constants';
import { EHttpMethod } from '../../../../models/common';
import { addResponseToResource } from '../actions/api_resource_data';
import { NotificationSuccess } from 'src/components/Notification/Notification';

const initState: ApiResourceDataState = {
  loading: false,
  error: undefined,
  data: undefined,
};

const initApiResourceEntity: ApiResourceEntity = {
  type: EHttpMethod.GET,
  path: '',
  policy: '',
  description: '',
  responses: [
    {
      code: 0,
      description: '',
    },
  ],
  params: [
    {
      type: '',
      in: '',
      name: '',
      required: false,
    },
  ],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  {
    type,
    apiLevel,
    addResourceParam,
    deleteResourceParam,
    policyType,
    addParameterToResource,
    deleteParameterFromResource,
    addResponseToResource,
    deleteResponseFromResource,
    changePolicyResource,
    changeDescriptionResource,
    data,
    error,
    updateParameterToResource,
    updateResponseToResource,
  }: ApiResourceDataAction,
): ApiResourceDataState => {
  switch (type) {
    case INIT_API_RESOURCE_DATA:
      if (data === undefined) {
        return state;
      }
      return {
        ...state,
        data: data,
      };

    case CHANGE_API_POLICY_TYPE:
      if (policyType === undefined) {
        return {
          ...state,
          data: {
            ...state.data,
            apiLevel: apiLevel,
            resourceGroupList: state.data?.resourceGroupList || [],
          },
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            apiLevel: apiLevel,
            policy: policyType || '',
            resourceGroupList: state.data?.resourceGroupList || [],
          },
        };
      }

    case ADD_NEW_API_RESOURCE:
      if (addResourceParam === undefined) {
        return state;
      }
      const oldResourceGroupList = state.data?.resourceGroupList || [];
      const currResourceGroup = oldResourceGroupList.find(item => item.path === addResourceParam.path);
      let newResourceGroupList: ResourceGroup[];
      if (currResourceGroup === undefined) {
        let resources: ApiResourceEntity[] = [];
        addResourceParam.methods.map(item => {
          resources.push({
            type: item,
            description: '',
            params: addResourceParam.resourceParamList || [],
            responses: [],
          });
        });
        const newResourceGroup = {
          path: addResourceParam.path,
          data: resources,
        };
        newResourceGroupList = [...oldResourceGroupList, newResourceGroup];
      } else {
        newResourceGroupList = oldResourceGroupList.map(item => {
          if (item.path !== addResourceParam.path) {
            return item;
          }
          const resourceList = item.data;
          if (resourceList === undefined) {
            return item;
          }
          let newResources: ApiResourceEntity[] = [];
          addResourceParam.methods.map(param => {
            newResources.push({
              type: param,
              description: '',
              params: addResourceParam.resourceParamList || [],
              responses: [],
            });
          });
          newResources.forEach(tempItem => {
            const temp = resourceList.find(res => res.type === tempItem.type);
            if (temp === undefined) {
              resourceList.push(tempItem);
            }
          });
          const newResourceGroup: ResourceGroup = {
            path: addResourceParam.path,
            data: resourceList,
          };
          return newResourceGroup;
        });
      }
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList,
        },
      };
    // const currResourceGroup = oldResourceGroupList.find(item => item.path === addResourceParam.path);
    // let newResourceGroup: ResourceGroup;
    // let newResourceGroupList: ResourceGroup[];
    // if (currResourceGroup === undefined) {
    //   let resources: ApiResourceEntity[] = [];
    //   addResourceParam.methods.map(item => {
    //     resources.push({
    //       type: item,
    //       description: '',
    //       params: [],
    //       responses: []
    //     })
    //   });
    //   newResourceGroup = {
    //     path: addResourceParam.path,
    //     data: resources
    //   }
    //   newResourceGroupList = [...oldResourceGroupList, newResourceGroup];
    // } else {
    //   let resources: ApiResourceEntity[] = currResourceGroup.data;
    //   addResourceParam.methods.map(item => {
    //     const res = resources.filter(e => e.type === item)[0];
    //     if (res === undefined) {
    //       resources.push({
    //         type: item,
    //         description: '',
    //         params: [],
    //         responses: []
    //       })
    //     }
    //   });
    //   newResourceGroup = {
    //     path: addResourceParam.path,
    //     data: resources
    //   }
    //   const tempResourceGroupList: ResourceGroup[] = oldResourceGroupList.filter(item => item.path != addResourceParam.path);
    //   newResourceGroupList = [...tempResourceGroupList, newResourceGroup];
    // }
    // return {
    //   ...state,
    //   data: {
    //     ...state.data,
    //     resourceGroupList: newResourceGroupList
    //   }
    // }

    case DELETE_API_RESOURCE:
      if (deleteResourceParam === undefined) {
        return state;
      }
      const oldResourceGroupList2 = state.data?.resourceGroupList || [];
      const currResourceGroup2 = oldResourceGroupList2.find(item => item.path === deleteResourceParam.path);

      if (currResourceGroup2 === undefined) {
        return state;
      }
      const newResourceDataList2 = currResourceGroup2.data.filter(item => item.type !== deleteResourceParam.method);
      let newResourceGroupList2: ResourceGroup[] = [];
      if (newResourceDataList2.length === 0) {
        newResourceGroupList2 = oldResourceGroupList2.filter(item => item.path !== deleteResourceParam.path);
      } else {
        const indexResource2 = oldResourceGroupList2.map(item => item.path).indexOf(deleteResourceParam.path);
        let currResourceGroupList2: ResourceGroup[] = oldResourceGroupList2.filter(
          item => item.path !== deleteResourceParam.path,
        );
        const newResourceData2 = {
          path: deleteResourceParam.path,
          data: newResourceDataList2,
        };
        if (indexResource2 === 0) {
          newResourceGroupList2 = [newResourceData2, ...currResourceGroupList2];
        } else if (indexResource2 === oldResourceGroupList2.length - 1) {
          newResourceGroupList2 = [...currResourceGroupList2, newResourceData2];
        } else {
          newResourceGroupList2 = [
            ...oldResourceGroupList2.slice(0, indexResource2),
            newResourceData2,
            ...oldResourceGroupList2.slice(indexResource2 + 1),
          ];
        }
      }
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList2,
        },
      };
      return state;

    case ADD_PARAMETER_TO_RESOURCE:
      if (addParameterToResource === undefined) {
        return state;
      }
      const oldResourceGroupList3: ResourceGroup[] = state.data?.resourceGroupList ?? [];
      const newResourceGroupList3: ResourceGroup[] = oldResourceGroupList3.map(item => {
        if (item.path !== addParameterToResource.resource.path) {
          return item;
        }
        const oldResourceEntityList3: ApiResourceEntity[] = item.data;
        const newResourceEntityList3: ApiResourceEntity[] = oldResourceEntityList3.map(resource => {
          if (resource.type !== addParameterToResource.resource.method) {
            return resource;
          }
          const newParam3: ApiResourceParamEntity = {
            in: addParameterToResource.in,
            type: addParameterToResource.type,
            name: addParameterToResource.name,
            required: addParameterToResource.required,
          };
          let newParamList3: ApiResourceParamEntity[];
          if (resource.params == null) {
            newParamList3 = [newParam3];
          } else {
            newParamList3 = [...resource.params, newParam3];
          }
          const newResourceEntity3: ApiResourceEntity = {
            ...resource,
            params: newParamList3,
          };
          return newResourceEntity3;
        });
        const newResourceGroup3: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList3,
        };
        return newResourceGroup3;
      });
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList3,
        },
      };

    case UPDATE_PARAMETER_TO_RESOURCE: {
      if (updateParameterToResource === undefined) {
        return state;
      }

      const oldResourceGroupList3: ResourceGroup[] = state.data?.resourceGroupList ?? [];

      const newResourceGroupList3: ResourceGroup[] = oldResourceGroupList3.map(item => {
        if (item.path !== updateParameterToResource.resource.path) {
          return item;
        }
        const oldResourceEntityList3: ApiResourceEntity[] = item.data;
        const newResourceEntityList3: ApiResourceEntity[] = oldResourceEntityList3.map(resource => {
          if (resource.type !== updateParameterToResource.resource.method) {
            return resource;
          }

          // const paramUpdate: ApiResourceParamEntity = {
          //   in: updateParameterToResource.in,
          //   type: updateParameterToResource.type,
          //   name: updateParameterToResource.name,
          //   required: updateParameterToResource.required,
          // };

          let newParamList3: ApiResourceParamEntity[] = resource.params.map(e => {
            if (e.name === updateParameterToResource.name) {
              e = { ...updateParameterToResource };
              return e;
            }
            return e;
          });

          const newResourceEntity3: ApiResourceEntity = {
            ...resource,
            params: newParamList3,
          };
          return newResourceEntity3;
        });

        const newResourceGroup3: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList3,
        };
        return newResourceGroup3;
      });
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList3,
        },
      };
    }

    case DELETE_PARAMETER_FROM_RESOURCE:
      if (deleteParameterFromResource === undefined) {
        return state;
      }
      const oldResourceGroupList4: ResourceGroup[] = state.data?.resourceGroupList ?? [];
      const newResourceGroupList4: ResourceGroup[] = oldResourceGroupList4.map(item => {
        if (item.path !== deleteParameterFromResource.resource.path) {
          return item;
        }
        const oldResourceEntityList4: ApiResourceEntity[] = item.data;
        const newResourceEntityList4: ApiResourceEntity[] = oldResourceEntityList4.map(resource => {
          if (resource.type !== deleteParameterFromResource.resource.method) {
            return resource;
          }
          const newParamList4 = resource.params.filter(
            param => param.name !== deleteParameterFromResource?.name || param.in !== deleteParameterFromResource.in,
          );
          const newResourceEntity4: ApiResourceEntity = {
            ...resource,
            params: newParamList4,
          };
          return newResourceEntity4;
        });
        const newResourceGroup4: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList4,
        };
        return newResourceGroup4;
      });
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList4,
        },
      };

    case ADD_RESPONSE_TO_RESOURCE:
      if (addResponseToResource === undefined) {
        return state;
      }
      const oldResourceGroupList5: ResourceGroup[] = state.data?.resourceGroupList ?? [];
      const newResourceGroupList5: ResourceGroup[] = oldResourceGroupList5.map(item => {
        if (item.path !== addResponseToResource.resource.path) {
          return item;
        }
        const oldResourceEntityList5: ApiResourceEntity[] = item.data;
        const newResourceEntityList5: ApiResourceEntity[] = oldResourceEntityList5.map(resource => {
          if (resource.type !== addResponseToResource.resource.method) {
            return resource;
          }
          const newResponse5: ApiResourceResponseEntity = {
            code: addResponseToResource.code,
            description: addResponseToResource.description,
          };
          let newResponseList5: ApiResourceResponseEntity[];
          if (resource.responses == null) {
            newResponseList5 = [newResponse5];
          } else {
            newResponseList5 = [...resource.responses, newResponse5];
          }
          const newResourceEntity5: ApiResourceEntity = {
            ...resource,
            responses: newResponseList5,
          };
          return newResourceEntity5;
        });
        const newResourceGroup5: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList5,
        };
        return newResourceGroup5;
      });
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList5,
        },
      };

    case UPDATE_RESPONSE_TO_RESOURCE: {
      if (updateResponseToResource === undefined) {
        return state;
      }
      const oldResourceGroupList5: ResourceGroup[] = state.data?.resourceGroupList ?? [];
      const newResourceGroupList5: ResourceGroup[] = oldResourceGroupList5.map(item => {
        if (item.path !== updateResponseToResource.resource.path) {
          return item;
        }
        const oldResourceEntityList5: ApiResourceEntity[] = item.data;
        const newResourceEntityList5: ApiResourceEntity[] = oldResourceEntityList5.map(resource => {
          if (resource.type !== updateResponseToResource.resource.method) {
            return resource;
          }

          let newResponseList5: ApiResourceResponseEntity[] = resource.responses.map(e => {
            if (e.code === updateResponseToResource.code) {
              e = { ...updateResponseToResource };
              return e;
            }
            return e;
          });

          const newResourceEntity5: ApiResourceEntity = {
            ...resource,
            responses: newResponseList5,
          };
          return newResourceEntity5;
        });
        const newResourceGroup5: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList5,
        };
        return newResourceGroup5;
      });

      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList5,
        },
      };
    }

    case DELETE_RESPONSE_FROM_RESOURCE:
      if (deleteResponseFromResource === undefined) {
        return state;
      }
      const oldResourceGroupList6: ResourceGroup[] = state.data?.resourceGroupList ?? [];
      const newResourceGroupList6: ResourceGroup[] = oldResourceGroupList6.map(item => {
        if (item.path !== deleteResponseFromResource.resource.path) {
          return item;
        }
        const oldResourceEntityList6: ApiResourceEntity[] = item.data;
        const newResourceEntityList6: ApiResourceEntity[] = oldResourceEntityList6.map(resource => {
          if (resource.type !== deleteResponseFromResource.resource.method) {
            return resource;
          }
          const newResponseList6 = resource.responses.filter(resp => resp.code !== deleteResponseFromResource.code);
          const newResourceEntity6: ApiResourceEntity = {
            ...resource,
            responses: newResponseList6,
          };
          return newResourceEntity6;
        });
        const newResourceGroup6: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList6,
        };
        return newResourceGroup6;
      });
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList6,
        },
      };

    case CHANGE_POLICY_RESOURCE:
      if (changePolicyResource === undefined) {
        return state;
      }
      const oldResourceGroupList7: ResourceGroup[] = state.data?.resourceGroupList ?? [];
      const newResourceGroupList7: ResourceGroup[] = oldResourceGroupList7.map(item => {
        if (item.path !== changePolicyResource.resource.path) {
          return item;
        }
        const oldResourceEntityList7: ApiResourceEntity[] = item.data;
        const newResourceEntityList7: ApiResourceEntity[] = oldResourceEntityList7.map(resource => {
          if (resource.type !== changePolicyResource.resource.method) {
            return resource;
          }
          const newResourceEntity7: ApiResourceEntity = {
            ...resource,
            policy: changePolicyResource.policy,
          };
          return newResourceEntity7;
        });
        const newResourceGroup7: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList7,
        };
        return newResourceGroup7;
      });
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList7,
        },
      };

    case CHANGE_DESCRIPTION_RESOURCE:
      if (changeDescriptionResource === undefined) {
        return state;
      }
      const oldResourceGroupList8: ResourceGroup[] = state.data?.resourceGroupList ?? [];
      const newResourceGroupList8: ResourceGroup[] = oldResourceGroupList8.map(item => {
        if (item.path !== changeDescriptionResource.resource.path) {
          return item;
        }
        const oldResourceEntityList8: ApiResourceEntity[] = item.data;
        const newResourceEntityList8: ApiResourceEntity[] = oldResourceEntityList8.map(resource => {
          if (resource.type !== changeDescriptionResource.resource.method) {
            return resource;
          }
          const newResourceEntity8: ApiResourceEntity = {
            ...resource,
            description: changeDescriptionResource?.description,
          };
          return newResourceEntity8;
        });
        const newResourceGroup8: ResourceGroup = {
          path: item.path,
          data: newResourceEntityList8,
        };
        return newResourceGroup8;
      });
      return {
        ...state,
        data: {
          ...state.data,
          resourceGroupList: newResourceGroupList8,
        },
      };
    case RELOAD_API_RESOURCE: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
