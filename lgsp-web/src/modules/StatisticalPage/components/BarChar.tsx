import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { RootState } from 'src/redux/store';
import { getLogConnection } from '../redux/actions/get_connection';
import { getAccount } from '../redux/actions/get_account';
import { useParams } from 'react-router';
import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import moment from 'moment';
import { GetAccountParams, GetDataParams, GetDataServiceParams, GetIdParams } from '../redux/models';
import { getId } from '../redux/actions/get_id';
import { string } from 'yup/lib/locale';
import { type } from 'os';
import viVN from 'antd/es/locale/vi_VN';
const { MonthPicker, RangePicker } = DatePicker;
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getLogConnectionState: rootState.statisticalPageUser.getLogConnectionState,
  getAccountState: rootState.statisticalPageUser.getAccountState,
  getIdState: rootState.statisticalPageUser.getIdState,
});
const connector = connect(mapState, { getLogConnection, getAccount, getId });
type ReduxProps = ConnectedProps<typeof connector>;
interface IProps extends ReduxProps, FormComponentProps {}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Số lượt kết nối đến các dịch vụ chia sẻ',
    },
  },
};

const View = styled.div`
  .viewBarChar {
    max-width: 90.5%;
    margin: 0 auto 30px;
  }
  .form-item {
    .ant-calendar-picker {
    }
  }
`;

