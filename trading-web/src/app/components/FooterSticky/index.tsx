import { Container, SupportSection } from './style';
import IconSvg from 'app/assets/img/icon';
import { useTranslation } from 'react-i18next';

const FooterSticky = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <div>
        <IconSvg name="connect" className="connect-icon" />
        <span className="connect-title">{t('connection')}</span>
      </div>
      <SupportSection>
        <div className="d-flex download-section">
          <IconSvg name="download" className="download-icon" />
          <span className="download-title">{t('download')}</span>
        </div>
        <div className="d-flex online-section">
          <IconSvg name="docs" className="docs-icon" />
          <span className="docs-title">{t('online-support')}</span>
        </div>
      </SupportSection>
    </Container>
  );
};
export default FooterSticky;
