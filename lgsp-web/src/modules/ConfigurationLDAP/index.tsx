import { Button, Col, Input, Form, Popconfirm, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { FormComponentProps } from 'antd/lib/form';
import { getData } from './redux/actions/get_data';
import { connect, ConnectedProps } from 'react-redux';
import { Data, DeleteParam, GetDataParams } from './redux/models';
import { deleteData } from './redux/service/api';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import {doc} from "prettier";
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getDataState: rootState.dataLDAP.getState,
});

const connector = connect(mapState, { getData });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function ConfigurationLDAP(props: IProps) {
  const { getDataState, getData } = props;
  const { resetFields } = props.form;
  const [valueSearch, setValueSearch] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [total, setTotal] = useState(100);
  const [openDetail, setOpenDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  document.title = 'Danh sách cấu hình LDAP';

  const loadData = (search?: string, pageParam?: number) => {
    const keySearch = search === undefined ? valueSearch : search;
    window.scrollTo(0, 0);
    let params: GetDataParams = {
      ...getDataState.params,
      page: pageParam ? pageParam : page,
      size: size,
      text: encodeURI(keySearch.trim()),
    };
    getData(params);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, props.getDataState.flag_reload]);

  const handleReset = () => {
    setPage(1);
    setValueSearch('');
    resetFields();
    loadData('');
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
    // setPage(1);
  };

  const loadSearch = () => {
    setPage(1);
    loadData();
  };
  const handleDelete = (event: any, record: Data) => {
    const param: DeleteParam = {
      id: record.id,
    };
    deleteData(param)
      .then(rs => {
        setLoading(false);
        if (rs.code === 0) {
          NotificationSuccess('Thành công', 'Xóa thông tin kết nối LDAP thành công');
          setPage(1);
          setValueSearch('');
          loadSearch();
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(err => {
        setLoading(false);
        NotificationError('Thất bại', err.message);
      });
  };

  // Detail
  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const checkStatus = (status: string) => {
    if (status === 'disable') {
      return 'Chưa kết nối';
    } else if (status === 'enable') {
      return 'Đã kết nối';
    }
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'domainName',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text: string) => {
        return (
          <>
            <span>{checkStatus(text)}</span>
          </>
        );
      },
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
              <Link to={`/detail-configuration-ldap/${record.id}`}>
                <Button size="small" className="btnIcon" icon="eye" onClick={handleOpenDetail}></Button>
              </Link>
            </>

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
    <Wrapper>
      <div className="header">
        <div className="header-title">Danh sách cấu hình LDAP</div>
        <Link to={'/create-configuration-ldap'}>
          <Button icon="plus">Tạo mới</Button>
        </Link>
      </div>

      <div className="search">
        <Form>
          <Row gutter={[8, 8]}>
            <Col lg={18}>
              <Form.Item>
                {props.form.getFieldDecorator('text', {
                  validateTrigger: 'onBlur',
                  initialValue: valueSearch,
                  rules: [{ validator: validateTextSearch }],
                })(
                  <Input.Search
                    placeholder="Tìm kiếm"
                    value={valueSearch}
                    onChange={e => onChangeInput(e)}
                    maxLength={255}
                    onPaste={pasteSearch}
                  ></Input.Search>,
                )}
              </Form.Item>
            </Col>

            <Col lg={3}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="minWidthBtn" onClick={loadSearch}>
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
      </div>

      <div className="table">
        <Table
          columns={columns}
          dataSource={getDataState.rows}
          className="custom-table-2"
          rowKey="id"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            total: getDataState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </div>
      {loading ? <Loading /> : null}
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(ConfigurationLDAP));

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
  .search {
    .ant-form-item {
      margin-bottom: 0px;
    }
  }

  .btnIcon {
    margin: 0px 4px;
  }

  .table {
    margin-top: 10px;
  }
`;
