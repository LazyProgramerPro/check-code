import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, EmailSection, PasswordSection, ErrorMessage } from './style';
import ShowIcon from 'app/assets/img/showpassIcon';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginSlice } from '../../slice';
import { selectLogin } from '../../slice/selectors';
import { useTranslation } from 'react-i18next';

//declare type
type UserSubmitFormLogin = {
  email: string;
  password: string;
};

const LoginByEmail = ({ emailLogin }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { actions } = useLoginSlice();
  const dataLogin: any = useSelector(selectLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptcha_response, setRecaptcha] = useState('');
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
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitFormLogin>({
    resolver: yupResolver(validation),
  });
  // submit form
  const onSubmitLogin = (data: UserSubmitFormLogin) => {
    emailLogin(data.email);
    dispatch(actions.loginRequest({ ...data, recaptcha_response }));
  };
  useEffect(() => {
    if (dataLogin.reloadrecaptcha) {
      recaptchaRef.current?.reset();
    }
  }, [dataLogin]);
  return (
    <Form onSubmit={handleSubmit(onSubmitLogin)}>
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
      </div>
      <ReCAPTCHA
        sitekey="6Lfky_MdAAAAAGwcXnFNnyevydcnpT6-mKyOTNzC"
        onChange={value => setRecaptcha(value)}
        ref={recaptchaRef}
        onExpired={() => {
          recaptchaRef.current.reset(); // reset captcha
        }}
      />
      <button id="submit" type="submit">
        {t('login')}
      </button>
    </Form>
  );
};
export default LoginByEmail;
