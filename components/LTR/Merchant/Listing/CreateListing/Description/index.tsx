import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useMemo, useContext, SetStateAction, Dispatch } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Formik, FormikActions, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/store/Context/GlobalContext';
import CardTextarea from './CardTextarea';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
interface IProps {
  classes?: any;
  activeStep: number;
  steps: string[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  nextLink: string;
}

interface MyDescription {
  name: string;
  description: string;
  space: string;
  rules: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('details:requiredName'))
      .min(15, t('details:name15Character'))
      .max(100, t('details:name100Character')),
    description: Yup.string()
      .required(t('details:requiredDes'))
      .min(50, t('details:des50Character'))
      .max(500, t('details:des500Character')),
    space: Yup.string().max(1000, t('details:space1000Character')),
    rules: Yup.string().max(500, t('details:rules500Character'))
  });

  return FormValidationSchema;
};

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    normal_divider: {
      margin: theme.spacing(3, 0)
    },
    margin_top: {
      marginTop: theme.spacing(3)
    },
    notchedOutline: {
      border: 'none',
      '&:focus': {
        border: 'none'
      }
    }
  })
);

const Description: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { activeStep, steps, setActiveStep, nextLink } = props;
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const FormValidationSchema = useValidatation();
  const formikInit: MyDescription = useMemo<MyDescription>(() => {
    return {
      name: '',
      description: '',
      space: '',
      rules: ''
    };
  }, []);

  const handleSubmitForm = async (
    values: MyDescription,
    actions: FormikActions<MyDescription>
  ) => {
    const data: any = {
      name: values.name,
      description: values.description,
      space: values.space,
      rules: values.rules
    };

    // try {
    //   const res: AxiosRes<ProfileInfoRes> = await axios.put('profile?include=city,district', data);
    //   getProfile(dispath);
    //   setOpen(true);
    // } catch (error) {}

    // axios
    //   .put('profile', data)
    //   .then((res) => {
    //     actions.setSubmitting(false);
    //   })
    //   .catch((error) => {
    //     actions.setSubmitting(false);
    //   });
  };

  return (
    <Fragment>
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
          isSubmitting,
          validateOnChange
        }: FormikProps<MyDescription>) => (
            <Grid container justify="center" alignContent="center">
              <Grid item xs={12} className="wrapper">
                <CardTextarea
                  name="name"
                  label={t('details:listingName')}
                  sub_label={t('details:subName')}
                  value={values.name.replace(/\s+/g, ' ')}
                  classTextField={
                    !!(values.name.length < 15 && touched!.name && errors.name)
                      ? 'textarea error_textarea'
                      : 'textarea'
                  }
                  show_error={!!(values.name.length < 15 && touched!.name && errors.name)}
                  error_message={errors.name ? errors.name : t('details:defaultError')}
                  rows={1}
                  rowsMax={1}
                  max_char={100}
                  multiline={true}
                  classMaxChar={
                    !!(values.name.length < 15 && touched!.name && errors.name)
                      ? 'error_char'
                      : 'remain_char'
                  }
                  InputProps={{
                    classes: {
                      notchedOutline: !!(values.name.length < 15 && touched!.name && errors.name)
                        ? classes.notchedOutline
                        : ''
                    }
                  }}
                  inputProps={{ maxLength: 100 }}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <Divider className={classes.normal_divider} />

                <CardTextarea
                  name="description"
                  label={t('details:listingDes')}
                  sub_label={t('details:subDes')}
                  value={values.description.replace(/\s+/g, ' ')}
                  classTextField={
                    !!(values.description.length < 50 && touched!.description && errors.description)
                      ? 'textarea error_textarea'
                      : 'textarea'
                  }
                  show_error={
                    !!(values.description.length < 50 && touched!.description && errors.description)
                  }
                  error_message={
                    values.description.length < 50 ? errors.description : t('details:defaultError')
                  }
                  title_tooltips={
                    <Fragment>
                      <Typography color="inherit">{t('details:examples')}</Typography>
                      <Typography color="inherit">{t('details:desExample1')}</Typography>
                      <Typography color="inherit">{t('details:desExample2')}</Typography>
                    </Fragment>
                  }
                  rows={4}
                  rowsMax={9}
                  max_char={500}
                  multiline={true}
                  classMaxChar={
                    !!(values.description.length < 50 && touched!.description && errors.description)
                      ? 'error_char'
                      : 'remain_char'
                  }
                  InputProps={{
                    classes: {
                      notchedOutline: !!(
                        values.description.length < 50 &&
                        touched!.description &&
                        errors.description
                      )
                        ? classes.notchedOutline
                        : ''
                    }
                  }}
                  inputProps={{ maxLength: 500 }}
                  placeholder={width !== 'xl' && width !== 'lg' ? t('details:desExample1') : ''}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <Divider className={classes.normal_divider} />
                <section>
                  <Typography variant="h1" gutterBottom className="label main_label">
                    {t('details:addMoreInfo')}
                  </Typography>
                  <Grid item className="normal_text">
                    <span>{t('details:subAddMore')}</span>
                  </Grid>
                </section>
                <Grid item className={classes.margin_top}>
                  <CardTextarea
                    name="space"
                    label={t('details:listingSpace')}
                    sub_textarea={true}
                    sub_label={t('details:subSpace')}
                    value={values.space}
                    classTextField={
                      !!(touched!.space && errors.space) ? 'textarea error_textarea' : 'textarea'
                    }
                    show_error={!!(touched!.space && errors.space)}
                    error_message={touched.space ? errors.space : t('details:defaultError')}
                    title_tooltips={
                      <Fragment>
                        <Typography color="inherit">{t('details:examples')}</Typography>
                        <Typography color="inherit">{t('details:spaceExample1')}</Typography>
                        <Typography color="inherit">{t('details:spaceExample2')}</Typography>
                        <Typography color="inherit">{t('details:spaceExample3')}</Typography>
                      </Fragment>
                    }
                    rows={4}
                    rowsMax={9}
                    max_char={1000}
                    multiline={true}
                    classMaxChar={!!(touched!.space && errors.space) ? 'error_char' : 'remain_char'}
                    InputProps={{
                      classes: {
                        notchedOutline: !!(touched!.space && errors.space)
                          ? classes.notchedOutline
                          : ''
                      }
                    }}
                    inputProps={{ maxLength: 1000 }}
                    placeholder={
                      width !== 'xl' && width !== 'lg'
                        ? `${t('details:spaceExample1')} \n${t('details:spaceExample2')}`
                        : ''
                    }
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </Grid>

                <Grid item className={classes.margin_top}>
                  <CardTextarea
                    name="rules"
                    label={t('details:listingRules')}
                    sub_textarea={true}
                    sub_label={t('details:subRules')}
                    value={values.rules}
                    classTextField={
                      !!(touched!.rules && errors.rules) ? 'textarea error_textarea' : 'textarea'
                    }
                    show_error={!!(touched!.rules && errors.rules)}
                    error_message={touched.rules ? errors.rules : t('details:defaultError')}
                    title_tooltips={
                      <Fragment>
                        <Typography color="inherit">{t('details:examples')}</Typography>
                        <Typography color="inherit">{t('details:rulesExample1')}</Typography>
                        <Typography color="inherit">{t('details:rulesExample2')}</Typography>
                        <Typography color="inherit">{t('details:rulesExample3')}</Typography>
                      </Fragment>
                    }
                    rows={4}
                    rowsMax={9}
                    max_char={500}
                    multiline={true}
                    classMaxChar={!!(touched!.rules && errors.rules) ? 'error_char' : 'remain_char'}
                    InputProps={{
                      classes: {
                        notchedOutline: !!(touched!.rules && errors.rules)
                          ? classes.notchedOutline
                          : ''
                      }
                    }}
                    inputProps={{ maxLength: 500 }}
                    placeholder={
                      width !== 'xl' && width !== 'lg'
                        ? `${t('details:rulesExample1')} \n${t('details:rulesExample2')}`
                        : ''
                    }
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </Grid>
              </Grid>
              <BottomNavigation
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              nextLink={nextLink}
              handleSubmit={handleSubmit}
            />
            </Grid>
          )}></Formik>
    </Fragment>
  );
};

export default Description;
