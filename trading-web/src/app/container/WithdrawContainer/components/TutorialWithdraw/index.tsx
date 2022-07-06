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
const TutorialWithdraw = () => {
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
                      {t('initiate-a-withdrawal')}
                    </div>
                    <div data-bn-type="text" className="text-content--desc">
                      {t('withdrawal-step1-sub')}
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
                      {t('withdrawal-step2')}
                    </div>
                    <div data-bn-type="text" className="text-content--desc">
                      {t('withdrawal-step2-sub')}
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
                      {t('withdrawal-step3-sub')}
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
                      {t('withdrawal-step4')}
                    </div>
                    <div data-bn-type="text" className="text-content--desc">
                      {t('withdrawal-step4')}
                    </div>
                  </div>
                </div>
              </BnStepsStepLast>
            </IllustrativeContent>
            <div data-bn-type="text" className="content-desc">
              {t('click-to-withdraw-bank')}
            </div>
          </MainContent>
        </div>
      </StyledAlert>
    );
  } else {
    return null;
  }
};
export default TutorialWithdraw;
