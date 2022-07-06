import { StyledContainer, DescSection, FAQSection } from './style';
import { useTranslation } from 'react-i18next';
import IconSvg from 'app/assets/img/icon';
export const RightBar = () => {
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <DescSection>
        <div className="desc-header">
          <div className="desc-header--title">
            {t('deposit-hasnot-arrived')}
          </div>
          <a href="/#" target="_blank" className="desc-header--link">
            {t('learn-more')}
          </a>
        </div>
        <div className="desc-content">
          {t('deposit-hasnot-arrived-desc')}
          <ul>
            <li>{t('deposit-hasnot-arrived-subdesc1')}</li>
            <li>{t('deposit-hasnot-arrived-subdesc2')}</li>
            <li>{t('deposit-hasnot-arrived-subdesc3')}</li>
          </ul>
        </div>
        <button data-bn-type="button" className="desc-search-button">
          {t('search')}
          <IconSvg name="nextArrow" />
        </button>
      </DescSection>
      <FAQSection>
        <div className="FAQ-header">
          <div className="FAQ-header--title">{t('FAQ')}</div>
        </div>
        <div className="FAQ-content">
          <a href="/#" target="_blank" className="FAQ-link">
            <div className="FAQ-link--icon">
              <IconSvg name="play" />
            </div>
            <div>{t('video-tutorial')}</div>
          </a>
          <a href="/#" target="_blank" className="FAQ-link">
            <div className="FAQ-link--icon">
              <IconSvg name="documents" />
            </div>
            <div>{t('how-to-deposit')}</div>
          </a>
          <a href="/#" target="_blank" className="FAQ-link">
            <div className="FAQ-link--icon">
              <IconSvg name="documents" />
            </div>
            <div>{t('why-my-deposit-not-been-credited')}</div>
          </a>
          <a href="/#" target="_blank" className="FAQ-link">
            <div className="FAQ-link--icon">
              <IconSvg name="documents" />
            </div>
            <div>{t('how-to-retrieve-crypto-deposit')}</div>
          </a>
          <a href="/#" target="_blank" className="FAQ-link">
            <div className="FAQ-link--icon">
              <IconSvg name="documents" />
            </div>
            <div>{t('how-to-buy-cryto')}</div>
          </a>
          <a href="/#" target="_blank" className="FAQ-link">
            <div className="FAQ-link--icon">
              <IconSvg name="documents" />
            </div>
            <div>{t('deposit-and-withdrawal-status-query')}</div>
          </a>
        </div>
      </FAQSection>
    </StyledContainer>
  );
};
export default RightBar;
