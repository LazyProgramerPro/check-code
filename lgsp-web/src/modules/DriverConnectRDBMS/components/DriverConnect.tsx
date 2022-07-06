import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Form, Popconfirm, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import AddDriver from './AddDriver';
import DownDriver from './DownDriver';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError } from 'src/components/Notification/Notification';
import { FormComponentProps } from 'antd/lib/form';
import { RootState } from 'src/redux/store';
import { getDriver } from '../redux/actions/get_driver';
import { DataDriver, DeleteDriverParam, DownloadDriverParam, GetDriverParams } from '../redux/models';
import { deleteDriver } from '../redux/actions/delete_driver';
import { showUpdateDriverForm } from '../redux/actions/update_driver';
import UpdateDriver from './UpdateDriver';
import Loading from 'src/components/Loading';
import { downloadDriver2 } from '../redux/service/apis';

interface Driver {
  key: string;
  name: string;
  type: string;
  version: string;
  time: string;
}
const View = styled.div`
  padding: 0px 15px;

  .btn {
    border-radius: 5px;
    margin-left: 44px;
  }
  .ant-input {
    font-style: normal;
    font-weight: normal;
    background: white;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;

    .container-button {
      display: flex;
      align-items: center;
    }
  }
  .title {
    font-size: 20px;
    line-height: 26px;
    color: #043bff;
  }

  .button {
    color: #232323;
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }
  .btnIcon {
    margin: 0px 4px;
  }
`;
const Data = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const Content = styled.div`
  font-size: 20px;
`;
const StyledSearch = styled.div`
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getDriverState: rootState.driverConnect.getDriverState,
  createState: rootState.driverConnect.createState,
  updateState: rootState.driverConnect.updateState,
  deleteState: rootState.driverConnect.deleteState,
});
const connector = connect(mapState, { getDriver, deleteDriver, showUpdateDriverForm });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'file/jar';
  if (!isJpgOrPng) {
    NotificationError('Thất bại', 'File không đúng định dạng');
  }

  return isJpgOrPng;
}
function DriverConnect(props: IProps) {
  const { getDriverState, getDriver, deleteDriver } = props;
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');

  const [loading, setLoading] = useState(false);

  document.title = 'Danh sách driver';

  const loadDataDriver = (search?: string, pageParam?: number) => {
    const keySearch = search === undefined ? valueSearch : search;
    window.scrollTo(0, 0);
    let params: GetDriverParams = {
      ...getDriverState.params,
      page: pageParam ? pageParam : page,
      size: size,
      name: encodeURI(keySearch.trim()),
    };
    setValueSearch(keySearch.trim());
    props.form.resetFields(['text']);
    getDriver(params);
  };
  const handleGetListAfterCreate = () => {
    setPage(1);
    loadDataDriver('', 1);
  };

  const loadSearch = () => {
    setPage(1);
    loadDataDriver();
  };

  const handleReset = () => {
    setPage(1);
    setValueSearch('');
    loadDataDriver('');
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    loadDataDriver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);
  // useEffect(() => {
  //   loadDataDriver();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const checkType = (valuetype: number) => {
    if (valuetype === 1) {
      return 'MySQL';
    } else if (valuetype === 2) {
      return 'Microsoft SQL Server';
    } else if (valuetype === 3) {
      return 'Oracle';
    } else if (valuetype === 4) {
      return 'PostgresSQL';
    }
  };
  const handleDelete = (event: any, record: DataDriver) => {
    const param: DeleteDriverParam = {
      id: record?.id,
    };

    deleteDriver(param);
    setPage(1);
    setValueSearch('');
    // loadDataDriver();
  };
  useEffect(() => {
    loadDataDriver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, page, props.getDriverState.flag_reload]);
  useEffect(() => {
    setPage(1);
  }, [props.getDriverState.load_page]);
  const handleEdit = (e: any, record: any) => {
    const data: DataDriver = {
      id: record.id,
      name: record.name,
      file_path: record.file_path,
      type: record.type,
      version: record.version,
      create_at: record.create_at,
      update_at: record.update_at,
      create_by: record.create_by,
      update_by: record.update_by,
      isDefault: true,
      fileName: record.fileName,
    };
    props.showUpdateDriverForm(true, data);
  };

  const turnOffLoading = () => {
    setLoading(false);
  };

  const handleDownload = (e: any, record: any) => {
    setLoading(true);
    const param: DownloadDriverParam = {
      name: record.name,
      version: record.version,
    };
    downloadDriver2(param, turnOffLoading);
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên driver',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Loại Data',
      dataIndex: 'type',
      key: 'type',

      render: (text: any, record: any) => <>{checkType(record.type)}</>,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      ellipsis: true,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createTime',
      key: 'createTime',
      // render: (text, current: any) => {
      //   return <div>{`${moment(current.create_at).format('DD/MM/YYYY')}`}</div>;
      // },
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhdong',
      key: 'hanhdong',
      width: 150,
      render: (text: any, record: DataDriver) => {
        return (
          <div>
            <>
              <Button
                size="small"
                className="btnIcon"
                icon="eye"
                disabled={record.isDefault}
                onClick={event => handleEdit(event, record)}
              />
            </>

            <>
              <Popconfirm
                placement="top"
                title="Bạn có xác nhận muốn xóa?"
                onConfirm={event => handleDelete(event, record)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button size="small" className="btnIcon" icon="delete" disabled={record.isDefault} />
              </Popconfirm>
            </>

            <>
              <Button
                size="small"
                className="btnIcon"
                icon="download"
                onClick={event => handleDownload(event, record)}
              />
            </>
          </div>
        );
      },
    },
  ];
  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      text: {
        value: checkText,
      },
    });
    return true;
  };
  const pasteSearch = () => {
    props.form.setFields({
      text: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <View>
      <div className={'header'}>
        <Content>Danh sách driver</Content>
        <div className="container-button">
          <AddDriver refreshList={handleGetListAfterCreate} />
          <DownDriver />
        </div>
      </div>

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
                    placeholder="Tên driver"
                    // value={valueSearch}
                    onChange={e => onChangeInput(e)}
                    maxLength={255}
                    onPaste={pasteSearch}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col lg={3}>
              <Form.Item>
                <Button htmlType="submit" type="primary" className="minWidthBtn" onClick={loadSearch}>
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

      <Data>
        <Table
          className="custom-table-2"
          columns={columns}
          dataSource={getDriverState.rows}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            total: getDriverState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>
      <UpdateDriver page={page} />
      {props.getDriverState.loading ||
      props.createState.loading ||
      props.updateState.loading ||
      props.deleteState.loading ||
      loading ? (
        <Loading />
      ) : null}
    </View>
  );
}
export default connector(Form.create<IProps>()(DriverConnect));
