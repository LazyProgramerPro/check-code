import { Form, Skeleton } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, {useEffect, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import DataSource from './components/DataSource';
import Header from './components/Header';
import Operation from './components/Operation';
import Overview from './components/Overview';
import Query from './components/Query';
import Resource from './components/Resource';
import { getDetailDataService } from './redux/actions';

interface IRouterParams {
  dataServiceId: string;
}

const mapState = (rootState: RootState) => ({
  detailDataService: rootState.detailDataService.detailDataService,
});

const connector = connect(mapState, { getDetailDataService });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function ManagerDataServiceDetails(props: IProps) {
  const routerParams = useParams<IRouterParams>();

  const { getDetailDataService, detailDataService } = props;

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    getDetailDataService(routerParams.dataServiceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerParams.dataServiceId, refresh]);

  const reloadData = () => {
    setRefresh(!refresh);
  }

  return (
    <Wrapper>
      <Header />

      {detailDataService.loading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <div className="content">
          <Overview detail={detailDataService.params} id={routerParams.dataServiceId} reloadData={reloadData}/>
          <DataSource data={detailDataService.params?.dataSources} />
          <Query queryEntities={detailDataService.params?.queryEntities} />
          <Resource resourceEntities={detailDataService.params?.resourceEntities} />
          <Operation operationEntities={detailDataService.params?.operationEntities} />
        </div>
      )}
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(ManagerDataServiceDetails));

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0px 15px;

  .content {
    color: #000000;
  }
`;
