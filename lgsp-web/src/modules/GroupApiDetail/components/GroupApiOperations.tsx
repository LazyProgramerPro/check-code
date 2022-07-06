import React, { useState } from 'react';
import { Col, Row, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { EHttpMethod } from 'src/models/common';
import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import { formatResources, getColorByMethodHttp } from 'src/utils/groupApi';
import { useParams } from 'react-router';
import styled from 'styled-components';
interface IProps {
  groupApiDetailData: IRestApiObject | null;
}
const GroupApiOperations = (props: IProps) => {
  const { groupApiDetailData } = props;
  const params: any = useParams();
  const [id] = useState<string>(params.apiId);

  const renderResources = (operations: any) => {
    const resources = formatResources(operations);
    const xHtml = Object.keys(resources)?.map((path: any, index: number) => {
      return (
        <div className={`item-${index} resource-item`} key={index}>
          <div className="resource-title">{path}</div>
          {resources[path]?.map((item: any, index: number) => {
            return (
              <Tag
                key={index}
                className="method-http method-get resource-name"
                color={getColorByMethodHttp(item?.verb)}
              >
                {item?.verb}
              </Tag>
            );
          })}
        </div>
      );
    });
    return xHtml;
  };

  const checkStatus = (value: any) => {
    if (value === 'REFUSED') {
      return (
        <div>
          <h3 className="title">Lý do từ chối</h3>
          <div className="content flex flex-col ml-4">
            <span>{groupApiDetailData?.reason}</span>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div>
      <div className="overview-container flex mt-4">
        <Col xs={24} md={8} xl={13} style={{ marginRight: '150px' }}>
          <h3 className="title">Resources</h3>
          <div>{renderResources(groupApiDetailData?.operations)}</div>
        </Col>
        <>{checkStatus(groupApiDetailData?.status)}</>
      </div>

      <Link to={`/manager-infor/group-api-config/${id}/resources`}>Chi tiết</Link>
    </div>
  );
};

export default GroupApiOperations;
