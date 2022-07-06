import React from 'react';
import styled from 'styled-components';
import TableTaskList from './components/TableTaskList';

export default function TaskRunPeriodically() {

  document.title = 'Tác vụ chạy định kỳ';

  return (
    <Wrapper>
      <TableTaskList />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
