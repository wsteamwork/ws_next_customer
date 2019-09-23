import React, { Fragment } from 'react';
import NextHead from '@/components/NextHead';
import Bathroom from '@/components/LTR/Merchant/Listing/CreateListing/Bathroom';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import Room from '@/components/LTR/Merchant/Listing/CreateListing/Room';
import Description from '@/components/LTR/Merchant/Listing/CreateListing/Description';
const RoomCreateListing = () => {
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
        return 'Địa chỉ';
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

      <Layout
        title="Bước 1: Thông tin cơ bản"
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={'/host/create-listing/detail'}
      />
    </Fragment>
  );
};

export default RoomCreateListing;
