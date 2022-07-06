import React from 'react';
import styled from 'styled-components';
import DataTable from './DataTable';
import SearchBar from './SearchBar';

export default function ContentPage() {
  return (
    <Data>
      {/* <SearchBar /> */}
      <DataTable />
    </Data>
  );
}

const Data = styled.div`
  width: 100%;
`;
