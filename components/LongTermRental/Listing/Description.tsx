import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useMemo, useContext } from 'react';
import { Theme, withStyles, makeStyles, Button, FormControl } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { ArrowBackIosRounded } from '@material-ui/icons';
import Link from 'next/link';
import { Formik, FormikActions, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import ErrorNotify from '../ErrorNotify';
import Tooltip from '@material-ui/core/Tooltip';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { TextField } from '@material-ui/core';

interface IProps {
  classes?: any;
}

interface MyDescription {
  name: string;
  description: string;
  space: string;
  note: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Chú ý ! Tên căn hộ là bắt buộc.')
      .min(15, 'Chú ý ! Tên căn hộ tối thiểu là 15 ký tự.')
      .max(100, 'Chú ý ! Tên căn hộ không được vượt quá 50 ký tự.'),
    description: Yup.string()
      .required('Chú ý ! Mô tả ngắn gọn về căn hộ là bắt buộc.')
      .min(50, 'Chú ý ! Mô tả ngắn gọn tối thiểu là 50 ký tự.')
      .max(500, 'Chú ý ! Mô tả ngắn gọn không được vượt quá 500 ký tự.')
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
      border: "none",
      '&:focus': {
        border: "none",
      },
    }
  })
);

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dce0e0',
  },
}))(Tooltip);

