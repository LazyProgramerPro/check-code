import React, {useEffect} from "react";
import {ApiResourceEntity, ResourceGroup} from "../redux/models";
import {Collapse} from "antd";
import PathResourceLayout from "./PathResourceLayout";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";


const { Panel } = Collapse;

const mapState = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
})
const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;


const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  overflow: 'hidden',
};

interface IProps extends PropsFromRedux{
  policyOptions: JSX.Element[]
}

const ResourceConfig = (props: IProps) => {
  const callback = (key: string | string[]) => {
  }

  useEffect(() => {

  }, []);

  const renderResource = (data: ResourceGroup[]) => {
    const xHtml = data?.map((resourceData: ResourceGroup, index: number) => {
      if (resourceData?.data?.filter((resource: ApiResourceEntity) => Boolean(resource.type)).length > 0 && resourceData?.path) {
        const resourceKey = "resource-" + index;
        return (
         <div className="api-resource-path" key={resourceKey}>
           <Collapse
             defaultActiveKey={['1']}
             key={resourceKey}
             onChange={callback}
             expandIconPosition='right'
             className="resource-entity-collapse"
           >
             <Panel style={customPanelStyle} className="resource-entity-panel" header={resourceData.path} key="1">
               <PathResourceLayout  data={resourceData.data} path={resourceData.path} policyOptions={props.policyOptions} />
             </Panel>
           </Collapse>
         </div>
        );
      }
    });
    return xHtml;
  }

  return(
    <div className="api-resource-config">
      {renderResource(props.dataState.data?.resourceGroupList || [])}
    </div>
  )
}

export default connector(ResourceConfig);
