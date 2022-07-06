import { Button } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { showCreateUserForm } from '../redux/action/create_user';
import ContentPage from './ContentPage';

const mapStateToProps = (rootState: RootState) => ({
  // createState: rootState.user.createState,
  authState: rootState.auth.auth
});
const connector = connect(mapStateToProps, { showCreateUserForm });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

function UserPage({ showCreateUserForm }: IProps) {
  const onCreateNewClicked = () => {
    showCreateUserForm(true);
  };

  document.title = 'Danh sách người dùng';

  return (
    <Wrapper>
      {/* <ListButtonControl/> */}
      <div className="header">
        <div className="header-title">Danh sách người dùng</div>
        <Button onClick={onCreateNewClicked} icon="plus">
          Tạo mới người dùng
        </Button>
      </div>
      <ContentPage />
    </Wrapper>
  );
}

export default connector(UserPage);

const Wrapper = styled.div`
  padding: 0px 15px;

  .header {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-title {
      font-size: 20px;
    }
  }
`;
