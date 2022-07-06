import React, { useEffect, useState } from 'react';
import { Col, Collapse, Icon, Row, Tag } from 'antd';
import { EHttpMethod } from '../../../models/common';
import ResourceContent from './ResourceContent';
import { ApiResourceEntity, ResourceParam } from '../redux/models';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { deleteResource } from '../redux/actions/api_resource_data';

const { Panel } = Collapse;

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { deleteResource });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  data: ApiResourceEntity;
  path: string;
  policyOptions: JSX.Element[]
}

const ResourceLayout = (props: IProps) => {
  const callback = (key: string | string[]) => {};

  const [background, setBackground] = useState('#B9FFFC');
  const [btnColor, setBtnColor] = useState('#77ACF1');

  const clickDeleteResource = (e: any) => {
    e.stopPropagation();
    const param: ResourceParam = {
      method: props.data.type,
      path: props.path,
    };
    props.deleteResource(param);
  };

  useEffect(() => {
    switch (props.data.type) {
      case EHttpMethod.GET: {
        setBackground('#E1F2FB');
        setBtnColor('#3DB2FF');
        break;
      }
      case EHttpMethod.POST: {
        setBackground('#C9FDD7');
        setBtnColor('#50CB93');
        break;
      }
      case EHttpMethod.PUT: {
        setBackground('#FFE8D6');
        setBtnColor('#FF971D');
        break;
      }
      case EHttpMethod.DELETE: {
        setBackground('#FFBCBC');
        setBtnColor('#EF4B4B');
        break;
      }
      case EHttpMethod.PATCH: {
        setBackground('#D5EEBB');
        setBtnColor('#519872');
        break;
      }
      case EHttpMethod.HEAD: {
        setBackground('#F7DBF0');
        setBtnColor('#BE79DF');
        break;
      }
    }
  }, [props.data.type]);

  return (
    <div>
      <Collapse
        key={props.path + '-' + props.data.type}
        defaultActiveKey={[0]}
        onChange={callback}
        expandIconPosition="right"
        className="resource-entity-collapse"
      >
        <Panel
          style={{ background: background }}
          className="resource-entity-panel"
          header={
            <Row>
              <Col xl={3}>
                <Tag className="method-http resource-name-tag" color={btnColor}>
                  {props.data.type}
                </Tag>
              </Col>
              <Col xl={20}>
                <span>{props.path}</span>
              </Col>
              <Col xl={1}>
                <Icon style={{ fontSize: '20px' }} type="delete" onClick={clickDeleteResource} />
              </Col>
            </Row>
          }
          key="1"
        >
          <ResourceContent key={props.data.type + "-" + props.data.path} data={{ ...props.data, path: props.path }} policyOptions={props.policyOptions}/>
        </Panel>
      </Collapse>
    </div>
  );
};

export default connector(ResourceLayout);
