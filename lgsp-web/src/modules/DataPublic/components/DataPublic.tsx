import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import env from '../../../configs/env';
import { Button, Col, DatePicker, Form, Row, Select, Table, Tooltip } from 'antd';
import { ColumnProps } from 'antd/es/table';
import Search from 'antd/lib/input/Search';
import { Link } from 'react-router-dom';
import { RootState } from 'src/redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { getAllDatas } from '../redux/action/get_datas';
import { getOrganization } from '../redux/action/get_organization';
import { GetCategoryParams, GetDataParams } from '../redux/models';
import { getCategory } from '../redux/action/get_category';
import { FormComponentProps } from 'antd/lib/form';
import Loading from 'src/components/Loading';
import { IGroupApiParams } from 'src/modules/GroupApi/redux/models';
// import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';

interface User {
  key: string;
  name: string;
  service: string;
  supplier: string;
  creator: string;
  status: string;
}
const size = env.pageSize;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getDataState: rootState.dataPublic.getState,
  getOrganizationState: rootState.dataPublic.getOrganizationState,
  getCategoryState: rootState.dataPublic.getCategoryState,
});
const connector = connect(mapState, { getAllDatas, getOrganization, getCategory });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function DataPublic(props: IProps) {
  const { getDataState, getAllDatas, getOrganizationState, getOrganization, getCategoryState, getCategory } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');
  const [category, setCategory] = useState('');
  const [provider, setProvider] = useState('');
  const [visible, setVisible] = useState(false);
  // const [locale] = useState(viVN);

  document.title = 'Danh sách dịch vụ chia sẻ công khai';

  const loadDataPublic = () => {
    window.scrollTo(0, 0);
    let params: GetDataParams = {
      ...getDataState.params,
      text: valueSearch,
      page: page,
      size: size,
    };
    getAllDatas(params);
  };

  const loadSearch = () => {
    loadDataPublic();
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
    // setPage(1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loadDataPublic();
    const startDate1 = props.form.getFieldValue('startDate') ? props.form.getFieldValue('startDate') : undefined;
    const endDate1 = props.form.getFieldValue('endDate') ? props.form.getFieldValue('endDate') : undefined;
    props.form.validateFields((err, values) => {
      let param: GetDataParams = {
        category: values.category || '',
        provider: values.provider || '',
        startDate: startDate1 !== undefined ? moment(props.form.getFieldValue('startDate')).format('DD/MM/YYYY') : '',
        endDate: endDate1 !== undefined ? moment(props.form.getFieldValue('endDate')).format('DD/MM/YYYY') : '',
        text: encodeURI(values.text.trim()) || '',
        size: size,
      };
      setValueSearch(valueSearch.trim());
      props.form.resetFields(['text']);
      getAllDatas(param);
      setPage(1);
    });
  };

  const handleReset = () => {
    setValueSearch('');
    setCategory('');
    setProvider('');
    resetFields();
    setValue('');
    let params: GetDataParams = {
      text: '',
      category: '',
      provider: '',
      startDate: '',
      endDate: '',
      page: 1,
      size: 50,
    };
    setPage(1);
    getAllDatas(params);
  };

  useEffect(() => {
    loadDataPublic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  useEffect(() => {
    loadDataPublic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    getOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let params: GetCategoryParams = {
      ...getCategoryState.params,
      page: 0,
      size: size,
    };
    getCategory(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Nhóm dịch vụ',
      dataIndex: 'category',
      key: 'category',
      width: 349,
      render: (text: any, record: any) => <>{text}</>,
    },
    {
      title: 'Đơn vị cung cấp',
      dataIndex: 'deployment_unit',
      key: 'deployment_unit',
      ellipsis: true,
    },
    {
      title: 'Người tạo',
      dataIndex: 'create_by',
      key: 'create_by',
      // width: 349,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      // render: (text: any, record: any) => <>{checkStatus(record.status)}</>,
    },
    {
      title: 'Hành động',
      dataIndex: 'active',
      key: 'active',
      width: 200,
      render: (text: any, record: any) => (
        <span>
          {record.active && (
            <IconEye>
              <Link to={`/manager-infor/data-public/detail/${record.id}`}>
                <Button size="small" className="btnIcon" icon="eye"></Button>
              </Link>
            </IconEye>
          )}
        </span>
      ),
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
    <ViewTable>
      <div className="header">
        <div className="header-title">Danh sách dịch vụ chia sẻ công khai</div>
      </div>
      <div className="search">
        <Form>
          <Row gutter={[8, 8]}>
            <Col lg={4}>
              <Form.Item>
                {getFieldDecorator('text', {
                  initialValue: valueSearch,
                  rules: [{ validator: validateTextSearch }],
                  validateTrigger: 'onBlur',
                })(
                  <StyleSearch
                    placeholder="Tên dịch vụ"
                    value={valueSearch}
                    onChange={e => onChangeInput(e)}
                    maxLength={50}
                    onPaste={pasteSearch}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col lg={4}>
              <Form.Item>
                {getFieldDecorator('category')(
                  <Select
                    placeholder="Nhóm dịch vụ"
                    allowClear={true}

                    // onChange={(e: any) => onChangeCategory(e)}
                  >
                    {getCategoryState.rows?.map((e: any, index: any) => (
                      <Select.Option value={e.name} key={index}>
                        {e.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>

            <Col lg={4}>
              <Form.Item>
                {getFieldDecorator('provider')(
                  <Select allowClear={true} placeholder="Đơn vị cung cấp">
                    {getOrganizationState.rows?.map((e: any, i: any) => (
                      <Select.Option value={e} key={i}>
                        {e}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>

            <Col lg={4}>
              <Form.Item>
                {getFieldDecorator('startDate')(
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder={'Ngày bắt đầu'}
                    format={'DD/MM/yyyy'}
                    autoFocus={false}
                    onOpenChange={handleStartOpenChange}
                    locale={localeDatePicker}
                    onChange={onStartChange}
                    disabledDate={disabledStartDate}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col lg={4}>
              <Form.Item>
                {getFieldDecorator('endDate')(
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder={'Ngày kết thúc'}
                    format={'DD/MM/yyyy'}
                    disabledDate={disabledEndDate}
                    onChange={onEndChange}
                    onOpenChange={handleEndOpenChange}
                    locale={localeDatePicker}
                    autoFocus={false}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col lg={2}>
              <Form.Item>
                <Button className="minWidthBtn" htmlType="submit" type="primary" onClick={handleSubmit}>
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>

            <Col lg={2}>
              <Form.Item>
                <Button className="minWidthBtn" onClick={handleReset}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <DataTable>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={getDataState.rows}
          className="custom-table-2"
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
      </DataTable>
      {props.getDataState.loading ? <Loading /> : null}
    </ViewTable>
  );
}
export default connector(Form.create<IProps>()(DataPublic));
const ViewTable = styled.div`
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
    /* height: 55px; */
    margin-top: -7px;
    .ant-form-item {
      margin-bottom: 0px;
    }
  }
`;
const DataTable = styled.div`
  width: 100%;
  margin-top: 10px;

  .anticon-eye {
    color: black;
  }
`;

const StyleSearch = styled(Search)`
  /* input {
    border: 1px solid #d9d9d9;
    background: #f9f9f9;
  } */
`;
const IconEye = styled.div`
  padding: 0px 23px;
`;
