import React from 'react';
import { CoverModal, CoverPage, Row } from './styled';
import { Spin } from 'antd';

interface TransferProps {
  type?: any;
  style?: any;
}

const Loading = ({ type = 'fullpage', style = {} }: TransferProps) => {
  if (type === 'inline') {
    return (
      <Row style={{ background: '#ffffff', opacity: 0.5 }}>
        <Spin />
      </Row>
    );
  }

  if (type === 'modal') {
    return (
      <CoverModal style={{ background: '#ffffff', opacity: 0.5, position: 'absolute' }}>
        <Spin />
      </CoverModal>
    );
  }

  return (
    <CoverPage style={{ background: '#ffffff', opacity: 0.5, position: 'fixed' }}>
      <Spin />
    </CoverPage>
  );
};

export default Loading;
