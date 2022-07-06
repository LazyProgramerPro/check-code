import {RootState} from "../../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getSingleDataSource} from "../../DataSource/redux/actions/get_single_data_source";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Descriptions} from "antd";

const mapStateToProps = (rootState: RootState) => ({
  getSingleState: rootState.dataSource.getSingleState,
});

const connector = connect(mapStateToProps, {getSingleDataSource});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function DataSourceInfo({getSingleState, getSingleDataSource}: IProps) {
  const params: any = useParams();

  const [dataSourceId] = useState<string>(params.dataSourceId);

  const [dbType, setDbType] = useState('');

  useEffect(() => {
    getSingleDataSource(dataSourceId);
  }, []);

  useEffect(() => {
    const type: number = getSingleState.data?.db_type || 0;
    switch (type){
      case 1:
        setDbType("Mysql");
        break;
      case 2:
        setDbType("Sql Server");
        break;
      case 3:
        setDbType("MongoDB");
        break;
      default:
        setDbType("");
    }
  }, [getSingleState.loading]);

  return (
    <div style={{
      backgroundColor: "white", border: "1px solid #E5EBF1",
      borderRadius: "10px", marginBottom: "20px", paddingTop: "10px", paddingLeft: "10px"
    }}>
      <Descriptions title="Thông tin data source" className="description-title">
        <Descriptions.Item label="Tên" className="description-info">{getSingleState.data?.name}</Descriptions.Item>
        <Descriptions.Item label="Kiểu" span={2} className="description-info">{dbType}</Descriptions.Item>
        <Descriptions.Item label="Server" className="description-info">{getSingleState.data?.server}</Descriptions.Item>
        <Descriptions.Item label="Port" className="description-info">{getSingleState.data?.port}</Descriptions.Item>
        <Descriptions.Item label="Database" className="description-info">{getSingleState.data?.database}</Descriptions.Item>
        <Descriptions.Item label="Username" className="description-info">{getSingleState.data?.username}</Descriptions.Item>
        <Descriptions.Item label="Password" className="description-info">{getSingleState.data?.password}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default connector(DataSourceInfo);
