import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { Button, Form, Input, Modal } from 'antd';
import { showRequestServiceFrom, requestService } from '../redux/actions/get_status_reject';
import { GetDataServiceParams, RejectParams } from '../redux/models';
import { logicData } from '../redux/actions/get_status_reject';
import { getAllDataService } from '../redux/actions/get_data_services';
import TextArea from 'antd/lib/input/TextArea';
const mapStateToProps = (rootState: RootState) => ({
  rejectState: rootState.dataService.getStatusReject,
  id: rootState.dataService.getStatusReject.originId,
  getDataServiceState: rootState.dataService.getState,
});
const connector = connect(mapStateToProps, { getAllDataService, showRequestServiceFrom, requestService, logicData });
type ReduxProps = ConnectedProps<typeof connector>;
export interface IProps extends FormComponentProps, ReduxProps {}

const RejectService = (props: IProps) => {
  const { getDataServiceState, rejectState, id, getAllDataService } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const loadDataService = () => {
    let params: GetDataServiceParams = {
      ...getDataServiceState.params,
      page: page,
      size: size,
    };
    getAllDataService(params);
  };

  useEffect(() => {
    loadDataService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const onClickStatusReject = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const param: RejectParams = {
          reason: values.reason.trim(),
          requestId: id,
        };

        props.requestService(param);
        // resetFields();
        props.showRequestServiceFrom(false);
        // loadDataService();
      }
    });
  };

  const onBtnCancelClicked = () => {
    resetFields();
    props.showRequestServiceFrom(false);
  };

  const validateReason = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      reason: {
        value: checkText,
      },
    });
    return true;
  };

  const pasteReason = () => {
    const valueReason = props.form.getFieldValue('reason');
    props.form.setFields({
      reason: {
        value: valueReason.trim() + ' ',
      },
    });
  };

  return (
    <Modal
      title="T??? ch???i c??ng khai d???ch v??? chia s???"
      visible={props.rejectState.show}
      footer={null}
      centered={true}
      onCancel={() => {
        resetFields();
        props.showRequestServiceFrom(false);
      }}
      afterClose={() => {
        resetFields();
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Nh???p l?? do t??? ch???i">
          {getFieldDecorator('reason', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: '????y l?? tr?????ng b???t bu???c nh???p',
              },
              {
                validator: validateReason,
              },
            ],
          })(
            <TextArea
              placeholder="Nh???p l?? do t??? ch???i"
              style={{ height: '126px' }}
              maxLength={1000}
              onPaste={pasteReason}
            />,
          )}
        </Form.Item>
        <div style={{ marginLeft: '334px', marginTop: '10px' }}>
          <Button onClick={onBtnCancelClicked}>H???y</Button>
          <Button htmlType="submit" type="primary" style={{ marginLeft: '20px' }} onClick={onClickStatusReject}>
            X??c nh???n
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connector(Form.create<IProps>()(RejectService));
