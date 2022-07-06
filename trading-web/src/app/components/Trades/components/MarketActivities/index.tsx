import {
  Container,
  Head,
  ExtendButton,
  ContentContainer,
  Content,
  A,
} from './style';
import OpenIcon from 'app/assets/img/MarketActivities';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MarketActivities = () => {
  const { t } = useTranslation();
  const [extend, setExtend] = useState(false);
  return (
    <Container>
      <Head>
        {t('market-activities')}
        <ExtendButton extend={extend} onClick={() => setExtend(!extend)}>
          <OpenIcon name="detail" className="extend-icon" />
        </ExtendButton>
      </Head>
      <ContentContainer>
        <Content>
          <A href="/#" target="_blank">
            <div className="a-infor">
              <div className="css-qt6vj7">
                <span className="css-1iqe90x">{t('auto')}</span>
                /BTC
              </div>
              <div className="a-time">13:00:08</div>
            </div>
            <div className="a-rate">
              <div className="a-rate--percent">+9.52%</div>
              <div title="New 24h Low" className="a-rate--timeRange">
                New 24h Low
              </div>
            </div>
            <div className="a-symbol">
              <div className="a-symbol--container">
                <div className="a-symbol--background"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 16"
                  fill="none"
                  className="a-symbol--svg"
                >
                  <path
                    d="M19.465 6v2.5L16 11l-3.465-2.5V6L16 8.5 19.465 6zM10.02 9.636H3V7.364h7.02v2.272zm18.98 0h-7.02V7.364H29v2.272z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </A>
          <A href="/#" target="_blank">
            <div className="a-infor">
              <div className="css-qt6vj7">
                <span className="css-1iqe90x">{t('auto')}</span>
                /BTC
              </div>
              <div className="a-time">13:00:08</div>
            </div>
            <div className="a-rate">
              <div className="a-rate--percent">+9.52%</div>
              <div title="New 24h Low" className="a-rate--timeRange">
                New 24h Low
              </div>
            </div>
            <div className="a-symbol">
              <div className="a-symbol--container">
                <div className="a-symbol--background"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 16"
                  fill="none"
                  className="a-symbol--svg"
                >
                  <path
                    d="M15.077 4.308h4.615v4.615l-1.846-1.846-5.077 5.077-.923-.923 5.077-5.077-1.846-1.846z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </A>
        </Content>
      </ContentContainer>
    </Container>
  );
};
export default MarketActivities;
