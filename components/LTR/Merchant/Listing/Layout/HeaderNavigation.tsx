import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';
import ProgressStepper from './ProgressStepper';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import GridContainer from '@/components/Layout/Grid/Container';
import Logo from '@/components/Toolbar/Logo';

interface IProps {
  percentage: number;
  title: string;
}

const HeaderNav: FC<IProps> = (props) => {
  const { percentage, title } = props;
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
      <ProgressStepper percentage={percentage} />
    </Grid>
  );
};

export default HeaderNav;
