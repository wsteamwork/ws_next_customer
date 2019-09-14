import React, { Fragment } from 'react';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import GridContainer from '@/components/Layout/Grid/Container';
import FormSignin from '@/components/Auth/Signin/FormSignin';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import Room from '@/components/LTR/Merchant/Listing/CreateListing/Room';
const RoomCreateListing = () => {
  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/host/create-listing"
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>

      {/* <NavHeader></NavHeader> */}
      <Room />
    </Fragment>
  );
};

export default RoomCreateListing;
