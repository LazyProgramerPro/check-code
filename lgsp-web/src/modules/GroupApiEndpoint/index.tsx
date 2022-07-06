import { Spin, Form as FormAntd } from 'antd';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import TopContent from 'src/components/groupApi/TopContent';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Form, Field, Formik, useFormikContext } from 'formik';
import { Button } from 'antd';
import { EEnvironmentType, IGroupApiEndpointObject, IProductionEndpoint } from './models';
import { getGroupApiEndpointService } from './services';
import { EEndpointType, EGroupApiType, EHttpMethod, ETransport } from 'src/models/common';
import MyRadioButton from 'src/components/customField/Radio';
import { GROUP_API_TYPE } from 'src/constants/common';
import InputField from 'src/components/customField/Input';
import MyCheckbox from 'src/components/customField/Checkbox';
import EndpointEnvConfig from './components/EndpointEnvConfig';
import LoadBalancerConfig from './components/LoadBalancerConfig';
interface IParams {
  groupId: string;
}
const GroupApiEndpoint = () => {
  const dispatch = useAppDispatch();
  const params: IParams = useParams();
  const [loading, setLoading] = useState(false);
  const initialValue = {
    enableFailOver: false,
    endpointType: EEndpointType.http,
    lastUpdate: '',
    loadBalancerConfiguration: {},
    productionEndpoints: [],
    productionSecurity: {},
    sandboxEndpoints: [],
    sandboxSecurity: {},
  };
  const [groupApiEndpointData, setGroupApiEndpointData] = useState<IGroupApiEndpointObject>(initialValue);
  // const selectGroupApiResources = useAppSelector((state) => state.groupApiResource.data);

  const validationSchema = Yup.object({
    isSanboxEndpoint: Yup.boolean(),
    isProdEndpoint: Yup.boolean(),
    sandboxEndpoints: Yup.array().when('isSanboxEndpoint', {
      is: true,
      then: Yup.array()
        .of(
          Yup.object().shape({
            url: Yup.string()
              .required('Trường này là bắt buộc.')
              .matches(
                /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                'Địa chỉ endpoint không hợp lệ',
              ),
          }),
        )
        .min(1),
      otherwise: Yup.array().nullable(),
    }),
    productionEndpoints: Yup.array().when('isProdEndpoint', {
      is: true,
      then: Yup.array()
        .of(
          Yup.object().shape({
            url: Yup.string()
              .required('Trường này là bắt buộc.')
              .matches(
                /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                'Địa chỉ endpoint không hợp lệ',
              ),
          }),
        )
        .min(1),
      otherwise: Yup.array().nullable(),
    }),
  });

  const getData = async (groupId: string) => {
    try {
      setLoading(true);
      const response = await getGroupApiEndpointService(groupId);
      if (response.code === 0) {
        setGroupApiEndpointData({
          ...groupApiEndpointData,
          ...response.item,
        });
      } else {
        NotificationError('Thất bại', response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModalSecurityConfig = (type: EEnvironmentType, endpointEnv: IProductionEndpoint) => {};

  const handleShowModalLoadBalancerConfig = () => {};

  useEffect(() => {
    getData(params.groupId);
  }, [params.groupId]);
  return (
    <Spin spinning={loading}>
      <div className="group-api-endpoint-page config-api-content">
        <TopContent title="Endpoints" time={groupApiEndpointData.lastUpdate} />
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={{
            enableFailOver: groupApiEndpointData.enableFailOver,
            endpointType: groupApiEndpointData.endpointType,
            lastUpdate: groupApiEndpointData.lastUpdate,
            loadBalancerConfiguration: groupApiEndpointData.loadBalancerConfiguration,
            productionEndpoints:
              groupApiEndpointData.productionEndpoints.length > 0
                ? groupApiEndpointData.productionEndpoints
                : [{ templateNotSupported: true, url: '' }],
            productionSecurity: groupApiEndpointData.productionSecurity,
            sandboxEndpoints:
              groupApiEndpointData.sandboxEndpoints.length > 0
                ? groupApiEndpointData.sandboxEndpoints
                : [{ templateNotSupported: true, url: '' }],
            sandboxSecurity: groupApiEndpointData.sandboxSecurity,
            isProdEndpoint: true,
            isSanboxEndpoint: true,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const callback = () => {
              setSubmitting(false);
            };
          }}
        >
          {({ handleSubmit, isSubmitting, values, setFieldValue, ...form }) => {
            console.log(values);

            return (
              <Form onSubmit={handleSubmit} className="flex flex-col group-api-endpoint-form">
                {/* <div className="group-api-type-box">
                  <Field
                    name="type"
                    options={GROUP_API_TYPE}
                    component={MyRadioButton}
                    formItem={false}
                  />
                </div> */}
                <EndpointEnvConfig values={values} onShowModalSecurityConfig={handleShowModalSecurityConfig} />
                <LoadBalancerConfig onShowModalLoadBalancerConfig={handleShowModalLoadBalancerConfig} />
                <div className="action-form mt-4">
                  <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                    Lưu
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Spin>
  );
};

export default GroupApiEndpoint;
