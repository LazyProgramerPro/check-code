import React from 'react';
import styled from 'styled-components';

function PostAdTitle() {
  return (
    <Wrapper>
      <div className="contentPostAd container">Post Normal Ad</div>
    </Wrapper>
  );
}

export default PostAdTitle;
const Wrapper = styled.div`
  height: 72px;
  line-height: 72px;
  background-color: ${({ theme }) => theme.p2pBackground};
  box-shadow: 0px 2px 4px rgb(0 0 0 / 8%), 0px 0px 4px rgb(0 0 0 / 8%);

  .contentPostAd {
    font-size: 24px;
    font-weight: 600;
  }
`;
