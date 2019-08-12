import React, { Fragment } from 'react';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import GridContainer from '@/components/Layout/Grid/Container';
import FormSignin from '@/components/Auth/Signin/FormSignin';

const Signin = () => {
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

      <GridContainer xs={11} md={8} lg={4} className="pageSignin">
        <FormSignin></FormSignin>
      </GridContainer>
    </Fragment>
  );
};

export default Signin;
