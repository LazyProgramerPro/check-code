import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Select, Table } from 'antd';
import { deployApiNewVersionViaGateway, deployApiViaGateway, getGatewayListService } from '../redux/services/apis';
import { useParams } from 'react-router-dom';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import { DeployGatewayParam, GatewayHostEntity, GatewayInfoEntity } from '../redux/models';
import { addCurrentGateway, deployGateway, initData } from '../redux/actions/api_deployment_data';
import { ColumnProps } from 'antd/es/table';
import Loading from '../../../components/Loading';
import { changeStatusApi } from '../../GroupApiDetail/redux/actions';

const mapState = (rootState: RootState) => ({
  dataState: rootState.apiDeployment.dataState,
});
const connector = connect(mapState, { initData, addCurrentGateway, deployGateway, changeStatusApi });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

const DataTable = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [lastVhost, setLastVhost] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeVhost = (value: any) => {
    setLastVhost(value);
  };

  const handleDeployNewVersion = (e: any, record: any) => {
    if(record.hostList.length == 0){
      NotificationError('Thất bại','Gateway không hợp lệ');
      return;
    }
    const vhost:string = record.hostList[0].host;
    const deployParam: DeployGatewayParam = {
      apiId: apiId,
      description: '',
      gatewayName: record.name,
      vhost: vhost,
    };
    setLoading(true);
    deployApiNewVersionViaGateway(deployParam)
      .then(rs => {
        if (rs.code !== 0) {
          NotificationError('Thất bại', rs.message);
          setLoading(false);
          return;
        }
        const currGw: GatewayInfoEntity = {
          name: record.name,
          displayName: record.displayName,
        };
        props.addCurrentGateway(currGw);
        setLoading(false);
        NotificationSuccess('Thành công', 'Triển khai dịch vụ thành công');
      })
      .catch(rs => {
        setLoading(false);
        NotificationError('Thất bại', rs.message);
      });
  };

  const handleDeploy = (e: any, record: any) => {
    if(record.hostList.length == 0){
      NotificationError('Thất bại','Gateway không hợp lệ');
      return;
    }
    const vhost:string = record.hostList[0].host;
    const deployParam: DeployGatewayParam = {
      apiId: apiId,
      description: '',
      gatewayName: record.name,
      vhost: vhost,
    };
    setLoading(true);
    deployApiViaGateway(deployParam)
      .then(rs => {
        if (rs.code !== 0) {
          NotificationError('Thất bại', rs.message);
          setLoading(false);
          return;
        }
        const currGw: GatewayInfoEntity = {
          name: record.name,
          displayName: record.displayName,
        };
        props.addCurrentGateway(currGw);
        setLoading(false);
        props.changeStatusApi('DEPLOYED');
        NotificationSuccess('Thành công', 'Triển khai dịch vụ chia sẻ thành công');
      })
      .catch(rs => {
        setLoading(false);
        NotificationError('Thất bại', rs.message);
      });
    // props.deployGateway(deployParam);
  };

  useEffect(() => {
    setLoading(true);
    getGatewayListService(apiId)
      .then(rs => {
        if (rs.code !== 0) {
          setLoading(false);
          NotificationError('Thất bại', rs.message);
        }
        const gwList: GatewayInfoEntity[] = rs.rows.map((item: any) => {
          if (item.currentVhost !== undefined) {
            setLastVhost(item.currentVhost);
          }
          const gw: GatewayInfoEntity = {
            name: item.name,
            displayName: item.displayName,
            current: item.current,
            hostList: item.hostList.map((temp: any) => {
              return {
                host: temp.host,
                httpPort: temp.httpPort,
                httpsPort: temp.httpsPort,
                urlServer: temp.urlServer,
              };
            }),
          };
          return gw;
        });
        props.initData(gwList);
        setLoading(false);
      })
      .catch(rs => {
        setLoading(false);
        NotificationError('Thất bại', rs.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId]);

  const renderOption = (data: any) => {
    return data.map((item: any) => {
      return (
        <Select.Option key={item.host} value={item.host}>
          {item.urlServer}
        </Select.Option>
      );
    });
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Gateway Access URL',
      dataIndex: 'hostList',
      width: 500,
      render: (value: any, row: any) => {
        let defaultValue = value[0].urlServer;
        if (props.dataState.data !== undefined) {
          const gw = props.dataState?.data.find((item: any) => item.current && item.name === row.name);
          if (gw !== undefined) {
            if (gw?.currentVhost !== undefined) {
              defaultValue = gw.currentVhost;
            }
          }
        }
        return (
          <Select
            defaultValue={defaultValue}
            style={{ width: '300px' }}
            placeholder="Chọn môi trường host"
            onChange={onChangeVhost}
          >
            {renderOption(value)}
          </Select>
        );
      },
    },
    {
      title: () => {
        return <div style={{ whiteSpace: 'nowrap' }}>Triển khai</div>;
      },
      dataIndex: 'current',
      width: 200,
      render: (curr: boolean, record: any) => {
        return (
          <div>
            {curr ? (
              <Button
                type="default"
                style={{ width: '150px', fontSize: '12px', whiteSpace: 'normal', height: '38px' }}
                onClick={event => handleDeployNewVersion(event, record)}
              >
                Tạo phiên bản triển khai mới
              </Button>
            ) : (
              <Button
                type="primary"
                style={{ width: '150px', fontSize: '12px', height: '38px' }}
                onClick={event => handleDeploy(event, record)}
              >
                Triển khai
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        className="custom-table-2 mt-5"
        dataSource={props.dataState.data}
        columns={columns}
        rowKey="name"
        pagination={false}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
      />
      {loading ? <Loading /> : null}
    </div>
  );
};

export default connector(DataTable);
