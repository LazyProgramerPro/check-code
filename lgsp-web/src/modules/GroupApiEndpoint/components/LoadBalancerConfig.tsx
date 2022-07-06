import { SettingOutlined } from '@ant-design/icons'
import { Col, Form, Row } from 'antd'
import { Field } from 'formik'
import React from 'react'
import SelectField from 'src/components/customField/SelectField'
import {ENPOINT_TYPE, LEVEL_DEPLOYMENT} from 'src/constants/common'

interface ILoadBalancerConfig {
  onShowModalLoadBalancerConfig: () => void;
}
const LoadBalancerConfig = (props: ILoadBalancerConfig) => {
  const {onShowModalLoadBalancerConfig} = props;
  return (
    <div className="load-balancer-config-box">
      <h2 className="title-item mb-4">
        Cấu hình cân bằng tải
      </h2>
      <div className="content-item">
        <Row gutter={16}>
          <Col span={8}>
            <Field
              name="endpointType"
              label="Kiểu endpoint"
              // className="group-area"
              options={LEVEL_DEPLOYMENT}
              component={SelectField}
              formItem={false}
            />
          </Col>
          <Col span={2} className="setting-load-balacer">
            <SettingOutlined onClick={onShowModalLoadBalancerConfig}/>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default LoadBalancerConfig
