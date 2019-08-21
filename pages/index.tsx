import React, { Fragment } from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import FooterComponent from '@/components/Layout/FooterComponent';
import HostBecome from '@/components/Shared/HostBecome';
import GridContainer from '@/components/Layout/Grid/Container';
import ListRoom from '@/components/ListRoom';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import BlogContainer from '@/components/Layout/BlogContainer';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import RoomCard from '@/components/RoomCard';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import SearchHome from '@/components/Home/SearchComponent/SearchHome';
import CollectionViews from '@/components/Home/CollectionRooms/CollectionViews';
import { useTranslation } from 'react-i18next';
// import SeaView from '@/components/Home/CollectionRooms/SeaView';
// import CityView from '@/components/Home/CollectionRooms/CityView';

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
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>

      <GridContainer xs={12}>
        <SearchHome></SearchHome>

        <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
          <SliderTypeApartment />
          <MetroGridImage />
          <ListRoom
            roomData={roomsHot}
            usingSlider={true}
            title={t('home:editorChoice')}
            render={renderRoom}></ListRoom>

          {/* <SeaView /> */}
          {/* <CityView /> */}
          {/* <CollectionViews /> */}
        </GridContainer>
        <HostBecome />

        <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
          <BlogContainer />
        </GridContainer>
      </GridContainer>
      <FooterComponent />
    </Fragment>
  );
};

Home.getInitialProps = async ({ store }: NextContextPage) => {
  if (store.getState().roomHomepage.roomsHot.length === 0) {
    const res = await getRoomsHomepage(store.dispatch);
  }

  return {};
};

export default Home;
