import React, { useContext, useEffect, Fragment, useReducer } from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import SearchAutoSuggestion from '@/components/SearchAutoSuggestion';
import { Grid } from '@material-ui/core';
import DateRangeSearch from '@/components/DateRangeSearch';
import ChooseGuestRoom from '@/components/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import RoomCard from '@/components/RoomCard';
import {
  RoomHomepageContext,
  IRoomHomepageContext,
  getRoomHot,
  RoomHotStateInit,
  RoomHotReducer,
  RoomHomepageState
} from '@/store/Context/Room/RoomHomepageContext';
const Home: NextPage = () => {
  const [state, dispatch] = useReducer(RoomHotReducer, RoomHotStateInit);
  const { roomsHot } = state;

  useEffect(() => {
    console.log(state);
  });

  useEffect(() => {
    getRoomHot()
      .then((data) => {
        const roomData = data.data;
        console.log(roomData);
        dispatch({
          type: 'setRoomHot',
          rooms: roomData
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <RoomHomepageContext.Provider value={{ state, dispatch }}>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        url="https://nextjs.org/"></NextHead>

      <Grid container spacing={2} style={{ height: '65px' }}>
        <Grid item xs={12} md={4}>
          <SearchAutoSuggestion />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateRangeSearch />
        </Grid>
        <Grid item xs={12} md={2}>
          <ChooseGuestRoom />
        </Grid>
        <Grid item xs={12} md={2}>
          <ButtonGlobal width="100%">Tìm kiếm</ButtonGlobal>
        </Grid>
      </Grid>

      {roomsHot ? (
        <Fragment>
          {roomsHot.slice(0, 4).map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </Fragment>
      ) : (
        'loading'
      )}
    </RoomHomepageContext.Provider>
  );
};

export default Home;
