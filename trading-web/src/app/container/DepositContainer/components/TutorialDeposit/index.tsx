import { useState } from 'react';
import {
  StyledAlert,
  MainContent,
  IllustrativeContent,
  BnStepsStepFirst,
  BnStepsStep,
  BnStepsStepLast,
} from './style';
import { useTranslation } from 'react-i18next';
import POWlogo from 'app/assets/img/POW-logo.png';
const TutorialDeposit = () => {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  if (show) {
    return (
      <StyledAlert variant="light" onClose={() => setShow(false)} dismissible>
        <div className="content-wrapper">
          <img src={POWlogo} className="content-avarta" alt="" />
          <MainContent>
            <IllustrativeContent>
              <BnStepsStepFirst>
                <div className="step">
                  <div className="step_marker_row">
                    <span data-bn-type="text" className="css-1p4nx4e">
                      1
                    </span>
                  </div>
                  <div className="text-content">
                    <div data-bn-type="text" className="text-content--title">
                      {t('copy-address')}
                    </div>
                    <div data-bn-type="text" className="text-content--desc">
                      {t('copy-address-sub')}
                    </div>
                  </div>
                </div>
              </BnStepsStepFirst>
              <div data-status-line="finish" className="finish-line"></div>
              <BnStepsStep>
                <div className="step">
                  <div className="step_marker_row">
                    <span data-bn-type="text" className="css-1p4nx4e">
                      2
                    </span>
                  </div>
                  <div className="text-content">
                    <div data-bn-type="text" className="text-content--title">
                      {t('initiate-a-withdrawal')}
                    </div>
                    <div data-bn-type="text" className="text-content--desc">
                      {t('initiate-a-withdrawal-sub')}
                    </div>
                  </div>
                </div>
              </BnStepsStep>
              <div data-status-line="finish" className="finish-line"></div>
              <BnStepsStep>
                <div className="step">
                  <div className="step_marker_row">
                    <span data-bn-type="text" className="css-1p4nx4e">
                      3
                    </span>
                  </div>
                  <div className="text-content">
                    <div data-bn-type="text" className="text-content--title">
                      {t('network-confirmation')}
                    </div>
                    <div data-bn-type="text" className="text-content--desc">
                      {t('network-confirmation-sub')}
                    </div>
                  </div>
                </div>
              </BnStepsStep>
              <div data-status-line="finish" className="finish-line"></div>
              <BnStepsStepLast>
                <div className="step">
                  <div className="step_marker_row">
                    <span data-bn-type="text" className="css-1p4nx4e">
                      4
                    </span>
                  </div>
                  <div className="text-content">
                    <div data-bn-type="text" className="text-content--title">
                      {t('deposit-successful')}
                    </div>
                    <div data-bn-type="text" className="text-content--desc">
                      {t('deposit-successful-sub')}
                    </div>
                  </div>
                </div>
              </BnStepsStepLast>
            </IllustrativeContent>
            <div data-bn-type="text" className="content-desc">
              {t('to-buy-crt')}
            </div>
          </MainContent>
        </div>
      </StyledAlert>
    );
  } else {
    return null;
  }
};
export default TutorialDeposit;
