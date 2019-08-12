import React, { Fragment } from 'react';
import NavHeader from '@/components/Toolbar/NavHeader';
import GridContainer from '@/components/Layout/Grid/Container';
import FormSignup from '@/components/Auth/Signup/FormSignup';
import NextHead from '@/components/NextHead';

const Signup = () => {
  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/signup"
        ogImage="/static/favicon.ico">
      </NextHead>
      <NavHeader></NavHeader>

      <GridContainer xs={11} md={4}>
        <FormSignup></FormSignup>
      </GridContainer>
    </Fragment>
  );
};

export default Signup;
