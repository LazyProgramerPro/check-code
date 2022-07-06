import React, { useEffect, useState } from 'react';
import Container from '../../components/layouts/PageContainer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Col, Input, Row, Table } from 'antd';
import Styled from './styled/detailStyled';
import { getDepartments, getDepartmentUsers } from '../../actions/departmentAction';
import SearchTree from './components/DepartmentTree';
import { getEmployees, setEmployeeToDepartment } from '../../actions/employeeAction';

const { Search } = Input;

interface iDetailParams {
  id: string;
  page: any;
  size: any;
  key: string;
}

interface IProps {
  onLoadDepartment: any;
  onGetEmployees: any;
  onSetEmployeeToDepartment: any;
  onChangeDepartmentDetail: any;
  loading: any;
  users: any;
}

const Department = (props: IProps) => {
  // const { params } = props.match;
  useEffect(() => {
    props.onLoadDepartment();
  }, []);
  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'id',
      render: (text: any) => <Link to="">{text}</Link>,
    },
    {
      title: 'Họ và tên',
      render: (row: any) => {
        return <span>{row.full_name}</span>;
      },
    },
    {
      title: 'Vị trí',
      render: (row: any) => {
        return <span>{row.position}</span>;
      },
    },
    {
      title: 'Ngày sinh',
      render: (row: any) => {
        return <span>{row.birthday}</span>;
      },
    },
    {
      title: 'Quê quán',
      dataIndex: 'home_town',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: '',
      key: 'operation',
      width: 150,
      render: (row: any) => {
        return (
          <div>
            <Button
              ghost
              className="no-border"
              type="danger"
              icon="delete"
              size="default"
              onClick={e => console.log(row._id)}
            />
            <Button
              ghost
              className="no-border ml-5"
              type="primary"
              icon="user"
              size="default"
              onClick={e => console.log(row._id)}
            />
          </div>
        );
      },
    },
  ];

  const [option, setOption] = useState({
    showAddUser: false,
  });

  const [params, setParams] = useState<iDetailParams>({
    id: '',
    page: 0,
    size: 100,
    key: '',
  });

  const showAddUser = () => {
    setOption({
      ...option,
      showAddUser: true,
    });
    props.onGetEmployees({
      page: 0,
      size: 50,
      key: '',
      // status: 'working',
    });
  };
  const onClose = (data: any) => {
    setOption({
      ...option,
      showAddUser: false,
    });
    props.onSetEmployeeToDepartment({ id: params.id, data: data });
  };
  //
  // const addDepartmentUser = () => {
  //   setOption({
  //     ...option,
  //     showAddUser: false,
  //   });
  // };

  const changeDepartment = (id: any) => {
    setParams({
      ...params,
      id: id,
    });
    props.onChangeDepartmentDetail({ ...params, id: id });
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const users = (!props.loading && props.users && props.users.pages && props.users.pages.content) || null;
  return (
    <Styled.Container>
      <Container title="Quản lý đơn vị">
        <Row gutter={16}>
          <Col span={6}>
            <div className="box-shadow" style={{ background: '#fff' }}>
              <SearchTree onSelect={(id: any) => changeDepartment(id)} />
            </div>
          </Col>
          <Col span={18}>
            <div className="box-shadow" style={{ background: '#fff' }}>
              <div className="department-detail">
                <Row gutter={16}>
                  {/* <DepartmentDetail loading={load}/> */}
                  {params.id ? (
                    <Styled.Table>
                      <Col className="clearfix" span={24}>
                        <Row gutter={8}>
                          <Col span={6}>
                            <h4 className="table-title">Danh sách nhân viên</h4>
                          </Col>
                          <Col span={10}>
                            <Search placeholder="Tìm kiếm" />
                          </Col>
                          <Col span={4}>
                            <Button block={true} icon="delete" type={'default'}>
                              Xóa tất cả
                            </Button>
                          </Col>
                          <Col span={4}>
                            <Button block={true} icon="plus-square" type={'primary'} onClick={() => showAddUser()}>
                              Thêm
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Table
                          rowKey="id"
                          locale={{
                            emptyText: 'Không tìm thấy kết quả tương ứng',
                          }}
                          rowSelection={rowSelection}
                          columns={columns}
                          dataSource={users}
                        />
                        ,
                      </Col>
                    </Styled.Table>
                  ) : null}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        {/* 
        {option.showAddUser ? (
          <AddUser onClose={onClose} />
        ) : null} */}
      </Container>
    </Styled.Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.department.loading,
    data: state.department.data,
    users: state.department.users,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onLoadDepartment: () => {
    return dispatch(getDepartments());
  },
  onChangeDepartmentDetail: (data: any) => {
    return dispatch(getDepartmentUsers(data));
  },
  onGetEmployees: (data: any) => {
    return dispatch(getEmployees(data));
  },
  onSetEmployeeToDepartment: (data: any) => {
    return dispatch(setEmployeeToDepartment(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Department);
