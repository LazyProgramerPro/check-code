import { Col } from 'antd';
import React from 'react';
import Loading from 'src/components/Loading';
import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import styled from 'styled-components';

interface IProps {
  groupApiDetailData: IRestApiObject | null;
}
const GroupApiOverview = (props: IProps) => {
  const renderText = (listData: any) => {
    let string = listData?.join(',');
    return string;
  };
  const { groupApiDetailData } = props;
  const View = styled.div`
    .text {
      margin-top: 7px;
    }
    .content {
      margin-top: -12px;
    }
    .infotext {
      margin-bottom: 6px;
    }
    .info {
      margin-top: -3px;
    }
  `;
  const CheckType = (type: any) => {
    if (type === 'HTTP') {
      return 'REST';
    } else if (type === 'SOAP') {
      return 'SOAP';
    } else if (type === 'SOAPTOREST') {
      return 'SOAPTOREST';
    }
  };
  return (
    <View>
      <div className="overview-container flex mt-4">
        <Col xs={24} md={8} xl={13} style={{ marginRight: '150px' }}>
          <h3 className="title">Metadata</h3>
          <div className="content info flex flex-col ml-4">
            <p className="infotext">Mô tả chung: {groupApiDetailData?.description}</p>
            <p className="infotext">Đường dẫn: {groupApiDetailData?.context}</p>
            <p className="infotext">Phiên bản: {groupApiDetailData?.version}</p>
            <p className="infotext">Loại dịch vụ: {CheckType(groupApiDetailData?.type)}</p>
            <p className="infotext">Thời gian tạo: {groupApiDetailData?.createdTime}</p>

            <p className="infotext">
              Cấp triển khai:{' '}
              {groupApiDetailData?.deploymentLevel === 'central'
                ? 'Trung ương'
                : groupApiDetailData?.deploymentLevel === 'local'
                ? 'Địa phương'
                : null}
            </p>

            <p className="infotext">Nhóm dịch vụ: {groupApiDetailData?.category}</p>
            <p className="infotext">Đơn vị triển khai: {groupApiDetailData?.deploymentUnit}</p>
          </div>
        </Col>
        <div className="config-box flex-grow">
          <h3 className="title">Cấu hình</h3>
          <div className="content flex  flex-col  ml-4">
            <span className="text">
              Bộ giao thức (Mức độ an ninh truyển tải): {renderText(groupApiDetailData?.transport)}
            </span>
            <span className="text">Bảo mật API: {renderText(groupApiDetailData?.securityScheme)}</span>
            <span className="text">Giới hạn truy cập: {renderText(groupApiDetailData?.policies)}</span>
            <span className="text">Quyền truy cập: {groupApiDetailData?.accessControl}</span>
          </div>
        </div>
      </div>
      {props.groupApiDetailData?.loading ? <Loading /> : null}
    </View>
  );
};

export default GroupApiOverview;
