import { Button, Col, Form, Input, Popconfirm, Row, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { getListTask } from '../redux/actions/task';
import { GetListTaskParams, TaskParams } from '../redux/models';
import { deleteTaskApi, getListTaskApi } from '../redux/service/api';
import FormCreateTaskRun2 from './FormCreateTaskRun2';
import FormUpdateTaskRun from './FormUpdateTaskRun';
const { Search } = Input;

const mapState = (rootState: RootState) => ({
  taskState: rootState.taskRunPeriodically.taskState,
});
const connector = connect(mapState, { getListTask });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

interface TaskList {
  id: string | number;
  name: string;
  nameDataService: string;
  createBy: string;
  createAt: string | number;
}

function TableTaskList(props: IProps) {
  const { taskState } = props;

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingGetList, setLoadingGetList] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState(0);

  const [showCreate, setShowCreate] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const [paramUpdate, setParamUpdate] = useState({});

  const columns: ColumnProps<TaskParams>[] = [
    {
      title: 'Tên tác vụ',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Tên dịch vụ dữ liệu sử dụng',
      dataIndex: 'dataServiceName',
      key: 'dataServiceName',
      ellipsis: true,
    },
    {
      title: 'Người tạo',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createTime',
      key: 'createTime',
      // render: (text: any, record: TaskParams) => <span> {moment(record.createAt).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text: any, record: TaskParams) => (
        <>
          <Button size="small" className="btnIcon" icon="eye" onClick={text => handleUpdate(text, record)}></Button>

          <Popconfirm
            placement="top"
            title="Bạn có xác nhận muốn xóa?"
            onConfirm={() => handleDelete(record)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button size="small" className="btnIcon" icon="delete"></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleGetListAfterCreate = () => {
    setPage(1);
    handleGetListTask('', 1);
  };

  const handleGetListTask = (search?: string, pageParam?: number) => {
    window.scrollTo(0, 0);
    const keySearch = search === undefined ? valueSearch : search;

    let params: GetListTaskParams = {
      ...taskState.paramsGetList,
      page: pageParam ? pageParam : page,
      size: size,
      text: encodeURI(keySearch.trim()),
    };
    setLoadingGetList(true);
    setValueSearch(keySearch.trim());
    props.form.resetFields(['text']);
    getListTaskApi(params)
      .then(res => {
        setRowData(res.rows);
        setTotal(res.total);
        setLoadingGetList(false);
      })
      .catch(err => {
        setLoadingGetList(false);
      });
  };

  const handleSearch = () => {
    setPage(1);
    let params: GetListTaskParams = {
      ...taskState.paramsGetList,
      page: 1,
      size: size,
      text: encodeURI(valueSearch.trim()),
    };
    setLoadingGetList(true);
    setValueSearch(valueSearch.trim());
    props.form.resetFields(['text']);
    getListTaskApi(params)
      .then(res => {
        setRowData(res.rows);
        setTotal(res.total);
        setLoadingGetList(false);
      })
      .catch(err => {
        setLoadingGetList(false);
      });
  };

  const handleReset = () => {
    setPage(1);
    setValueSearch('');
    handleGetListTask('');
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  // CREATE
  const openFormCreate = () => {
    setShowCreate(true);
  };

  const closeFormCreate = () => {
    setShowCreate(false);
  };

  // UPDATE
  const openFormUpdate = () => {
    setShowUpdate(true);
  };

  const closeFormUpdate = () => {
    setShowUpdate(false);
  };

  const handleUpdate = (text: any, record: any) => {
    openFormUpdate();
    setParamUpdate(record);
  };

  // DELETE

  const handleDelete = (record: any) => {
    setLoadingDelete(true);
    deleteTaskApi(record.id)
      .then(res => {
        setLoadingDelete(false);

        if (res.code === 0) {
          NotificationSuccess('Thành công', 'Xóa tác vụ thành công');
          handleGetListTask();
          return;
        }

        NotificationError('Thất bại', res.message);
      })
      .catch(err => {
        setLoadingDelete(false);
        NotificationError('Thất bại', err.message);
      });
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
    handleGetListTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, props.taskState.flag_reload]);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.taskState.load_page]);

  const pasteSearch = () => {
    props.form.setFields({
      text: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <Wrapper>
      <WrapperHeader>
        <div className="header">Tác vụ chạy định kỳ</div>
        <Button className="button" icon="plus" onClick={openFormCreate}>
          Tạo tác vụ định kỳ
        </Button>
      </WrapperHeader>
      <div>
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
                      placeholder="Tên tác vụ"
                      onChange={e => onChangeInput(e)}
                      onPaste={pasteSearch}
                      maxLength={255}
                    />,
                  )}
                </Form.Item>
              </Col>

              <Col lg={3}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="minWidthBtn" onClick={handleSearch}>
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
      </div>

      <Table
        rowKey="id"
        className="custom-table-2"
        columns={columns}
        dataSource={rowData}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />

      <FormCreateTaskRun2 visible={showCreate} onClose={closeFormCreate} refreshList={handleGetListAfterCreate} />

      <FormUpdateTaskRun
        visible={showUpdate}
        onClose={closeFormUpdate}
        paramUpdate={paramUpdate}
        refreshList={handleGetListTask}
      />

      {loadingGetList || loadingDelete ? <Loading /> : null}
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(TableTaskList));

const Wrapper = styled.div`
  padding: 0px 15px;

  .containerTask {
  }

  .search {
    margin-bottom: 10px;
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
`;

const WrapperHeader = styled.div`
  height: 52px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .header {
    font-size: 20px;
  }
`;

const StyledSearch = styled.div`
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
