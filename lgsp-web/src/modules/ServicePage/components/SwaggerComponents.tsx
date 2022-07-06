import { Button, Col, Row, Skeleton, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { GET } from 'src/services';
import styled from 'styled-components';
import SwaggerUI from 'swagger-ui-react';
import MySwaggerUI from "../../../components/MySwaggerUi";

interface SwaggerComponentsProps {
  id: string;
  description?: string;
}

export default function SwaggerComponents(props: SwaggerComponentsProps) {
  const { id, description } = props;
  const { TabPane } = Tabs;

  const [state, setState] = useState<any>();
  const [tabIndex, setTabIndex] = useState('1');
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    if (tabIndex === '2') {
      setLoading(true);
      GET(`core-svc/public-api/no-auth/${id}/definition`)
        .then((data: any) => {
          setLoading(false);
          if (data.code === 0) {
            setState(data.item.data);
            setKey(data.item.internalKey);
            return;
          }
          NotificationError('Thất bại', data.message);
        })
        .catch(e => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, tabIndex]);

  const onChangeTab = (value: any) => {
    setTabIndex(value);
  };

  return (
    <Wrapper>
      <Tabs defaultActiveKey="1" onChange={onChangeTab}>
        <TabPane tab="Thông tin chung" key="1">
          <div className="mb-5">{description}</div>
        </TabPane>
        <TabPane tab="Tham số dịch vụ" key="2">
          <div className="swaggerStyle">
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              // <SwaggerUI spec={state !== null ? state : {}} />
              <MySwaggerUI
                spec={state}
                authorizationHeader="Internal-key"
                accessTokenProvider={key}
                key={key}
                schemaHiding={true}
              />
            )}
          </div>
        </TabPane>
      </Tabs>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: 20px auto 10px;

  .swaggerStyle {
    margin-top: 80px;
  }

  .swagger-ui .parameters-col_description,
  .swagger-ui .response-col_description {
    width: 80%;
  }

  tr {
    background-color: inherit !important;
  }
`;
