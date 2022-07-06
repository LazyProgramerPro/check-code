import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AuthButton = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <span>
        <StyledLink to="/login">{t('log-in')}</StyledLink> {t('or')}{' '}
        <StyledLink to="/register">{t('register-now')}</StyledLink>
      </span>
    </Container>
  );
};
export default AuthButton;

export const Container = styled.div`
  margin: 0px;
  min-width: 0px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.backgroundDropdown};
  border-radius: 4px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
