import { Button, Col, DatePicker, Form, Modal, Popconfirm, Row, Select, Table, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Search from 'antd/lib/input/Search';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import { DeleteServiceParam } from '../../ServicePublic/redux/models';
import { getAllGroupRestApi, reloadData } from '../redux/actions/group_api';
import { IGroupApiParams, IRestApiObject } from '../redux/models';
import { checkingBeforeDeleteApiService, deleteApiService } from '../redux/services/apis';
import CreateApiForm2 from './CreateApiForm2';
import 'moment/locale/vi';
import { CommonSearchParam } from 'src/models/common';
import { getCategories } from 'src/modules/ApiGeneralInformation/redux/services/apis';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getGroupApiState: rootState.groupRestApi.getState,
  getState: rootState.groupRestApi.getState,
});
const connector = connect(mapState, { getAllGroupRestApi });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}
function DataTable(props: IProps) {
  const { getGroupApiState, getAllGroupRestApi, getState } = props;
  const { Text } = Typography;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [start] = useState(true);

  ////////////////////////////
  const [keySearch, setKeySearch] = useState('');

  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  // const [endOpen, setendOpen] = useState(false);

  const [filterDate, setFilterDate] = useState<any>({
    startValue: null,
    endValue: null,
    endOpen: false,
  });

  const [category, setCategory] = useState('');
  // const [status, setStatus] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);

  const { getFieldDecorator, resetFields } = props.form;

  const [locale] = useState(viVN);

  const handleSearch = (e: any) => {
    const startDate1 = props.form.getFieldValue('startDate') ? props.form.getFieldValue('startDate') : undefined;
    const endDate1 = props.form.getFieldValue('endDate') ? props.form.getFieldValue('endDate') : undefined;

    e.preventDefault();
    let params: IGroupApiParams = {
      ...getState.params,
      text: encodeURI(keySearch.trim()),
      category: category,

      startDate: startDate1 !== undefined ? moment(props.form.getFieldValue('startDate')).format('DD/MM/YYYY') : '',
      endDate: endDate1 !== undefined ? moment(props.form.getFieldValue('endDate')).format('DD/MM/YYYY') : '',

      page: 1,
    };

    setPage(1);
    getAllGroupRestApi(params);
  };

  const handleReset = () => {
    setKeySearch('');
    setCategory('');
    setPage(1);
    resetFields();
    setValue('');
    let params: IGroupApiParams = {
      text: '',
      category: '',
      startDate: '',
      endDate: '',
      page: 1,
    };
    getAllGroupRestApi(params);
  };

  useEffect(() => {
    const searchCategoryParam: CommonSearchParam = {
      text: '',
      page: 1,
      size: 10,
    };
    getCategories(searchCategoryParam)
      .then(rs => {
        if (rs.code === 0) {
          setCategoryOptions(rs.rows);
        }
      })
      .catch(e => NotificationError('Thất bại', 'Lỗi hệ thống'));
  }, []);

  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const handleCategoryChange = (value: any) => {
    if (value !== undefined) {
      const key = value;
      setCategory(key);
    } else {
      setCategory('');
    }
  };

  const IGroupApiState = useAppSelector(state => state.groupRestApi.getState);

  const { total: totalRow, data: listGroupApi } = IGroupApiState;
  const [loading, setLoading] = useState(false);
  const loadGroupApi = () => {
    window.scrollTo(0, 0);
    let params: IGroupApiParams = {
      text: encodeURI(keySearch.trim()),
      category: getGroupApiState.params?.category || '',
      endDate: getGroupApiState.params?.endDate || '',
      startDate: getGroupApiState.params?.startDate || '',
      status: getGroupApiState.params?.text || '',
      page: page,
      size: size,
    };
    dispatch(getAllGroupRestApi(params));
  };
  useEffect(() => {
    loadGroupApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, getGroupApiState.flag_reload, start]);

  const handleDelete = (record: Partial<IRestApiObject>) => {
    setLoading(true);
    const deleteParam: DeleteServiceParam = {
      id: record.id || '',
    };

    checkingBeforeDeleteApiService(deleteParam)
      .then(rs => {
        setLoading(false);
        if (rs.code === -1) {
          Modal.confirm({
            content: 'Dịch vụ đã có người đăng ký. Bạn có chắc muốn xóa không?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk() {
              callApiDelete(deleteParam);
            },
            onCancel() {},
          });
          return;
        }

        callApiDelete(deleteParam);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
  };

  const callApiDelete = (deleteParam: DeleteServiceParam) => {
    setLoading(true);
    deleteApiService(deleteParam)
      .then(rs => {
        setLoading(false);
        if (rs.code !== 0) {
          NotificationError('Thất bại', rs.message);
          return;
        }
        NotificationSuccess('Thành công', 'Xóa dịch vụ chia sẻ thành công');
        dispatch(reloadData());
      })
      .catch(err => {
        setLoading(false);
        NotificationError('Thất bại', err.message);
      });
  };
  const restrict = (event: any) => {
    const regex = new RegExp('^[a-zA-Z0-9-_.#@& ]+$');
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  };

  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      keySearch: {
        value: checkText,
      },
    });
    return callback();
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      width: 250,
      render: (values: string) => {
        return (
          <>
            <Text>{values}</Text>
          </>
        );
      },
      ellipsis: true,
    },
    {
      title: 'Nhóm dịch vụ',
      dataIndex: 'category',
      ellipsis: true,
      render: (values: string[]) => {
        if (values === undefined || values === null) {
          return '';
        }

        return <>{values}</>;
      },
    },
    {
      title: 'Phiên bản',
      dataIndex: 'version',
      render: (values: string) => {
        return (
          <>
            <Text>{values}</Text>
          </>
        );
      },
      ellipsis: true,
    },
    {
      title: 'Người tạo',
      dataIndex: 'create_by',
      ellipsis: true,
      render: (values: string) => {
        return (
          <>
            <Text>{values}</Text>
          </>
        );
      },
    },

    {
      title: 'Thời gian tạo',
      dataIndex: 'date',
      ellipsis: true,
      render: (value: Number) => {
        if (value == undefined) {
          return <></>;
        }
        let d = value.toString();
        let date = d.substr(6, 2) + '/' + d.substr(4, 2) + '/' + d.substr(0, 4);
        return (
          <>
            <Text>{date}</Text>
          </>
        );
      },
    },
    {
      title: () => {
        return <div style={{ whiteSpace: 'nowrap' }}>Hành động</div>;
      },
      dataIndex: 'action',
      width: 150,
      render: (_text: string, record: any) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Link to={`group-api-config/${record.id}`}>
              <Button size="small" className="btnIcon" icon="eye" />
            </Link>

            <Popconfirm
              placement="top"
              title="Bạn có xác nhận muốn xóa?"
              onConfirm={() => handleDelete(record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <Button className="btnIcon" size="small" icon="delete" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const pasteSearch = () => {
    props.form.setFields({
      keySearch: {
        value: keySearch.trim() + ' ',
      },
    });
  };

  const [value, setValue] = useState<any>({
    startValue: null,
    endValue: null,
    endOpen: false,
  });

  const disabledStartDate = (startValue: any) => {
    const { endValue } = value;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf() + 84000;
  };

  const disabledEndDate = (endValue: any) => {
    const { startValue } = value;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onChange = (field: any, value1: any) => {
    setValue({ ...value, [field]: value1 });
  };

  const onStartChange = (value: any) => {
    onChange('startValue', value);
  };

  const onEndChange = (value: any) => {
    onChange('endValue', value);
  };

  const handleStartOpenChange = (open: any) => {
    if (!open) {
      setValue({ ...value, endOpen: true });
    }
  };

  const handleEndOpenChange = (open: any) => {
    setValue({ ...value, endOpen: open });
  };

  const localeDatePicker = {
    lang: {
      locale: 'en_US',
      today: 'Ngày hiện tại',
      yearFormat: 'YYYY',
      dateFormat: 'DD/MM/yyyy',
      dayFormat: 'D',
      dateTimeFormat: 'DD/MM/yyyy',
      monthFormat: 'MMMM',
      monthBeforeYear: true,
    },
    timePickerLocale: {
      placeholder: 'Select time',
    },
    dateFormat: 'DD/MM/yyyy',

    weekFormat: 'YYYY-wo',
    monthFormat: 'YYYY-MM',
  };

  return (
    <>
      <View>
        <div className="serach-table-wrapper">
          <Form>
            <Row gutter={8} type="flex" justify="space-between" align="middle">
              <Col sm={24} md={5}>
                <Form.Item>
                  {getFieldDecorator('keySearch', {
                    initialValue: keySearch,
                    validateTrigger: 'onBlur',
                    rules: [{ validator: validateTextSearch }],
                  })(
                    <Search
                      onChange={handleTextChange}
                      placeholder="Tên dịch vụ"
                      maxLength={50}
                      onPaste={pasteSearch}
                    />,
                  )}
                </Form.Item>
              </Col>

              <Col sm={24} md={5}>
                <Form.Item>
                  {getFieldDecorator(
                    'category',
                    {},
                  )(
                    <Select showSearch placeholder="Nhóm dịch vụ" onChange={handleCategoryChange} allowClear={true}>
                      {categoryOptions.map((item: any) => {
                        return (
                          <Select.Option key={item.name} value={item.name}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col sm={24} md={5}>
                <Form.Item>
                  {getFieldDecorator('startDate')(
                    <DatePicker
                      format={'DD/MM/yyyy'}
                      onOpenChange={handleStartOpenChange}
                      locale={localeDatePicker}
                      style={{ width: '100%' }}
                      placeholder={'Ngày bắt đầu'}
                      onChange={onStartChange}
                      disabledDate={disabledStartDate}
                      autoFocus={false}
                    />,
                  )}
                </Form.Item>
              </Col>

              <Col sm={24} md={5}>
                <Form.Item>
                  {getFieldDecorator('endDate')(
                    <DatePicker
                      disabledDate={disabledEndDate}
                      onChange={onEndChange}
                      onOpenChange={handleEndOpenChange}
                      locale={localeDatePicker}
                      style={{ width: '100%' }}
                      placeholder={'Ngày kết thúc'}
                      format={'DD/MM/yyyy'}
                      autoFocus={false}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col sm={24} md={2}>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    onClick={(e: any) => handleSearch(e)}
                    className="minWidthBtn"
                  >
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Col>
              <Col sm={24} md={2}>
                <Form.Item>
                  <Button style={{ width: '100%' }} onClick={handleReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </View>
      <Data>
        <Table
          columns={columns}
          dataSource={getGroupApiState.rows}
          className="custom-table-2"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          rowKey="id"
          pagination={{
            total: getGroupApiState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>
      <CreateApiForm2 />
      {props.getGroupApiState.loading || loading ? <Loading /> : null}
    </>
  );
}

export default connector(Form.create<IProps>()(DataTable));
const Data = styled.div`
  width: 100%;
  margin-bottom: -2px;
  .btnIcon {
    margin: 0px 4px;
  }
`;

const View = styled.div`
  margin-top: -5px;
`;
