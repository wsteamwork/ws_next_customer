import React, { FC, useContext, Fragment, useState, MouseEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { IRoomDetailsContext, RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import ItemReview from '../ItemReview/index';

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
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;

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
