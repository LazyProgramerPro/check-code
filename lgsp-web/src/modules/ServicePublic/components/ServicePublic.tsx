import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Form, Modal, Popconfirm, Row, Table, Tooltip } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import AddService from './AddService';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { RootState } from 'src/redux/store';
import { getService } from '../redux/actions/get_service';
import { DeleteServiceParam, GetServiceParams, ServiceData } from '../redux/models';
import { initData } from '../redux/reducers/get_service';
import { deleteService } from '../redux/actions/delete_service';
import UpdateService from './UpdateService';
import Loading from '../../../components/Loading';
import { showUpdateServiceForm } from '../redux/actions/update_service';
import { useParams } from 'react-router';
interface Service {
  key: string;
  name: string;
  description: string;
  number: number;
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
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
const StyledSearch = styled.div`
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

const StyleSearch = styled(Search)`
  input {
    border: 1px solid #d9d9d9 !important;
    background: #f9f9f9;
    border-radius: 5px;
  }
  margin-left: 16px;
  margin-top: 17px;
`;
const Data = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getServiceState: rootState.servicePublic.getState,
  createState: rootState.servicePublic.createState,
  updateState: rootState.servicePublic.updateState,
  deleteState: rootState.servicePublic.deleteState,
});
const connector = connect(mapState, { getService, showUpdateServiceForm, deleteService });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function ServicePublic(props: IProps) {
  const { getServiceState, getService, deleteService } = props;
  const params: any = useParams();
  const [categoryId] = useState<string>(params.categoryId);

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');

  document.title = 'Danh s??ch nh??m chia s??? d???ch v???';

  const loadDataServicePublic = (search?: string, pageParam?: number) => {
    const keySearch = search === undefined ? valueSearch : search;
    window.scrollTo(0, 0);
    let params: GetServiceParams = {
      ...getServiceState.params,
      page: pageParam ? pageParam : page,
      size: size,
      text: encodeURI(keySearch.trim()),
      categoryId: categoryId || '',
    };
    setValueSearch(keySearch.trim());
    props.form.resetFields(['text']);
    getService(params);
  };

  const handleGetListAfterCreate = () => {
    setPage(1);
    loadDataServicePublic('', 1);
  };
  const loadSearch = () => {
    setPage(1);
    loadDataServicePublic();
  };

  const handleReset = () => {
    setPage(1);
    setValueSearch('');
    loadDataServicePublic('');
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    loadDataServicePublic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, props.getServiceState.flag_reload]);

  useEffect(() => {
    loadDataServicePublic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getServiceState.load_page]);

  const handleEdit = (e: any, record: any) => {
    const data: ServiceData = {
      id: record.id,
      name: record.name,
      description: record.description,
      numberApis: record.numberApis,
    };
    props.showUpdateServiceForm(true, data);
  };
  const checkString = (description: string) => {
    return description.split('\n')[0];
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'T??n',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },

    {
      title: 'M?? t???',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      render: (text: any, record: any) => {
        return <>{checkString(`${record.description}`)}</>;
      },
      ellipsis: true,
    },
    {
      title: 'S??? d???ch v??? chia s??? k???t n???i',
      dataIndex: 'numberApis',
      key: 'numberApis',
      render: (text: any, record: any) => (
        <>{`${record.numberApis}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</>
      ),
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'hanhdong',
      key: 'hanhdong',
      width: 150,
      render: (text: any, record: any) => {
        return (
          <div>
            <>
              <Button size="small" className="btnIcon" icon="eye" onClick={event => handleEdit(event, record)}></Button>
            </>
            <>
              <Popconfirm
                placement="top"
                title="B???n c?? x??c nh???n mu???n x??a?"
                onConfirm={event => handleDelete(event, record)}
                okText="X??c nh???n"
                cancelText="H???y"
              >
                <Button size="small" className="btnIcon" icon="delete"></Button>
              </Popconfirm>
            </>
          </div>
        );
      },
    },
  ];
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState<ServiceData>(initData);
  const showdialog = (value: ServiceData) => {
    setVisible(true);
    setDetail(value);
  };
  const closedialog = () => {
    setVisible(false);
  };

  const handleDelete = (event: any, record: ServiceData) => {
    const param: DeleteServiceParam = {
      id: record.id,
    };
    deleteService(param);
    setPage(1);
    setValueSearch('');
    loadDataServicePublic();
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
        <Content>Danh s??ch nh??m chia s??? d???ch v???</Content>
        <AddService refreshList={handleGetListAfterCreate} />
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
                    placeholder="T??n nh??m d???ch v???"
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
                <Button type="primary" htmlType="submit" className="minWidthBtn" onClick={loadSearch}>
                  T??m ki???m
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
          dataSource={getServiceState.rows}
          locale={{
            emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
          }}
          pagination={{
            total: getServiceState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `??ang xem ${range[0]} ?????n ${range[1]} trong t???ng s??? ${total} m???c`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>
      <UpdateService page={page} />
      {props.getServiceState.loading ||
      props.createState.loading ||
      props.updateState.loading ||
      props.deleteState.loading ? (
        <Loading />
      ) : null}
    </View>
  );
}
export default connector(Form.create<IProps>()(ServicePublic));
