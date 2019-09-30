import React, { FC, useState, Fragment, Dispatch, SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid/';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {
  Typography,
  Button,
  Theme,
  StepConnector,
  withStyles,
  StepIcon,
  MobileStepper,
  Hidden
} from '@material-ui/core';

import Router from 'next/router';
import ButtonGlobal from '@/components/ButtonGlobal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import BottomMdNavigation from './BottomMdNavigation';

interface IProps {
  steps?: string[];
  activeStep?: number;
  nextLink?: string;
  setActiveStep: Dispatch<SetStateAction<number>>;  isSubmitting?: boolean;
}

const BottomNavigation: FC<IProps> = (props) => {
  const { steps, activeStep, nextLink, setActiveStep } = props;
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      Router.push(nextLink);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      Router.back();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <Fragment>
      <Hidden smDown>
        <BottomMdNavigation
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
          activeStep={activeStep}
        />
      </Hidden>

      <Hidden mdUp>
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
          className="mobile-stepper"
          nextButton={
            <ButtonGlobal type="submit">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </ButtonGlobal>
          }
          backButton={
            <Button className="prev-link" disabled={activeStep === 0} onClick={handleBack}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#fa991c"></FontAwesomeIcon>
              <span className="prev-title">Back</span>
            </Button>
          }
        />
      </Hidden>
    </Fragment>
  );
};

export default BottomNavigation;
