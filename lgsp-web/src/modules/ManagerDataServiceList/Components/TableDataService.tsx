import { Button, Col, Form, Input, Popconfirm, Row, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { resetCreateStatus } from '../../ManagerDataServiceAddNew/redux/actions/create_dataService';
import { deleteDataService } from '../redux/action/delete_dataService';
import { getListDataServices } from '../redux/action/get_dataSerivices';
import { DataService, DeleteDataServiceParam, GetListDataServiceParams } from '../redux/models';

const { Search } = Input;

const mapState = (rootState: RootState) => ({
  getState: rootState.listDataService.getState,
});

const connector = connect(mapState, { getListDataServices, deleteDataService, resetCreateStatus });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux, FormComponentProps {}

function TableDataService(props: IProps) {
  const { getState, getListDataServices, deleteDataService, resetCreateStatus } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');
  const checkString = (description: string) => {
    return description.split('\n')[0];
  };

  document.title = 'Danh sách dịch vụ dữ liệu';

  const columns: ColumnProps<DataService>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text: any, record: any) => {
        return <>{checkString(`${record.description}`)}</>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: any) => <span>{text == 1 ? 'Hoạt động' : 'Không hoạt động'}</span>,
    },
    {
      title: 'Người tạo',
      dataIndex: 'create_by',
      key: 'create_by',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'update_at',
      key: 'update_at',
      render: (text: any, record: DataService) => <span> {moment(record.create_at).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text: any, record: DataService) => (
        <>
          <>
            <Link to={`/manager-data-services/manager-data-services/${record.id}`}>
              <Button size="small" className="btnIcon" icon="eye" />
            </Link>
          </>
          <Popconfirm
            placement="top"
            title="Bạn có xác nhận muốn xóa?"
            onConfirm={() => handleDelete(record)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button className="btnIcon" size="small" icon="delete"></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleGetListDataService = (search?: string) => {
    window.scrollTo(0, 0);
    const keySearch = search === undefined ? valueSearch : search;

    let params: GetListDataServiceParams = {
      ...getState.params,
      page: page,
      size: size,
      text: encodeURI(keySearch.trim()),
    };
    getListDataServices(params);
  };

  const handleDelete = (record: DataService) => {
    const param: DeleteDataServiceParam = {
      id: record.id,
    };
    deleteDataService(param);
    handleGetListDataService();
    setPage(1);
    setValueSearch('');
  };

  const handleSearch = () => {
    setValueSearch(valueSearch.trim());
    props.form.resetFields(['keySearch']);
    handleGetListDataService();
    setPage(1);
  };

  const handleReset = () => {
    setPage(1);
    setValueSearch('');
    props.form.resetFields(['keySearch']);
    handleGetListDataService('');
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    handleGetListDataService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  useEffect(() => {
    resetCreateStatus();
  }, [resetCreateStatus]);
  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      keySearch: {
        value: checkText,
      },
    });
    return callback();
  };

  const pasteSearch = () => {
    props.form.setFields({
      keySearch: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <Wrapper>
      <StyledSearch>
        <Form>
          <Row gutter={[8, 8]}>
            <Col lg={18}>
              <Form.Item>
                {getFieldDecorator('keySearch', {
                  initialValue: valueSearch,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateTextSearch }],
                })(
                  <Search
                    placeholder="Tên dịch vụ"
                    onChange={e => onChangeInput(e)}
                    maxLength={50}
                    onPaste={pasteSearch}
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
        className="custom-table-2"
        columns={columns}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        dataSource={getState.rows}
        scroll={{ x: 1000 }}
        loading={getState.loading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: size,
          total: getState.total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </Wrapper>
  );
}
export default connector(Form.create<IProps>()(TableDataService));

const Wrapper = styled.div`
  .search {
    width: 100%;
  }

  .custom-table-2 {
    margin-top: 10px;
  }

  .btnIcon {
    margin: 0px 4px;
  }

  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }

  .ant-table-body {
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      width: 1px;
      height: 5px;
    }

    &::-webkit-scrollbar {
      height: 5px;
      width: 1px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }
  }
`;

const StyledSearch = styled.div`
  /* margin-bottom: -25px;*/
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
