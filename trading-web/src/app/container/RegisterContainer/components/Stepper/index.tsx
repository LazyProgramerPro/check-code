import { Container, Steps, Step } from './style';
import { useTranslation } from 'react-i18next';

interface StepperProps {
  footStep: number;
}
const Stepper = (props: StepperProps) => {
  const { footStep } = props;
  const { t } = useTranslation();
  return (
    <Container>
      <div>
        <Steps>
          <div className="bn-steps-step" data-status="process">
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">1</span>
              </div>
              <div className="step-title">
                {t('auth.enter-account-details')}
              </div>
              <div className="css-vdqias"></div>
            </Step>
          </div>
          <div
            data-status={footStep > 1 ? 'process' : 'wait'}
            className="line"
          ></div>
          <div
            className="bn-steps-step"
            data-status={footStep > 1 ? 'process' : 'wait'}
          >
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">2</span>
              </div>
              <div className="step-title">{t('auth.email-verification')}</div>
              <div className="css-vdqias"></div>
            </Step>
          </div>
          {/* <div
            data-status={footStep > 2 ? 'process' : 'wait'}
            className="line"
          ></div>
          <div
            className="bn-steps-step"
            data-status={footStep > 2 ? 'process' : 'wait'}
          >
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">3</span>
              </div>
              <div className="step-title">Enter Phone Number</div>
              <div className="css-vdqias"></div>
            </Step>
          </div>
          <div
            data-status={footStep > 3 ? 'process' : 'wait'}
            className="line"
          ></div>
          <div
            className="bn-steps-step"
            data-status={footStep > 3 ? 'process' : 'wait'}
          >
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">4</span>
              </div>
              <div className="step-title">Phone Verification</div>
              <div className="css-vdqias"></div>
            </Step>
          </div> */}
        </Steps>
      </div>
    </Container>
  );
};
export default Stepper;
