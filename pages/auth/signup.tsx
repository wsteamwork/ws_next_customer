import React, { Fragment } from 'react';
import NavHeader from '@/components/Toolbar/NavHeader';
import GridContainer from '@/components/Layout/Grid/Container';
import FormSignup from '@/components/Auth/Signup/FormSignup';
import NextHead from '@/components/NextHead';

const Signup = () => {
  return (
    <Fragment>
      <NextHead
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/signup"
        ogImage="/static/favicon.ico"></NextHead>
      <NavHeader></NavHeader>

      <GridContainer xs={11} md={8} lg={4} className="pageSignup">
        <FormSignup></FormSignup>
      </GridContainer>
    </Fragment>
  );
};

export default Signup;
