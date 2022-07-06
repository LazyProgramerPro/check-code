import { Spin } from 'antd';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import TopContent from 'src/components/groupApi/TopContent';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getGroupApiResuorces } from './redux/actions';
import { getGroupApiResourcesService, updateGroupApiResourcesService } from './redux/services';
import { Form, Field, Formik } from 'formik';
import { Button } from 'antd';
import VolumeAccessConfig from './components/VolumeAccessConfig';
import EndpointItem from './components/EndpointItem';
import ResourceEntityList from './components/ResourceEntityList';
import { IGroupApiResourceObject } from './redux/models';
interface IParams {
  groupId: string;
}
const GroupApiResources = () => {
  const dispatch = useAppDispatch();
  const params: IParams = useParams();
  const [loading, setLoading] = useState(false);
  const selectGroupApiResources = useAppSelector(state => state.groupApiResource.data);
  const { lastUpdate, apiId, apiLevel, policy, resourceList } =
    selectGroupApiResources || ({} as IGroupApiResourceObject);
  const pathsRef = useRef<string[]>([]);
  Yup.addMethod(Yup.array, 'unique', function(message, mapper = (a: any) => a) {
    return this.test('unique', message, function(list) {
      return list?.length === new Set(list?.map(mapper)).size;
    });
  });

  const duplicateNameCheck = (list: string[], value: string | undefined, operation: any) => {
    list = list?.filter(Boolean);
    const regExp = /\[([^)]+)\]/;
    const matches = regExp.exec(operation.path);
    if (matches?.length) {
      const pathIndex = +matches[1];
      if (list.length < 2) return true;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === value && i != pathIndex) {
          return false;
        }
      }
    }
    return true;
  };

  const validationSchema = Yup.object({
    resourceList: Yup.array().of(
      Yup.object().shape({
        type: Yup.array()
          .min(1, 'Http method phải có ít nhất 1 item')
          .of(Yup.string().required('Trường này là bắt buộc.')),
        path: Yup.string()
          .required('Trường này không được để trống')
          .matches(/^\//, 'Endpoint phải bắt đầu bằng kí tự /')
          .test('Unique', 'Path needs te be unique', (values: string | undefined, resourceList: any) => {
            return duplicateNameCheck(pathsRef.current, values, resourceList);
          }),
      }),
    ),
  });

  const getData = async (apiId: string) => {
    try {
      setLoading(true);
      const response = await getGroupApiResourcesService({ apiId: apiId });
      if (response.code === 0) {
        dispatch(getGroupApiResuorces(response?.item));
      } else {
        NotificationError('', response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResourceConfig = async (values: any, callback: () => void) => {
    try {
      setLoading(true);
      const updateResourceObject: IGroupApiResourceObject = {
        ...values.volumeConfig,
        resourceList: values.resourceList,
        apiId: values.apiId,
      };
      const response = await updateGroupApiResourcesService(updateResourceObject);
      if (response.code === 0) {
        NotificationSuccess('', 'Cập nhật thông tin cấu hình resource thành công');
      } else {
        NotificationError('', response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      callback();
    }
  };

  const getListPath = (resourceList: any) => {
    pathsRef.current = resourceList?.map((item: any) => {
      return item?.path;
    });
  };

  useEffect(() => {
    getData(params.groupId);
  }, [params.groupId]);

  return (
    <Spin spinning={loading}>
      <div className="group-api-resources-page config-api-content">
        <TopContent title="Resources" time={lastUpdate} />
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={{
            apiId: apiId ?? params.groupId,
            volumeConfig: {
              policy: policy ?? '',
              apiLevel: apiLevel ?? true,
            },
            resourceList:
              resourceList?.length > 0
                ? resourceList
                : [
                    {
                      data: [
                        {
                          type: '',
                          params: [],
                          responses: [],
                        },
                      ],
                      path: '',
                      // description: ''
                    },
                  ],
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const callback = () => {
              setSubmitting(false);
            };
            handleSaveResourceConfig(values, callback);
          }}
        >
          {({ handleSubmit, isSubmitting, values, setFieldValue, ...form }) => {
            getListPath(values.resourceList);
            return (
              <Form onSubmit={handleSubmit} className="flex flex-col address-form">
                <Field name="volumeConfig" label="volumeConfig" component={VolumeAccessConfig} />
                {<Field name="resourceList" label="resourceList" component={EndpointItem} />}

                {<Field name="GroupApiResourceObject" label="GroupApiResourceObject" component={ResourceEntityList} />}

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

export default GroupApiResources;
