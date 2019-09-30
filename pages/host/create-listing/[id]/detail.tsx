import Amenities from '@/components/LTR/Merchant/Listing/CreateListing/Amenities';
import Description from '@/components/LTR/Merchant/Listing/CreateListing/Description';
import UploadImage from '@/components/LTR/Merchant/Listing/CreateListing/UploadImage';
import ImageCaption from '@/components/LTR/Merchant/Listing/CreateListing/UploadImage/ImageCaption';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import NextHead from '@/components/NextHead';
import {
  getListingDetail,
  ListingDetailContext,
  ListingDetailReducer,
  ListingDetailStateInit
} from '@/store/Context/LTR/ListingDetailContext';
import React, { Fragment, useEffect, useReducer } from 'react';

const RoomCreateListing = () => {
  const [state, dispatch] = useReducer(ListingDetailReducer, ListingDetailStateInit);
  // console.log(state.listing);
  const id = 7;
  useEffect(() => {
    getListingDetail(id, dispatch);
  }, []);
  const getSteps = () => {
    return ['Mô tả căn hộ', 'Tiện nghi', 'Đăng ảnh', 'Mô tả ảnh'];
  };
  const getStepContent = (step, steps, setActiveStep, nextLink) => {
    switch (step) {
      case 0:
        return (
          <Description
            steps={steps}
            activeStep={step}
            setActiveStep={setActiveStep}
            nextLink={nextLink}
          />
        );
      case 1:
        return (
          <Amenities
            steps={steps}
            activeStep={step}
            setActiveStep={setActiveStep}
            nextLink={nextLink}
          />
        );
      case 2:
        return (
          <UploadImage
            steps={steps}
            activeStep={step}
            setActiveStep={setActiveStep}
            nextLink={nextLink}
          />
        );
      case 3:
        return (
          <ImageCaption
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

      <ListingDetailContext.Provider value={{ state, dispatch }}>
        <Layout
          title="Bước 2: Thông tin chi tiết"
          getSteps={getSteps}
          getStepContent={getStepContent}
          nextLink={`/host/create-listing/${id}/price`}
        />
      </ListingDetailContext.Provider>
    </Fragment>
  );
};
export default RoomCreateListing;
