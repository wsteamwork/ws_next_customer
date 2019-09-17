import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid/';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

interface IProps {
  percentage: number;
}

const ProgressStepper: FC<IProps> = (props) => {
  const { percentage } = props;

  const percentageLimits = (min, value, max) => {
    return Math.min(Math.max(min, value), max);
  };
  return (
    <Grid className="progressBar">
      <ProgressBar
        percent={percentageLimits(0, percentage, 100)}
        filledBackground="radial-gradient(circle at 10% 20%, rgb(253, 193, 104) 0%, rgb(251, 128, 128) 90%)">
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`transitionStep ${accomplished ? 'accomplished' : null}`}></div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`transitionStep ${accomplished ? 'accomplished' : null}`}></div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`transitionStep ${accomplished ? 'accomplished' : null}`}></div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`transitionStep ${accomplished ? 'accomplished' : null}`}></div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`transitionStep ${accomplished ? 'accomplished' : null}`}></div>
          )}
        </Step>
      </ProgressBar>
    </Grid>
  );
};

export default ProgressStepper;
