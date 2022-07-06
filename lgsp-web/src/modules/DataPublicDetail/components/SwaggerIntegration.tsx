import { Button, Col, Input, Row, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from 'src/components/Loading';
import MySwaggerUI from 'src/components/MySwaggerUi';
import { NotificationError } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import SwaggerUI from 'swagger-ui-react';
import { generateTestKey, getApiDefinition } from '../redux/service/apis';
const SwaggerIntegration = () => {
  const params: any = useParams();
  const [id] = useState<string>(params.id);
  const [loading, setLoading] = useState(false);
  const [loadingApiKey, setLoadingApiKey] = useState(false);
  const [data, setData] = useState<any>();
  const [keyTest, setKeyTest] = useState('');
  const [validateTime, setValidateTime] = useState(0);

  const onBtnCreateClicked = (e: any) => {
    setLoadingApiKey(true);
    generateTestKey(id)
      .then(rs => {
        if (rs.code !== 0) {
          setLoadingApiKey(false);
          NotificationError('Thất bại', rs.message);
          return;
        }
        const key = rs.item.apikey;
        setKeyTest(key);
        const validate: number = rs.item.validityTime;
        const time: number = Math.ceil(validate / 3600);

        const newConfig = {
          ...data,
          components: {
            ...data.components,
            securitySchemes: {
              ...data.components.securitySchemes,
              apiKey: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
              },
            },
          },
          security: {
            ...data.security,
            apiKey: [key],
          },
        };
        setData(newConfig);
        setValidateTime(time);
        setLoadingApiKey(false);
      })
      .catch(() => {
        setLoadingApiKey(false);
        NotificationError('Thất bại', 'Khởi tạo mã truy cập thất bại');
      });
  };

  useEffect(() => {
    setLoading(true);
    getApiDefinition(id)
      .then(rs => {
        setData(rs.item.definitionMap);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Lấy danh sách dịch vụ thất bại');
      });
  }, [id]);

  const swaggerCompleteRender = (e: any) => {
    setLoading(false);
  };

  return (
    <View>
      <div className={'security'}>
        <h3> Mã bảo mật</h3>
        <Row>
          <Spin spinning={loadingApiKey}>
            <StyledLabel>Mã bảo mật *</StyledLabel>
            <TextArea value={keyTest} style={{ width: '635px', height: '150px' }} maxLength={5000} />
            {keyTest === '' ? null : <p className={'term'}>Hạn sử dụng: {validateTime} tiếng</p>}
          </Spin>
        </Row>
        <Row>
          <Button
            className={'styleButtonCreate'}
            htmlType="submit"
            type="primary"
            onClick={onBtnCreateClicked}
            // disabled={true}
          >
            Tạo khóa truy cập
          </Button>
        </Row>
      </div>
      <div className="renderSwagger">
        <MySwaggerUI
          spec={data}
          authorizationHeader="Internal-Key"
          accessTokenProvider={keyTest}
          onComplete={swaggerCompleteRender}
        />
      </div>
      {loading ? <Loading /> : null}
    </View>
  );
};
const StyledLabel = styled.div`
  margin-bottom: -1px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
`;
const View = styled.div`
  /* width: 80%; */
  .language-bash {
    white-space: inherit !important;
  }
  .security {
    width: 40%;
  }
  .language-bash {
    white-space: inherit !important;
  }
  margin: 0 auto;
  .swagger-ui {
    .infor {
      margin: 5px !important;
    }
  }
  .renderSwagger {
    width: 100%;
  }
  .styleButtonCreate {
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: #ffffff;
    height: 40px;
    margin-top: 8px;
  }
`;

export default SwaggerIntegration;
