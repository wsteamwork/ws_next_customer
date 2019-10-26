import SearchHome from '@/components/Home/SearchComponent/SearchHome';
import BlogContainer from '@/components/Layout/BlogContainer';
import FooterComponent from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import ListRoom from '@/components/ListRoom';
import NextHead from '@/components/NextHead';
import RoomCard from '@/components/RoomCard';
// import HostBecome from '@/components/Shared/HostBecome';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getCookieFromReq } from '@/utils/mixins';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Home: NextPage = () => {
  const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.roomHomepage.roomsHot
  );
  const renderRoom = (room) => <RoomCard room={room} isHomepage={true} />;
  const { t } = useTranslation();

  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay cùng với nhiều ưu đãi hấp dẫn"
        url="https://westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg"/>

      <GridContainer xs={12}>
        <SearchHome/>

        <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
          <SliderTypeApartment />
          <MetroGridImage />
          <ListRoom
            roomData={roomsHot}
            usingSlider={true}
            title={t('home:editorChoice')}
            render={renderRoom}/>

        </GridContainer>
        {/* <HostBecome /> */}

        <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
          <BlogContainer />
        </GridContainer>
      </GridContainer>

      <FooterComponent />
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
