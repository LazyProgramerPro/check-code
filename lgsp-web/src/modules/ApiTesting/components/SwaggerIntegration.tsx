import React, { useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';
import env from '../../../configs/env';
import { useParams } from 'react-router-dom';
import { generateTestKey, getApiDefinition } from '../redux/services/apis';
import Loading from '../../../components/Loading';
import { NotificationError } from '../../../components/Notification/Notification';
import { Button, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import styled from 'styled-components';
import MySwaggerUI from '../../../components/MySwaggerUi';

const SwaggerIntegration = () => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [loading, setLoading] = useState(false);
  const [loadingApiKey, setLoadingApiKey] = useState(false);
  const [data, setData] = useState<any>();
  const [keyTest, setKeyTest] = useState('');
  const [validateTime, setValidateTime] = useState(0);
  const [authorizationHeader] = useState('Internal-Key');

  const onBtnCreateClicked = (e: any) => {
    setLoadingApiKey(true);
    generateTestKey(apiId)
      .then(rs => {
        if (rs.code != 0) {
          setLoadingApiKey(false);
          NotificationError('Thất bại', rs.message);
          return;
        }
        const key = rs.item.apikey;
        setKeyTest(key);
        const validate: number = rs.item.validityTime;
        const time: number = Math.ceil(validate / 3600);

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
    getApiDefinition(apiId)
      .then(rs => {
        setData(rs.item);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Lấy danh sách dịch vụ thất bại');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swaggerCompleteRender = (e: any) => {
    setLoading(false);
  };

  return (
    <View>
      <div style={{ width: '50%', margin: '20px auto 20px' }}>
        <h3> Mã bảo mật</h3>
        {loadingApiKey ? (
          <Spin size="large" style={{ width: '100%', margin: '30% auto' }} />
        ) : (
          <>
            <StyledLabel>Mã bảo mật *</StyledLabel>
            <TextArea value={keyTest} style={{ height: '150px' }} maxLength={5000} />
            {keyTest === '' ? null : <p className={'term'}>Hạn sử dụng: {validateTime} tiếng</p>}
          </>
        )}
        <br />
        <Button style={{ marginTop: '8px' }} className="mr-3 styleButton" type="primary" onClick={onBtnCreateClicked}>
          Tạo khóa truy cập
        </Button>
      </div>

      <div>
        <MySwaggerUI
          spec={data}
          authorizationHeader={authorizationHeader}
          accessTokenProvider={keyTest}
          onComplete={swaggerCompleteRender}
        />
      </div>
      {loading ? <Loading /> : null}
    </View>
  );
};

export default SwaggerIntegration;
const View = styled.div`
  .language-bash {
    white-space: inherit !important;
  }
  margin-top: 2rem;
  .styleButton {
    /* background: #043bff; */
    /* border: 1px solid #000000; */
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: #ffffff;
    height: 40px;
  }
  .term {
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #0bd206;
    margin-top: 9px;
    margin-bottom: -12px;
  }
`;
const StyledLabel = styled.div`
  margin-bottom: -1px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
`;
