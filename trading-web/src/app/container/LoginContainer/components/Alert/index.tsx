import styled from 'styled-components';
import IconSvg from 'app/assets/img/icon';
import { useTranslation } from 'react-i18next';
const Alert = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <IconSvg name="lock" className="icon" />
      <div className="title">{t('url-verification')}:</div>
      <div className="linkUrl">
        <span className="linkUrl-special">https://</span>accounts.ByteBuffer.com
      </div>
    </Container>
  );
};
export default Alert;
export const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.earthBrownColor};
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 8px;
  .icon {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    color: ${({ theme }) => theme.brightGreenColor};
    width: 24px;
    height: 24px;
    font-size: 24px;
    fill: ${({ theme }) => theme.brightGreenColor};
    width: 1em;
    height: 1em;
    margin-right: 4px;
  }
  .title {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    margin-right: 4px;
  }
  .linkUrl {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    &-special {
      color: ${({ theme }) => theme.brightGreenColor};
    }
  }
`;
