import React, { FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/store/Context/GlobalContext';
import Link from 'next/link';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
    },
  })
);

interface IProps {
}

const RoomBasic: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={9}>
            <Typography>Spring Truc Bach Homestay: Can ho 5* canh Ho</Typography>
        </Grid>
        <Grid item xs={3}>
            <Typography>Spring Truc Bach Homestay: Can ho 5* canh Ho</Typography>          
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoomBasic;
