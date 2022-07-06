import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import styled from 'styled-components';
import ContentP2PUserCenter from './components/content';
import HeaderP2PUserCenter from './components/header';

const TabP2PUserCenterContainer = () => {
  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey="" />
      <HeaderP2PUserCenter />
      <ContentP2PUserCenter />
    </Wrapper>
  );
};

export default TabP2PUserCenterContainer;

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};

  min-height: 100vh;
`;
