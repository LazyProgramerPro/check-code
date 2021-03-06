import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import { gen_uuid } from 'src/utils/string_utils';
import styled from 'styled-components';
import { createQuery } from '../../redux/actions/create_query';
import { OutputMappingEntity, paramsGenarateInput, QueryParamEntity } from '../../redux/models';
import FormCreateParamsOutput from '../comps/FormCreateParamsOutput';
import FormUpdateParamsOutput from '../comps/FormUpdateParamsOutput';
import FormCreateParamsInput from '../comps/FormCreateParamsInput';
import FormUpdateParamsInput from '../comps/FormUpdateParamsInput';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { getDataInput, getDataOutput } from '../../redux/service/api';
import { validateNormalString, validateNumber, validateQuery } from 'src/constants/common';

const { Option } = Select;

const mapStateToProps = (rootState: RootState) => ({
  dataSourceState: rootState.createDataService.createDataSource,
  queryState: rootState.createDataService.createQuery,
});

const mapDispatchToProps = {
  createQuery,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, PropsFromRedux {
  show: boolean;
  close: (value: boolean) => void;
}

function CFormCreateQuery(props: IProps) {
  const { getFieldDecorator, resetFields, getFieldValue, setFields } = props.form;
  const { TextArea } = Input;
  const [dataSource, setDataSource] = useState<string>('');
  const [dbType, setDbType] = useState<string>('');
  const [enableHeader, setEnableHeader] = useState('false');
  useEffect(() => {
    if (props.show && props.dataSourceState.DataSourceConfigs && props.dataSourceState.DataSourceConfigs.length > 0) {
      setDataSource(props.dataSourceState.DataSourceConfigs[0]?.name);
      setDbType(props.dataSourceState.DataSourceConfigs[0]?.dbType);
      handleChangeDataSource(props.dataSourceState.DataSourceConfigs[0]?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataSourceState.DataSourceConfigs, props.show]);

  const onCancel = () => {
    props.close(false);
    setEnableHeader('false');
    resetFields();
    // setInputMapping([]);
    // setOutputMapping([]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // let currentDt = props.queryState?.queries || [];
        // if (currentDt.length > 0) {
        //   for (let i = 0; i < currentDt.length; i++) {
        //     if (currentDt[i].name === values.name) {
        //       NotificationError('Th???t b???i', '13');
        //       return;
        //     }
        //   }
        // }
        const params = {
          ...values,
          params: inputMapping,
          outputs: outputMapping,
          id: gen_uuid(),
        };
        props.createQuery(params);
        NotificationSuccess('Th??nh c??ng', 'T???o m???i c??u l???nh th??nh c??ng');
        onCancel();
      }
    });
  };

  const checkValidateQuery = (e: any, text: any, callback: any) => {
    let currentDt = props.queryState?.queries || [];
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n Query kh??ng h???p l???');
    }
    const rs = currentDt.some(e => e.name === text);

    if (rs) {
      return callback('C??u l???nh query ???? t???n t???i');
    }
    return callback();
  };

  function handleChangeDataSource(value: any) {
    setDataSource(value);
    console.log('here: ' + value);
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

  /**
   * INPUT PARAMS MANAGEMENT
   */

  const [inputMapping, setInputMapping] = useState<QueryParamEntity[]>([]);
  const [showCInParamsForm, setShowCInParamsForm] = useState<boolean>(false);
  const [showUInParamsForm, setShowUInParamsForm] = useState<boolean>(false);
  const [dataUInParamsForm, setDataUInParamsForm] = useState<any>({});

  const onCreateInputParamsCallBack = (e: any) => {
    let fff = [e, ...inputMapping];
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
    NotificationSuccess('Th??nh c??ng', 'X??a tham s??? ?????u v??o th??nh c??ng');
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
    NotificationSuccess('Th??nh c??ng', 'X??a tham s??? ?????u ra th??nh c??ng');
  };

  const onCreateOutputParamsCallBack = (e: any) => {
    console.log('e: ' + JSON.stringify(e));
    let out = [e, ...outputMapping];
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

  // generation
  const generationOutput = () => {
    const query = getFieldValue('query').replace(/(\r\n|\n|\r)/gm, ' ');

    const outputParams = query
      .substring(query.indexOf('t') + 1, query.indexOf('from'))
      .split(',')
      .map((e: string) => e.trim());

    if (query.trim() === '' || outputParams[0].trim() === '') {
      NotificationError('Th???t b???i', 'Tham s??? ?????u ra kh??ng t???n t???i');
      return false;
    }

    const arrQueryParams = outputParams.map((e: any) => {
      const param: OutputMappingEntity = {
        name: e,
        paramType: 'Scalar',
        dataType: 'STRING',
      };
      return param;
    });

    setOutputMapping(arrQueryParams);

    setFields({
      groupElement: {
        value: 'Entries',
      },
      rowName: {
        value: 'Entry',
      },
    });
  };

  const generationInput = () => {
    const query = getFieldValue('query').replace(/(\r\n|\n|\r)/gm, ' ');

    let inputParams;

    if (query.toLowerCase().includes('group by')) {
      const indexWhere = query.toLowerCase().indexOf('where') + 5;
      const indexGroupBy = query.toLowerCase().indexOf('group by');
      inputParams = query
        .substring(indexWhere, indexGroupBy)
        .split(/,|or|OR|and|And|AND/)
        .map((e: string) => {
          return e.substring(e.indexOf('=:') + 2).trim();
        });
    } else if (query.toLowerCase().includes('having')) {
      const indexWhere = query.toLowerCase().indexOf('where') + 5;
      const indexHaving = query.toLowerCase().indexOf('having');
      inputParams = query
        .substring(indexWhere, indexHaving)
        .split(/,|or|OR|and|And|AND/)
        .map((e: string) => {
          return e.substring(e.indexOf('=:') + 2).trim();
        });
    } else if (query.toLowerCase().includes('order by')) {
      const indexWhere = query.toLowerCase().indexOf('where') + 5;
      const indexOrderBy = query.toLowerCase().indexOf('order by');
      inputParams = query
        .substring(indexWhere, indexOrderBy)
        .split(/,|or|OR|and|And|AND/)
        .map((e: string) => {
          return e.substring(e.indexOf('=:') + 2).trim();
        });
    } else {
      const indexWhere = query.toLowerCase().indexOf('where') + 5;
      inputParams = query
        .substring(indexWhere)
        .split(/,|or|OR|Or|and|And|AND/)
        .map((e: string) => {
          return e.substring(e.indexOf('=:') + 2).trim();
        });
    }

    if (query.trim() === '' || inputParams[0].trim() === '') {
      NotificationError('Th???t b???i', 'Tham s??? ?????u v??o kh??ng t???n t???i');
      return false;
    }

    console.log('inputParams: ' + JSON.stringify(inputParams));

    const arrQueryParams = inputParams.map((e: any) => {
      const param: QueryParamEntity = {
        name: e,
        paramType: 'Scalar',
        sqlType: 'String',
        optional: true,
        defaultValue: '',
      };
      return param;
    });

    setInputMapping(arrQueryParams);
  };

  const generationInputData = () => {
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
              } else if (rs.rows.length === 0 && rs.code === 0) {
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

  const generationOutData = () => {
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
              } else if (rs.rows.length === 0 && rs.code == 0) {
                setOutputMapping(rs.rows);
                NotificationSuccess('Th??nh c??ng', 'C??u l???nh kh??ng c?? tham s??? ?????u ra');
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
          <StyleButton>
            <Button size="small" className="btnIcon" icon="eye" onClick={() => onUpdateInputParamsClicked(record)} />
            <Popconfirm
              placement="top"
              title="B???n c?? x??c nh???n mu???n x??a?"
              onConfirm={() => onDeleteInputParamsClicked(record.name)}
              okText="X??c nh???n"
              cancelText="H???y"
            >
              <Button size="small" className="btnIcon" icon="delete" />
            </Popconfirm>
          </StyleButton>
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
          <StyleButton>
            <Button size="small" className="btnIcon" icon="eye" onClick={() => onUpdateOutputParamsClicked(record)} />
            <Popconfirm
              placement="top"
              title="B???n c?? x??c nh???n mu???n x??a?"
              onConfirm={() => onDeleteOutputParamsClicked(record.name)}
              okText="X??c nh???n"
              cancelText="H???y"
            >
              <Button size="small" className="btnIcon" icon="delete" />
            </Popconfirm>
          </StyleButton>
        </>
      ),
    },
  ];

  const afterModalClose = () => {
    resetFields();
    setInputMapping([]);
    setOutputMapping([]);
  };

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
    // } else {
    props.form.setFields({
      groupElement: {
        value: text.trim(),
      },
    });
    return true;
    // }
  };
  const validateInput1 = (rule: any, text: any, callback: any) => {
    // const isValid: boolean = validateNormalString(text);
    // if (!isValid) {
    //   return callback('T??n kh??ng h???p l???');
    // } else {
    props.form.setFields({
      rowName: {
        value: text.trim(),
      },
    });
    return true;
    // }
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

  const pasteQuery = () => {
    const valueQueryPaste = props.form.getFieldValue('query');
    props.form.setFields({
      query: {
        value: valueQueryPaste.trim() + ' ',
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

  const pasteExpression = () => {
    const valueExpressionPaste = props.form.getFieldValue('expression');
    props.form.setFields({
      expression: {
        value: valueExpressionPaste.trim() + ' ',
      },
    });
  };

  const pasteWorkBook = (value: any) => {
    const valueWorkBook = props.form.getFieldValue('workbookName');
    props.form.setFields({
      workbookName: {
        value: valueWorkBook.trim() + ' ',
      },
    });
  };

  return (
    <Wrapper>
      <Modal
        title="T???o m???i c??u l???nh"
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
              T???o m???i
            </Button>
          </StyledButton>
        }
      >
        <FormStyled {...formItemLayout}>
          <Row gutter={16}>
            <Col span={dbType === 'RDBMS' || dbType === 'MongoDB' ? 12 : 24}>
              <Form.Item label="T??n">
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                    { validator: checkValidateQuery },
                  ],
                  initialValue: '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={50} />)}
              </Form.Item>

              <Form.Item label="Data Source">
                {getFieldDecorator('dataSourceName', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                  initialValue: dataSource,
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
                        initialValue: '',
                        validateTrigger: 'onBlur',
                        rules: [{ validator: validQuery }, { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                      })(<TextArea rows={4} maxLength={5000} onPaste={pasteQuery} />)}
                    </Form.Item>
                    <Form.Item label=" ">
                      <Button type="link" onClick={generationInputData}>
                        Genarate tham s??? ?????u v??o
                      </Button>
                      <Button type="link" onClick={generationOutData}>
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
                        initialValue: '',
                        rules: [
                          { validator: validExpression },
                          { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        ],
                        validateTrigger: 'onBlur',
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
                  locale={{
                    emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
                  }}
                  className="custom-table"
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
                      initialValue: '',
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} onPaste={pasteWorkBook} />)}
                  </Form.Item>

                  <Form.Item label="B???t ?????u t??? d??ng">
                    {getFieldDecorator('excelStartingRow', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNumberInput },
                      ],
                      initialValue: '',
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} />)}
                  </Form.Item>

                  <Form.Item label="S??? d??ng ?????c">
                    {getFieldDecorator('excelMaxRow', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNumberInput },
                      ],
                      initialValue: '',
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} />)}
                  </Form.Item>

                  <Form.Item label="C?? Header">
                    {getFieldDecorator('isHeader', {
                      initialValue: enableHeader,
                      rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                    })(
                      <Select
                        onChange={(value: string) => {
                          setEnableHeader(value);
                        }}
                      >
                        <Option value="true">C??</Option>
                        <Option value="false">Kh??ng</Option>
                      </Select>,
                    )}
                  </Form.Item>
                  {enableHeader === 'true' ? (
                    <Form.Item label="D??ng header">
                      {getFieldDecorator('rowHeader', {
                        rules: [
                          { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                          { validator: validateNumberInput },
                        ],
                        validateTrigger: 'onBlur',
                      })(<Input maxLength={255} />)}
                    </Form.Item>
                  ) : (
                    <>
                      {' '}
                      <Form.Item label="D??ng header">
                        {getFieldDecorator('rowHeader', {
                          rules: [{ validator: validateNumberInput }],
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
                  initialValue: '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteGroupElement} />)}
              </Form.Item>

              <Form.Item label="Row name">
                {getFieldDecorator('rowName', {
                  rules: [{ validator: validateInput1 }],
                  initialValue: '',
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

export default connector(Form.create<IProps>()(CFormCreateQuery));

const Wrapper = styled.div`
  color: #232323;
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

const StyleButton = styled.div`
  .btnIcon {
    margin: 0px 4px;
    padding: 1px;
  }
`;
const StyledButton = styled.div`
  margin-top: -15px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
