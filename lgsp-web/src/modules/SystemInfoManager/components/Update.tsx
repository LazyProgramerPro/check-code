import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Modal, Popconfirm } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { getSystemInfo } from '../../SystemInfoManager/redux/actions/get_systeminfo';
import {
  DataSystemInfo,
  GetSystemInfoParams,
  InforDetailParams,
  PublicInforParams,
  UpdateContentParam,
} from '../../SystemInfoManager/redux/models';
import { useParams } from 'react-router';
import { showData, updateContent } from '../redux/actions/update_content';
import { detailInfor } from '../redux/actions/detail';
import { publicInfor } from '../redux/actions/public_infor';
import { Link } from 'react-router-dom';
const View = styled.div`
  margin: 10px 15px;
  background-color: #fff;
  .bgr {
    padding: 10px 15px;
  }
  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container {
    padding: 16px 0px;

    .status-new {
      margin-left: 20px;
      color: #1890ff;
    }

    .status-published {
      margin-left: 20px;
      color: green;
    }
  }

  .InputText {
    /* margin: 0px 16px; */
  }

  .ant-input {
    width: 1031px;
    height: 294px;
    background: #ff6060;
    border: 1px solid #000000;
    box-sizing: border-box;
    color: white;
  }

  .btn {
    /* margin-left: 16px; */
  }
  .container-button {
    /* margin-top: 5px; */
  }
`;
const Content = styled.div`
  font-size: 20px;
`;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getSystemInfoState: rootState.systemInforManager.getSystemInfoState,
  updateState: rootState.systemInforManager.updateState,
  detailState: rootState.systemInforManager.detailState,
  publicState: rootState.systemInforManager.publicState,
});

const connector = connect(mapState, { getSystemInfo, showData, updateContent, detailInfor, publicInfor });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function Update(props: IProps) {
  const {
    getSystemInfoState,
    getSystemInfo,
    updateState,
    showData,
    updateContent,
    detailInfor,
    detailState,
    publicState,
    publicInfor,
  } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const [size] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const params: any = useParams();
  const [id] = useState<string>(params.id);

  const loadDataSystemInfo = () => {
    let params: GetSystemInfoParams = {
      ...getSystemInfoState.params,
      page: page,
      size: size,
      id: id,
    };
    getSystemInfo(params);
  };

  useEffect(() => {
    let data: InforDetailParams = {
      id: id,
    };
    detailInfor(data);
  }, [detailInfor, id]);

  const handlePublic = () => {
    props.form.validateFields((err, values) => {
      const param: PublicInforParams = {
        id: id,
        content: values.content,
      };
      publicInfor(param);
      console.log('param', param);
      loadDataSystemInfo();
    });
  };

  useEffect(() => {
    loadDataSystemInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const onUpdateServiceClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const updateParam: UpdateContentParam = {
          id: updateState.originData?.id || '',
          content: values.content || '',
        };
        props.updateContent(updateParam);
        loadDataSystemInfo();
      }
    });
  };

  //Check Status => Button
  const checkStatus = (value: any) => {
    if (value === 'create') {
      return (
        <Popconfirm
          placement="top"
          title="Nội dung thông tin giới thiệu sẽ được cập nhật trên trang chủ. Bạn có xác nhận thay đổi?"
          okText="Xác nhận"
          cancelText="Hủy"
          onConfirm={() => handlePublic()}
        >
          <Button type="primary" htmlType="submit" className="btn">
            Công khai
          </Button>
        </Popconfirm>
      );
    } else {
      return <></>;
    }
  };
  const validateContent = (rule: any, value: any, callback: any) => {
    props.form.setFields({
      content: {
        value: value.trim(),
      },
    });
    return true;
  };

  const pasteContent = () => {
    const valueContent = props.form.getFieldValue('content');
    props.form.setFields({
      content: {
        value: valueContent.trim() + ' ',
      },
    });
  };

  return (
    <View>
      <div className="bgr">
        <div className="header">
          <Content>Chi tiết thông tin giới thiệu hệ thống </Content>
        </div>
        <div>
          <div className="container">
            <span>Nội dung thông tin giới thiệu hệ thống LGSP </span>

            {updateState.originData?.status === 'create' && <span className="status-new">(Tạo mới)</span>}

            {updateState.originData?.status === 'published' && <span className="status-published">(Công khai)</span>}
          </div>
        </div>
        <div className="InputText">
          <Form>
            <Form.Item label="">
              {getFieldDecorator('content', {
                initialValue: detailState.item?.content,
                validateTrigger: 'onBlur',
                rules: [{ validator: validateContent }],
              })(<TextArea rows={4} maxLength={5000} onPaste={pasteContent} />)}
            </Form.Item>
          </Form>
        </div>
        <div className="container-button">
          <Link to="/system-infor-manager/system-infor-manager">
            <Button className="mr-3">Hủy</Button>
          </Link>
          <Button type="primary" htmlType="submit" className="mr-3" onClick={onUpdateServiceClicked}>
            Lưu
          </Button>
          <>{checkStatus(detailState.item?.status)}</>
        </div>
      </div>
    </View>
  );
}

export default connector(Form.create<IProps>()(Update));
