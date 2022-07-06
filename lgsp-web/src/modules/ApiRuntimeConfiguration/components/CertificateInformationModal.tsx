import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { showCertificateFileInformation } from '../redux/actions/runtime_configuration_data';
import { useParams } from 'react-router-dom';
import { GetDetailCertificateFileParam } from '../redux/models';
import { getCertificateFileService } from '../redux/services/apis';
import { NotificationError } from '../../../components/Notification/Notification';
import { policyMap } from '../../../models/common';
import moment from 'moment';

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiRuntimeConfiguration.dataState,
});

const connector = connect(mapStateToProps, { showCertificateFileInformation });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

const CertificateInformationModal = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);

  const [alias, setAlias] = useState('');
  const [tier, setTier] = useState('');
  const [expired, setExpired] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (props.dataState.certDetail === undefined) {
      return;
    }
    const param: GetDetailCertificateFileParam = {
      apiId: apiId,
      filename: props.dataState.certDetail?.alias || '',
    };
    getCertificateFileService(param)
      .then(rs => {
        setAlias(rs.item.name);
        setTier(props.dataState.certDetail?.tier || '');
        setExpired(rs.item.to);
        setExpiredDate(rs.item.expiredDate);
        setStatus(rs.item.status);
      })
      .catch(() => {
        props.showCertificateFileInformation(false);
        NotificationError('Thất bại', 'Xảy ra lỗi khi lấy thông tin chứng chỉ');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId, props.dataState.showCertDetail]);

  const resetConst = () => {
    setAlias('');
    setTier('');
    setExpired('');
    setStatus(true);
  };

  const onBtnCloseClicked = (e: any) => {
    props.showCertificateFileInformation(false);
    resetConst();
  };

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title={'Chi tiết chứng chỉ SSL'}
      visible={props.dataState.showCertDetail}
      centered={true}
      width="550px"
      onCancel={() => {
        props.showCertificateFileInformation(false);
        resetConst();
      }}
      footer={''}
    >
      <Row>
        <Col span={12}>
          <span>Tên chứng chỉ SSL: </span>
        </Col>
        <Col span={12}>{alias}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <span>Giới hạn truy cập: </span>
        </Col>
        <Col span={12}>{tier}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <span>Ngày hết hạn chứng chỉ: </span>
        </Col>
        {/*<Col span={12}>{moment(expired).format('DD/MM/YYYY')}</Col>*/}
        <Col span={12}>{expiredDate}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <span>Trạng thái: </span>
        </Col>
        <Col span={12}>
          {status ? (
            <span style={{ color: 'green' }}>Hoạt động</span>
          ) : (
            <span style={{ color: 'red' }}>Không hoạt động</span>
          )}
        </Col>
      </Row>
      <hr style={{ borderTop: '1px' }} />
      <Button type="default" className="mr-3" onClick={onBtnCloseClicked}>
        Đóng
      </Button>
    </Modal>
  );
};

export default connector(CertificateInformationModal);
