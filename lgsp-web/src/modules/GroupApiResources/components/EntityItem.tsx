import React from 'react'
import { Collapse, Icon, Tag } from "antd";
import {  getBgColorByMethodHttp, getColorByMethodHttp } from 'src/utils/groupApi';
import { EHttpMethod } from 'src/models/common';
const { Panel } = Collapse;

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
const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;
interface IEntityItem {
  type: EHttpMethod,
  path: string,
  index: number,
  setFieldValue: (field: string, value: any) => void,
  resourceList: any,
}
const EntityItem = (props: IEntityItem) => {
  const { type,path, index } = props;
  return (
    <Panel
      header={
        <div>
          <Tag  className="method-http method-get resource-name" color={getColorByMethodHttp(type)}>{type}
          </Tag>
          <span>{path}</span>
        </div>
      }
      key={index}
      extra={genExtra()}
      style={customPanelStyle(getColorByMethodHttp(type), getBgColorByMethodHttp(type))}
    >
      <div>{text}</div>
    </Panel>  
  )
}

export default EntityItem
