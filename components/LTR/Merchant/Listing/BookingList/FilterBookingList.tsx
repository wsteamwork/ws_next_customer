import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface IProps {
  className?: string;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8)
    },
  })
);
const FilterBookingList: FC<IProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Grid container>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
      </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
      </Typography>
      </Paper>
    </Grid>
  );
};

export default FilterBookingList;
