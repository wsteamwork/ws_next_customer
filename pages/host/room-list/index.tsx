import RoomListHost from '@/components/LTR/Merchant/Listing/RoomList';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Grid, Breadcrumbs, Link, Typography, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    marginLabel: {
      marginTop: '24px'
    },
    custom_link_bread: {
      color: '#1d8df7'
    }
  })
);
const RoomList: NextPage = (props) => {
  const classes = useStyles(props);
  return (
    <Fragment>
      <NavHeader_Merchant />
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={11} md={10} lg={8} className={classes.marginLabel}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" className={classes.custom_link_bread} />}
            aria-label="breadcrumb">
            <Link href="/" className={classes.custom_link_bread}>
              Trang chủ
            </Link>
            <Typography color="textPrimary">Danh sách phòng</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <RoomListHost />
    </Fragment>
  );
};

export default RoomList;
