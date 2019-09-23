import React, { Fragment } from 'react';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import GridContainer from '@/components/Layout/Grid/Container';
import FormSignin from '@/components/Auth/Signin/FormSignin';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import Room from '@/components/LTR/Merchant/Listing/CreateListing/Room';
import Description from '@/components/LTR/Merchant/Listing/CreateListing/Description';
import Amenities from '@/components/LTR/Merchant/Listing/CreateListing/Amenities';
import UploadImage from '@/components/LTR/Merchant/Listing/CreateListing/UploadImage';
const RoomCreateListing = () => {
  const getSteps = () => {
    return ['Mô tả căn hộ', 'Tiện nghi', 'Ảnh'];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Description />;
      case 1:
        return <Amenities />;
      case 2:
        return <UploadImage />;
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

      {/* <NavHeader></NavHeader> */}
      <Layout
        title="Bước 2: Thông tin chi tiết"
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={'/host/create-listing/price'}
      />
    </Fragment>
  );
};

export default RoomCreateListing;
