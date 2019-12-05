import SearchHome from '@/components/Home/SearchComponent/SearchHome';
import FooterComponent from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import { getCookieFromReq } from '@/utils/mixins';
import { Hidden } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import LazyLoad, { forceCheck } from 'react-lazyload';
import HomepageST from './homepage/HomepageST';
import { useSelector } from 'react-redux';

const Home: NextPage = () => {
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  forceCheck();
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay cùng với nhiều ưu đãi hấp dẫn"
        url="https://westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg" />

      <GridContainer xs={12}>
        <LazyLoad>
          <SearchHome />
        </LazyLoad>
        <Hidden smDown implementation="css">
          <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
            {
              leaseTypeGlobal ? (
                <HomepageLT />
              ) :
                <HomepageST />
            }
          </GridContainer>
        </Hidden>
      </GridContainer>
      <LazyLoad offset="150">
        <FooterComponent />
      </LazyLoad>
    </Fragment>
  );
};

Home.getInitialProps = async ({ store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  if (store.getState().roomHomepage.roomsHot.length === 0) {
    const res = await getRoomsHomepage(store.dispatch, initLanguage);
  }

  return {};
};

export default Home;
