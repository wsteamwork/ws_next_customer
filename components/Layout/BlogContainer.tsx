import React, { Fragment,FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import CardIntro from '@/components/Cards/CardIntro';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root:{
      marginTop:theme.spacing(7)
    },
    title:{
      marginBottom:theme.spacing(3),
      fontWeight:900,
    }
  })
);

const BlogContainer: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;

  return (
    <Grid className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        Khám phá và trải nghiệm
      </Typography>
      <Grid container spacing={2} justify='flex-start'>
        <Grid item xs={4} sm={3}>
          <CardIntro imgHeight={200} title='Villa' showPrice={false}/>
        </Grid>
        <Grid item xs={4} sm={3}>
          <CardIntro imgHeight={200} title='Villa' showPrice={false}/>
        </Grid>
        <Grid item xs={4} sm={3}>
          <CardIntro imgHeight={200} title='Villa' showPrice={false}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogContainer;
