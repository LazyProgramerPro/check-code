import { Button, Col, Form, Popconfirm, Row, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Search from 'antd/lib/input/Search';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Loading from 'src/components/Loading';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { deleteServicesAccess, getListServicesAccess } from '../redux/actions';
import { GetServiceAccessLimitParams, ServiceAccessLimit } from '../redux/models';
import FormCreate from './FormCreate';
import FormUpdate from './FormUpdate';

const mapState = (rootState: RootState) => ({
  serviceAccessLimit: rootState.serviceAccessLimit.servicesAccessLimits,
});

const connector = connect(mapState, { getListServicesAccess, deleteServicesAccess });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function DataTable(props: IProps) {
  const { serviceAccessLimit, getListServicesAccess, deleteServicesAccess } = props;

  const [openFormCreate, setOpenFormCreate] = useState(false);
  const [editParams, setEditParams] = useState<any>({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [openFormUpdate, setOpenFormUpdate] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');
  const [rowData, setRowData] = useState<any>([]);

  document.title = 'Danh sách giới hạn truy câp dịch vụ chia sẻ';

  const handleOpenFormCreate = () => {
    setOpenFormCreate(true);
    setIsUpdate(false);
  };

  const handleCloseFormCreate = () => {
    setOpenFormCreate(false);
    setIsUpdate(false);
    setEditParams({});
  };

  const checkQuotaType = (quotaType: string) => {
    if (quotaType === 'requestCount') {
      return 'Số lượng yêu cầu';
    } else {
      return 'Dung lượng';
    }
  };

  const checkType = (time: string) => {
    if (time === 'min') {
      return 'Phút';
    } else if (time === 'hour') {
      return 'Giờ';
    } else if (time === 'days') {
      return 'Ngày';
    } else if (time === 'month') {
      return 'Tháng';
    }
  };

  const columns: ColumnProps<ServiceAccessLimit>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },

    {
      title: 'Hạn ngạch',
      dataIndex: 'quotaType',
      key: 'quotaType',
      render: (text: any, record: any) => <>{checkQuotaType(record.quotaType)}</>,
    },
    {
      title: 'Số lượng yêu cầu',
      dataIndex: 'quota',
      key: 'quota',
      render: (text: any, record: any) => {
        if (record.quotaUnit === 'KB') {
          return <>{`${record.quota}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} KB</>;
        }
        if (record.quotaUnit === 'MB') {
          return <>{`${record.quota}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} MB</>;
        }
        return <>{`${record.quota}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</>;
      },
    },
    {
      title: 'Đơn vị thời gian',
      dataIndex: 'time',
      key: 'time',
      render: (text: any, record: any) => (
        <>
          {`${record.unitTime}`} {checkType(record.timeUnit)}
        </>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhdong',
      key: 'hanhdong',
      width: 150,
      render: (text: any, record: any) => {
        return (
          <>
            <>
              <Button size="small" className="btnIcon" icon="eye" onClick={event => handleUpdate(event, record)} />
            </>

            <>
              <Popconfirm
                placement="top"
                title="Bạn có xác nhận muốn xóa?"
                onConfirm={event => handleDelete(event, record)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button disabled={record.deployed} className="btnIcon" size="small" icon="delete" />
              </Popconfirm>
            </>
          </>
        );
      },
    },
  ];

  const handleGetServiceAccessLimit = (search?: string, pageParam?: number) => {
    const keySearch = search === undefined ? valueSearch : search;
    window.scrollTo(0, 0);
    let params: GetServiceAccessLimitParams = {
      ...serviceAccessLimit.params,
      page: pageParam ? pageParam : page,
      size: size,
      text: encodeURI(keySearch.trim()),
    };
    setValueSearch(keySearch.trim());
    props.form.resetFields(['text']);
    getListServicesAccess(params);
  };

  const handleDelete = (event: any, record: any) => {
    deleteServicesAccess(record.uuid);

    // setPage(1);
    // setValueSearch('');
    // handleGetServiceAccessLimit();
  };

  const handleUpdate = (event: any, record: any) => {
    setOpenFormUpdate(true);
    setEditParams(record);
  };
  const handleCloseFormUpdate = () => {
    setOpenFormUpdate(false);
    setIsUpdate(false);
    setEditParams({});
  };

  const handleSearch = () => {
    handleGetServiceAccessLimit();
    setPage(1);
  };

  const handleReset = () => {
    setPage(1);
    handleGetServiceAccessLimit('');
    setValueSearch('');
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };
  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      text: {
        value: checkText,
      },
    });
    return true;
  };

  useEffect(() => {
    handleGetServiceAccessLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  useEffect(() => {
    setRowData(serviceAccessLimit.servicesAccess);
  }, [serviceAccessLimit.servicesAccess]);

  const pasteSearch = () => {
    props.form.setFields({
      text: {
        value: valueSearch.trim() + ' ',
      },
    });
  };

  const handleGetListAfterCreate = () => {
    setPage(1);
    handleGetServiceAccessLimit('', 1);
  };

  return (
    <Wrapper>
      <div className="header">
        <div className="header-title">Danh sách giới hạn truy câp dịch vụ chia sẻ </div>
        <Button icon="plus" onClick={handleOpenFormCreate}>
          Tạo mới giới hạn truy cập
        </Button>
      </div>

      <Container>
        <StyledSearch>
          <Form>
            <Row gutter={[8, 8]}>
              <Col lg={18}>
                <Form.Item>
                  {props.form.getFieldDecorator('text', {
                    validateTrigger: 'onBlur',
                    initialValue: valueSearch,
                    rules: [{ validator: validateTextSearch }],
                  })(
                    <Search
                      placeholder="Tên giới hạn truy cập"
                      value={valueSearch}
                      onChange={e => onChangeInput(e)}
                      maxLength={255}
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
          className="custom-table-2 table"
          columns={columns}
          rowKey="name"
          dataSource={rowData}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            current: page,
            pageSize: size,
            total: serviceAccessLimit.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
          }}
        />

        <FormCreate visible={openFormCreate} onClose={handleCloseFormCreate} refreshList={handleGetListAfterCreate} />
        <FormUpdate visible={openFormUpdate} editParams={editParams} onClose={handleCloseFormUpdate} />
      </Container>
      {serviceAccessLimit.loading ? <Loading /> : null}
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

  .button {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }
`;

const Container = styled.div`
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
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
