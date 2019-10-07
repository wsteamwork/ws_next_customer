import React, { Fragment, useContext, FC } from 'react';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
import { createStyles, Theme, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({}));
const ProcessListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { router } = useContext(GlobalContext);
  const id = router.query.id;

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={4}>
          <Paper className={classes.root}>
            <Grid>
              <Typography variant="h6" component="h3">
                Đăng ký căn hộ của bạn đang thiếu thông tin
              </Typography>
              <Typography component="p">
                Để đăng online trên Westay.vn và bắt đầu nhận khách, chúng tôi cần một vài thông tin
                chi tiết về căn hộ của bạn. Bạn có thể chỉnh sửa mọi thứ sau khi hoàn thành. Đây là
                những bước bạn đã hoàn thành và chưa hoàn thành:
              </Typography>
            </Grid>
            <Grid>
              <Grid container item xs={12}>
                <Typography variant="h6" component="h3">
                  Bước 1: Thông tin cơ bản
                </Typography>
                <Grid item xs={10}>
                  <Typography component="p">Loại căn hộ, phòng ngủ, địa chỉ</Typography>
                </Grid>
                <Grid container item xs={2} justify="flex-end">
                  <Typography variant="h6" component="h3">
                    Icon
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider/>
            <Grid>
              <Grid container item xs={12}>
                <Typography variant="h6" component="h3">
                    Bước 2: Thông tin chi tiết
                </Typography>
                <Grid item xs={10}>
                  <Typography component="p">Mô tả, tiện ích, hình ảnh</Typography>
                </Grid>
                <Grid container item xs={2} justify="flex-end">
                  <Typography variant="h6" component="h3">
                    Icon
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider/>
            <Grid>
              <Grid container item xs={12}>
                <Typography variant="h6" component="h3">
                    Bước 3: Chính sách và thiết lập giá
                </Typography>
                <Grid item xs={10}>
                  <Typography component="p">Chính sách, giá căn hộ</Typography>
                </Grid>
                <Grid container item xs={2} justify="flex-end">
                  <Typography variant="h6" component="h3">
                    Icon
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider/>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default ProcessListing;
