import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Form, Modal, Popconfirm, Row, Table, Tooltip } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import AddResource from './AddResource';
import Search from 'antd/lib/input/Search';
import { RootState } from 'src/redux/store';
import { getResource } from '../redux/actions/get_resource';
import { DeleteResourceParam, GetResourceParams, Resource } from '../redux/models';
import { deleteResource } from '../redux/actions/delete_resource';
import UpdateResource from './UpdateResource';
import { showUpdateResourceForm } from '../redux/actions/update_resource';
import { useParams } from 'react-router';
import Loading from 'src/components/Loading';
import {doc} from "prettier";
const View = styled.div`
  padding: 0px 15px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
  }

  .ant-input {
    font-style: normal;
    font-weight: normal;
    background: white;
  }

  .title {
    font-size: 20px;
    line-height: 26px;
    color: #043bff;
  }

  .button {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  .ant-form-item {
    margin-bottom: 4px;
  }
  .ant-modal-body {
    padding: 16px 25px !important;
  }
  .ant-form-item label {
    font-size: 13px;
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
const Content = styled.div`
  font-size: 20px;
`;

const Data = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const StyledSearch = styled.div`
  /* margin-bottom: -12px; */
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

// const confirm = (e: any) => {
//   NotificationSuccess('Thành Công', 'Xóa giới hạn truy cập cho từng resource thành công');
// };

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getResourceState: rootState.connectResource.getResourceState,
  createState: rootState.connectResource.createState,
  updateState: rootState.connectResource.updateState,
  deleteState: rootState.connectResource.deleteState,
});
const connector = connect(mapState, { getResource, showUpdateResourceForm, deleteResource });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function DataResource(props: IProps) {
  const { getResourceState, getResource, deleteResource } = props;
  const params: any = useParams();
  const [uuid] = useState<string>(params.uuid);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');

  document.title = 'Danh sách giới hạn truy cập resources';

  const loadDataResource = (search?: string, pageParam?: number) => {
    const keySearch = search === undefined ? valueSearch : search;
    window.scrollTo(0, 0);
    let params: GetResourceParams = {
      ...getResourceState.params,
      page: pageParam ? pageParam : page,
      size: size,
      text: encodeURI(keySearch.trim()),
    };
    setValueSearch(valueSearch.trim());
    props.form.resetFields(['name']);
    getResource(params);
  };

  const handleGetListAfterCreate = () => {
    setPage(1);
    loadDataResource('', 1);
  };

  const loadSearch = () => {
    setPage(1);
    loadDataResource();
  };

  const handleReset = () => {
    setPage(1);
    loadDataResource('');
    setValueSearch('');
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    loadDataResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);
  useEffect(() => {
    loadDataResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [props.getResourceState.load_page]);

  const handleDelete = (event: any, record: Resource) => {
    const param: DeleteResourceParam = {
      uuid: record.uuid,
    };
    deleteResource(param);
    setPage(1);
    setValueSearch('');
    loadDataResource();
  };
  const checkType = (time: string) => {
    if (time === 'min') {
      return 'Phút';
    } else if (time === 'hour') {
      return 'Giờ';
    } else if (time === 'day') {
      return 'Ngày';
    } else if (time === 'month') {
      return 'Tháng';
    } else if (time === 'year') {
      return 'Năm';
    }
  };
  const checkQuotaType = (quotaType: string) => {
    if (quotaType === 'requestCount') {
      return 'Số lượng yêu cầu';
    } else {
      return 'Dung lượng';
    }
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

  const handleEdit = (e: any, record: any) => {
    const data: Resource = {
      id: record.id,
      uuid: record.uuid,
      name: record.name,
      displayName: record.displayName,
      description: record.description,
      quotaType: record.quotaType,
      quota: record.quota,
      quotaUnit: record.quotaUnit,
      unitTime: record.unitTime,
      timeUnit: record.timeUnit,
      deployed: true,
    };
    props.showUpdateResourceForm(true, data);
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
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
      // render: (text: any, record: any) => <>{`${record.quota}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</>,
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
              <Button size="small" className="btnIcon" icon="eye" onClick={event => handleEdit(event, record)} />
            </>

            <>
              <Popconfirm
                placement="top"
                title="Bạn có xác nhận muốn xóa?"
                onConfirm={event => handleDelete(event, record)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button className="btnIcon" size="small" disabled={record.deployed} icon="delete" />
              </Popconfirm>
            </>
          </>
        );
      },
    },
  ];

  const pasteSearch = () => {
    props.form.setFields({
      name: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <View>
      <div className={'header'}>
        <Content>Danh sách giới hạn truy cập resources</Content>
        <AddResource refreshList={handleGetListAfterCreate} />
      </div>

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
                  <Search
                    placeholder="Tên giới hạn truy cập"
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
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          dataSource={getResourceState.rows}
          pagination={{
            total: getResourceState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>

      <UpdateResource page={page} />
      {props.getResourceState.loading ||
      props.createState.loading ||
      props.updateState.loading ||
      props.deleteState.loading ? (
        <Loading />
      ) : null}
    </View>
  );
}

export default connector(Form.create<IProps>()(DataResource));
