import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AuthMandatory = () => {
  const { t } = useTranslation();
  return (
    <span>
      <StyledLink to="/login">{t('log-in')}</StyledLink> {t('or')}&nbsp;
      <StyledLink to="/register">{t('register-now')}&nbsp;</StyledLink>
      {t('to-trade')}
    </span>
  );
};
export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
export default AuthMandatory;
