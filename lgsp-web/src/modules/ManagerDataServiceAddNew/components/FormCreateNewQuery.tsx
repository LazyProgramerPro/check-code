import { Button, Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNumber } from 'src/constants/common';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { closeFormAddQuery, createQuery, saveEditQuery } from '../redux/actions/create_query';
import { OutputMappingEntity, QueryEntity, QueryParamEntity } from '../redux/models';
import FormCreateParamsInput from './FormCreateParamsInput';
import FormCreateParamsOutput from './FormCreateParamsOutput';
const { Option } = Select;

const mapState = (rootState: RootState) => ({
  queryState: rootState.createDataService.createQuery,
  dataSourceState: rootState.createDataService.createDataSource,
});
const connector = connect(mapState, { closeFormAddQuery, createQuery, saveEditQuery });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function FormCreateNewQuery(props: IProps) {
  const { queryState, dataSourceState, closeFormAddQuery, createQuery, saveEditQuery } = props;
  const { getFieldDecorator, resetFields, getFieldValue, setFields } = props.form;

  const { TextArea } = Input;

  const [openCreateParamsInput, setOpenCreateParamsInput] = useState(false);
  const [openCreateParamsOutput, setOpenCreateParamsOutput] = useState(false);
  const [dataSource, setDataSource] = useState(dataSourceState.DataSourceConfigs[0]?.name);
  const [dbType, setDbType] = useState(dataSourceState.DataSourceConfigs[0]?.dbType);

  // queryParams
  const initQueryParamEntity: QueryParamEntity = {
    defaultValue: '',
    inputMappingInOutType: '',
    name: '',
    optional: false,
    paramType: '',
    queryName: '',
    sqlType: '',
  };
  const [queryParams, setQueryParams] = useState<QueryParamEntity[]>([]);
  const [queryParamUpdate, setQueryParamUpdate] = useState<QueryParamEntity>(initQueryParamEntity);
  const [isUpdateQueryParam, setIsUpdateQueryParam] = useState(false);

  // outputMapping
  const initOutputMappingEntity: OutputMappingEntity = {
    name: '',
    columnName: '',
    dataType: '',
    fieldName: '',
    paramType: '',
    queryName: '',
  };
  const [outputMapping, setOutputMapping] = useState<OutputMappingEntity[]>([]);
  const [outputMappingUpdate, setOutputMappingUpdate] = useState<OutputMappingEntity>(initOutputMappingEntity);
  const [isUpdateOutputMapping, setIsUpdateOutputMapping] = useState(false);

  const onCancel = () => {
    closeFormAddQuery();
    resetFields();

    setQueryParams([]);
    setOutputMapping([]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const isDuplicate = queryState.queries.some(e => e.name === values.name);

        if (isDuplicate) {
          NotificationError('Th???t b???i', 'C??u l???nh ???? t???n t???i');
        } else {
          const params = { ...values, params: queryParams, outputs: outputMapping };
          createQuery(params);
          NotificationSuccess('Th??nh c??ng', 'T???o m???i c??u l???nh th??nh c??ng');
          onCancel();
        }
      }
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (queryState.queries.filter(e => e.name !== queryState.queryEdit?.name).some(e => e.name === values.name)) {
          NotificationError('Th???t b???i', 'C??u l???nh ???? t???n t???i');
        } else {
          const params: QueryEntity = {
            ...values,
            params: queryParams,
            outputs: outputMapping,
          };
          NotificationSuccess('Th??nh c??ng', 'C???p nh???t c??u l???nh th??nh c??ng');

          saveEditQuery(params);
          onCancel();
        }
      }
    });
  };

  function handleChangeDataSource(value: any) {
    setDataSource(value);
    dataSourceState.DataSourceConfigs.map(e => {
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

  // query params

  const onClickParamsInput = () => {
    setOpenCreateParamsInput(true);

    // reset update
    setIsUpdateQueryParam(false);
    setQueryParamUpdate(initQueryParamEntity);
  };

  const closeParamsInput = () => {
    setOpenCreateParamsInput(false);

    // reset update
    setIsUpdateQueryParam(false);
    setQueryParamUpdate(initQueryParamEntity);
  };

  const createQueryParams = (param: QueryParamEntity) => {
    setQueryParams([...queryParams, param]);
    closeParamsInput();
    NotificationSuccess('Th??nh c??ng', 'T???o m???i tham s??? ?????u v??o th??nh c??ng');
  };

  const handleDeleteQueryParam = (name: string) => {
    Modal.confirm({
      content: 'B???n c?? x??c nh???n mu???n x??a?',
      onOk() {
        const newArr = queryParams.filter(e => e.name !== name);
        setQueryParams(newArr);
        NotificationSuccess('Th??nh c??ng', 'X??a tham s??? ?????u v??o th??nh c??ng ');
      },
      onCancel() {},
    });
  };

  const openFormUpdateQueryParam = (param: QueryParamEntity) => {
    setQueryParamUpdate(param);
    setIsUpdateQueryParam(true);
    setOpenCreateParamsInput(true);
  };

  const handleUpdateQueryParam = (param: QueryParamEntity) => {
    const newArr = queryParams.map(e => {
      if (e.name === param.name) {
        e = { ...param };
        return e;
      }
      return e;
    });

    setQueryParams(newArr);
    closeParamsInput();
    NotificationSuccess('Th??nh c???ng', 'C???p nh???t s??? ?????u v??o th??nh c??ng ');
  };

  //outputMapping

  const onClickParamsOutput = () => {
    setOpenCreateParamsOutput(true);
  };

  const closeParamsOutput = () => {
    setOpenCreateParamsOutput(false);
  };

  const createOutputMapping = (param: OutputMappingEntity) => {
    setOutputMapping([...outputMapping, param]);
    closeParamsOutput();
    NotificationSuccess('Th??nh c???ng', 'T???o m???i tham s??? ?????u ra th??nh c??ng');
  };

  const handleDeleteOutputMapping = (name: string) => {
    Modal.confirm({
      content: 'B???n c?? x??c nh???n mu???n x??a?',
      onOk() {
        const newArr = outputMapping.filter(e => e.name !== name);
        setOutputMapping(newArr);
        NotificationSuccess('Th??nh c???ng', 'X??a tham s??? ?????u ra th??nh c??ng ');
      },
      onCancel() {},
    });
  };

  const openFormUpdateOutputMapping = (param: OutputMappingEntity) => {
    setOutputMappingUpdate(param);
    setIsUpdateOutputMapping(true);
    setOpenCreateParamsOutput(true);
  };

  const handleUpdateOutputMapping = (param: OutputMappingEntity) => {
    const newArr = outputMapping.map(e => {
      if (e.name === param.name) {
        e = { ...param };
        return e;
      }
      return e;
    });
    setOutputMapping(newArr);
    closeParamsOutput();
  };

  useEffect(() => {
    if (queryState.isUpdate) {
      console.log(queryState.queryEdit);
      setDataSource(queryState.queryEdit?.dataSourceName || dataSourceState.DataSourceConfigs[0]?.name);

      dataSourceState.DataSourceConfigs.map(e => {
        if (e.name === queryState.queryEdit?.dataSourceName) {
          if (
            e.dbType === 'MySQL' ||
            e.dbType === 'Microsoft SQL Server' ||
            e.dbType === 'Oracle' ||
            e.dbType === 'PostgreSQL'
          ) {
            setDbType('RDBMS');
          } else {
            setDbType(e.dbType);
          }
        }
      });

      setQueryParams(queryState.queryEdit?.params || []);
      setOutputMapping(queryState.queryEdit?.outputs || []);
    } else {
      setDataSource(dataSourceState.DataSourceConfigs[0]?.name);
      const dbsType = dataSourceState.DataSourceConfigs[0]?.dbType;

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
      setQueryParams([]);
      setOutputMapping([]);
    }
  }, [dataSourceState.DataSourceConfigs, queryState.isUpdate, queryState.queryEdit]);

  // generation
  const generationOutput = () => {
    const query = getFieldValue('query').replace(/(\r\n|\n|\r)/gm, ' ');

    const outputParams = query
      .substring(query.indexOf('t') + 1, query.indexOf('from'))
      .split(',')
      .map((e: string) => e.trim());

    if (query.trim() === '' || outputParams[0].trim() === '') {
      NotificationError('Tham s??? ?????u ra kh??ng t???n t???i', '');
      return false;
    } else {
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
    }
  };

  const generationInput = () => {
    const query = getFieldValue('query').replace(/(\r\n|\n|\r)/gm, ' ');
    let inputParams = [];

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
      NotificationError('Tham s??? ?????u v??o kh??ng t???n t???i', '');
      return false;
    } else {
      console.log(inputParams);

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

      setQueryParams(arrQueryParams);
    }
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
    },
    {
      title: 'Ki???u tham s???',
      dataIndex: 'paramType',
      key: 'paramType',
    },
    {
      title: 'Ki???u d??? li???u',
      dataIndex: 'sqlType',
      key: 'sqlType',
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      key: 'action',
      width: 120,

      render: (text: any, record: QueryParamEntity) => (
        <>
          <Button className="btnIcon" icon="edit" onClick={() => openFormUpdateQueryParam(record)} />

          <Button className="btnIcon" icon="delete" onClick={() => handleDeleteQueryParam(record.name)} />
        </>
      ),
    },
  ];

  const columnsOutputMapping: ColumnProps<OutputMappingEntity>[] = [
    {
      title: 'T??n',
      dataIndex: 'name',
      key: 'name',
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
          <Button size="small" className="btnIcon" icon="eye" onClick={() => openFormUpdateOutputMapping(record)} />

          <Button
            size="small"
            className="btnIcon"
            icon="delete"
            onClick={() => handleDeleteOutputMapping(record.name)}
          />
        </>
      ),
    },
  ];

  return (
    <Wrapper>
      <Modal
        title={queryState.isUpdate ? 'C???p nh???t c??u l???nh' : 'T???o m???i c??u l???nh'}
        onCancel={onCancel}
        width={dbType === 'RDBMS' || dbType === 'MongoDB' ? 1300 : 600}
        visible={queryState.show}
        onOk={queryState.isUpdate ? handleUpdate : handleSubmit}
        footer={
          <div className="footer">
            <Button onClick={onCancel}>H???y</Button>

            {queryState.isUpdate ? (
              <Button type="primary" onClick={handleUpdate}>
                L??u
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                T???o m???i
              </Button>
            )}
          </div>
        }
      >
        <FormStyled {...formItemLayout}>
          <Row gutter={16}>
            <Col span={dbType === 'RDBMS' || dbType === 'MongoDB' ? 12 : 24}>
              <Form.Item label="T??n">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                  initialValue: queryState.queryEdit?.name || '',
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Data Source">
                {getFieldDecorator('dataSourceName', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                  initialValue: dataSource,
                })(
                  <Select onChange={handleChangeDataSource}>
                    {dataSourceState.DataSourceConfigs.map((e, i) => (
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
                      {getFieldDecorator('query', { initialValue: queryState.queryEdit?.query || '' })(
                        <TextArea rows={4} />,
                      )}
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
                      {getFieldDecorator('query', { initialValue: queryState.queryEdit?.query || '' })(
                        <TextArea rows={4} />,
                      )}
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
                  <Button className="button" icon="plus-circle" onClick={onClickParamsInput}>
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
                  dataSource={queryParams}
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
                      rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                      initialValue: queryState.queryEdit?.workbookName || '',
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label="B???t ?????u t??? d??ng">
                    {getFieldDecorator('excelStartingRow', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNumberInput },
                      ],
                      initialValue: queryState.queryEdit?.excelStartingRow || '',
                    })(<Input maxLength={255} />)}
                  </Form.Item>

                  <Form.Item label="S??? d??ng ?????c">
                    {getFieldDecorator('excelMaxRow', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNumberInput },
                      ],
                      initialValue: queryState.queryEdit?.excelMaxRow || '',
                    })(<Input maxLength={255} />)}
                  </Form.Item>

                  <Form.Item label="C?? Header">
                    {getFieldDecorator('isHeader', {
                      rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                      initialValue: 'true',
                    })(
                      <Select>
                        <Option value="true">C??</Option>
                        <Option value="false">Kh??ng</Option>
                      </Select>,
                    )}
                  </Form.Item>

                  <Form.Item label="D??ng header">
                    {getFieldDecorator('rowHeader', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNumberInput },
                      ],
                    })(<Input maxLength={255} />)}
                  </Form.Item>
                </>
              )}

              {/* Danh s??ch ?????u ra */}
              <Params>
                <p className="title">Danh s??ch tham s??? ?????u ra</p>
                <Button className="button" icon="plus-circle" onClick={onClickParamsOutput}>
                  Th??m tham s???
                </Button>
              </Params>

              <Form.Item label="Grouped by element">
                {getFieldDecorator('groupElement', { initialValue: queryState.queryEdit?.groupElement || '' })(
                  <Input />,
                )}
              </Form.Item>

              <Form.Item label="Row name">
                {getFieldDecorator('rowName', { initialValue: queryState.queryEdit?.rowName || '' })(<Input />)}
              </Form.Item>

              <Table
                rowKey="name"
                className="custom-table"
                locale={{
                  emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
                }}
                columns={columnsOutputMapping}
                dataSource={outputMapping}
                pagination={false}
              />
            </Col>
          </Row>
        </FormStyled>
      </Modal>

      <FormCreateParamsInput
        visible={openCreateParamsInput}
        onClose={closeParamsInput}
        createQueryParams={createQueryParams}
        queryParamUpdate={queryParamUpdate}
        isUpdate={isUpdateQueryParam}
        updateQueryParams={handleUpdateQueryParam}
        listParamsInput={queryParams}
      />
      <FormCreateParamsOutput
        visible={openCreateParamsOutput}
        onClose={closeParamsOutput}
        createOutputMapping={createOutputMapping}
        outputMappingUpdate={outputMappingUpdate}
        isUpdate={isUpdateOutputMapping}
        handleUpdateOutputMapping={handleUpdateOutputMapping}
        listOutputMapping={outputMapping}
      />
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(FormCreateNewQuery));

const Wrapper = styled.div`
  color: #232323;
  .btnIcon {
    margin: 0px 4px;
  }
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