const Description: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { width } = useContext(GlobalContext);
  const FormValidationSchema = useValidatation();
  const formikInit: MyDescription = useMemo<MyDescription>(() => {
    return {
      name: '',
      description: '',
      space: '',
      note: ''
    };
  }, []);

  const handleSubmitForm = async (
    values: MyDescription,
    actions: FormikActions<MyDescription>
  ) => {};

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
          isSubmitting
        }: FormikProps<MyDescription>) => (
          <Grid container justify="center" alignContent="center">
            <Grid item xs={11} sm={8} md={6} lg={4} className="wrapper">
              <section>
                <Typography variant="h1" gutterBottom className="label main_label">
                  Tên căn hộ
                </Typography>
                <Grid item className="normal_text">
                  <span>Đặt tên hay sẽ thu hút khách hàng chú ý đến căn hộ của bạn.</span>
                </Grid>
              </section>
              <fieldset className="normal_fieldset">
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    value={values.name.replace(/\s+/g,' ')}
                    className={
                      !!(touched!.name && errors.name)
                        ? 'textarea error_textarea'
                        : 'textarea'
                    }
                    aria-label="minimum height"
                    rows={1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    InputProps={{
                      classes: { notchedOutline: !!(touched!.name && errors.name) ? classes.notchedOutline : '' }
                    }}
                    inputProps={{ maxLength: 100 }}
                  />
                  <ErrorNotify
                    showError={!!(touched!.name && errors.name)}
                    errorMessage={touched.name ? errors.name : 'Có lỗi xảy ra !'}
                  />
                </FormControl>
                <strong>
                  <span className={!!(touched!.name && errors.name) ? 'error_char' : 'remain_char'}>
                    {100 - values.name.length}
                  </span>
                </strong>
              </fieldset>
              <Grid item>
                <Typography className="remain_text">
                  {100 - values.name.length} ký tự còn lại.
                </Typography>
              </Grid>
              <Divider className={classes.normal_divider} />
              <section>
                <Typography variant="h1" gutterBottom className="label main_label">
                  Mô tả về căn hộ của bạn
                </Typography>
                <Grid item className="normal_text">
                  <span>
                    Viết một bản mô tả ngắn gọn giúp khách hàng biết những điểm nổi bật
                    mà chỉ có ở căn hộ của bạn.
                  </span>
                </Grid>
              </section>
              <fieldset className="normal_fieldset">
                <FormControl fullWidth>
                  <HtmlTooltip
                    disableHoverListener={width !== 'xl' && width !== 'lg'}
                    disableFocusListener={width !== 'xl' && width !== 'lg'}
                    disableTouchListener={width !== 'xl' && width !== 'lg'}
                    title={
                      <Fragment>
                        <Typography color="inherit">Ví dụ:</Typography>
                        <Typography color="inherit">
                          - Căn hộ rộng rãi, thoáng mát, mang phong cách cổ điển của Hà Nội
                          xưa
                        </Typography>
                        <Typography color="inherit">
                          - Cách Hồ Gươm 100m, Lăng Bác 300m,...
                        </Typography>
                      </Fragment>
                    }
                    placement="right-start">
                    <TextField
                      name="description"
                      value={values.description.replace(/\s+/g,' ')}
                      className={
                        !!(touched!.description && errors.description)
                          ? 'textarea error_textarea'
                          : 'textarea'
                      }
                      aria-label="minimum height"
                      rows={4}
                      rowsMax={9}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      multiline
                      InputProps={{
                        classes: { notchedOutline: !!(touched!.description && errors.description) ? classes.notchedOutline : '' }
                      }}
                      inputProps={{ maxLength: 500 }}
                      placeholder= {width !== 'xl' && width !== 'lg' ? `Căn hộ rộng rãi, mang phong cách cổ điển của Hà Nội xưa,...`:''}
                    />
                  </HtmlTooltip>
                  <ErrorNotify
                    showError={!!(touched!.description && errors.description)}
                    errorMessage={touched.description ? errors.description : 'Có lỗi xảy ra'}
                  />
                </FormControl>
                <strong>
                  <span
                    className={
                      !!(touched!.description && errors.description) ? 'error_char' : 'remain_char'
                    }>
                    {500 - values.description.length}
                  </span>
                </strong>
              </fieldset>
              <Grid item>
                <Typography className="remain_text">
                  {500 - values.description.length} ký tự còn lại.
                </Typography>
              </Grid>
              <Divider className={classes.normal_divider} />
              <section>
                <Typography variant="h1" gutterBottom className="label main_label">
                  Thêm thông tin căn hộ (tùy chọn)
                </Typography>
                <Grid item className="normal_text">
                  <span>Sử dụng các mục dưới đây để chia sẻ thêm thông tin về căn hộ.</span>
                </Grid>
              </section>
              <Grid item className={classes.margin_top}>
                <Typography variant="h4" gutterBottom className="label sub_label">
                  Không gian căn hộ
                </Typography>
                <Grid item className="normal_text">
                  <span>
                    Viết thêm thông tin như không gian phòng ngủ, phòng khách, khu vực để xe, không
                    gian thư giãn ngoài trời.
                  </span>
                </Grid>
                <HtmlTooltip
                  disableHoverListener={width !== 'xl' && width !== 'lg'}
                  disableFocusListener={width !== 'xl' && width !== 'lg'}
                  disableTouchListener={width !== 'xl' && width !== 'lg'}
                  title={
                    <Fragment>
                      <Typography color="inherit">Ví dụ:</Typography>
                      <Typography color="inherit">
                        - Khu vực để xe an toàn, có thể để được ô tô, xe máy
                      </Typography>
                      <Typography color="inherit">- Phòng khách rộng, có sofa</Typography>
                      <Typography color="inherit">- Có bể bơi miễn phí ngoài trời,...</Typography>
                    </Fragment>
                  }
                  placement="right-start">
                  <TextField
                    className="textarea sub_textarea"
                    aria-label="maximum height"
                    multiline
                    rows={6}
                    rowsMax={9}
                    name="space"
                    value={values.space}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    placeholder= {width !== 'xl' && width !== 'lg' ? `- Khu vực để xe an toàn, có thể để được ô tô, xe máy \n- Phòng khách rộng, có sofa,...`:''}
                    />
                </HtmlTooltip>
              </Grid>
              <Grid item className={classes.margin_top}>
                <Typography variant="h4" gutterBottom className="label sub_label">
                  Nội quy căn hộ
                </Typography>
                <Grid item className="normal_text">
                  <span>
                    Một số nội quy khách cần tuân thủ khi đến lưu trú tại căn hộ của bạn
                  </span>
                </Grid>
                <HtmlTooltip
                  disableHoverListener={width !== 'xl' && width !== 'lg'}
                  disableFocusListener={width !== 'xl' && width !== 'lg'}
                  disableTouchListener={width !== 'xl' && width !== 'lg'}
                  title={
                    <Fragment>
                      <Typography color="inherit">Ví dụ:</Typography>
                      <Typography color="inherit">
                        - Vui lòng tắt các thiết bị khi ra khỏi căn hộ
                      </Typography>
                      <Typography color="inherit">- Không được hút thuốc trong căn hộ</Typography>
                      <Typography color="inherit">- Giữ trật tự chung sau 23h,...</Typography>
                    </Fragment>
                  }
                  placement="right-start">
                  <TextField
                    className="textarea sub_textarea"
                    aria-label="minimum height"
                    rows={6}
                    rowsMax={9}
                    name="note"
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    multiline
                    placeholder= {width !== 'xl' && width !== 'lg' ? `- Vui lòng tắt các thiết bị khi ra khỏi căn hộ \n- Giữ trật tự chung sau 23h,...`: ''}
                  />
                </HtmlTooltip>
              </Grid>
            </Grid>
            <Grid item xs={11} sm={10} md={6} lg={4} className="action_footer">
              <Link href="/">
                <a>
                  <Grid item className="action_back">
                    <Grid item className="back_icon">
                      <ArrowBackIosRounded className="size_icon" />
                    </Grid>
                    <Grid item className="back_text">
                      Trước
                    </Grid>
                  </Grid>
                </a>
              </Link>
              <Grid item>
                <Button className="btn_next" variant="contained" type="submit">
                  Tiếp tục
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}></Formik>
    </Fragment>
  );
};

export default Description;
