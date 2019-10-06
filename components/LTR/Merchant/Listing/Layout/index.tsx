import React, { FC, Dispatch, SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid/Grid';

import GridContainer from '@/components/Layout/Grid/Container';
import HeaderNav from './HeaderNavigation';
import StepperProgress from './StepperProgress';

interface IProps {
  title: string;
  getStepContent: (
    step: number,
    steps: string[],
    setActiveStep: Dispatch<SetStateAction<number>>,
    nextLink: string
  ) => any;
  getSteps: () => Array<string>;
  nextLink: string;
  handleAPI?: () => void;
  submitEachStep?: boolean;
}

const Layout: FC<IProps> = (props) => {
  const { title, getStepContent, getSteps, nextLink, handleAPI, submitEachStep } = props;

  return (
    <Grid className="listing-container">
      <HeaderNav title={title} />
      <GridContainer
        xs={12}
        md={10}
        className="listing-content"
        classNameItem="listing-content-wrapper">
        <StepperProgress
          getSteps={getSteps}
          getStepContent={getStepContent}
          nextLink={nextLink}
          handleAPI={handleAPI}
          submitEachStep={submitEachStep}
        />
      </GridContainer>
    </Grid>
  );
};

export default Layout;
