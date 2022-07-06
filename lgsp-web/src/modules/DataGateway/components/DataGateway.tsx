import { Button, Col, Form, Input, Popconfirm, Row, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Loading from 'src/components/Loading';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { deleteGateway } from '../redux/actions/delete_gateway';
import { getDataGateway } from '../redux/actions/get_data_gateway';
import { showUpdateGatewayForm } from '../redux/actions/update_gateway';
import { DataGateway, DeleteGatewayParam, ExportParam, GetDataGatewayParams } from '../redux/models';
import { exportGateway } from '../redux/service/apis';
import AddGateway from './AddGateway';
import DownGateway from './DownGateway';
import FormImportGateways from './FormImportGateways';
import UpdateGateway from './UpdateGateway';
import { NotificationError } from '../../../components/Notification/Notification';
import {doc} from "prettier";

const { Search } = Input;

const ViewTable = styled.div`
  padding: 0px 15px;

  .header {
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .container-button {
      display: flex;
      align-items: center;
    }
  }

  .ant-input {
    font-style: normal;
    font-weight: normal;
    background: white;
  }
  .btnIcon {
    margin: 0px 4px;
  }
  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }

  .button {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
  .listhost {
    margin-bottom: 2px;
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
  getDataGatewayState: rootState.dataGateway.getDataGatewayState,
  deleteState: rootState.dataGateway.deleteState,
  createState: rootState.dataGateway.createState,
  updateState: rootState.dataGateway.updateState,
});
const connector = connect(mapState, { getDataGateway, deleteGateway, showUpdateGatewayForm });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux, FormComponentProps {}

function DataGatewayPage(props: IProps) {
  const { getDataGatewayState, getDataGateway, deleteGateway } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFormImportGateways, setOpenFormImportGateways] = useState(false);

  document.title = 'Danh sách môi trường Gateway';

  const loadDataGateway = (search?: string, pageParam?: number) => {
    const keySearch = search === undefined ? valueSearch : search;
    window.scrollTo(0, 0);
    let params: GetDataGatewayParams = {
      ...getDataGatewayState.params,
      text: encodeURI(keySearch.trim()),
      page: pageParam ? pageParam : page,
      size: size,
    };
    setValueSearch(keySearch.trim());
    props.form.resetFields(['text']);
    getDataGateway(params);
  };

  const loadSearch = () => {
    setPage(1);
    loadDataGateway();
  };

  const handleReset = () => {
    setPage(1);
    setValueSearch('');
    loadDataGateway('');
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    loadDataGateway();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, props.getDataGatewayState.flag_reload]);

  useEffect(() => {
    loadDataGateway();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [props.getDataGatewayState.load_page]);

  const showModal = (text: any, record: any) => {
    setVisible(true);
  };

  const handleDelete = (event: any, record: DataGateway) => {
    const param: DeleteGatewayParam = {
      id: record.id,
    };
    deleteGateway(param);
    setPage(1);
    setValueSearch('');
    loadDataGateway();
  };

  const handleEdit = (e: any, record: any) => {
    const data: DataGateway = {
      id: record.id,
      name: record.name,
      description: record.description,
      hostList: record.hostList,
      displayName: record.displayName,
    };
    props.showUpdateGatewayForm(true, data);
  };

  // IMPORT
  const handleOpenFormImportGateways = () => {
    setOpenFormImportGateways(true);
  };

  const handleCloseFormImportGateways = () => {
    setOpenFormImportGateways(false);
  };

  const checkString = (displayName: string) => {
    return displayName.split('\n')[0];
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'displayName',
      key: 'displayName',
      ellipsis: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      render: (text: any, record: any) => {
        return <>{checkString(`${record.description}`)}</>;
      },
      ellipsis: true,
    },
    {
      title: 'Virtual Host(s)',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text: any, record: any) => (
        <span>
          {record.hostList?.map((e: any, i: any) => (
            <div className="listhost" key={e.host + ':' + e.httpsPort + e.context}>
              <span>
                https://{e.host}:{e.httpsPort}/{e.context}
              </span>
              <br></br>
              <span>
                http://{e.host}:{e.httpPort}/{e.context}
              </span>
            </div>
          ))}
        </span>
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
              <Button size="small" className="btnIcon" icon="eye" onClick={event => handleEdit(event, record)}></Button>
            </>

            <>
              <Popconfirm
                placement="top"
                title="Bạn có xác nhận muốn xóa?"
                onConfirm={event => handleDelete(event, record)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button size="small" className="btnIcon" icon="delete"></Button>
              </Popconfirm>
            </>
          </>
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

  const handleExportGateway = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const param: ExportParam = {
          text: props.form.getFieldValue('text'),
        };
        console.log(param);
        exportGateway(param)
          .then((rs: any) => {
            if (rs.code === 0) {
              NotificationError('Thất bại', 'Tải danh sách gateway thất bại');
            }
          })
          .catch(() => {
            NotificationError('Thất bại', 'Tải danh sách gateway thất bại');
          });
      }
    });
  };

  const handleGetListAfterCreate = () => {
    setPage(1);
    loadDataGateway('', 1);
  };

  return (
    <ViewTable>
      <div className={'header'}>
        <Content>Danh sách Môi trường Gateway</Content>
        <div className="container-button">
          <Button className="mr-2" icon="cloud-download" onClick={record => handleExportGateway()}>
            Export
          </Button>
          {/* <UpLoadGateway /> */}
          <Button className="mr-2" icon="cloud-upload" onClick={handleOpenFormImportGateways}>
            Import
          </Button>

          <AddGateway refreshList={handleGetListAfterCreate} />
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
                    placeholder="Tên môi trường"
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
          rowKey="name"
          columns={columns}
          dataSource={getDataGatewayState.rows}
          className="custom-table-2"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            total: getDataGatewayState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>
      <UpdateGateway page={page} />

      <FormImportGateways
        reload={handleReset}
        visible={openFormImportGateways}
        onClose={handleCloseFormImportGateways}
      />

      {props.getDataGatewayState.loading || props.deleteState.loading ? <Loading /> : null}
    </ViewTable>
  );
}

export default connector(Form.create<IProps>()(DataGatewayPage));
