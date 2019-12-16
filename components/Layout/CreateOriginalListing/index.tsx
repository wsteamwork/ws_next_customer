import React, { Fragment, FC, useState, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid } from '@material-ui/core';
interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxImgIntro:{
      backgroundImage: `url('../../../static/images/img_intro.jpg')`,
      width:'100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      backgroundColor: '#f5f6f8',
      padding: '32px'
    },
  })
);

const CreateOriginalListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className={classes.boxImgIntro}>
          <a href = '/'>
            <img src = '../../../static/images/Logo-westay.png' alt = 'westay.vn' width={150}/>
          </a>
        </div>
      </Grid>
      <Grid item xs={8}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default CreateOriginalListing;
