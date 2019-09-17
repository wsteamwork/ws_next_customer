import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';

import GridContainer from '@/components/Layout/Grid/Container';
import HeaderNav from './HeaderNavigation';
import StepperProgress from './StepperProgress';

interface IProps {
  title: string;
  getStepContent: (step: number) => any;
  getSteps: () => Array<string>;
  nextLink: string
}

const Layout: FC<IProps> = (props) => {
  const { title, getStepContent, getSteps, nextLink } = props;

  return (
    <Grid className="listing-container">
      <HeaderNav title={title} />
      <GridContainer
        xs={12}
        md={10}
        className="listing-content"
        classNameItem="listing-content-wrapper">
        <StepperProgress getSteps={getSteps} getStepContent={getStepContent} nextLink={nextLink}/>
      </GridContainer>
    </Grid>
  );
};

export default Layout;
