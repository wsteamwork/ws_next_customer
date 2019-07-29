import React, { Fragment, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Grid } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import CardIntro from '@/components/Cards/CardIntro';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({

  })
);

const MetroGridImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;

  return (
    <GridContainer xs={10}>
      <Typography variant='h5'>
        Điểm đến hấp dẫn
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container direction='column'>
            <Grid item>
              <CardIntro title='Ha Noi' showPrice={true} imgHeight={220} />
            </Grid>
            <Grid item>
              <Grid container spacing={1} direction='row'>
                <Grid item xs={6}>
                  <CardIntro title='Ha Noi' showPrice={true} imgHeight={170} />
                </Grid>
                <Grid item xs={6}>
                  <CardIntro title='Ha Noi' showPrice={true} imgHeight={170} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6} spacing={1}>
          <Grid container item xs={6}>
            <Grid item xs={12}>
              <CardIntro title='Ha Noi' showPrice={true} imgHeight={220} />
            </Grid>
            <Grid item xs={12}>
              <CardIntro title='Ha Noi' showPrice={true} imgHeight={170} />
            </Grid>
          </Grid>
          <Grid container item xs={6}>
            <Grid item xs={12}>
              <CardIntro title='Ha Noi' showPrice={true} imgHeight={395} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default MetroGridImage;
