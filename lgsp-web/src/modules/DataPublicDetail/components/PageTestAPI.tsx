import React, { useEffect, useState } from 'react';
import { lastUpdateTime } from '../../GroupApi/redux/services/apis';
import { NotificationError } from '../../../components/Notification/Notification';
import { useParams } from 'react-router-dom';
import SwaggerIntegration from './SwaggerIntegration';
import TopContent from 'src/components/groupApi/TopContent';
import styled from 'styled-components';

const View = styled.div`
  /* padding: 0px 15px 10px; */
`;
const PageTestAPI = () => {
  const params: any = useParams();
  const [id] = useState<string>(params.id);
  const [lastUpdate, setLastUpdate] = useState('');

  return (
    <View>
      <h3 className={'ContentTab'}>Kiểm thử</h3>
      <SwaggerIntegration />
    </View>
  );
};

export default PageTestAPI;
