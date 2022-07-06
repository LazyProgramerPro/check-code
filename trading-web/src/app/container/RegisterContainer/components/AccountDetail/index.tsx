import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ShowIcon from 'app/assets/img/showpassIcon';
import UpDownIcon from 'app/assets/img/UpDownIcon';
import { useState } from 'react';
import {
  Form,
  EmailSection,
  PasswordSection,
  StyledCheckbox,
  RefID,
  ErrorMessage,
} from './style';
import { useDispatch } from 'react-redux';
import { useRegisterSlice } from '../../slice';
import { useTranslation } from 'react-i18next';

//declare type
type UserSubmitFormSignup = {
  email: string;
  password: string;
  referralId: string;
  allowReceiveEmail: boolean;
  allowShareData: boolean;
};

const AccountDetail = ({ emailregis }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { actions } = useRegisterSlice();
  const [showPassword, setShowPassword] = useState(false);
  const [showRef, setShowRef] = useState(false);
  //Validate
  const validation = Yup.object().shape({
    email: Yup.string().required('Invalid email').email('Invalid email'),
    password: Yup.string()
      .required('Invalid password')
      .min(8, 'Password must be at least 8 characters')
      .max(255, 'Password must not exceed 255 characters')
      .matches(
        /(?=.*?[0-9])/,
        'Password should contain at least one digit(0-9)',
      )
      .matches(
        /(?=.*?[A-Z])/,
        'Password should contain at least one uppercase letter(A-Z).',
      )
      .matches(
        /(?=.*?[a-z])/,
        'Password should contain at least one lowercase letter(a-z)',
      )
      .matches(
        /(?=.*?[#?!@$%^&*-])/,
        'Password should contain at least one special character ( @, #, %, &, !, $, etc….).',
      ),
    referralId: Yup.string(),
    allowReceiveEmail: Yup.boolean(),
    allowShareData: Yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitFormSignup>({
    resolver: yupResolver(validation),
  });

  // submit form
  const onSubmitSignup = (Item: UserSubmitFormSignup) => {
    emailregis(Item.email);
    dispatch(actions.registerRequest(Item));
  };
  return (
    <>
      <div className="title">{t('auth.enter-account-details')}</div>
      <div className="subTitle">{t('auth.enter-account-details-subtitle')}</div>
      <div>
        <Form onSubmit={handleSubmit(onSubmitSignup)}>
          <div className="form-input">
            <EmailSection>
              <div>{t('email')}</div>
              <div
                className={
                  errors.email?.message ? 'email-input error' : 'email-input'
                }
              >
                <input autoComplete="off" {...register('email')} />
                {/* <div className="bn-input-suffix">
                  <div className="css-1w8oghj"></div>
                </div> */}
              </div>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </EmailSection>
            <PasswordSection>
              <div>{t('password')}</div>
              <div
                className={
                  errors.password?.message
                    ? 'password-input error'
                    : 'password-input'
                }
              >
                <input
                  autoComplete="off"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                />
                <div className="bn-input-suffix">
                  <div
                    className="icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <ShowIcon
                      name={showPassword ? 'show' : 'unshow'}
                      className="show-password"
                    />
                  </div>
                </div>
              </div>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </PasswordSection>
            <RefID>
              <div className="ref-title" onClick={() => setShowRef(!showRef)}>
                {t('auth.referral-id')}
                <UpDownIcon
                  name={showRef ? 'up' : 'down'}
                  className="updown-icon"
                />
              </div>
              <div>
                <div className={showRef ? 'd-block ref-input' : 'd-none'}>
                  <input autoComplete="off" {...register('referralId')} />
                </div>
              </div>
            </RefID>
            <StyledCheckbox>
              <label htmlFor="receiveEmail" className="labelView">
                <input
                  id="receiveEmail"
                  type="checkbox"
                  {...register('allowReceiveEmail')}
                />
                <span className="checkmark"></span>
                {t('auth.agree-email')}
              </label>
            </StyledCheckbox>
            <StyledCheckbox>
              <label htmlFor="shareData" className="labelView">
                <input
                  id="shareData"
                  type="checkbox"
                  defaultChecked={true}
                  {...register('allowShareData')}
                />
                <span className="checkmark"></span>
                {t('auth.agree-share')}
              </label>
            </StyledCheckbox>
          </div>
          <button id="submit_email" type="submit">
            {t('next')}
          </button>
        </Form>
      </div>
    </>
  );
};
export default AccountDetail;
