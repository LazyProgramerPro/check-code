import React from 'react';
import { AiOutlineFileUnknown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function HelpGuide() {
  return (
    <WrapperLink to={'#'}>
      <AiOutlineFileUnknown className="HelpGuide-icon" /> Help & Guide
    </WrapperLink>
  );
}

export default HelpGuide;

const WrapperLink = styled(Link)`
  text-decoration: none;
  margin-top: 15px;
  display: inline-block;
  height: 32px;
  color: ${({ theme }) => theme.p2pText};

  HelpGuide-icon {
    font-size: 18px;
    margin-right: 6px;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
