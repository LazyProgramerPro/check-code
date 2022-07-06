import React, { useEffect, useState } from 'react';
import { lastUpdateTime } from '../../GroupApi/redux/services/apis';
import { NotificationError } from '../../../components/Notification/Notification';
import { useParams } from 'react-router-dom';
import SwaggerIntegration from './SwaggerIntegration';
import TopContent from 'src/components/groupApi/TopContent';
import styled from 'styled-components';

const ApiTestingPage = () => {
  document.title = 'Kiểm thử dịch vụ chia sẻ';

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    lastUpdateTime(apiId)
      .then(rs => {
        if (rs.code === 0) {
          setLastUpdate(rs.item);
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(() => {
        NotificationError('Thất bại', 'Xảy ra lỗi khi lấy thông tin dịch vụ');
      });
  }, [apiId]);

  return (
    <div>
      <ContentTab>
        <TopContent time={lastUpdate} title="Kiểm thử" />
        <h4>Thời gian chỉnh sửa lần cuối: {lastUpdate}</h4>
      </ContentTab>

      <SwaggerIntegration />
    </div>
  );
};

export default ApiTestingPage;
const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
