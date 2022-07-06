import React from 'react';
import { Button } from 'antd';
import { exportGateway } from '../redux/service/apis';
import {NotificationError} from "../../../components/Notification/Notification";

const handleExportGateway = () => {
  const param = {
    text: 'ffffff',
  }
  exportGateway(param).then(rs => {
    if (rs == undefined) {
      NotificationError('Thất bại', 'Tải danh sách gateway thất bại');
    }
  }).catch(() => {
    NotificationError('Thất bại', 'Tải danh sách gateway thất bại');
  });
};
export default function DownGateway() {
  return (
    <>
      <Button className="mr-2" icon="cloud-download" onClick={handleExportGateway}>
        Export
      </Button>
    </>
  );
}
