import { Button, Col, Form, Popconfirm, Row, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Search from 'antd/lib/input/Search';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString } from 'src/constants/common';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { deletePermission, getPermissionList } from '../redux/service/api';
import { paramsGetList, Permission } from '../redux/service/models';
import FormCreate from './FormCreate';
import FormUpdate from './FormUpdate';

const mapState = (rootState: RootState) => ({
  serviceAccessLimit: rootState.serviceAccessLimit.servicesAccessLimits,
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

const initPermission: Permission = {
  createTime: '',
  id: '',
  name: '',
  organization: '',
  users: [],
};

function DataTable(props: IProps) {
  const [openFormCreate, setOpenFormCreate] = useState(false);
  const [openFormUpdate, setOpenFormUpdate] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);

  const [total, setTotal] = useState(0);
  const [valueSearch, setValueSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [paramsUpdate, setParamsUpdate] = useState<Permission>(initPermission);

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên quyền',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Đơn vị sử dụng',
      dataIndex: 'organization',
      key: 'organization',
      // width: 300,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createTime',
      key: 'createTime',
      // width: 280,
    },

    {
      title: 'Hành động',
      dataIndex: 'hanhdong',
      key: 'hanhdong',
      width: 150,
      render: (text: any, record: Permission) => {
        return (
          <>
            <Button
              size="small"
              className="btnIcon"
              icon="eye"
              onClick={event => handleOpenFormUpdate(event, record)}
            ></Button>

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

  const handleOpenFormCreate = () => {
    setOpenFormCreate(true);
  };

  const handleCloseFormCreate = () => {
    setOpenFormCreate(false);
  };

  const handleOpenFormUpdate = (event: any, record: any) => {
    setOpenFormUpdate(true);
    setParamsUpdate(record);
  };

  const handleCloseFormUpdate = () => {
    setOpenFormUpdate(false);
    setParamsUpdate(initPermission);
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    handleGetPermission();
  };

  const handleReset = () => {
    setPage(1);
    handleGetPermission(' ');
    setValueSearch('');
    // props.form.resetFields(['name']);
    props.form.setFields({
      text: {
        value: '',
      },
    });
  };

  const handleGetListAfterCreate = () => {
    setPage(1);
    handleGetPermission('', 1);
  };

  const handleGetPermission = (search?: string, pageParam?: number) => {
    window.scrollTo(0, 0);
    const keySearch = search ? search : valueSearch.trim();
    try {
      setLoading(true);
      setValueSearch(valueSearch.trim());
      props.form.resetFields(['name']);
      const params: paramsGetList = {
        page: pageParam ? pageParam : page,
        size: size,
        text: encodeURI(keySearch.trim()),
      };

      const response = getPermissionList(params);
      response
        .then(res => {
          setData(res.rows);
          setTotal(res.total);
          setLoading(false);
        })
        .catch(err => {
          console.log('err: ', err);
          setLoading(false);
        });
    } catch (error) {
      console.log('error: ', error);
      setLoading(false);
    }
  };

  const handleDelete = (event: any, record: any) => {
    setLoading(true);

    deletePermission(record.id)
      .then(res => {
        setLoading(false);

        if (res.code === 0) {
          NotificationSuccess('Thành công', 'Xóa quyền thành công');
          handleGetPermission();
        } else {
          NotificationError('Thất bại', res.message);
        }
      })
      .catch(err => {
        setLoading(false);

        NotificationError('Thất bại', err.message);
      });
  };

  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      name: {
        value: checkText,
      },
    });
    return true;
  };

  useEffect(() => {
    handleGetPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const checkPaste = () => {
    props.form.setFields({
      name: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <Wrapper>
      <div className="header">
        <div className="header-title">Danh sách quyền</div>
        <Button className="button" icon="plus" onClick={handleOpenFormCreate}>
          Tạo quyền
        </Button>
      </div>
      <Container>
        <StyledSearch>
          <Form>
            <Row gutter={[8, 8]}>
              <Col lg={18}>
                <Form.Item>
                  {props.form.getFieldDecorator('name', {
                    initialValue: valueSearch,
                    validateTrigger: 'onBlur',
                    rules: [{ validator: validateTextSearch }],
                  })(
                    <StyleSearch
                      placeholder="Tên quyền"
                      onChange={e => onChangeInput(e)}
                      maxLength={255}
                      onPaste={checkPaste}
                      // onKeyPress={e => restrict(e)}
                    />,
                  )}
                </Form.Item>
              </Col>

              <Col lg={3}>
                <Form.Item>
                  <Button htmlType="submit" type="primary" className="minWidthBtn" onClick={handleSearch}>
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Col>

              <Col lg={3}>
                <Form.Item>
                  <Button className="minWidthBtn" onClick={handleReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </StyledSearch>
        <Table
          rowKey={'id'}
          loading={loading}
          className="custom-table-2 table"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
          pagination={{
            current: page,
            pageSize: size,
            total: total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
          }}
        />

        <FormCreate
          visible={openFormCreate}
          onClose={handleCloseFormCreate}
          reload={handleGetPermission}
          loading={loading}
          setLoading={setLoading}
          refreshList={handleGetListAfterCreate}
        />

        <FormUpdate
          visible={openFormUpdate}
          onClose={handleCloseFormUpdate}
          reload={handleGetPermission}
          setLoading={setLoading}
          paramsUpdate={paramsUpdate}
          loading={loading}
        />
      </Container>
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(DataTable));

const Wrapper = styled.div`
  padding: 0px 15px;
  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
      font-size: 20px;
    }
  }

  p {
    margin: 0px;
  }

  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }
`;

const Container = styled.div`
  /* margin-top: 4px; */
  .table {
    width: 100%;
    margin-top: 10px;
  }

  .btnIcon {
    margin: 0px 4px;
  }
`;

const StyleSearch = styled(Search)`
  input {
    border: 1px solid #d9d9d9 !important;
    border-radius: 5px;
  }
`;
const StyledSearch = styled.div`
  /* margin-bottom: -25px;*/
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
