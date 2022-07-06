import {SafetyOutlined} from '@ant-design/icons'
import {Form} from 'antd'
import {Field} from 'formik'
import React from 'react'
import MyCheckbox from 'src/components/customField/Checkbox'
import InputField from 'src/components/customField/Input'
import {EEnvironmentType, IProductionEndpoint} from '../models'

interface IEndpointEnvConfig  {
  values: any,
  onShowModalSecurityConfig: (type: EEnvironmentType, endpointEnv: IProductionEndpoint) => void
}
const EndpointEnvConfig = (props: IEndpointEnvConfig) => {
  console.log("props======================", props);
  const {values, onShowModalSecurityConfig} = props;

  return (
    <div className="config-endpoint-environment-box">
      <div className="config-product-endpoint-env">
        <Form.Item >
          <Field
            name="isProdEndpoint"
            label="Endpoint cho môi trường production"
            // className="group-area"
            component={MyCheckbox}
            formItem={false}
          />
          <Field
            name="productionEndpoints[0].url"
            component={InputField}
            formItem={false}
            suffix={<SafetyOutlined onClick={() => onShowModalSecurityConfig(EEnvironmentType.PROD, values.productionEndpoints[0])} style={{ color: 'rgba(0,0,0,.45)', fontSize: '18px' }} />}
          />
        </Form.Item>
      </div>
      <div className="config-testing-endpoint-env">
        <Form.Item >
          <Field
            name="isSanboxEndpoint"
            label="Endpoint cho môi trường test"
            component={MyCheckbox}
            formItem={false}
          // className="group-area"
          />
          <Field
            name="sandboxEndpoints[0].url"
            component={InputField}
            formItem={false}
            suffix={<SafetyOutlined onClick={() => onShowModalSecurityConfig(EEnvironmentType.TEST, values.sandboxEndpoints[0])}  style={{ color: 'rgba(0,0,0,.45)', fontSize: '18px' }} />}
          />
        </Form.Item>

      </div>
    </div>
  )
}

export default EndpointEnvConfig
