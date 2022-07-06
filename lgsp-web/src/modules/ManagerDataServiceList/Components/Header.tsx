import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { RootState } from '../../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { setScreenNumber } from '../../ManagerDataServiceAddNew/redux/actions/create_dataService';
import { CREATE_DS_SCREEN } from '../../ManagerDataServiceAddNew/redux/constant';
import { useHistory } from 'react-router-dom';

const mapState = (rootState: RootState) => ({
  getState: rootState.listDataService.getState,
});

const connector = connect(mapState, { setScreenNumber });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function Header({ setScreenNumber }: IProps) {
  const history = useHistory();

  const onBtnCreateClicked = () => {
    history.push('/manager-data-services/manager-data-services/add-new');
  };

  return (
    <Wrapper>
      <div className="title">Danh sách dịch vụ dữ liệu</div>
      <Button onClick={onBtnCreateClicked} icon="plus">
        Tạo mới dịch vụ dữ liệu
      </Button>
    </Wrapper>
  );
}

export default connector(Header);

const Wrapper = styled.div`
  height: 52px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
  }
`;
