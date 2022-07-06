import styled from 'styled-components';
import React from 'react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 375px;
  background-color: #fff;
  height: 100%;
  padding: 10px 20px 30px 20px;
  width: 100%;
`;

export const H3 = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`

export const H4 = styled.h4`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

export const Heading = styled(H4)`
  padding-bottom: 10px;
`;

export const Fullname = styled(H3)`
  margin-bottom: 3px;
`;

export const ImageBox = styled(props => <div {...props} />)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
  width: 80%;
  max-width: 190px;
  padding-bottom: 80%;
  background-image: ${props => "url(" + (props as any).photo + ")"};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;


export const Details = styled.div``;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 18px;
`;

export const InfoTitle = styled.span`
  width: 82px;
  color: #595959;
  font-size: 13px;
`;

export const InfoValue = styled.span`
  flex: 1;
  color: #595959;
  font-size: 13px;`;