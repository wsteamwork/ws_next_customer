import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

interface IProps {}

const ButtonGoogle: FC<IProps> = (props) => {
  return (
    <Grid className="buttonLoginWithSocial">
      <img src="/static/images/google.svg" alt="Google" />
      <p>Login with Google</p>
    </Grid>
  );
};

export default ButtonGoogle;
