import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { GetListTaskParams, ListDataService, TaskParams } from '../redux/models';
import { getListDataServiceApi, getListOperationApi, updateTaskApi } from '../redux/service/api';
const { Option } = Select;

interface FormCreateTaskRun2 {
  visible: boolean;
  onClose: Function;
  paramUpdate: TaskParams;
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

function FormUpdateTaskRun(props: IProps) {
  const { visible, onClose, paramUpdate, refreshList } = props;

  const { getFieldDecorator, resetFields } = props.form;

  const [listDataService, setListDataService] = useState<ListDataService[]>([] as typeof initListDataService[]);
  const [dataServiceSelected, setDataServiceSelected] = useState<string>('');

  const [listOperation, setListOperation] = useState<string[]>([]);

  const [loadingCreate, setLoadingCreate] = useState(false);

  const onCancel = () => {
    onClose();
  };

  const afterClose = () => {
    resetFields();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const startTime1 = props.form.getFieldValue('startTime');
        const params: TaskParams = {
          id: paramUpdate.id,
          count: values.count,
          dataServiceId: values.dataServiceId,
          delayTime: values.delayTime,
          name: values.name,
          operationName: values.operationName,
          startTime: startTime1 ? moment(props.form.getFieldValue('startTime')).format('DD-MM-YYYY HH:mm:ss') : '',
        };

        setLoadingCreate(true);
        updateTaskApi(params)
          .then(res => {
            setLoadingCreate(false);

            if (res.code === 0) {
              NotificationSuccess('Thành công', 'Cập nhật tác vụ thành công');
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
      }
    });
  };

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
      // placeholder: 'Select date',
      // rangePlaceholder: ['Start date', 'End date'],
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
      dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
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
    // false
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

  const disabledDate = (current: any) => {
    return current < moment().startOf('day');
  };

  return (
    <Wrapper>
      <Modal
        title="Cập nhật tác vụ định kỳ"
        onCancel={onCancel}
        onOk={handleSubmit}
        afterClose={afterClose}
        maskClosable={false}
        visible={visible}
        footer={
          <StyledButton>
            <Button onClick={onCancel}>Hủy</Button>

            <Button type="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên tác vụ">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: paramUpdate.name,
            })(<Input disabled maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Số lần chạy">
            {getFieldDecorator('count', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: paramUpdate.count,
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
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: paramUpdate.delayTime,
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
            {getFieldDecorator('startTime', {
              initialValue: moment(paramUpdate.startTime, 'DD-MM-YYYY HH:mm:ss'),
            })(
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
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: paramUpdate.dataServiceId,
            })(
              <Select onChange={selectDataService} disabled>
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
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: paramUpdate.operationName,
            })(
              <Select disabled>
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

export default Form.create<IProps>()(FormUpdateTaskRun);

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
