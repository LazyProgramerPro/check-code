import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, DatePicker, Form, Row, Select, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { getLog } from '../redux/actions/get_log';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { RootState } from 'src/redux/store';
import { GetLogParams } from '../redux/models';
import Loading from 'src/components/Loading';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';
interface Data {
  key: string;
  code: string;
  type: string;
  name: string;
  detail: string;
  time: string;
}
const View = styled.div`
  .btn {
    border-radius: 5px;
    margin-left: 44px;
  }
  .ant-input {
    font-style: normal;
    font-weight: normal;
    background: white;
  }

  width: 100%;
  /* margin-top: 10px; */
  .header {
    height: 62px;
    border-bottom: 0.5px solid #e0d6d6;
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
  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px 7px;
    }
  }
`;
const ViewHeader = styled.div`
  margin-bottom: 10px;
  .ant-from {
    width: 70%;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }

  .form-date {
    margin-right: 8px !important;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getLogState: rootState.dataLog.getState,
});
const connector = connect(mapState, { getLog });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function DataTable(props: IProps) {
  const { getLogState, getLog } = props;
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const { getFieldDecorator, resetFields } = props.form;
  const loadDataLog = () => {
    window.scrollTo(0, 0);
    let params: GetLogParams = {
      ...getLogState.params,
      page: page,
      size: size,
    };
    getLog(params);
  };
  useEffect(() => {
    loadDataLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);
  const [codes, setCodes] = useState<number[]>([]);
  const [type, setType] = useState('');
  const [visible, setVisible] = useState(false);
  const [locale] = useState(viVN);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startDate1 = props.form.getFieldValue('startDate') ? props.form.getFieldValue('startDate') : undefined;
    const endDate1 = props.form.getFieldValue('endDate') ? props.form.getFieldValue('endDate') : undefined;
    props.form.validateFields((err, values) => {
      if (!err) {
        let param: GetLogParams = {
          type: values.type?.key || '',
          startDate: startDate1 !== undefined ? moment(props.form.getFieldValue('startDate')).format('DD/MM/YYYY') : '',
          endDate: endDate1 !== undefined ? moment(props.form.getFieldValue('endDate')).format('DD/MM/YYYY') : '',
          size: size,
          page: 1,
        };
        setPage(1);
        getLog(param);
      }
    });
  };
  const handleReset = () => {
    setType('');
    resetFields();
    setPage(1);
    setValue('');
    let params: GetLogParams = {
      code: 0,
      type: '',
      startDate: '',
      endDate: '',
      page: 1,
    };
    getLog(params);
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

  useEffect(() => {
    loadDataLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  useEffect(() => {
    loadDataLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  // get list code in data
  useEffect(() => {
    const arr: number[] = getLogState.rows.map((e: any) => e.code);
    const codeUnique: number[] = Array.from(new Set(arr));
    setCodes(codeUnique);
  }, [getLogState.rows]);
  const columns: ColumnProps<any>[] = [
    {
      title: 'Kiểu sự kiện',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },

    {
      title: 'Chi tiết',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 250,
    },
  ];

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
    <View>
      <ViewHeader>
        <Form style={{ width: '100%' }}>
          <Row gutter={8} type="flex" justify="space-between" align="middle">
            <Col sm={24} md={6}>
              <Form.Item className="form-item">
                {getFieldDecorator('type')(
                  <Select
                    showSearch
                    labelInValue
                    placeholder="Kiểu sự kiện"
                    optionFilterProp="children"
                    allowClear={true}
                  >
                    <Select.Option value="Information">Information</Select.Option>
                    <Select.Option value="Warning">Warning</Select.Option>
                    <Select.Option value="Error">Error</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={6}>
              <Form.Item className="form-item">
                {getFieldDecorator('startDate')(
                  <DatePicker
                    className="form-date"
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
            <Col sm={24} md={6}>
              <Form.Item className="form-item">
                {getFieldDecorator('endDate')(
                  <DatePicker
                    className="form-date"
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
            <Col sm={24} md={3}>
              <Form.Item className="form-item">
                <Button htmlType="submit" type="primary" onClick={handleSubmit} className="minWidthBtn">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
            <Col sm={24} md={3}>
              <Form.Item>
                <Button style={{ width: '100%' }} onClick={handleReset}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ViewHeader>
      <Table
        columns={columns}
        dataSource={getLogState.rows}
        className="custom-table-2"
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        pagination={{
          total: getLogState.total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
          current: page,
          pageSize: size,
        }}
      />
      {props.getLogState.loading ? <Loading /> : null}
    </View>
  );
}
export default connector(Form.create<IProps>()(DataTable));
