import React, {useEffect, useState} from "react";
import {RootState} from "../../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getSingleDataService} from "../../../DataService/redux/actions/get_single_data_service";
import {Descriptions} from "antd";
import {useParams} from "react-router-dom";
import {DataServiceData} from "../../../DataService/redux/models";

const mapStateToProps = (rootState: RootState) => ({
  getSingleState: rootState.dataService.getSingleState,
});

const connector = connect(mapStateToProps, {getSingleDataService});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function DataServiceInfo({getSingleState, getSingleDataService}: IProps) {
  const params: any = useParams();

  const [data, setData] = useState<DataServiceData>();

  const [dataServiceId] = useState<string>(params.dataServiceId);

  useEffect(() => {
    getSingleDataService(dataServiceId);
  }, []);

  useEffect(() => {
    let oldData = getSingleState.data;
    let d = oldData?.date.toString() || '';
    let date: string = '';
    if(d !== undefined){
      date = d.substr(6,2) + "/" + d.substr(4,2) + "/" + d.substr(0,4)
    }

    let s = oldData?.status || '';

    let status;
    switch (s){
      case "available":
        status = "Đang hoạt động";
        break;
      case "unavailable":
        status = "Ngừng hoạt động";
        break;
      default:
        status = "Không xác định";
    }

    const newData: DataServiceData = {
      id: oldData?.id || '',
      name: oldData?.name || '',
      description: oldData?.description || '',
      namespace: oldData?.namespace || '',
      status: status,
      createBy: oldData?.create_by || '',
      time: date
    }
    setData(newData);
  },[getSingleState.loading]);
  return (
    <div style={{backgroundColor: "white", border: "1px solid #E5EBF1",
      borderRadius: "10px", marginBottom: "20px", paddingTop: "10px", paddingLeft:"10px"}}>
      <Descriptions title="Thông tin nhóm dịch vụ" className="description-title">
        <Descriptions.Item label="Tên nhóm"  className="description-info">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Đường dẫn" className="description-info">{data?.description}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái" className="description-info">{data?.status}</Descriptions.Item>
        <Descriptions.Item label="Ngày khởi tạo" className="description-info">{data?.time}</Descriptions.Item>
        <Descriptions.Item label="Người khởi tạo" className="description-info">{data?.createBy}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default connector(DataServiceInfo);
