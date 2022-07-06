import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, TimePicker } from 'antd';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { RootState } from 'src/redux/reducers';
import { createCaching, showCreateCachingForm } from '../redux/actions/create_caching';
import { getCaching } from '../redux/actions/get_caching';
import { CreateCachingParams, GetCachingParams } from '../redux/models';
const ViewAdd = styled.div`
  width: 200px;
  .ant-form-item-label {
    margin-bottom: -13px;
  }
  .ant-form-item {
    margin-bottom: 0px !important;
  }
  .ant-time-picker-icon {
    .ant-time-picker-clock-icon {
      display: none;
    }
  }
`;
const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
  createState: rootState.dataCaching.createState,
  getCachingState: rootState.dataCaching.getState,
});
const conn = connect(mapStateToProps, { createCaching, showCreateCachingForm, getCaching });
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps {}

function AddCaching(props: IProps) {
  const [visible, setVisible] = useState(false);

  const showdialog = () => {
    setVisible(true);
  };
  // const closedialog = () => {
  //   setVisible(false);
  // };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   props.form.validateFields((err, values) => {
  //     if (!err) {
  //       NotificationSuccess('Thành Công', 'Thiết lập lịch caching định kì');
  //     }
  //   });
  // };
  const { getFieldDecorator, resetFields } = props.form;
  const onCreateCachingClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let param: CreateCachingParams = {
          refreshTime: moment(values.refreshTime).format('HH:mm:ss'),
        };
        props.createCaching(param);
        setVisible(false);
        resetFields();
      }
    });
  };
  const onCancelCachingClicked = () => {
    resetFields();
    setVisible(false);
    props.showCreateCachingForm(false);
  };

  useEffect(() => {
    let params: GetCachingParams = {
      ...props.getCachingState.params,
    };
    props.getCaching(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  return (
    <ViewAdd>
      <Button icon="plus" onClick={showdialog}>
        Tạo lịch caching định kỳ
      </Button>
      <Modal
        title="Tạo lịch caching định kỳ"
        visible={visible}
        footer={null}
        onCancel={onCancelCachingClicked}
        maskClosable={false}
      >
        <Form layout="vertical">
          <Form.Item label="Thời gian tự đông refresh caching ">
            {getFieldDecorator('refreshTime')(
              <TimePicker placeholder="Thời gian" defaultOpenValue={moment('HH:mm:ss')} style={{ width: '500px' }} />,
            )}
          </Form.Item>
          <div style={{ marginLeft: '370px' }}>
            <Button onClick={onCancelCachingClicked} style={{ marginRight: '15px' }}>
              Hủy
            </Button>
            <Button htmlType="submit" type="primary" onClick={onCreateCachingClicked}>
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>
    </ViewAdd>
  );
}
export default conn(Form.create<IProps>()(AddCaching));
