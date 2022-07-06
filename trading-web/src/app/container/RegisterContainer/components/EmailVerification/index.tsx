import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Title,
  Description,
  SubTitle,
  ResendButton,
  HelpButton,
  Input,
  ConfirmCodeButton,
  ErrorMessage,
} from './style';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useVerifyEmailRegisterSlice } from './slice';
import { useEffect } from 'react';
import { selectVerifyEmailRegister } from './slice/selectors';
import { useTranslation } from 'react-i18next';
//declare type
type UserSubmitForm = {
  code: string;
};
const EmailVerification = ({ email }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();
  const { actions } = useVerifyEmailRegisterSlice();
  const dataRegister: any = useSelector(selectVerifyEmailRegister);
  //Validate
  const validation = Yup.object().shape({
    code: Yup.string()
      .required('Invalid code')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validation),
  });
  // submit form
  const onSubmitVerify = (data: any) => {
    dispatch(actions.registerVerifyEmailRequest({ ...data, email }));
  };
  useEffect(() => {
    if (dataRegister.registerSuccess) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRegister.registerSuccess]);
  return (
    <>
      <Title>{t('auth.email-verification')}</Title>
      <Description>
        <div className="subtitle--content">
          {t('auth.please-enter-the-6digit-code')} &nbsp;
          {email}. {t('auth.the-code-valid')}
        </div>
      </Description>
      <SubTitle>{t('auth.email-verification-code')}</SubTitle>
      <form onSubmit={handleSubmit(onSubmitVerify)}>
        <div>
          <Input
            type="text"
            data-status={errors.code?.message ? 'error' : 'normal'}
            placeholder="Enter your code"
            {...register('code')}
          />
        </div>
        <ErrorMessage>{errors.code?.message}</ErrorMessage>
        <ResendButton type="button">
          <div className="css-1c82c04">{t('auth.resend-email')}&nbsp;</div>
        </ResendButton>
        <HelpButton>
          <div className="text">{t('auth.resend-email-subtitle')}</div>
        </HelpButton>
        <ConfirmCodeButton id="submit_verification" type="submit">
          {t('finish')}
        </ConfirmCodeButton>
      </form>
    </>
  );
};
export default EmailVerification;
