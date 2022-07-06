import React, { ReactNode, useEffect, useState } from 'react';
import GroupApiSteps from './components/GroupApiSteps';
import GroupApiOverview from './components/GroupApiOverview';
import GroupApiOperations from './components/GroupApiOperations';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getGroupApiDetail } from './redux/actions';
import { useParams } from 'react-router';
import TopContent from 'src/components/groupApi/TopContent';
import Loading from 'src/components/Loading';
import styled from 'styled-components';

interface IGroupApiDetail {}
interface IParams {
  apiId: string;
}
const GroupApiDetail = (props: IGroupApiDetail) => {
  const dispatch = useAppDispatch();
  const params: IParams = useParams();
  const selectGroupApiDetail = useAppSelector(state => state.GroupApiDetail.data);
  const loading = useAppSelector(state => state.GroupApiDetail.loading);

  useEffect(() => {
    dispatch(getGroupApiDetail(params.apiId));
  }, [params.apiId]);

  return (
    <>
      <div className="group-api-detail-page config-api-content">
        <ContentTab>
          <TopContent title="Tổng quan" time={selectGroupApiDetail?.lastUpdatedTime} />

          <h4>Thời gian chỉnh sửa lần cuối: {selectGroupApiDetail?.lastUpdatedTime}</h4>
        </ContentTab>

        <GroupApiSteps groupApiDetailData={selectGroupApiDetail} />
        <GroupApiOverview groupApiDetailData={selectGroupApiDetail} />
        <GroupApiOperations groupApiDetailData={selectGroupApiDetail} />
      </div>
      {loading ? <Loading /> : null}
    </>
  );
};

export default GroupApiDetail;

const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
