import React, { FC, useState } from 'react';
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
import { makeStyles, useTheme } from '@material-ui/styles';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import Router from 'next/router';
import ButtonGlobal from '@/components/ButtonGlobal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  classes?: any;
  getSteps?: () => Array<string>;
  getStepContent?: (step: number) => any;
  nextLink: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => ({
  root: {
    position: 'fixed',
    padding: '14vh 24px 24px',
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 8
  },
  instructions: {
    marginTop: 8,
    marginBottom: 8
  },
  label: {
    color: '#484848'
  },
  labelActive: {
    color: '#FA991C !important'
  }
}));

const QontoConnector = withStyles({
  vertical: {
    padding: 0,
    marginLeft: 13
  },
  active: {
    '& $line': {
      borderColor: '#FA991C'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#FA991C'
    }
  },
  line: {
    borderColor: '#eaeaf0',
    height: '12vh',
    borderLeftWidth: 4,
    borderRadius: 1
  }
})(StepConnector);

const QontoStepIcon = withStyles({
  root: {
    width: 30,
    height: 30
  },
  text: {
    fill: '#fff'
  }
})(StepIcon);

const StepperProgress: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const { getSteps, getStepContent, nextLink } = props;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container className="stepper">
      <Hidden smDown>
        <Grid item xs={5}>
          <Stepper
            className={classes.root}
            activeStep={activeStep}
            orientation="vertical"
            connector={<QontoConnector />}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {
                // StepIconComponent: QontoStepIcon
              };
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    classes={{ label: classes.label, active: classes.labelActive }}
                    StepIconComponent={QontoStepIcon}
                    {...labelProps}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
      </Hidden>

      <Grid item xs={12} md={7} className="stepper-content-wrapper">
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div>
              {getStepContent(activeStep)}
              <Hidden smDown>
                <BottomNavigation
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
                    <ButtonGlobal onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </ButtonGlobal>
                  }
                  backButton={
                    <Button className="prev-link" disabled={activeStep === 0} onClick={handleBack}>
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="2x"
                        color="#fa991c"></FontAwesomeIcon>
                      <span className="prev-title">Back</span>
                    </Button>
                  }
                />
              </Hidden>
            </div>
          )}
      </Grid>
    </Grid>
  );
};

export default StepperProgress;
