import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import { RootState } from 'src/redux/store';
import { getLog } from '../redux/actions/get_log';
import { GetLogParams } from '../redux/models';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
const ViewHeader = styled.div`
  margin-top: -2px;
  .ant-from {
    width: 70%;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }

  .form-date {
    margin-right: 8px !important;
  }
`;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getLogState: rootState.dataLog.getState,
});
const connector = connect(mapState, { getLog });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}
function SearchBar(props: IProps) {
  const { getLogState, getLog } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [codes, setCodes] = useState<number[]>([]);
  const [type, setType] = useState('');
  const [visible, setVisible] = useState(false);
  const [locale] = useState(viVN);
  const loadDataLog = () => {
    let params: GetLogParams = {
      ...getLogState.params,
      page: page,
      size: size,
    };
    console.log(params);
    getLog(params);
  };

  const [filterDate, setFilterDate] = useState<any>({
    startValue: null,
    endValue: null,
    endOpen: false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startDate1 = props.form.getFieldValue('startDate');
    const endDate1 = props.form.getFieldValue('endDate');
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
    setPage(1);
    resetFields();
    let params: GetLogParams = {
      code: 0,
      type: '',
      startDate: '',
      endDate: '',
      page: 1,
    };
    getLog(params);
  };

  const disabledStartDate = (startValue: any) => {
    return moment(startValue).isAfter(moment(props.form.getFieldValue('endDate')));
  };

  const disabledEndDate = (endValue: any) => {
    return moment(endValue).isBefore(moment(props.form.getFieldValue('startDate')));
  };

  const handleStartOpenChange = (open: any) => {
    if (!open) {
      setFilterDate({ ...filterDate, endOpen: true });
    }
  };

  const onChange = (field: any, value: any) => {
    const newState = { ...filterDate, [field]: value };
    setFilterDate(newState);
  };

  const onStartChange = (value: any) => {
    onChange('startValue', value);
  };

  const onEndChange = (value: any) => {
    onChange('endValue', value);
  };

  const handleEndOpenChange = (open: any) => {
    setFilterDate({ endOpen: open });
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
  return (
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
                  {/* <Select.Option value="Toàn bộ">Toàn bộ</Select.Option> */}
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
                  locale={locale}
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
                  locale={locale}
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
  );
}

export default connector(Form.create<IProps>()(SearchBar));
