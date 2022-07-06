import { Steps } from 'antd';
import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import HelpGuide from './components/HelpGuide';
import PostAdTitle from './components/PostAdTitle';
import StepRemarksAndResponse from './components/StepRemarksAndResponse';
import StepTotalAndPayment from './components/StepTotalAndPayment';
import StepTypeAndPrice from './components/StepTypeAndPrice';
import { selectPostAdP2P } from './slice/selectors';
import { PostAdP2PState } from './slice/types';

const { Step } = Steps;

const steps = [
  {
    title: 'Set Type & Price',
    content: <StepTypeAndPrice />,
  },
  {
    title: 'Set Total Amount & Payment Method',
    content: <StepTotalAndPayment />,
  },
  {
    title: 'Set Remarks & Automatic Response',
    content: <StepRemarksAndResponse />,
  },
];

function PostAdP2PContainer() {
  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);
  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey="none" />
      <PostAdTitle />
      <div className="container container-steps-content mt-3">
        <Steps current={PostAdP2PState.currentStep - 1} size="small">
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">
          {steps[PostAdP2PState.currentStep - 1].content}
        </div>

        <HelpGuide />
      </div>
    </Wrapper>
  );
}

export default PostAdP2PContainer;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.p2pGrayLight};

  .container-steps-content {
    margin-bottom: 80px;
    min-height: 70vh;
  }

  .steps-content {
    margin-top: 16px;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: ${({ theme }) => theme.primary};

    .ant-steps-icon {
      color: ${({ theme }) => theme.primary};
      top: -3px;
    }
  }

  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
    background: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: ${({ theme }) => theme.primary};
    height: 3px;
  }
`;
