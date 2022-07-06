import React, {useEffect, useState} from "react";
import {Collapse} from "antd";
import ResourceLayout from "./ResourceLayout";
import {ApiResourceEntity, ResourceGroup} from "../redux/models";
import {FieldProps} from "formik";

const { Panel } = Collapse;

interface ResourceEntityProps {
  data: ApiResourceEntity[];
  path: string;
  policyOptions: JSX.Element[]
}

interface IPathResourceConfig extends ResourceEntityProps{

}

const PathResourceLayout = (props: IPathResourceConfig) => {

  const callback = (key: string | string[]) => {
    console.log(key);
  }

  const renderResource = (data: ApiResourceEntity[]) => {
    const xHtml = data?.map((resource: ApiResourceEntity, index: number) => {
      const key = props.path + "-" + resource.type;
      let marginValue:string;
      if(index === 0){
        marginValue = '0px';
      }else {
        marginValue = '10px';
      }
      return (
        <div style={{marginTop: marginValue}} key={key}>
          <ResourceLayout key={key} data={resource} path={props.path} policyOptions={props.policyOptions}/>
        </div>
        // <div>
        //   <Collapse
        //     defaultActiveKey={['1']}
        //     onChange={callback}
        //     expandIconPosition='right'
        //     className="resource-entity-collapse"
        //   >
        //     <Panel className="resource-entity-panel" header={props.path} key="1">
        //       <ResourceLayout/>
        //     </Panel>
        //   </Collapse>
        // </div>
      );
    });

    return xHtml;
  }

  return(
    <div className="api-resource-path">
      {renderResource(props.data)}
    </div>
  )
}

export default PathResourceLayout;

