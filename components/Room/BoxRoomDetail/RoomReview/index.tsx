import React, { FC, useContext, Fragment, useState, MouseEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { IRoomDetailsContext, RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    
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
      <Grid container className={classes.root}>
        <Grid item xs={12}>
        <Typography variant="h5" className={classes.name}>
          {t('rooms:description')}
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RoomReview;
