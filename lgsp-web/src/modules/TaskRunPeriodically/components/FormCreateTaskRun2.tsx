import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { GetListTaskParams, ListDataService, TaskParams } from '../redux/models';
import { checkExistName, createTaskApi, getListDataServiceApi, getListOperationApi } from '../redux/service/api';
import { validateNormalString } from '../../../constants/common';
import moment from 'moment';
import { RootState } from 'src/redux/reducers';
import { connect } from 'http2';
const { Option } = Select;

interface FormCreateTaskRun2 {
  visible: boolean;
  onClose: Function;
  refreshList: Function;
}

interface IProps extends FormComponentProps, FormCreateTaskRun2 {}

const initListDataService: ListDataService = {
  id: '',
  name: '',
  description: '',
  dataSources: [],
  dataSourceConfigs: [],
  multipartFileList: undefined,
  operations: [],
  queries: [],
  resources: [],
  file: [],
};

function FormCreateTaskRun2(props: IProps) {
  const { visible, onClose, refreshList } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [refresh, setRefresh] = useState(false);
  const [listDataService, setListDataService] = useState<ListDataService[]>([] as typeof initListDataService[]);
  const [dataServiceSelected, setDataServiceSelected] = useState<string>('');

  const [listOperation, setListOperation] = useState<string[]>([]);
  // const [operationSelected, setOperationSelected] = useState<string>('');

  const [loadingCreate, setLoadingCreate] = useState(false);

  const validateName = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    }
    const isValid: boolean = validateNormalString(value);
    if (!isValid) {
      return callback('Tên tác vụ không hợp lệ');
    }
    checkExistName(value).then(rs => {
      if (rs.code == 0) {
        callback();
      } else {
        callback('Tên tác vụ đã tồn tại');
      }
    });
  };

  const onCancel = () => {
    resetFields();
    onClose();
  };

  const afterClose = () => {
    resetFields();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      const startTime1 = props.form.getFieldValue('startTime');
      const params: TaskParams = {
        count: values.count,
        dataServiceId: values.dataServiceId,
        delayTime: values.delayTime,
        name: values.name,
        operationName: values.operationName,
        // startTime: values['startTime'].format('YYYY-MM-DD HH:mm:ss') || '',
        startTime: startTime1 ? moment(props.form.getFieldValue('startTime')).format('DD-MM-YYYY HH:mm:ss') : '',
      };

      setLoadingCreate(true);
      createTaskApi(params)
        .then(res => {
          setLoadingCreate(false);

          if (res.code === 0) {
            NotificationSuccess('Thành công', 'Tạo tác vụ thành công');
            refreshList();
            onCancel();
            return;
          }

          NotificationError('Thất bại', res.message);
        })
        .catch(err => {
          setLoadingCreate(false);
          NotificationError('Thất bại', err.message);
        });
    });
    // setRefresh(false);
    // resetFields();
  };
  // useEffect(() => {
  //   let params: GetListTaskParams = {
  //     ...props.getDataGatewayState.params,
  //   };
  //   props.getDataGateway(params);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refresh]);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const localeDatePicker = {
    lang: {
      locale: 'en_US',
      today: 'Today',
      now: 'Hôm nay',
      backToToday: 'Back to today',
      ok: 'OK',
      clear: 'Clear',
      month: 'Month',
      year: 'Year',
      timeSelect: 'Chọn thời gian',
      dateSelect: 'Chọn ngày',
      monthSelect: 'Choose a month',
      yearSelect: 'Choose a year',
      decadeSelect: 'Choose a decade',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthFormat: 'MMMM',
      monthBeforeYear: true,
      previousMonth: 'Previous month (PageUp)',
      nextMonth: 'Next month (PageDown)',
      previousYear: 'Last year (Control + left)',
      nextYear: 'Next year (Control + right)',
      previousDecade: 'Last decade',
      nextDecade: 'Next decade',
      previousCentury: 'Last century',
      nextCentury: 'Next century',
    },
    timePickerLocale: {
      placeholder: 'Select time',
    },
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    weekFormat: 'YYYY-wo',
    monthFormat: 'YYYY-MM',
  };

  // Lay danh sach dich vu du lieu
  useEffect(() => {
    const params: GetListTaskParams = {
      page: 0,
      size: 100,
      text: '',
    };
    getListDataServiceApi(params)
      .then(res => {
        setListDataService(res.rows);
      })
      .catch(err => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectDataService = (value: any) => {
    setDataServiceSelected(value);
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    resetFields(['operationName']);
    getListOperationApi(dataServiceSelected)
      .then(res => {
        setListOperation(res.rows);
      })
      .catch(err => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceSelected]);
  // const onChangeExpiredDate = (date: any, dateString: string) => {
  //   setExpiredDate(dateString);
  // };

  const disabledDate = (current: any) => {
    return current < moment().startOf('day');
  };
  return (
    <Wrapper>
      <Modal
        title="Tạo mới tác vụ định kỳ"
        onCancel={onCancel}
        afterClose={afterClose}
        onOk={handleSubmit}
        visible={visible}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={onCancel}>Hủy</Button>

            <Button htmlType="submit" type="primary" onClick={handleSubmit}>
              Tạo mới
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên tác vụ">
            {getFieldDecorator('name', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateName }],
            })(<Input maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Số lần chạy">
            {getFieldDecorator('count', {
              initialValue: '',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                maxLength={13}
              />,
            )}
          </Form.Item>

          <Form.Item label={<LabelStyled>Thời gian chạy lần tiếp</LabelStyled>}>
            {getFieldDecorator('delayTime', {
              initialValue: '',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                maxLength={13}
              />,
            )}
          </Form.Item>

          <Form.Item label="Thời gian chạy">
            {getFieldDecorator('startTime')(
              <DatePicker
                style={{ width: '100%' }}
                showTime
                format="DD-MM-YYYY HH:mm:ss"
                placeholder=""
                locale={localeDatePicker}
                disabledDate={disabledDate}
              />,
            )}
          </Form.Item>

          <Form.Item label="Dịch vụ dữ liệu">
            {getFieldDecorator('dataServiceId', {
              // initialValue: '',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(
              <Select onChange={selectDataService} placeholder="Chọn">
                {listDataService.map((e: any) => (
                  <Option value={e.id} key={e.id}>
                    {e.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="Tên Operation">
            {getFieldDecorator('operationName', {
              // initialValue: '',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(
              <Select placeholder="Chọn">
                {listOperation.map((e: string, i: any) => (
                  <Option value={e} key={i}>
                    {e}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Form>

        {loadingCreate && <Loading />}
      </Modal>
    </Wrapper>
  );
}

export default Form.create<IProps>()(FormCreateTaskRun2);

const Wrapper = styled.div`
  color: #232323;
`;

const LabelStyled = styled.span`
  max-height: 30px;
`;

const StyledButton = styled.div`
  margin-top: -30px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
