import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { RootState } from 'src/redux/reducers';
import { saveEditQuery } from '../../redux/actions/create_query';
import { OutputMappingEntity, paramsGenarateInput, QueryParamEntity } from '../../redux/models';
import FormCreateParamsInput from '../comps/FormCreateParamsInput';
import FormUpdateParamsInput from '../comps/FormUpdateParamsInput';
import FormCreateParamsOutput from '../comps/FormCreateParamsOutput';
import FormUpdateParamsOutput from '../comps/FormUpdateParamsOutput';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString, validateNumber, validateQuery } from 'src/constants/common';
import { getDataInput, getDataOutput } from '../../redux/service/api';

const { Option } = Select;

const mapStateToProps = (rootState: RootState) => ({
  dataSourceState: rootState.createDataService.createDataSource,
  queryState: rootState.createDataService.createQuery,
});

const mapDispatchToProps = {
  saveEditQuery,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, PropsFromRedux {
  show: boolean;
  close: (value: boolean) => void;
  item: any;
}

function UFormCreateQuery(props: IProps) {
  const { getFieldDecorator, resetFields, getFieldValue, setFields } = props.form;
  const { TextArea } = Input;
  const [isHeader, setIsHeader] = useState<any>(`${props.item.isHeader}`);
  const [dataSource, setDataSource] = useState<string>('');
  const [dbType, setDbType] = useState<string>('');
  // console.log(props.item.isHeader);
  // console.log('ed', isHeader);
  useEffect(() => {
    if (props.show && props.dataSourceState.DataSourceConfigs && props.dataSourceState.DataSourceConfigs.length > 0) {
      setDataSource(props.item.dataSourceName);
      // db type k can set, xuong ham handleChangeDataSource se tu update lai
      setDbType(props.item.dataSourceName);
      // output-mapping
      let outputs = props.item.outputs || [];
      let o = JSON.parse(JSON.stringify(outputs));
      setOutputMapping(o);
      handleChangeDataSource(props.item.dataSourceName);
      // cheat
      let p = props.item.params || [];
      let k = JSON.parse(JSON.stringify(p));
      setInputMapping(k);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.dataSourceState.DataSourceConfigs,
    props.item.dataSourceName,
    props.item.outputs,
    props.item.params,
    props.show,
  ]);

  useEffect(() => {
    setIsHeader(props.item.isHeader);
  }, [props.item]);

  const onCancel = () => {
    props.close(false);
    resetFields();
    setIsHeader(`${props.item.isHeader}`);

    // resetFields();
    // setInputMapping([]);
    // setOutputMapping([]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let currentDt = props.queryState?.queries || [];
        if (currentDt.length > 0) {
          if (values.name !== props.item.name) {
            for (let i = 0; i < currentDt.length; i++) {
              if (currentDt[i].name === values.name) {
                NotificationError('Th???t b???i', 'C??u l???nh query ???? t???n t???i');
                return;
              }
            }
          }
        }
        const params = {
          ...values,
          params: inputMapping,
          outputs: outputMapping,
          id: props.item.id,
        };
        props.saveEditQuery(params);
        NotificationSuccess('Th??nh c??ng', 'C???p nh???t c??u l???nh th??nh c??ng');
        onCancel();
        resetFields();
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleChangeDataSource(value: any) {
    setDataSource(value);
    props.dataSourceState.DataSourceConfigs?.map(e => {
      if (e.name === value) {
        const dbsType = e.dbType;
        if (
          dbsType === 'MySQL' ||
          dbsType === 'Microsoft SQL Server' ||
          dbsType === 'Oracle' ||
          dbsType === 'PostgreSQL'
        ) {
          setDbType('RDBMS');
        } else {
          setDbType(dbsType);
        }
      }
    });
  }

  // generation
  const generationOutput = () => {
    try {
      props.form.validateFields((err, values) => {
        if (!err) {
          const params: paramsGenarateInput = {
            query: values.query,
          };
          const response = getDataOutput(params);
          response
            .then(rs => {
              if (rs.rows.length !== 0) {
                setOutputMapping(rs.rows);
                NotificationSuccess('Th??nh c??ng', 'Generate tham s??? ?????u ra th??nh c??ng');
              } else if (rs.rows.length === 0 && rs.code === 0) {
                setOutputMapping(rs.rows);
                NotificationSuccess('Th??nh c??ng', 'C??u l???nh truy v???n kh??ng c?? tham s??? ?????u ra');
              } else {
                NotificationError('Th???t b???i', rs.message);
              }
            })
            .catch(rs => {
              NotificationError('Th???t b???i', rs.message);
            });
        }
      });
    } catch (error) {
      NotificationError('Th???t b???i', 'D??? li???u kh??ng ???????c tr??? v???');
    }
  };

  const generationInput = () => {
    try {
      props.form.validateFields((err, values) => {
        if (!err) {
          const params: paramsGenarateInput = {
            query: values.query,
          };
          const response = getDataInput(params);
          response
            .then(rs => {
              if (rs.rows.length !== 0) {
                setInputMapping(rs.rows);
                NotificationSuccess('Th??nh c??ng', 'Generate tham s??? ?????u v??o th??nh c??ng');
              } else if (rs.rows.length === 0 && rs.code == 0) {
                setInputMapping(rs.rows);
                NotificationSuccess('Th??nh c??ng', 'C??u l???nh truy v???n kh??ng c?? tham s??? ?????u v??o');
              } else {
                NotificationError('Th???t b???i', rs.message);
              }
            })
            .catch(rs => {
              NotificationError('Th???t b???i', rs.message);
            });
        }
      });
    } catch (error) {
      NotificationError('Th???t b???i', 'D??? li???u kh??ng ???????c tr??? v???');
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const columnsQueryParams: ColumnProps<QueryParamEntity>[] = [
    {
      title: 'T??n',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Ki???u tham s???',
      dataIndex: 'paramType',
      key: 'paramType',
    },
    {
      title: 'Ki???u d??? li???u',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (text: any, record: QueryParamEntity) => (
        <>
          <ButtonStyled
            size="small"
            className="btnIcon"
            icon="eye"
            onClick={() => onUpdateInputParamsClicked(record)}
          />
          <Popconfirm
            placement="top"
            title="B???n c?? x??c nh???n mu???n x??a?"
            onConfirm={() => onDeleteInputParamsClicked(record.name)}
            okText="X??c nh???n"
            cancelText="H???y"
          >
            <ButtonStyled size="small" className="btnIcon" icon="delete" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const columnsOutputMapping: ColumnProps<OutputMappingEntity>[] = [
    {
      title: 'T??n',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Ki???u tham s???',
      dataIndex: 'paramType',
      key: 'paramType',
    },
    {
      title: 'Ki???u d??? li???u',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (text: any, record: OutputMappingEntity) => (
        <>
          <ButtonStyled
            size="small"
            className="btnIcon"
            icon="eye"
            onClick={() => onUpdateOutputParamsClicked(record)}
          />
          <Popconfirm
            placement="top"
            title="B???n c?? x??c nh???n mu???n x??a?"
            onConfirm={() => onDeleteOutputParamsClicked(record.name)}
            okText="X??c nh???n"
            cancelText="H???y"
          >
            <ButtonStyled size="small" className="btnIcon" icon="delete" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const afterModalClose = () => {
    resetFields();
    setInputMapping([]);
    setOutputMapping([]);
  };

  /**
   * INPUT PARAMS MANAGEMENT
   */

  const [inputMapping, setInputMapping] = useState<QueryParamEntity[]>([]);
  const [showCInParamsForm, setShowCInParamsForm] = useState<boolean>(false);
  const [showUInParamsForm, setShowUInParamsForm] = useState<boolean>(false);
  const [dataUInParamsForm, setDataUInParamsForm] = useState<any>({});

  const onCreateInputParamsCallBack = (e: any) => {
    let fff = [...inputMapping, e];
    setInputMapping(fff);
    setShowCInParamsForm(false);
  };

  const onUpdateInputParamsClicked = (data: any) => {
    setDataUInParamsForm(data);
    setShowUInParamsForm(true);
  };

  const onDeleteInputParamsClicked = (name: string) => {
    const newArr = inputMapping.filter(e => e.name !== name);
    setInputMapping(newArr);
  };

  const onUpdateInputParamsCallBack = (e: any) => {
    let input = [...inputMapping];
    for (let i = 0; i < input.length; i++) {
      if (input[i].name === e.name) {
        input[i] = e;
        break;
      }
    }
    setInputMapping(input);
    setDataUInParamsForm({});
    setShowUInParamsForm(false);
  };

  // END OF INPUT

  /**
   * OUTPUT PARAMS MANAGEMENT
   */
  const [outputMapping, setOutputMapping] = useState<OutputMappingEntity[]>([]);
  const [showCOutParamsForm, setShowCOutParamsForm] = useState<boolean>(false);
  const [showUOutParamsForm, setShowUOutParamsForm] = useState<boolean>(false);
  const [dataUOutParamsForm, setDataUOutParamsForm] = useState<any>({});

  const onCreateOutputParamsClicked = () => {
    setShowCOutParamsForm(true);
  };

  const onUpdateOutputParamsClicked = (data: any) => {
    setDataUOutParamsForm(data);
    setShowUOutParamsForm(true);
  };

  const onDeleteOutputParamsClicked = (name: string) => {
    const newArr = outputMapping.filter(e => e.name !== name);
    setOutputMapping(newArr);
  };

  const onCreateOutputParamsCallBack = (e: any) => {
    console.log('e: ' + JSON.stringify(e));
    let out = [...outputMapping, e];
    setOutputMapping(out);
    setShowCOutParamsForm(false);
  };

  const onUpdateOutputParamsCallBack = (e: any) => {
    let output = [...outputMapping];
    for (let i = 0; i < output.length; i++) {
      if (output[i].name === e.name) {
        output[i] = e;
        break;
      }
    }
    setOutputMapping(output);
    setDataUOutParamsForm({});
    setShowUOutParamsForm(false);
  };

  // END OF OUTPUT PARAMS
  const validQuery = (rule: any, text: any, callback: any) => {
    if (text.length === 0) {
      return callback();
    }
    if (text.length > 0 && text.trim() === '') {
      return callback('C??u l???nh query kh??ng h???p');
    }

    const isValid: boolean = validateQuery(text);
    if (!isValid) {
      return callback('C??u l???nh query kh??ng h???p l???');
    } else {
      props.form.setFields({
        query: {
          value: text.trim(),
        },
      });
    }
    return callback();
  };

  const validExpression = (rule: any, text: any, callback: any) => {
    props.form.setFields({
      expression: {
        value: text.trim(),
      },
    });

    return true;
  };

  const validateInput = (rule: any, text: any, callback: any) => {
    // const isValid: boolean = validateNormalString(text);
    // if (!isValid) {
    //   return callback('T??n kh??ng h???p l???');
    // }
    // return callback();
    props.form.setFields({
      groupElement: {
        value: text.trim(),
      },
    });
    return true;
  };

  const validateInput1 = (rule: any, text: any, callback: any) => {
    props.form.setFields({
      rowName: {
        value: text.trim(),
      },
    });
    return true;
  };
  const validateNumberInput = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    const isValid: boolean = validateNumber(text);
    if (!isValid) {
      return callback('S??? li???u kh??ng h???p l???');
    }
    return callback();
  };

  const validateWorkBook = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    props.form.setFields({
      workbookName: {
        value: text.trim(),
      },
    });
    return callback();
  };

  const pasteWorkBook = (value: any) => {
    const valueWorkBook = props.form.getFieldValue('workbookName');
    props.form.setFields({
      workbookName: {
        value: valueWorkBook.trim() + ' ',
      },
    });
  };

  const pasteQuery = () => {
    const valueQueryPaste = props.form.getFieldValue('query');
    props.form.setFields({
      query: {
        value: valueQueryPaste.trim() + ' ',
      },
    });
  };

  const pasteExpression = () => {
    const valueExpressionPaste = props.form.getFieldValue('expression');
    props.form.setFields({
      expression: {
        value: valueExpressionPaste.trim() + ' ',
      },
    });
  };

  const pasteGroupElement = () => {
    const valueGroupElement = props.form.getFieldValue('groupElement');
    props.form.setFields({
      groupElement: {
        value: valueGroupElement.trim() + ' ',
      },
    });
  };

  const pasteRowName = () => {
    const valueRowName = props.form.getFieldValue('rowName');
    props.form.setFields({
      rowName: {
        value: valueRowName.trim() + ' ',
      },
    });
  };

  return (
    <Wrapper>
      <Modal
        title="C???p nh???t c??u l???nh"
        afterClose={afterModalClose}
        onCancel={onCancel}
        width={dbType === 'RDBMS' || dbType === 'MongoDB' ? 1300 : 600}
        visible={props.show}
        onOk={handleSubmit}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={onCancel}>H???y</Button>
            <Button type="primary" onClick={handleSubmit}>
              L??u
            </Button>
          </StyledButton>
        }
      >
        <FormStyled {...formItemLayout}>
          <Row gutter={16}>
            <Col span={dbType === 'RDBMS' || dbType === 'MongoDB' ? 12 : 24}>
              <Form.Item label="T??n">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                  initialValue: props.item?.name || '',
                  validateTrigger: 'onBlur',
                })(<Input disabled={true} maxLength={50} />)}
              </Form.Item>

              <Form.Item label="Data Source">
                {getFieldDecorator('dataSourceName', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                  initialValue: dataSource,
                  validateTrigger: 'onBlur',
                })(
                  <Select onChange={handleChangeDataSource}>
                    {props.dataSourceState.DataSourceConfigs?.map((e: any, i: number) => (
                      <Option value={e.name} key={i}>
                        {e.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>

            {/* Form ?????u v??o khi ch???n RDBMS - MongoDB */}
            {(dbType === 'RDBMS' || dbType === 'MongoDB') && (
              <Col span={12}>
                {/* RDBMS */}
                {dbType === 'RDBMS' && (
                  <InputForm>
                    <Form.Item label="C??u l???nh query">
                      {getFieldDecorator('query', {
                        initialValue: props.item?.query || '',
                        validateTrigger: 'onBlur',
                        rules: [{ validator: validQuery }, { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                      })(<TextArea rows={4} maxLength={5000} onPaste={pasteQuery} />)}
                    </Form.Item>
                    <Form.Item label=" ">
                      <Button type="link" onClick={generationInput}>
                        Genarate tham s??? ?????u v??o
                      </Button>
                      <Button type="link" onClick={generationOutput}>
                        Genarate tham s??? ?????u ra
                      </Button>
                    </Form.Item>
                  </InputForm>
                )}

                {/* MongoDB */}
                {dbType === 'MongoDB' && (
                  <InputForm>
                    <Form.Item label="Expression">
                      {getFieldDecorator('expression', {
                        initialValue: props.item?.expression,
                        validateTrigger: 'onBlur',
                        rules: [
                          { validator: validExpression },
                          { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        ],
                      })(<TextArea rows={4} maxLength={5000} onPaste={pasteExpression} />)}
                    </Form.Item>
                  </InputForm>
                )}
              </Col>
            )}
          </Row>

          <Row gutter={16}>
            {/* Danh s??ch ?????u v??o khi ch???n RDBMS v?? MongoDB */}
            {(dbType === 'RDBMS' || dbType === 'MongoDB') && (
              <Col span={dbType === 'RDBMS' || dbType === 'MongoDB' ? 12 : 24}>
                <Params>
                  <p className="title">Danh s??ch tham s??? ?????u v??o</p>
                  <Button className="button" icon="plus-circle" onClick={() => setShowCInParamsForm(true)}>
                    Th??m tham s???
                  </Button>
                </Params>

                <Table
                  rowKey="name"
                  className="custom-table"
                  locale={{
                    emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
                  }}
                  columns={columnsQueryParams}
                  dataSource={inputMapping}
                  pagination={false}
                />
              </Col>
            )}

            {/* Form khi ch???n Excel */}
            <Col span={dbType === 'RDBMS' || dbType === 'MongoDB' ? 12 : 24}>
              {dbType === 'Excel' && (
                <>
                  <Form.Item label="Workbook name">
                    {getFieldDecorator('workbookName', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateWorkBook },
                      ],
                      initialValue: props.item?.workbookName || '',
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} onPaste={pasteWorkBook} />)}
                  </Form.Item>

                  <Form.Item label="B???t ?????u t??? d??ng">
                    {getFieldDecorator('excelStartingRow', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNumberInput },
                      ],
                      initialValue: props.item?.excelStartingRow || '',
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} />)}
                  </Form.Item>

                  <Form.Item label="S??? d??ng ?????c">
                    {getFieldDecorator('excelMaxRow', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNumberInput },
                      ],
                      initialValue: props.item?.excelMaxRow || '',
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} />)}
                  </Form.Item>

                  <Form.Item label="C?? Header">
                    {getFieldDecorator('isHeader', {
                      initialValue: isHeader,
                      rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                    })(
                      <Select
                        onChange={(value: string) => {
                          setIsHeader(value);
                          console.log('isHeader', isHeader);
                          console.log('props.item?.isHeader', props.item?.isHeader);
                          if (value == `${props.item?.isHeader}`) {
                            props.form.setFields({
                              rowHeader: {
                                value: props.item?.rowHeader,
                              },
                            });
                            return true;
                          }
                          props.form.setFields({
                            rowHeader: {
                              value: ' ',
                            },
                          });
                        }}
                      >
                        <Option value="true">C??</Option>
                        <Option value="false">Kh??ng</Option>
                      </Select>,
                    )}
                  </Form.Item>
                  {isHeader === 'true' || isHeader === true || isHeader === undefined ? (
                    <Form.Item label="D??ng header">
                      {getFieldDecorator('rowHeader', {
                        rules: [
                          { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                          { validator: validateNumberInput },
                        ],
                        initialValue: props.item?.rowHeader || '',
                        validateTrigger: 'onBlur',
                      })(<Input maxLength={255} />)}
                    </Form.Item>
                  ) : (
                    <>
                      <Form.Item label="D??ng header">
                        {getFieldDecorator('rowHeader', {
                          rules: [{ validator: validateNumberInput }],
                          initialValue: props.item?.rowHeader || '',
                          validateTrigger: 'onBlur',
                        })(<Input maxLength={255} />)}
                      </Form.Item>
                    </>
                  )}
                </>
              )}

              {/* Danh s??ch ?????u ra */}
              <Params>
                <p className="title">Danh s??ch tham s??? ?????u ra</p>
                <Button className="button" icon="plus-circle" onClick={onCreateOutputParamsClicked}>
                  Th??m tham s???
                </Button>
              </Params>

              <Form.Item label="Grouped by element">
                {getFieldDecorator('groupElement', {
                  rules: [{ validator: validateInput }],
                  initialValue: props.item?.groupElement || '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteGroupElement} />)}
              </Form.Item>

              <Form.Item label="Row name">
                {getFieldDecorator('rowName', {
                  rules: [{ validator: validateInput1 }],
                  initialValue: props.item?.rowName || '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteRowName} />)}
              </Form.Item>

              <Table
                rowKey="name"
                locale={{
                  emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
                }}
                className="custom-table"
                columns={columnsOutputMapping}
                dataSource={outputMapping}
                pagination={false}
              />
            </Col>
          </Row>
        </FormStyled>
      </Modal>

      <FormCreateParamsInput
        show={showCInParamsForm}
        close={() => {
          setShowCInParamsForm(false);
        }}
        createInputMapping={onCreateInputParamsCallBack}
        listInputMapping={inputMapping}
      />

      <FormUpdateParamsInput
        show={showUInParamsForm}
        close={() => {
          setShowUInParamsForm(false);
        }}
        item={dataUInParamsForm}
        updateInputMapping={onUpdateInputParamsCallBack}
        listInputMapping={inputMapping}
      />

      <FormCreateParamsOutput
        show={showCOutParamsForm}
        close={() => {
          setShowCOutParamsForm(false);
        }}
        createOutputMapping={onCreateOutputParamsCallBack}
        listOutputMapping={outputMapping}
      />

      <FormUpdateParamsOutput
        show={showUOutParamsForm}
        close={() => {
          setShowUOutParamsForm(false);
        }}
        item={dataUOutParamsForm}
        updateOutputMapping={onUpdateOutputParamsCallBack}
        listOutputMapping={outputMapping}
      />
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(UFormCreateQuery));

const Wrapper = styled.div`
  color: #232323;
  .ant-btn > .anticon {
    margin: 3px;
  }
`;

const InputForm = styled.div`
  min-height: 135px;
`;

const Params = styled.div`
  display: flex;
  justify-content: space-between;

  .title {
    font-weight: bold;
  }
  .button {
    border: none;
    box-shadow: none;
    color: inherit;
  }
`;

const FormStyled = styled(Form)`
  max-height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ButtonStyled = styled(Button)`
  margin: 0px 4px;
`;

const StyledButton = styled.div`
  margin-top: -15px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
