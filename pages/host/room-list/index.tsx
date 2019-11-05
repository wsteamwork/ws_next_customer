import RoomListHost from '@/components/LTR/Merchant/Listing/RoomList';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { NextPage } from 'next';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Grid, Breadcrumbs, Link, Typography, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import React, { Fragment, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { GlobalContext } from '@/store/Context/GlobalContext';

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

  const [cookies] = useCookies(['_token']);

  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);
  const { router } = useContext(GlobalContext);

  useEffect(() => {
    !!error && router.push('/auth/signin');
    !cookies._token && router.push('/auth/signin');
  }, [error]);
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
