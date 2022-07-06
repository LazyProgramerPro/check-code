import { StyledContainer, StyledHeader } from './style';
import { useTranslation } from 'react-i18next';
import IconSvg from 'app/assets/img/icon';
import { useState } from 'react';
const RecentWithdrawals = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = index => {
    setActiveTab(index);
  };
  return (
    <StyledContainer>
      <div>
        <div className="wrapper-header">
          <StyledHeader>
            <div className="header-left">
              <div className="header-left--title">{t('recent-withdrawal')}</div>
              <div className="header-left--tabs">
                <div className="header-tab">
                  <div
                    className="header-tab--icon"
                    onClick={() => handleTabChange(0)}
                  >
                    <IconSvg
                      name="menuFold"
                      className={activeTab === 0 ? 'icon-active' : ''}
                    />
                  </div>
                  <div className="header-tab--compartment"></div>
                  <div
                    className="header-tab--icon"
                    onClick={() => handleTabChange(1)}
                  >
                    <IconSvg
                      name="menuUnfold"
                      className={activeTab === 1 ? 'icon-active' : ''}
                    />
                  </div>
                </div>
              </div>
            </div>
            <a href="/#" target="_blank" className="header-right">
              {t('why-withdrawal-not-arrived')}
            </a>
          </StyledHeader>
        </div>
      </div>
    </StyledContainer>
  );
};
export default RecentWithdrawals;
