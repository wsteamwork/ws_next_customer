import React, { FC } from 'react';
import { Grid, Paper } from '@material-ui/core';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import GridContainer from '../Layout/Grid/Container';
import UserBox from './UserBox';
import UserDetail from './UserDetail';

const MainProfile: FC = (props) => {
  const profile = useSelector<ReducersList, ProfileViewInfoRes>(
    (state) => state.userProfile.profile
  );

  return (
    <div className={'mainProfile'}>
      {profile ? (
        <GridContainer xs={11} md={8}>
          <Grid container justify="center">
            <Grid item xs={12} md={4} lg={4} xl={4} className={'boxPadding'}>
              <Paper elevation={0} className={'PaperBooking'}>
                <UserBox />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={8} className={'boxPadding'}>
              <Paper elevation={0} className={'detailPaper'}>
                <UserDetail />
              </Paper>
            </Grid>
          </Grid>
        </GridContainer>
      ) : (
        <SimpleLoader />
      )}
    </div>
  );
};

export default MainProfile;
