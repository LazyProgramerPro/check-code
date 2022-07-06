import styled from 'styled-components';

const Panel = styled.section`
  background-color: #fff;
`

const PanelHeader = styled.header`
  background-color: #F4F4F4;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const PanelContent = styled.div`
  padding: 10px 20px 30px 20px;
`

const H3 = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`

const H4 = styled.h4`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

export { Panel, PanelHeader, PanelContent, H3, H4 }