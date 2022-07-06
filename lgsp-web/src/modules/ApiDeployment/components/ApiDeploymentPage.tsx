import React, { useEffect, useState } from 'react';
import { lastUpdateTime } from '../../GroupApi/redux/services/apis';
import { useParams } from 'react-router-dom';
import TimeEditItem from '../../../components/groupApi/TimeEditItem';
import DataTable from './DataTable';
import { NotificationError, NotificationInfo } from '../../../components/Notification/Notification';
import TopContent from 'src/components/groupApi/TopContent';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { checkStatus } from '../redux/services/apis';
import styled from 'styled-components';

const ApiDeploymentPage = () => {
  document.title = 'Triển khai dịch vụ chia sẻ';

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    lastUpdateTime(apiId)
      .then(rs => {
        if (rs.code === 0) {
          setLastUpdate(rs.item);
          // NotificationSuccess('Thành công', 'Triển khai dịch vụ chia sẻ thành công');
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(() => {
        NotificationError('Thất bại', 'Xảy ra lỗi khi lấy thông tin dịch vụ');
      });
  }, [apiId]);

  const checkStatusEndpoint = () => {
    checkStatus(apiId).then(rs => {
      if (rs.code !== 0) {
        NotificationInfo('Cảnh báo', rs.message);
      }
    });
  };

  useEffect(() => {
    checkStatusEndpoint();
  }, []);
  return (
    <div>
      <ContentTab>
        <TopContent time={lastUpdate} title="Quản lý triển khai" />

        <h4>Thời gian chỉnh sửa lần cuối: {lastUpdate}</h4>
      </ContentTab>
      <DataTable />
    </div>
  );
};

export default ApiDeploymentPage;
const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
