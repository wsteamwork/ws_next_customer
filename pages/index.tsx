import React, { Fragment, useMemo } from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import FooterComponent from '@/components/Layout/FooterComponent';
import HostBecome from '@/components/Shared/HostBecome';
import GridContainer from '@/components/Layout/Grid/Container';
import NavHeader from '@/components/Toolbar/NavHeader';
import ListRoom from '@/components/ListRoom';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import BlogContainer from '@/components/Layout/BlogContainer';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import RoomCard from '@/components/RoomCard';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import SearchHome from '@/components/Home/SearchComponent/SearchHome';

const Home: NextPage = () => {
  const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.roomHomepage.roomsHot
  );
  const renderRoom = (room) => <RoomCard room={room} isHomepage={true} />;

  return (
    <Fragment>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        ogImage="/static/favicon.ico"
        url="https://nextjs.org/"
      />

      <GridContainer xs={12}>
        <NavHeader />

        <SearchHome></SearchHome>

        <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
          <SliderTypeApartment />
          <MetroGridImage />
          <ListRoom
            roomData={roomsHot}
            usingSlider={true}
            title={'Phòng nổi bật'}
            render={renderRoom}></ListRoom>
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

Home.getInitialProps = async (ctx: NextContextPage) => {
  try {
    const res = await getRoomsHomepage();
    ctx.store.dispatch({ type: 'setRoomCity', rooms: res.roomsCity });
    ctx.store.dispatch({ type: 'setApartment', rooms: res.apartments });
    ctx.store.dispatch({ type: 'setRoomHot', rooms: res.roomsHot });
  } catch (error) {
    // console.log(error.respose);
  }

  return {};
};

export default Home;
