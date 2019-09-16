import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';
import ProgressStepper from './ProgressStepper';

import GridContainer from '@/components/Layout/Grid/Container';
import Logo from '@/components/Toolbar/Logo';
import HeaderNav from './HeaderNavigation';
import StepperProgress from './StepperProgress';

interface IProps {
  title: string;
}

const Layout: FC<IProps> = (props) => {
  const { title } = props;


  return (
    <Grid className="listing-container">
      <HeaderNav title={title} />
      <GridContainer xs={10} classNameItem="listing-content">
        <StepperProgress />
        {/* <Grid container>
          
          
        </Grid> */}
      </GridContainer>
    </Grid>
  );
};

export default Layout;
