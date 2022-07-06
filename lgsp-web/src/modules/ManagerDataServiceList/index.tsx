import React from 'react';
import Header from './Components/Header';
import TableDataService from './Components/TableDataService';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { getListDataServices } from './redux/action/get_dataSerivices';
import { deleteDataService } from './redux/action/delete_dataService';

const mapState = (rootState: RootState) => ({
  dataServiceState: rootState.createDataService.createDataService,
});

const connector = connect(mapState, { getListDataServices, deleteDataService });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function ManagerDataServiceList({ dataServiceState }: IProps) {
  return (
    <Wrapper>
      <Header />
      <TableDataService />
    </Wrapper>
  );
}

export default connector(ManagerDataServiceList);

const Wrapper = styled.div`
  padding: 0px 15px;
`;
