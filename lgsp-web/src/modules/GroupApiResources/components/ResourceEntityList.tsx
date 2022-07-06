import React from 'react';
import { FieldProps } from 'formik';
import ResourceEntity from './ResourceEntity';
import { IApiEndpointEntity, IResourceList } from '../redux/models';
import produce, { Draft } from 'immer';
type IResourceEntityList = FieldProps<any>

const ResourceEntityList = (props: IResourceEntityList) => {
  const { form: { values, setFieldValue } } = props;
  const { resourceList } = values;
  const onEditResource = (values: IApiEndpointEntity, path:string) => {
    const nextState = produce(resourceList, (draftState:Draft<IResourceList[]>) => {
      const resourceEntityIndex = draftState?.findIndex((item: any) => item.path === path );
    if(resourceEntityIndex !== -1) {
      draftState[resourceEntityIndex]?.data?.forEach((resource :IApiEndpointEntity, index: number) => {
        if(resource.type === values.type) {
          draftState[resourceEntityIndex].data[index] = values;
        }
      })
    }
    })
    setFieldValue('resourceList', nextState)
  }

  const renderResources = (resourceList: IResourceList[]) => {
    const xHtml = resourceList?.map((resourceEntity: IResourceList, index: number) => {
      if (resourceEntity?.data?.filter((resource: IApiEndpointEntity) => Boolean(resource.type)).length > 0 && resourceEntity?.path) {
        return (<ResourceEntity key={resourceEntity?.path + index} onEditResource={onEditResource} setFieldValue={setFieldValue} resourceEntity={resourceEntity}/>)
      }
    })
    return xHtml;
  }

  return (
    <div className="api-resource-entity-list">
      {renderResources(resourceList)}
    </div>
  )
}

export default ResourceEntityList
