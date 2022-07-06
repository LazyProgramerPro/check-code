import Editor from '@monaco-editor/react';
import { Button, Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useRef, useState } from 'react';
import Loading from 'src/components/Loading';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { NotificationError } from 'src/components/Notification/Notifications';
import { useAppDispatch } from 'src/redux/hooks';
import styled from 'styled-components';
import { getDetailDataServiceUpdate } from '../redux/actions/create_dataService';
import { getXmlDefinitionApi, postXmlDefinitionApi } from '../redux/service/api';

interface FormXMLEditorProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  dataServiceId: string;
}

export interface ParamsEditXML {
  dataServiceId: string;
  data: string;
}

function FormXMLEditor(props: FormXMLEditorProps) {
  const { visible, onClose, dataServiceId } = props;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [valueXml, setValueXml] = useState<any>();

  const editorRef = useRef<any>(null);

  const handleSubmit = (e: any) => {
    const data = getValueXML();

    const params: ParamsEditXML = {
      dataServiceId: dataServiceId,
      data,
    };

    setLoading(true);
    postXmlDefinitionApi(params)
      .then(res => {
        setLoading(false);
        if (res.code === 0) {
          NotificationSuccess('Thành công', 'Cập nhật dịch vụ dữ liệu thành công');
          dispatch(getDetailDataServiceUpdate(dataServiceId));
          onClose();
          return;
        }

        NotificationError('Thất bại', res.message);
      })
      .catch(err => {
        setLoading(false);
        NotificationError('Thất bại', err.message);
      });
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const getValueXML = () => {
    return editorRef.current?.getValue();
  };

  useEffect(() => {
    if (visible === false) {
      return;
    }

    setLoading(true);
    getXmlDefinitionApi(dataServiceId)
      .then(res => {
        setLoading(false);
        if (res.code === 0) {
          setValueXml(res.item);
          return;
        }

        NotificationError('Thất bại', res.message);
      })
      .catch(err => {
        setLoading(false);

        NotificationError('Thất bại', err.message);
      });
  }, [dataServiceId, visible]);

  return (
    <Wrapper>
      <Modal
        title="XML editor"
        visible={visible}
        onOk={handleSubmit}
        onCancel={() => onClose()}
        afterClose={() => {
          setValueXml('');
        }}
        maskClosable={false}
        // okText="Lưu"
        // cancelText="Hủy"
        footer={
          <StyledButton>
            <Button onClick={() => onClose()}>Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </StyledButton>
        }
        width={700}
      >
        <Editor
          options={{ wordWrap: 'on', lineHeight: 20 }}
          height="50vh"
          defaultLanguage="xml"
          value={valueXml}
          theme="vs-dark"
          onMount={handleEditorDidMount}
        />
      </Modal>

      {loading && <Loading />}
    </Wrapper>
  );
}

export default Form.create<FormXMLEditorProps>()(FormXMLEditor);

const Wrapper = styled.div``;

const StyledButton = styled.div`
  margin-top: -15px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
