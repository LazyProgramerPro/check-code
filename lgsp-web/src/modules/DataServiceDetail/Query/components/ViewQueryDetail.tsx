import React from "react";
import {RootState} from "../../../../redux/reducers";
import {showQueryDetail} from "../redux/actions/get_query_detail";
import {connect, ConnectedProps} from "react-redux";
import {Descriptions, Modal, Table} from "antd";
import {ColumnProps} from "antd/lib/table";


const mapStateToProps = (rootState: RootState) => ({
  getDetailState: rootState.query.getDetailState
})


const connector = connect(mapStateToProps, {showQueryDetail});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ViewQueryDetail({getDetailState,showQueryDetail}: IProps){

  const onBtnCancelClicked = () => {
    showQueryDetail(false);
  }
  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'sql_type',
      width: 100,
    },
    {
      title: 'Loại dữ liệu',
      dataIndex: 'param_type',
      width: 100,
    },
    {
      title: 'Giá trị mặc định',
      dataIndex: 'default_value',
      width: 100,
    },
  ]

  return(
    <Modal
      zIndex={2}
      maskClosable={false}
      title={"Thông tin câu lệnh query"}
      visible={getDetailState.show}
      centered={true}
      width="1000px"
      onCancel={() => {
        showQueryDetail(false);
      }}
      footer={""}>
      <Descriptions title="Thông tin query" className="description-title">
        <Descriptions.Item label="Tên" className="description-info">{getDetailState.data?.query.name}</Descriptions.Item>
        <Descriptions.Item label="Kiểu dữ liệu" span={2} className="description-info">{getDetailState.data?.query.response_type}</Descriptions.Item>
        <Descriptions.Item label="Câu lệnh query" span={3}  className="description-info">{getDetailState.data?.query.query}</Descriptions.Item>
        <Descriptions.Item label="Kết quả" span={3} className="description-info">{getDetailState.data?.query.json_response}</Descriptions.Item>
        {/*<Descriptions.Item label="Người tạo" className="description-info">{getDetailState.data?.query.create_by}</Descriptions.Item>*/}
      </Descriptions>
      <hr style={{borderTop: '1px'}}/>
      <Descriptions title="Thông tin resource" className="description-title">
        <Descriptions.Item label="Đường dẫn" className="description-info">{getDetailState.data?.resource.path}</Descriptions.Item>
        <Descriptions.Item label="Phương thức" span={2} className="description-info">{getDetailState.data?.resource.method}</Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={3} className="description-info">{getDetailState.data?.resource.description}</Descriptions.Item>
        {/*<Descriptions.Item label="Câu lệnh query" span={2}  className="description-info">{getDetailState.data?.query.query}</Descriptions.Item>*/}
        {/*<Descriptions.Item label="Người tạo" className="description-info">{getDetailState.data?.query.create_by}</Descriptions.Item>*/}
      </Descriptions>
      <hr style={{borderTop: '1px'}}/>
      <h3>Danh sách tham số</h3>
      <Table
        className="custom-table"
        dataSource={getDetailState.data?.param}
        columns={columns}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        rowKey="name"
        // pagination={{
        //   current: page,
        //   pageSize: size,
        //   total: getQueryState.total,
        //   onChange: page => setPage(page),
        //   showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        // }}
      />
    </Modal>
  )
}

export default connector(ViewQueryDetail);
