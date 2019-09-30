import React, { FC, useState, Dispatch, SetStateAction } from 'react';
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

interface IProps {
  classes?: any;
  getSteps?: () => Array<string>;
  getStepContent?: (
    step: number,
    steps: string[],
    setActiveStep: Dispatch<SetStateAction<number>>,
    nextLink: string
  ) => any;
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
            {getStepContent(activeStep, steps, setActiveStep, nextLink)}
            <BottomNavigation
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              nextLink={nextLink}
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default StepperProgress;
