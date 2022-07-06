import { Button, Col, Form, Popconfirm, Row, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
// import env from '../../../configs/env';
import { RootState } from '../../../redux/reducers';
import { showDeleteUserConfirm } from '../redux/action/delete_user';
import { getAllUsers } from '../redux/action/get_users';
import { GetUserParams } from '../redux/models';
import { deleteUser } from '../redux/service/apis';
import CreateUserForm from './CreateUserForm';
import { FormComponentProps } from 'antd/lib/form';
// const size = env.pageSize;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getUserState: rootState.user.getState,
  createUserState: rootState.user.createState,
  deleteUserState: rootState.user.deleteState,
  getState: rootState.user.getState,
});
const connector = connect(mapState, { getAllUsers, showDeleteUserConfirm });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux, FormComponentProps {}

function DataTable(props: IProps) {
  const { getUserState, createUserState, deleteUserState, getState, getAllUsers, showDeleteUserConfirm } = props;
  const [keySearch, setKeySearch] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleGetAllUsers = (search?: any) => {
    const valueSearch = search === undefined ? keySearch : search;
    window.scrollTo(0, 0);
    let params: GetUserParams = {
      ...getUserState.params,
      page: page,
      size: size,
      key: encodeURI(valueSearch.trim()),
    };
    setKeySearch(valueSearch.trim());
    props.form.resetFields(['name']);
    getAllUsers(params);
  };

  useEffect(() => {
    handleGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, getUserState.flag_reload]);

  useEffect(() => {
    setPage(1);
  }, [props.getUserState.load_page]);

  const handleDelete = (e: any, record: any) => {
    setLoadingDelete(true);
    const param = {
      username: record.username,
    };

    deleteUser(param)
      .then(res => {
        setLoadingDelete(false);

        if (res.code === 0) {
          NotificationSuccess('Thành công', 'Xóa tài khoản thành công');
          handleGetAllUsers();
          return;
        }

        NotificationError('Thất bại', res.message);
        handleGetAllUsers();
      })
      .catch(err => {
        setLoadingDelete(false);
        NotificationError('Thất bại', err.message);
        handleGetAllUsers();
      });

    // showDeleteUserConfirm(true, record.username);
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      // width: 380,
      ellipsis: true,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      // width: 380,
      render: (value: number) => {
        switch (value) {
          case 0:
            return 'Admin';
          case 1:
            return 'Nhà cung cấp dịch vụ chia sẻ';
          case 2:
            return 'Người sử dụng dịch vụ chia sẻ';
          default:
            return '';
        }
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      // width: 380,
      render: (status: number) => {
        switch (status) {
          case 1:
            return (
              <>
                <span className="ant-badge-status-dot ant-badge-status-success"></span>
                <span className="ant-badge-status-text">Đang hoạt động</span>
              </>
            );
          case 2:
            return (
              <>
                <span className="ant-badge-status-dot ant-badge-status-orange"></span>
                <span className="ant-badge-status-text">Tạo mới</span>
              </>
            );
          case 0:
            return (
              <>
                <span className="ant-badge-status-dot ant-badge-status-error"></span>
                <span className="ant-badge-status-text">Không hoạt động</span>
              </>
            );
          default:
            return <></>;
        }
      },
    },
    {
      title: () => {
        return <div style={{ whiteSpace: 'nowrap' }}>Hành động</div>;
      },
      dataIndex: 'action',
      width: 150,
      render: (text: string, record: any) => {
        return (
          <>
            <Link to={`/user-detail/${record.id}`}>
              <Button size="small" className="btnIcon" icon="eye"></Button>
            </Link>

            <Popconfirm
              placement="top"
              title="Bạn có xác nhận muốn xóa?"
              onConfirm={event => handleDelete(event, record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <Button className="btnIcon" size="small" icon="delete"></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleSearch = () => {
    setPage(1);
    handleGetAllUsers();
  };

  const handleReset = () => {
    let params: GetUserParams = {
      ...getState.params,
      key: '',
    };
    setPage(1);
    getAllUsers(params);
    setKeySearch(' ');
    props.form.setFields({
      name: {
        value: '',
      },
    });
  };

  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };
  // const restrict = (event: any) => {
  //   const regex = new RegExp('^[^%^|{}[]+$');
  //   const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  //   if (!regex.test(key)) {
  //     event.preventDefault();
  //     return false;
  //   }
  // };

  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      name: {
        value: checkText,
      },
    });
    return true;
  };

  const checkPaste = () => {
    props.form.setFields({
      name: {
        value: keySearch.trim() + ' ',
      },
    });
  };
  return (
    <>
      <SearchFormStyle>
        <Form>
          <Row gutter={[8, 8]}>
            <Col lg={18}>
              <Form.Item>
                {props.form.getFieldDecorator('name', {
                  initialValue: keySearch,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateTextSearch }],
                })(
                  <Search
                    placeholder="Tên tài khoản"
                    onChange={handleTextChange}
                    maxLength={255}
                    onPaste={checkPaste}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col lg={3}>
              <Form.Item>
                <Button htmlType="submit" type="primary" className="btn minWidthBtn" onClick={handleSearch}>
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>

            <Col lg={3}>
              <Form.Item>
                <Button className="btn minWidthBtn" onClick={handleReset}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </SearchFormStyle>
      <DataTableWrapper>
        <Table
          columns={columns}
          dataSource={getUserState.rows}
          className="custom-table-2"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          rowKey="username"
          pagination={{
            total: getUserState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
        <CreateUserForm />
        {/* <DeleteUserConfirm /> */}
        {getUserState.loading || createUserState.loading || deleteUserState.loading || loadingDelete ? (
          <Loading />
        ) : null}
      </DataTableWrapper>
    </>
  );
}
export default connector(Form.create<IProps>()(DataTable));

const SearchFormStyle = styled.div`
  /* margin-bottom: -25px;*/
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
const DataTableWrapper = styled.div`
  margin-top: 10px;
  .btnIcon {
    margin: 0px 4px;
  }
`;
