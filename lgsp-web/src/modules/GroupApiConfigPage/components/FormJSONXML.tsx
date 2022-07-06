import Editor from '@monaco-editor/react';
import { Button, Form, Modal, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import SwaggerUI from 'swagger-ui-react';
import { parse, stringify } from 'yaml';
import { getApiDefinition } from '../redux/actions';
import { editApiDefinition } from '../redux/service/api';
import FormImport from './FormImport';

interface FormJSONXMLProps {
  visible: boolean;
  onClose: Function;
}

interface param {
  apiId: string;
}

const mapState = (rootState: RootState) => ({
  apiDefinition: rootState.apiDefinition.ApiDefinition.params,
  loading: rootState.apiDefinition.ApiDefinition.loading,
});

const connector = connect(mapState, { getApiDefinition });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormJSONXMLProps, FormComponentProps {}

function FormJSONXML(props: IProps) {
  const { visible, onClose, getApiDefinition, apiDefinition, loading } = props;

  const editorRef = useRef<any>(null);
  const param: param = useParams();

  const [openImport, setOpenImport] = useState(false);
  const [contentEditor, setContentEditor] = useState<any>('');
  const [defaultLanguage, setDefaultLanguage] = useState('json');

  const [editMode, setEditMode] = useState(false);

  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleSubmit = (e: any) => {
    const data = getValueXML();

    setLoadingEdit(true);
    const params = {
      apiId: param.apiId,
      data: JSON.parse(data),
    };

    editApiDefinition(params)
      .then(res => {
        if (res.code === 0) {
          setLoadingEdit(false);
          NotificationSuccess('Thành công', 'Cập nhật định nghĩa dịch vụ chia sẻ thành công');
          onClose();
          return;
        }

        setLoadingEdit(false);
        NotificationError('Thất bại', res.message);
        return;
      })
      .catch(err => {
        setLoadingEdit(false);
        NotificationError('Thất bại', 'Cập nhật định nghĩa dịch vụ chia sẻ thất bại');
      });
  };

  const downloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([`${contentEditor}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `swagger.${defaultLanguage}`;
    document.body.appendChild(element);
    element.click();
  };

  const handleOpenImport = () => {
    setOpenImport(true);
  };

  const handleCloseImport = () => {
    setOpenImport(false);
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const getValueXML = () => {
    return editorRef.current?.getValue();
  };

  const changeLanguage = () => {
    if (defaultLanguage === 'json') {
      setDefaultLanguage('yaml');

      setContentEditor(stringify(JSON.parse(contentEditor)));
    } else {
      setDefaultLanguage('json');
      setContentEditor(JSON.stringify(parse(contentEditor), null, 4));
    }
  };

  useEffect(() => {
    getApiDefinition(param.apiId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.apiId]);

  useEffect(() => {
    setContentEditor(JSON.stringify(apiDefinition, null, 4));
  }, [apiDefinition]);

  return (
    <ModalStyled
      title="Định nghĩa dịch vụ chia sẻ"
      visible={visible}
      width={1200}
      onCancel={() => onClose()}
      maskClosable={false}
      footer={
        <StyledButton>
          <Button onClick={() => onClose()}>Hủy</Button>

          {editMode && (
            <Button onClick={handleSubmit} type="primary">
              Lưu
            </Button>
          )}
        </StyledButton>
      }
    >
      {loading ? (
        <Spin style={{ width: '100%', margin: '10% auto' }} />
      ) : (
        <Wrapper>
          <div className="definition">
            <ContainerButton>
              <Button
                type="default"
                className="btn"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Sửa
              </Button>
              <Button type="default" className="btn" onClick={handleOpenImport}>
                Tải lên
              </Button>
              <Button type="default" className="btn" onClick={downloadFile}>
                Tải xuống
              </Button>
              {defaultLanguage === 'json' && (
                <Button type="default" className="btn" onClick={changeLanguage}>
                  Chuyển sang yaml
                </Button>
              )}
              {defaultLanguage === 'yaml' && (
                <Button type="default" className="btn" onClick={changeLanguage}>
                  Chuyển sang json
                </Button>
              )}
            </ContainerButton>

            <Editor
              options={{ readOnly: !editMode }}
              height="580px"
              // language={editMode ? defaultLanguage : ''}
              language={defaultLanguage}
              value={contentEditor}
              onMount={handleEditorDidMount}
              theme="vs-dark"
            />
          </div>

          <div className="swagger">
            <SwaggerUI spec={apiDefinition !== null ? apiDefinition : {}}></SwaggerUI>
          </div>
        </Wrapper>
      )}

      <FormImport
        apiId={param.apiId}
        visible={openImport}
        onClose={handleCloseImport}
        reload={() => getApiDefinition(param.apiId)}
      />

      {loadingEdit && <Loading />}
    </ModalStyled>
  );
}

export default connector(Form.create<IProps>()(FormJSONXML));

const ModalStyled = styled(Modal)`
  .ant-modal-body {
    padding: 0px 24px;
  }
  .ant-modal-footer {
    padding-bottom: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;

  .definition {
    width: 50%;
  }

  .swagger {
    padding-top: 28px;
    width: 50%;
  }
`;

const ContainerButton = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  .btn {
    font-size: 14px;
    margin-right: 4px;
  }
`;
const StyledButton = styled.div`
  /* margin-top: -55px; */
  margin-right: 26px;
`;
