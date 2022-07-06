import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { getSystemInfo } from '../redux/actions/get_systeminfo';
import {
  CreateContentAction,
  CreateContentParams,
  DataSystemInfo,
  GetSystemInfoParams,
  PublicInforParams,
} from '../redux/models';
import { createContent } from '../redux/actions/create_content';
import Loading from 'src/components/Loading';
import { publicInfor } from '../redux/actions/public_infor';
import { useHistory, useParams } from 'react-router';
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

  .container-button {
    /* margin-top: 5px; */
  }
`;
const Content = styled.div`
  font-size: 20px;
`;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  createState: rootState.systemInforManager.createState,
  publicState: rootState.systemInforManager.publicState,
  getSystemInfoState: rootState.systemInforManager.getSystemInfoState,
});

const connector = connect(mapState, { createContent, getSystemInfo, publicInfor });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function CreateForm(props: IProps) {
  const { getSystemInfoState, getSystemInfo, publicState, publicInfor } = props;
  const { getFieldDecorator, getFieldValue } = props.form;
  const params: any = useParams();
  const history = useHistory();

  const [id] = useState<string>(params.id);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const loadDataSystemInfo = () => {
    let params: GetSystemInfoParams = {
      ...getSystemInfoState.params,
      page: page,
      size: size,
    };
    getSystemInfo(params);
  };

  const onChangeInput = (e: any) => {
    setContent(e);
  };
  //  hàm tạo
  const onCreateContentClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      let param: CreateContentParams = {
        content: values.content,
      };
      setLoading(true);
      props.createContent(param, history);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadDataSystemInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const handlePublic = () => {
    Modal.confirm({
      content: 'Nội dung thông tin giới thiệu sẽ được cập nhật trên trang chủ. Bạn có xác nhận thay đổi?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',

      onOk() {
        props.form.validateFields((err, values) => {
          const param: PublicInforParams = {
            id: id,
            content: values.content,
          };
          publicInfor(param);
          console.log('param', param);
          loadDataSystemInfo();
        });
      },
      onCancel() {},
    });
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

        <div className="container">
          <span>Nội dung thông tin giới thiệu hệ thống LGSP</span> <span className="status-new">(Tạo mới)</span>
        </div>

        <div className="InputText">
          <Form>
            <Form.Item label="">
              {getFieldDecorator('content', {
                initialValue: '',
                validateTrigger: 'onBlur',
                rules: [{ validator: validateContent }],
              })(<TextArea rows={4} onChange={e => onChangeInput(e)} maxLength={5000} onPaste={pasteContent} />)}
            </Form.Item>
          </Form>
        </div>
        <div className="container-button">
          <Link to="/system-infor-manager/system-infor-manager">
            <Button className="mr-3 ">Hủy</Button>
          </Link>

          <Button className="mr-3 " type="primary" htmlType="submit" onClick={onCreateContentClicked}>
            Lưu
          </Button>

          <Button type="primary" htmlType="submit" onClick={handlePublic}>
            Công khai
          </Button>
        </div>
      </div>

      {loading ? <Loading /> : null}
    </View>
  );
}

export default connector(Form.create<IProps>()(CreateForm));
