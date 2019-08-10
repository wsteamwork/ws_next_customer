import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

interface IProps {
  onClick: () => void;
}

const ButtonFacebook: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <Grid onClick={onClick} className="buttonLoginWithSocial">
      <img src="/static/images/facebook.svg" alt="Facebook" />
      <p>Login with Facebook</p>
    </Grid>
  );
};

export default ButtonFacebook;
