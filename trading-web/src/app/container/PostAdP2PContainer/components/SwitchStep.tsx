import { Button } from 'antd';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { usePostAdP2PSlice } from '../slice';
import { selectPostAdP2P } from '../slice/selectors';
import { PostAdP2PState } from '../slice/types';

interface Props {
  next: () => void;

  post: () => void;
}

function SwitchStep(props: Props) {
  const { next, post } = props;

  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();

  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);

  const handlePrevStep = () => {
    dispatch(actions.setCurrentStep(PostAdP2PState.currentStep - 1));
  };

  const handlePost = async () => {
    post();
  };

  return (
    <Wrapper>
      <div className="steps-action">
        <div className="steps-action__buttons container">
          <div>
            {PostAdP2PState.currentStep > 1 && (
              <>
                <span className="reserved">Reserved Fee</span>
                <AiOutlineInfoCircle className="reserved-icon" />
                0.03 USDT
              </>
            )}
          </div>
          <div>
            {PostAdP2PState.currentStep > 1 && (
              <Button
                className="btnPostAd btnPostAd--prev"
                type="link"
                onClick={handlePrevStep}
              >
                Previous
              </Button>
            )}
            {PostAdP2PState.currentStep < 3 && (
              <Button
                className="btnPostAd btnPostAd--next"
                type="link"
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {PostAdP2PState.currentStep === 3 && (
              <Button
                className="btnPostAd btnPostAd--next"
                type="link"
                onClick={handlePost}
              >
                Post
              </Button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SwitchStep;

const Wrapper = styled.div`
  .steps-action {
    margin: 0px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    box-shadow: rgb(0 0 0 / 8%) 0px -1px 2px;
    background-color: ${({ theme }) => theme.p2pBackground};

    &__buttons {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btnPostAd {
        min-width: 60px;
        width: 200px;
        height: 42px;
        font-weight: 500;
        font-size: 14px;

        margin-left: 10px;

        &--next {
          color: ${({ theme }) => theme.p2pTextLight};
          background: ${({ theme }) => theme.primary};

          &:hover {
            opacity: 0.8;
          }
        }

        &--prev {
          color: ${({ theme }) => theme.primary};
          border: 1px solid ${({ theme }) => theme.p2pBorder};

          &:hover {
            border: 1px solid ${({ theme }) => theme.primary};
          }
        }
      }
    }

    .reserved {
      color: ${({ theme }) => theme.p2pGray};
    }

    .reserved-icon {
      font-size: 16px;
      margin: 0px 4px;
    }
  }
`;
