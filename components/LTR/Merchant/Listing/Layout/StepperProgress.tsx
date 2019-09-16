import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Typography, Button, Theme, StepConnector, withStyles, StepIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import Room from '@/components/LTR/Merchant/Listing/CreateListing/Room';
import Bathroom from '@/components/LTR/Merchant/Listing/CreateListing/Bathroom';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => ({
  root: {
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

const getSteps = () => {
  return ['Thông tin cơ bản', 'Phòng ngủ', 'Phòng tắm', 'Địa chỉ'];
};

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Room />;
    case 1:
      return <Bathroom />;
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
};

const StepperProgress: FC<IProps> = (props) => {
  const classes = useStyles(props);
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
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container className="stepper">
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
            // if (isStepOptional(index)) {
            //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
            // }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
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

      <Grid item xs={7} className="listing-content-wrapper">
        {/* {props.children} */}
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
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

            <BottomNavigation
              handleNext={handleNext}
              handleBack={handleBack}
              steps={steps}
              activeStep={activeStep}
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default StepperProgress;
