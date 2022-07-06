import React, {useState} from 'react';
import { Field, FieldArray, FieldProps } from 'formik';
import {Button, Col, Input, Row} from "antd";
import InputField from 'src/components/customField/Input';
import SelectField from 'src/components/customField/SelectField';
import {  HTTP_METHOD } from 'src/constants/common';
import { IApiEndpointEntity } from '../redux/models';
type IEndpointItem = FieldProps<any>

const EndpointItem = (props: IEndpointItem) => {
  const {  form: { values }, field } = props;
  const resourceList = field.value;

  const [url, setUrl] = useState<string>('');

  return (
    <div className="endpoint-wrapper">
      <FieldArray name="resourceList">
        {arrayHelpers => (
          <div>
            {resourceList.map((operation: any, index: number) => {
              return (
                <React.Fragment key={index} >
                  <Row className="row operation-item" gutter={[16, 16]}>
                    {/*<div className="label-select">Mã URL {index + 1}</div>*/}
                    <Col md={10}>
                      <Field
                        isMulti={true}
                        name={`resourceList.[${index}].data`}
                        options={HTTP_METHOD}
                        component={SelectField}
                        className="custom-select"
                        arrayObject={true}
                        type='type'
                      />
                    </Col>
                    <Col md={10} offset={1}>
                      <Field
                        name={`resourceList.[${index}].path`}
                        label={`ảnh ${index}`}
                        fieldArray={true}
                        component={InputField}
                        value={url}
                        className="input-field"
                        formItem={false}
                        // onChangeText={e => changUrlPattern(e)}
                      />
                    </Col>

                    <Col md={1} className="mr-4">
                      <Button
                        disabled={!(operation?.data?.filter((resource: IApiEndpointEntity) => Boolean(resource.type)).length > 0 && operation?.path)}
                        onClick={() =>
                          arrayHelpers.push({
                              data: [{
                                type: '',
                                params: [],
                                responses: []
                              }],
                              path: ''
                            })
                        }
                        className="btn-add-endpoint"
                      >
                        +
                      </Button>
                    </Col>

                    <Col md={1}>
                      <Button disabled={resourceList.length < 2} onClick={() => arrayHelpers.remove(index)} className="btn-delete-entpoint">
                        x
                      </Button>
                    </Col>
                  </Row>

                </React.Fragment>
              );
            })}
          </div>
        )}
      </FieldArray>
    </div>
  )
}

export default EndpointItem;
