import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';

import Logo from '@/components/Toolbar/Logo';

interface IProps {
  title: string;
}

const HeaderNav: FC<IProps> = (props) => {
  const { title } = props;
  return (
    <Grid className="listing-header">
      <Grid className="listing-header-wrapper">
        <Grid className="logo">
          <Logo onlyImg={true} />
        </Grid>
        <Grid className="box-title">
          <Grid className="box-title-wrapper">
            <span className="title">{title}</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderNav;
