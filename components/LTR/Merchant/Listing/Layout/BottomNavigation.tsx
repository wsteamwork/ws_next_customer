import ButtonGlobal from '@/components/ButtonGlobal';
import { ReducersList } from '@/store/Redux/Reducers';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Hidden, MobileStepper } from '@material-ui/core';
import Router from 'next/router';
import React, { FC, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BottomMdNavigation from './BottomMdNavigation';

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
  }, [currentActiveStep]);

  const handleFinish = async () => {
    console.log('finish');
    try {
      const result = await handleAPI();
      if (result) {
        // console.log(result);
        Router.push(`/host/create-listing/${result.data.data.id}/detail`);
      }
    } catch (error) {
      console.log(error)
    }
  };

  // const nextStep = () => {
  //   if (activeStep === steps.length - 1) {
  //     console.log('router push ', nextLink);
  //     Router.push(nextLink);
  //   } else {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   }
  // };

  const handleNext = async () => {
    console.log('next');
    try {
      if (!submitEachStep) {
        const result = await handleAPI();
        if (result) {
          if (activeStep === steps.length - 1) {
            console.log('router push ', nextLink);
            Router.push(nextLink);
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            localStorage.setItem('currentTab', String(activeStep + 1));

          }

        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
          handleFinish={handleFinish}
          handleBack={handleBack}
          steps={steps}
          activeStep={activeStep}
          disableNext={disableNext}
          submitEachStep={submitEachStep}
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
            activeStep === steps.length - 1 ? (
              <ButtonGlobal onClick={submitEachStep ? handleFinish : handleNext} disabled={disableNext}>
                Finish
              </ButtonGlobal>
            ) : (
                <ButtonGlobal onClick={handleNext} disabled={disableNext}>
                  Next
              </ButtonGlobal>
              )
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
