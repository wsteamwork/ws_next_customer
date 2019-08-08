import React, { FC, Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ItemReview from '../ItemReview/index';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { useSelector } from 'react-redux';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 900,
      margin: '1rem 0 1rem 0'
    }
  })
);

interface IProps {}

const RoomReview: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.name}>
            {t('rooms:review')}
          </Typography>
        </Grid>
        <Grid item xs>
          <ItemReview />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RoomReview;
