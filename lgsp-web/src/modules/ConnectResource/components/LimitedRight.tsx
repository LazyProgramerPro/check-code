import React, { useState } from 'react';
import { Form, Input, Radio } from 'antd';
import styled from 'styled-components';

const ViewLimited = styled.div`
  margin-top: -30px;
`;
export default function LimitedRight() {
  const [click, setclick] = useState('3');
  const onChange = (e: any) => {
    setclick(e.target.value);
  };
  return (
    <ViewLimited>
      <Form.Item>
        <p style={{ marginBottom: '27px' }}>Giới hạn quyền</p>
        <div style={{ marginTop: '-20px' }}>
          <Radio.Group onChange={onChange} value={click}>
            <Radio value={'3'}>Không</Radio>
            <Radio value={'4'}>Cho phép</Radio>
            <Radio value={'5'}>Không cho phép</Radio>
          </Radio.Group>
        </div>
      </Form.Item>
      <Form.Item>
        {click === '4' && (
          <>
            <Form.Item label="Vai trò">
              <Input />
            </Form.Item>
          </>
        )}
        {click === '5' && (
          <>
            <Form.Item label="Vai trò">
              <Input />
            </Form.Item>
          </>
        )}
      </Form.Item>
    </ViewLimited>
  );
}
