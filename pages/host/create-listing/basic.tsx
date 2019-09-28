import React, { Fragment, useReducer } from 'react';
import NextHead from '@/components/NextHead';
import Bathroom from '@/components/LTR/Merchant/Listing/CreateListing/Bathroom';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import Basic from '@/components/LTR/Merchant/Listing/CreateListing/Basic';
import Room from '@/components/LTR/Merchant/Listing/CreateListing/Room';
import Location from '@/components/LTR/Merchant/Listing/CreateListing/Location';
import {
  CreateListingContext,
  CreateListingInit,
  CreateListingReducer
} from '@/store/Context/LTR/CreateListingContext';
const RoomCreateListing = () => {
  const [state, dispatch] = useReducer(CreateListingReducer, CreateListingInit);

  const getSteps = () => {
    return ['Thông tin cơ bản', 'Phòng ngủ', 'Phòng tắm', 'Địa chỉ'];
  };

  const getStepContent = (step, steps, setActiveStep, nextLink) => {
    switch (step) {
      case 0:
        return (
          <Basic
            steps={steps}
            activeStep={step}
            setActiveStep={setActiveStep}
            nextLink={nextLink}
          />
        );
      case 1:
        return (
          <Room steps={steps} activeStep={step} setActiveStep={setActiveStep} nextLink={nextLink} />
        );
      case 2:
        return (
          <Bathroom
            steps={steps}
            activeStep={step}
            setActiveStep={setActiveStep}
            nextLink={nextLink}
          />
        );
      case 3:
        return (
          <Location
            steps={steps}
            activeStep={step}
            setActiveStep={setActiveStep}
            nextLink={nextLink}
          />
        );
      default:
        return 'Unknown step';
    }
  };
  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/host/create-listing"
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>
      {/* <CreateListingContext.Provider value={{ state, dispatch }}> */}
      <Layout
        title="Bước 1: Thông tin cơ bản"
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={'/host/create-listing/detail'}
      />
      {/* </CreateListingContext.Provider> */}
    </Fragment>
  );
};

export default RoomCreateListing;
