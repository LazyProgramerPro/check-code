import React from 'react';
import TopContent from '../../../components/groupApi/TopContent';
import PolicySelector from './PolicySelector';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { getApiPolicy } from '../redux/actions/get_api_policy';
import UserAccessServiceContent from './UserAccessServiceContent';
import styled from 'styled-components';

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.apiBusinessPlan.getPolicyState,
});

const connector = connect(mapStateToProps, { getApiPolicy });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

const BusinessPlanPage = (props: IProps) => {
  document.title = 'Cấu hình giới hạn truy cập dịch vụ chia sẻ';

  return (
    <div>
      <ContentTab>
        <TopContent time={props.getState.item.lastUpdate || ''} title="Giới hạn quyền truy cập" />
        <h4>Thời gian chỉnh sửa lần cuối: {props.getState.item.lastUpdate}</h4>
      </ContentTab>

      <PolicySelector />
      <UserAccessServiceContent />
    </div>
  );
};

export default connector(BusinessPlanPage);

const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