const ViewHeader = styled.div`
  .ant-from {
    width: 70%;
  }
  .ant-select-selection {
    margin-right: 10px !important;
  }
  .form-item {
    .ant-calendar-picker {
      width: 95%;
    }
  }
`;
function BarChar(props: IProps) {
  const { getLogConnectionState, getLogConnection, getAccountState, getAccount, getIdState, getId } = props;
  const [valueId, setValueId] = useState();
  const [valueUserName, setValueUserName] = useState();
  const [valueType, setValueType] = useState('date');

  const [valueAction, setValueAction] = useState(false);
  const [valueChangeType, setValueChangeType] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  // const [valueStartDate, setValueStartDate] = useState<any>(moment());
  // const [valueEndDate, setValueEndDate] = useState<any>(moment());
  const [size] = useState<number>(50);

  const [locale] = useState(viVN);
  const [value, setValue] = useState<any>({
    startValue: null,
    endValue: null,
    endOpen: false,
  });

  const loadDataServicePublic = (search?: string) => {
    window.scrollTo(0, 0);
    let params: GetIdParams = {
      ...getIdState.params,
      size: size,
      text: search,
    };
    getId(params);
  };

  const onHandleSearch = (e: any) => {
    loadDataServicePublic(e);
  };

  const loadAccountAll = (search?: string) => {
    window.scrollTo(0, 0);
    let params: GetAccountParams = {
      ...getAccountState.params,
      size: size,
      key: search,
    };
    getAccount(params);
  };

  const onHandleChange = (e: any) => {
    loadAccountAll(e);
  };

  useEffect(() => {
    let params: GetAccountParams = {
      ...getAccountState.params,
      page: 1,
      size: size,
    };
    getAccount(params);
  }, []);

  useEffect(() => {
    let params: GetIdParams = {
      ...getIdState.params,
      page: 1,
      size: size,
    };
    getId(params);
  }, []);

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

  // Chọn tháng theo tháng
  const onChangeMonth = (value: any) => {
    // setValueStartDate(e);
    onChange('startValue', value);
    setValueAction(true);
  };

  //Chọn giờ theo giờ
  const onChangeHour = (value: any) => {
    onChange('startValue1', value);
    setValueAction(true);
  };

  const onChangeEndDate = (value: any) => {
    onChange('endValue', value);
    setValueAction(true);
  };

  const onChangeId = (e: any) => {
    setValueId(e);
  };

  const onChangeUserName = (e: any) => {
    setValueUserName(e);
  };

  const onChangeType = (e: any) => {
    setValueType(e);
    resetFields();
    setValueChangeType(true);
    setValueAction(false);
  };

  const loadData = (id = '', userName = '', type = '', start = '', end = '') => {
    if (type === 'date') {
      const startDate1 = props.form.getFieldValue('startDate');
      console.log(startDate1);
      const endDate1 = props.form.getFieldValue('endDate');
      const params: GetDataParams = {
        apiId: id || '',
        startDate: startDate1 !== null ? moment(props.form.getFieldValue('startDate')).format('DD/MM/YYYY') : '',
        endDate: endDate1 !== null ? moment(props.form.getFieldValue('endDate')).format('DD/MM/YYYY') : '',
        type: type,
        username: userName || '',
      };

      props.getLogConnection(params);
    }

    if (type === 'month') {
      const params: GetDataParams = {
        apiId: id || '',
        startDate: moment(props.form.getFieldValue('startDate')).format('MM/YYYY'),
        endDate: '',
        type: type,
        username: userName || '',
      };
      props.getLogConnection(params);
    }

    if (type === 'hour') {
      const params: GetDataParams = {
        apiId: id || '',
        startDate: moment(props.form.getFieldValue('startDate1')).format('DD/MM/YYYY'),
        endDate: '',
        type: type,
        username: userName || '',
      };
      props.getLogConnection(params);
    }
  };

  const labels = getLogConnectionState?.item?.failedData.map((data: any, index: any) => data.x);

  const data = {
    labels,
    datasets: [
      {
        label: 'Số lần kết nối thành công',
        data: getLogConnectionState?.item?.successData.map((data: any, index: any) => data.y),
        backgroundColor: ' #86E790',
      },
      {
        label: 'Số lần kết nối không thành công',
        data: getLogConnectionState?.item?.failedData.map((data: any, index: any) => data.y),
        backgroundColor: '#E76250',
      },
    ],
  };
  const update = () => {
    loadData(
      valueId,
      valueUserName,
      valueType,
      moment(props.form.getFieldValue('startDate')).format('DD/MM/YYYY'),
      moment(props.form.getFieldValue('endDate')).format('DD/MM/YYYY'),
    );
  };

  const updateChar = () => {
    loadData(
      valueId,
      valueUserName,
      valueType,
      moment(props.form.getFieldValue('startDate1')).format('DD/MM/YYYY'),
      moment(props.form.getFieldValue('endDate')).format('DD/MM/YYYY'),
    );
  };

  const { getFieldDecorator, resetFields } = props.form;

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
        <Form style={{ width: '86.5%', padding: '16px', marginLeft: '28px' }}>
          <Row style={{ display: 'flex' }}>
            <Col sm={12} xs={24} md={8} xl={5}>
              <Form.Item className="form-item">
                {getFieldDecorator('apiId', { initialValue: valueId })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    allowClear={true}
                    placeholder="Dịch vụ chia sẻ"
                    onChange={onChangeId}
                    onSearch={onHandleSearch}
                  >
                    {getIdState.rows?.map((e: any, index: any) => (
                      <Select.Option value={e.id} key={index}>
                        {e.name}/{e.version}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>

            <Col sm={12} xs={24} md={8} xl={5}>
              <Form.Item className="form-item">
                {getFieldDecorator('username', { initialValue: valueUserName })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    allowClear={true}
                    placeholder="Tên tài khoản"
                    onChange={onChangeUserName}
                    onSearch={onHandleChange}
                  >
                    {getAccountState.rows?.map((e: any, index: any) => (
                      <Select.Option value={e.username} key={index}>
                        {e.username}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} md={8} xl={5}>
              <Form.Item className="form-item">
                {getFieldDecorator('type', { initialValue: valueType })(
                  <Select optionFilterProp="children" onChange={onChangeType}>
                    <Select.Option value="date">Theo ngày</Select.Option>
                    <Select.Option value="month">Theo tháng</Select.Option>
                    <Select.Option value="hour">Theo giờ</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            {valueType === 'date' && (
              <>
                <Col sm={12} xs={24} md={8} xl={5}>
                  <Form.Item className="form-item" style={{ marginRight: '10px' }}>
                    {getFieldDecorator('startDate')(
                      <DatePicker
                        className="form-item"
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
                <Col sm={12} xs={24} md={8} xl={5}>
                  <Form.Item className="form-item">
                    {getFieldDecorator('endDate')(
                      <DatePicker
                        className="form-item"
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
              </>
            )}
            {valueType === 'month' && (
              <>
                <Col sm={12} xs={24} md={8} xl={5}>
                  <Form.Item className="form-item">
                    {getFieldDecorator('startDate')(
                      <MonthPicker
                        className="form-item"
                        placeholder={'Tháng'}
                        format={'MM/YYYY'}
                        style={{ width: '95%' }}
                        onChange={onChangeMonth}
                      />,
                    )}
                  </Form.Item>
                </Col>
              </>
            )}
            {valueType === 'hour' && (
              <>
                <Col sm={12} xs={24} md={8} xl={5}>
                  <Form.Item className="form-item">
                    {getFieldDecorator('startDate1')(
                      <DatePicker
                        className="form-item"
                        placeholder="Thời gian"
                        format={'DD/MM/YYYY'}
                        style={{ width: '95%' }}
                        onChange={onChangeHour}
                        locale={localeDatePicker}
                      />,
                    )}
                  </Form.Item>
                </Col>
              </>
            )}
            {valueType === 'hour' ? (
              <Button type="primary" style={{ marginTop: '3px' }} onClick={updateChar}>
                Lọc
              </Button>
            ) : (
              <Button type="primary" style={{ marginTop: '3px' }} onClick={update}>
                Lọc
              </Button>
            )}
          </Row>
        </Form>
      </ViewHeader>
      <div className="viewBarChar">
        <Bar options={options} data={data} />
      </div>
    </View>
  );
}

export default connector(Form.create<IProps>()(BarChar));
