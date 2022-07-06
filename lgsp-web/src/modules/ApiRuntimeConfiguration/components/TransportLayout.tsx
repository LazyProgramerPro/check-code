import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Icon, Popconfirm, Row, Form } from 'antd';
import { DeleteFilled, InfoCircleTwoTone } from '@ant-design/icons';
import UploadCertificateForm from './UploadCertificateForm';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import {
  changeEnableSsl,
  changeTransportType,
  removeFileCertificateFromList,
  showAddCertificationForm,
  showCertificateFileInformation,
} from '../redux/actions/runtime_configuration_data';
import { NotificationError, NotificationInfo } from '../../../components/Notification/Notification';
import { CertificateFileEntity, DeleteCertificateFileParam } from '../redux/models';
import CertificateInformationModal from './CertificateInformationModal';
import { deleteCertificateFileService } from '../redux/services/apis';
import { useParams } from 'react-router-dom';
import { policyMap } from '../../../models/common';
import Loading from '../../../components/Loading';
import { set } from 'immer/dist/utils/common';
import styled from 'styled-components';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { FormComponentProps } from 'antd/lib/form';

const mapState = (rootState: RootState) => ({
  dataState: rootState.apiRuntimeConfiguration.dataState,
});

const connector = connect(mapState, {
  showAddCertificationForm,
  changeTransportType,
  changeEnableSsl,
  showCertificateFileInformation,
  removeFileCertificateFromList,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux, FormComponentProps {}
const TransportLayout = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const { resetFields } = props.form;
  const [loading, setLoading] = useState(false);

  const transportOptions = [
    { label: 'HTTP', value: 'http' },
    { label: 'HTTPS', value: 'https' },
  ];

  const onChangeTransport = (checkedValues: any) => {
    props.changeTransportType(checkedValues);
    if (!checkedValues.includes('https') && props.dataState.data.enabledSsl) {
      props.changeEnableSsl();
    }
  };

  const onChangeEnableSsl = (e: any) => {
    if (props.dataState.data.transports.includes('https')) {
      props.changeEnableSsl();
    } else {
      NotificationError('Thất bại', 'Vui lòng chọn phương thức Https');
    }
  };

  const onClickAddCertificate = (e: any) => {
    props.showAddCertificationForm(true);
  };

  const onShowDetailCertificate = (e: any, record: any) => {
    const certData: CertificateFileEntity = {
      alias: record.alias,
      tier: record.tier,
    };
    props.showCertificateFileInformation(true, certData);
  };

  const onDeleteDetailCertificate = (e: any, record: any) => {
    const param: DeleteCertificateFileParam = {
      apiId: apiId,
      filename: record.alias,
    };
    setLoading(true);
    deleteCertificateFileService(param)
      .then(rs => {
        if (rs.code !== 0) {
          NotificationError('Thất bại', rs.message);
          setLoading(false);
          return;
        }
        const certData: CertificateFileEntity = {
          alias: record.alias,
          tier: record.tier,
        };
        props.removeFileCertificateFromList(certData);
        NotificationSuccess('Thành công', 'Xóa chứng chỉ SSL thành công');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi khi xóa chứng chỉ SSL ');
      });
  };

  const renderCertificateList = () => {
    const data = props.dataState.data.certificateList;
    if (data.length === 0) {
      return (
        <div style={{ margin: '10px auto 10px', width: '50%' }}>
          <InfoCircleTwoTone style={{ fontSize: '20px' }} />
          <span style={{ marginLeft: '10px', fontSize: '16px' }}>Chưa có chứng chỉ nào được tải lên</span>
        </div>
      );
    } else {
      return data.map((item: any) => {
        return (
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ borderBottom: '1px solid #e8e8e8', padding: '10px 4px' }}
            key={item.alias}
          >
            <Col span={20}>
              <Row>
                <span>{item.alias}</span>
              </Row>
              <Row>
                <span style={{ fontSize: '12px' }}>{policyMap.get(item.tier)}</span>
              </Row>
            </Col>

            <Col span={4}>
              <View>
                <Button
                  size="small"
                  icon="eye"
                  className="mr-2"
                  onClick={event => onShowDetailCertificate(event, item)}
                />

                <Popconfirm
                  placement="top"
                  title="Bạn có xác nhận muốn xóa?"
                  onConfirm={event => onDeleteDetailCertificate(event, item)}
                  okText="Xác nhận"
                  cancelText="Hủy"
                >
                  <Button size="small" className="mr-2" icon="delete" />
                </Popconfirm>
              </View>
            </Col>
          </Row>
        );
      });
    }
  };

  // useEffect(() => {
  //   resetFields();
  // }, [props.dataState.flag_reload]);

  return (
    <View>
      <h3>Request</h3>
      <div
        style={{
          border: '1px solid #f9f9f9',
          borderRadius: '10px',
          boxShadow: '#c9c3c359 0px 5px 15px',
          marginTop: '20px',
        }}
      >
        <div style={{ marginTop: '10px' }}>
          <div style={{ width: '90%', marginLeft: '5%' }}>
            <h3>Cấu hình an ninh truyền tải</h3>
          </div>
          <hr style={{ borderTop: '1px' }} />
          <div style={{ marginTop: '10px', marginBottom: '20px', width: '90%', marginLeft: '5%' }}>
            <Checkbox.Group
              options={transportOptions}
              value={props.dataState.data.transports}
              onChange={onChangeTransport}
            />

            <Checkbox value="SSL" checked={props.dataState.data.enabledSsl} onChange={onChangeEnableSsl}>
              Mutual SSL
            </Checkbox>
          </div>
          {props.dataState.data.enabledSsl ? (
            <div style={{ marginTop: '10px', width: '90%', marginLeft: '5%' }}>
              <div>
                <h4>Chứng chỉ</h4>
              </div>
              <Button
                type="dashed"
                onClick={onClickAddCertificate}
                style={{
                  width: '96%',
                  marginLeft: '2%',
                  borderRadius: '15px',
                  height: '50px',
                  textAlign: 'left',
                }}
              >
                <Icon type="plus" /> Thêm chứng chỉ
              </Button>
              <div style={{ width: '96%', marginLeft: '2%', marginBottom: '10px' }}>{renderCertificateList()}</div>
            </div>
          ) : null}
        </div>
        <UploadCertificateForm />
        <CertificateInformationModal />
        {loading ? <Loading /> : null}
      </div>
    </View>
  );
};

export default connector(Form.create<IProps>()(TransportLayout));
const View = styled.div``;
