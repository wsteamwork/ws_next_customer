import React, { FC, useMemo, useContext, useState } from 'react';
import { Grid, FormControl, TextField, FormHelperText } from '@material-ui/core';
import { Formik, FormikActions, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ButtonGlobal from '@/components/ButtonGlobal';
import Link from 'next/link';
import * as Yup from 'yup';
import ButtonGoogle from '../ButtonLogin/ButtonGoogle';
import ButtonFacebook from '../ButtonLogin/ButtonFacebook';
import { RegisterReq } from '@/types/Requests/Account/AccountRequests';
import { registerAccount } from './context';
import { useCookies } from 'react-cookie';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { AxiosErrorCustom } from '@/types/Requests/ResponseTemplate';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  birthday: string;
}

const useValidata = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('book:bookingForm:enterFirstName'))
      .min(2, t('book:bookingForm:min2character'))
      .max(50, t('book:bookingForm:max50character')),
    lastName: Yup.string()
      .required(t('book:bookingForm:enterLastName'))
      .min(2, t('book:bookingForm:min2character'))
      .max(50, t('book:bookingForm:max50character')),
    email: Yup.string()
      .required(t('book:bookingForm:enterEmail'))
      .email(t('book:bookingForm:invalidEmail')),
    phone: Yup.string()
      .required(t('book:bookingForm:enterPhone'))
      .min(10, t('book:bookingForm:beetwen10_11'))
      .max(11, t('book:bookingForm:beetwen10_11'))
      .test('checkNaN', t('book:bookingForm:notSymbol'), (value) => !isNaN(value)),
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Tối thiểu 6 ký tự')
      .max(50, 'Tối đa 50 ký tự'),
    password_confirmation: Yup.string()
      .required('Vui lòng xác nhận lại mật khẩu')
      .min(6, 'Tối thiểu 6 ký tự')
      .max(50, 'Tối đa 50 ký tự')
      .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
    birthday: Yup.date().required('Vui lòng nhập ngày sinh')
  });

  return FormValidationSchema;
};

const FormSignup: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['_token']);
  const [error, setError] = useState('');
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const FormValidationSchema = useValidata();
  const handleSubmitForm = async (values: MyFormValues, actions: FormikActions<MyFormValues>) => {
    const body: RegisterReq = {
      name: `${values.firstName} ${values.lastName}`,
      gender: 1,
      phone: values.phone,
      email: values.email,
      birthday: values.birthday,
      password: values.password,
      password_confirmation: values.password_confirmation
    };

    try {
      const res = await registerAccount(body);
      setCookie('_token', res.access_token, { maxAge: 2147483647, path: '/' });
      router.back();
      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
      const result: AxiosErrorCustom<{ errors: { email: string[] }; exception: string }> = error;
      if (!!result.response.data.data.errors.email) {
        setError(result.response.data.data.errors.email[0]);
      }
    }
  };

  const formikInit: MyFormValues = useMemo<MyFormValues>(() => {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      birthday: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  }, []);

  const responseFacebook = (userInfo: ReactFacebookLoginInfo) => {};

  return (
    <Grid className="formSignup">
      <Formik
        enableReinitialize={false}
        validateOnChange={false}
        validationSchema={FormValidationSchema}
        initialValues={formikInit}
        onSubmit={handleSubmitForm}
        render={({
          values,
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting
        }: FormikProps<MyFormValues>) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <FormControl error={!!touched.firstName && !!errors.firstName} fullWidth>
                  <TextField
                    variant="outlined"
                    id="firstName"
                    name="firstName"
                    label={t('book:bookingForm:firstName')}
                    placeholder={t('book:bookingForm:placeFirstName')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <FormHelperText>{touched.firstName ? errors.firstName : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormControl error={!!(touched!.lastName && errors.lastName)} fullWidth>
                  <TextField
                    variant="outlined"
                    id="lastName"
                    name="lastName"
                    label={t('book:bookingForm:lastName')}
                    placeholder={t('book:bookingForm:placeLastName')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <FormHelperText>{touched.lastName ? errors.lastName : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl error={!!(errors.phone && touched!.phone)} fullWidth>
                  <TextField
                    variant="outlined"
                    id="phone-number"
                    name="phone"
                    label={t('book:bookingForm:phoneNumber')}
                    placeholder={t('book:bookingForm:placePhone')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <FormHelperText>{touched.phone ? errors.phone : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl error={!!(errors.email && touched.email)} fullWidth>
                  <TextField
                    variant="outlined"
                    id="email-booking"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder={t('book:bookingForm:placeEmail')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <FormHelperText>{touched.email ? errors.email : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl error={!!(errors.birthday && touched.birthday)} fullWidth>
                  <TextField
                    variant="outlined"
                    type="date"
                    name="birthday"
                    label="Ngày sinh"
                    placeholder={t('book:bookingForm:placeEmail')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      values.birthday ||
                      moment()
                        .subtract(15, 'years')
                        .format('yyyy-DD-mm')
                    }
                  />
                  <FormHelperText>{touched.birthday ? errors.birthday : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl error={!!(errors.password && touched.password)} fullWidth>
                  <TextField
                    variant="outlined"
                    // id="email-booking"
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <FormHelperText>{touched.password ? errors.password : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  error={!!(errors.password_confirmation && touched.password_confirmation)}
                  fullWidth>
                  <TextField
                    variant="outlined"
                    // id="email-booking"
                    type="password"
                    name="password_confirmation"
                    label="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                  />
                  <FormHelperText>
                    {touched.password_confirmation ? errors.password_confirmation : ''}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!error}>
                  <ButtonGlobal disabled={isSubmitting} width="100%" type="submit">
                    {!isSubmitting ? (
                      'Submit'
                    ) : (
                      <SimpleLoader height="45px" width="100%"></SimpleLoader>
                    )}
                  </ButtonGlobal>
                  <FormHelperText>{!!error && error}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} container justify="center">
                <FormControl fullWidth>
                  <p className="haveAccount">
                    Bạn đã có tài khoản Westay?{' '}
                    <Link href="/auth/signin">
                      <a>Đăng nhập</a>
                    </Link>
                  </p>
                  <p className="agreeRules">
                    Tôi đồng ý với{' '}
                    <Link href="/terms-and-conditions">
                      <a>Bảo mật</a>
                    </Link>{' '}
                    và{' '}
                    <Link href="/privacy-policy">
                      <a>Chính sách quyền riêng tư</a>
                    </Link>{' '}
                    của Westay.
                  </p>
                </FormControl>
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth>
                    <ButtonGoogle></ButtonGoogle>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth>
                    <FacebookLogin
                      appId="1088597931155576"
                      fields="name,email,picture"
                      callback={responseFacebook}
                      cookie
                      render={(props) => <ButtonFacebook onClick={props.onClick}></ButtonFacebook>}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}></Formik>
    </Grid>
  );
};

export default FormSignup;
