import ButtonGlobal from '@/components/ButtonGlobal';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Hidden, MobileStepper } from '@material-ui/core';
import Router from 'next/router';
import React, { FC, Fragment, SetStateAction, useEffect } from 'react';
import BottomMdNavigation from './BottomMdNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { ProcessReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/process';
import { Dispatch } from 'redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface IProps {
  steps?: string[];
  activeStep?: number;
  nextLink?: string;
  setActiveStep: any;
  disableNext?: boolean;
  handleAPI?: () => Promise<any>;
  submitEachStep?: boolean;
}

const BottomNavigation: FC<IProps> = (props) => {
  const {
    steps,
    activeStep,
    nextLink,
    setActiveStep,
    disableNext,
    handleAPI,
    submitEachStep
  } = props;
  const currentActiveStep = useSelector<ReducersList, string>((state) => state.process.currentActiveStep);
  useEffect(() => {
    let step = localStorage.getItem('currentStep');
    if (window.performance) {
      if (!(performance.navigation.type == 1) && step === currentActiveStep) {
        localStorage.setItem('currentTab', '0');
      }
    }
    console.log(123)
  }, [currentActiveStep]);
  
  const handleFinish = async () => {
    try {
      const result = await handleAPI();
      if (result) {
        nextStep();
      }
    } catch (error) { }
  };

  const nextStep = () => {
    if (activeStep === steps.length - 1) {
      Router.push(nextLink);
    } else {
      console.log(123)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      localStorage.setItem('currentTab', String(activeStep + 1));
    }
  };

  const handleNext = async () => {
    try {
      if (!submitEachStep) {
        const result = await handleAPI();
        if (result) {
          nextStep();
        }
      } else {
        nextStep();
      }
    } catch (error) { }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      Router.back();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      localStorage.setItem('currentTab', String(activeStep - 1));
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
          disableNext={disableNext}
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
            <ButtonGlobal onClick={handleNext} disabled={disableNext} type="submit">
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
BottomNavigation.defaultProps = {
  disableNext: false
};

export default BottomNavigation;
