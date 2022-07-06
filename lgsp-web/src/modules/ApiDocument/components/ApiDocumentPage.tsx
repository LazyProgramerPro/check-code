import { PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import TopContent from 'src/components/groupApi/TopContent';
import styled from 'styled-components';
import TimeEditItem from '../../../components/groupApi/TimeEditItem';
import env from '../../../configs/env';
import { RootState } from '../../../redux/reducers';
import { lastUpdateTime } from '../../GroupApi/redux/services/apis';
import { showCreateApiDocumentForm } from '../redux/actions/create_documents';
import { getAllApiDocuments } from '../redux/actions/get_api_document';
import DataTable from './DataTable';

const size = env.pageSize;

const mapState = (rootState: RootState) => ({
  getState: rootState.apiDocument.getState,
  authState: rootState.auth.auth,
});
const connector = connect(mapState, { getAllApiDocuments, showCreateApiDocumentForm });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

const ApiDocumentPage = (props: IProps) => {
  document.title = 'Cấu hình tài liệu dịch vụ chia sẻ';

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    if (props.authState.data?.role !== 0) {
    }
    lastUpdateTime(apiId).then(rs => {
      if (rs.code === 0) {
        setLastUpdate(rs.item);
      }
    });
  }, [apiId, props.authState.data]);

  const onCreateNewClicked = (e: any) => {
    props.showCreateApiDocumentForm(true);
  };

  return (
    <Wrapper>
      <ContentTab>
        <ViewDocument>
          <TopContent title="Tài liệu" time={lastUpdate} />
          <StyledButton>
            <Button icon="plus" onClick={onCreateNewClicked}>
              Thêm mới tài liệu
            </Button>
          </StyledButton>
        </ViewDocument>

        <h4>Thời gian chỉnh sửa lần cuối: {lastUpdate}</h4>
      </ContentTab>

      <TimeEditItem time={lastUpdate} />

      <DataTable />
    </Wrapper>
  );
};

export default connector(ApiDocumentPage);
const Wrapper = styled.div`
  .ant-btn .anticon.anticon-plus > svg {

    margin-top: 2.5px;
}
  }
  .top {
    display: flex;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;

      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
    }
  }
`;
const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
const ViewDocument = styled.div`
  display: flex;
`;
const StyledButton = styled.div`
  margin-left: 20px;
`;
