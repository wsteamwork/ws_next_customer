import React, { Fragment } from 'react';
import NextHead from '@/components/NextHead';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import PriceShortTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/PriceShortTerm';
import LongTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/LongTerm';
import AdditionalServiceFee from '@/components/LTR/Merchant/Listing/CreateListing/Step3/AdditionalServiceFee';
import Basic from '@/components/LTR/Merchant/Listing/CreateListing/Basic';

const RoomCreateListing = () => {
  const getSteps = () => {
    return ['Ngắn hạn', 'Dài hạn'];
  };

  const getStepContent = (step, steps, setActiveStep, nextLink) => {
    switch (step) {
      case 0:
        return <PriceShortTerm steps = {steps}
                               activeStep = {step}
                               setActiveStep = {setActiveStep}
                               nextLink = {nextLink} />;
      case 1:
        return <LongTerm steps = {steps}
                         activeStep = {step}
                         setActiveStep = {setActiveStep}
                         nextLink = {nextLink}/>;
      // case 2:
      //   return <AdditionalServiceFee steps = {steps}
      //                                activeStep = {step}
      //                                setActiveStep = {setActiveStep}
      //                                nextLink = {nextLink} />;
      default:
        return 'Unknown step';
    }
  };
  return (
    <Fragment>
      <NextHead
        ogSitename = 'Westay - Đặt phòng homestay trực tuyến'
        title = 'Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay'
        description = 'Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay'
        url = '/host/create-listing'
        ogImage = '/static/images/Bg_home.4023648f.jpg' />

      {/* <NavHeader></NavHeader> */}
      <Layout
        title = 'Bước 3: Giá'
        getSteps = {getSteps}
        getStepContent = {getStepContent}
        nextLink = {'/host/create-listing/basic'}
      />
    </Fragment>
  );
};

export default RoomCreateListing;
