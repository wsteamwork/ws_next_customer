import React, { Fragment } from 'react';
import NextHead from '@/components/NextHead';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import PriceShortTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/PriceShortTerm';
import LongTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/LongTerm';
const RoomCreateListing = () => {
  const getSteps = () => {
    return ['Ngắn hạn', 'Dài hạn', 'Giá dịch vụ', 'Giá dịch vụ bổ sung'];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PriceShortTerm/> ;
      case 1:
        return <LongTerm/>;
      case 2:
        return 'Giá dịch vụ';
      case 3:
        return 'Giá dịch vụ bổ sung';
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
        ogImage="/static/images/Bg_home.4023648f.jpg"/>

      {/* <NavHeader></NavHeader> */}
      <Layout
        title="Bước 3: Giá"
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={'/host/create-listing/basic'}
      />
    </Fragment>
  );
};

export default RoomCreateListing;
