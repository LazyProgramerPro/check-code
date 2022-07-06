import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { type } from 'os';
import Loading from 'src/components/Loading';
interface IProps {
  groupApiDetailData: IRestApiObject | null;
}

const GroupApiSteps = (props: IProps) => {
  const { groupApiDetailData } = props;
  const { Step } = Steps;
  const [stepCurrent, setStepCurrent] = useState(0);

  const [develop, setDevelop] = useState<'wait' | 'finish' | 'process' | 'error' | undefined>('process');
  const [deplop, setDeplop] = useState<'wait' | 'finish' | 'process' | 'error' | undefined>('wait');
  const [test, setTest] = useState<'wait' | 'finish' | 'process' | 'error' | undefined>('wait');
  const [publish, setPublish] = useState<'wait' | 'finish' | 'process' | 'error' | undefined>('wait');
  const [textPublished, setTextPublished] = useState('Đợi phê duyệt');
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const renderIconByStatus = (type: any) => {
    let icon = null;
    if (type) {
      icon = <CheckCircleTwoTone className="icon-item" twoToneColor="#52c41a" />;
    } else {
      icon = <CloseCircleOutlined className="icon-wait icon-item" />;
    }
    return icon;
  };

  const check = (endpointConfig: any, businessInformation: any) => {
    let changeIcon = null;
    if (endpointConfig || businessInformation) {
      changeIcon = <CheckCircleTwoTone className="icon-finish icon-item" twoToneColor="#52c41a" />;
    } else {
      changeIcon = <CloseCircleOutlined className="icon-wait icon-item" />;
    }
    return changeIcon;
  };
  // const colorStep = (type: any) => {
  //   let stepColor = null;
  //   if (type) {
  //     stepColor = <CheckCircleTwoTone className="ant-steps-item-icon" color="#52c41a" />;
  //   } else {
  //     stepColor = <CloseCircleOutlined className="icon-wait icon-item" />;
  //   }
  //   return stepColor;
  // };
  const ViewStep = styled.div`
    .ant-steps-icon {
      display: none;
    }
    .ant-steps-item-finish {
      .ant-steps-item-icon {
        background-color: #09be26;
      }
    }
    .text {
      font-size: 14px;
      line-height: 20px;
      color: #232323;
    }
    .ant-steps-item-process {
      .ant-steps-item-icon {
        background-color: #0988be;
      }
    }
    .ant-steps-item-wait .ant-steps-item-icon {
      background-color: #b4b4b4;
    }
    .ant-steps-item-error .ant-steps-item-icon {
      background-color: #f5222d;
    }
  `;
  useEffect(() => {
    switch (groupApiDetailData?.status) {
      //Step phát triển mới xong một option
      case 'CREATED':
        setStepCurrent(0);
        setDevelop('finish');
        setDeplop('process');
        setTest('wait');
        setPublish('wait');
        setTextPublished('Đợi phê duyệt');
        break;

      //Step triển khai done thì Step kiểm thử mặc định done và Step đợi phê duyệt sẵn sàng
      case 'DEPLOYED':
        setStepCurrent(3);
        setDevelop('finish');
        setDeplop('finish');
        setTest('finish');
        setPublish('process');
        setTextPublished('Đợi phê duyệt');
        break;

      //Chuyển sang màn cần phê duyệt có 2 thêm 2 option làm thay đổi trạng thái
      //Công khai: Step phê duyệt chuyển sang Đã phê duyệt
      case 'PUBLISHED':
        setStepCurrent(3);
        setDevelop('finish');
        setDeplop('finish');
        setTest('finish');
        setPublish('finish');
        setTextPublished('Đã công khai');
        break;
      // Từ chối: Step phê duyệt chuyển sang Từ chối công khai
      case 'REFUSED':
        setStepCurrent(3);
        setDevelop('finish');
        setDeplop('finish');
        setTest('finish');
        setPublish('error');
        setTextPublished('Từ chối công khai');
        break;
    }
  }, [groupApiDetailData]);

  return (
    <ViewStep>
      <div className="steps-contaner mt-4">
        <Steps current={stepCurrent}>
          <Step
            status={develop}
            title="Develop"
            description={
              <div className="custom-description">
                <div className="develop flex items-center">
                  {check(groupApiDetailData?.endpointConfig, groupApiDetailData?.businessInformation)}
                  {/* <CheckCircleTwoTone className="icon-finish icon-item" twoToneColor="#52c41a" /> */}
                  <span className="name text">Phát triển</span>
                </div>
                <div className="endpoint flex items-center">
                  {renderIconByStatus(groupApiDetailData?.endpointConfig)}

                  <Link to={`/manager-infor/group-api-config/${apiId}/endpoint`} className="name active-link">
                    Endpoint
                  </Link>
                </div>
                <div className="business-plan flex items-center">
                  {renderIconByStatus(groupApiDetailData?.businessInformation)}
                  <Link className="name active-link" to={`/manager-infor/group-api-config/${apiId}/business-plan`}>
                    Giới hạn truy cập
                  </Link>
                </div>
              </div>
            }
          />
          <Step
            status={deplop}
            title="Deploy"
            description={
              <div className="custom-description">
                <div className="implement flex items-center">
                  {renderIconByStatus(stepCurrent > 1 ? true : false)}
                  <Link
                    to={`/manager-infor/group-api-config/${apiId}/implementation`}
                    className={`name ${stepCurrent ? 'active-link' : 'inactive-link'}`}
                  >
                    Triển khai
                  </Link>
                </div>
              </div>
            }
          />
          <Step
            status={test}
            title="Test"
            description={
              <div className="custom-description">
                <div className="testing flex items-center">
                  {renderIconByStatus(stepCurrent > 1 ? true : false)}
                  <Link to={`/manager-infor/group-api-config/${apiId}/testing`} className="name">
                    {' '}
                    Kiểm thử{' '}
                  </Link>
                </div>
              </div>
            }
          />
          <Step
            title="Publish"
            status={publish}
            description={
              <div className="custom-description">
                <div className="approve flex items-center">
                  {/* {renderIconByStatus(stepCurrent > 2 ? true : false)} */}
                  {textPublished}
                </div>
              </div>
            }
          />
        </Steps>
      </div>
      {props.groupApiDetailData?.loading ? <Loading /> : null}
    </ViewStep>
  );
};

export default GroupApiSteps;
