import React, {useEffect, useState} from "react";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getGroupRestApi} from "../redux/actions/get_group_rest_api";
import {Col, Descriptions, Divider, Row} from "antd";
import {useParams} from "react-router-dom";
import {GroupRestApiData} from "../../GroupApi/redux/models";


const mapStateToProps = (rootState: RootState) => ({
  getGroupState: rootState.restApi.getGroupState,
});

const connector = connect(mapStateToProps, {getGroupRestApi});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function GroupDataInfo({getGroupState, getGroupRestApi}: IProps) {

  const params: any = useParams();

  const [data, setData] = useState<GroupRestApiData>();

  const [time, setTime] = useState('');

  const [groupId] = useState<string>(params.apiId);

  useEffect(() => {
    getGroupRestApi(groupId);
  }, []);

  useEffect(() => {
    let oldData =getGroupState.data;

    let d = oldData?.date.toString() || '';
    let date: string = '';
    if(d !== undefined){
      date = d.substr(6,2) + "/" + d.substr(4,2) + "/" + d.substr(0,4)
    }

    let s = oldData?.status || '';
    let status;
    switch (s){
      case "CREATED":
        status = "Khởi tạo";
        break;
      case "PUBLISHED":
        status = "Phát hành";
        break;
      case "INACTIVE":
        status = "Ngừng hoạt động";
        break;
      default:
        status = "Không xác định";
    }
    let newData : GroupRestApiData = {
      id: oldData?.id || '',
      uuid: oldData?.uuid || '',
      name: oldData?.name || '',
      description: oldData?.description || '',
      context: oldData?.context || '',
      version: oldData?.version || '',
      endpoint_url: oldData?.production_endpoint_url || '',
      status: status,
      policies: oldData?.policies.join(", ") || '',
      active: oldData?.uuid || '',
      createBy: oldData?.create_by || '',
      time: date,
    }
    setData(newData);
  },[getGroupState.loading]);

  return (
    <div style={{backgroundColor: "white", border: "1px solid #E5EBF1",
                    borderRadius: "10px", marginBottom: "20px", paddingTop: "10px", paddingLeft:"10px"}}>
      <Descriptions title="Thông tin nhóm dịch vụ" className="description-title">
        <Descriptions.Item label="Tên nhóm"  className="description-info">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Đường dẫn" className="description-info">{data?.context}</Descriptions.Item>
        <Descriptions.Item label="Phiên bản" className="description-info">{data?.version}</Descriptions.Item>
        <Descriptions.Item label="Endpoint" className="description-info">{data?.endpoint_url}</Descriptions.Item>
        <Descriptions.Item label="Chính sách" className="description-info">{data?.policies}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái" className="description-info">{data?.status}</Descriptions.Item>
        <Descriptions.Item label="Ngày khởi tạo" className="description-info">{data?.time}</Descriptions.Item>
        <Descriptions.Item label="Người khởi tạo" className="description-info">{data?.createBy}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default connector(GroupDataInfo);
