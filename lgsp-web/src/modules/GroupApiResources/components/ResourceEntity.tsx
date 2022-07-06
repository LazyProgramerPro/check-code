import React from 'react'
import { Collapse,  Icon, Tag } from "antd";
import { getBgColorByMethodHttp, getColorByMethodHttp } from 'src/utils/groupApi';
import EntityContent from './EntityContent';
import { IApiEndpointEntity, IResourceList } from '../redux/models';
const { Panel } = Collapse;

interface IResourceEntity {
  resourceEntity: IResourceList,
  setFieldValue: (field: string, value: any) => void,
  onEditResource: (values: IApiEndpointEntity, path: string) => void,
}

const customPanelStyle = (color: string, bg: string) => ({
  background: bg,
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
  color: color
});

const callback = (key: string | string[]) => {
  console.log(key);

}
const genExtra = () => (
  <Icon
    type="delete"
    onClick={event => {
      event.stopPropagation();
    }}
  />
);

const ResourceEntity = (props: IResourceEntity) => {
  const { resourceEntity, setFieldValue, onEditResource } = props;
  
  // const getresourceListValue = (type: string, path: string) => {
  //   const entityExit = resourceList?.find((item: any) => item.type === type && item.path === path)
  //   if (!entityExit) {
  //     resourceList.push({ type, path })
  //     setFieldValue('resourceList', resourceList)
  //   }
  // }
  return (<div className={`resource-entity`} >
    <div className="resource-title">{resourceEntity?.path}</div>
    <Collapse
      defaultActiveKey={[1]}
      onChange={callback}
      expandIconPosition='left'
      className="resource-entity-collapse"
    >
      {resourceEntity?.data?.map((resource: IApiEndpointEntity, index: number) => {
        // getresourceListValue(type, resourceEntity.path)
        return (
          <Panel
            className="resource-entity-panel"
            header={
              <div>
                <Tag key={index} className="method-http method-get resource-name" color={getColorByMethodHttp(resource.type)}>{resource.type}
                </Tag>
                <span>{resourceEntity?.path}</span>
              </div>
            }
            key={index + 1}
            extra={genExtra()}
            style={customPanelStyle(getColorByMethodHttp(resource.type), getBgColorByMethodHttp(resource.type))}
          >
           <EntityContent path={resourceEntity?.path} onEditResource={onEditResource}  resource={resource} 
           setFieldValue={setFieldValue}/>
          </Panel>
        )
      })}
    </Collapse>
  </div>)
}

export default ResourceEntity
