import React, { useEffect, useReducer, Fragment } from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import SearchAutoSuggestion from '@/components/SearchAutoSuggestion';
import { Grid } from '@material-ui/core';
import DateRangeSearch from '@/components/DateRangeSearch';
import ChooseGuestRoom from '@/components/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import Footer from '@/components/Layout/Footer';
import HostBecome from '@/components/Shared/HostBecome';
import GridContainer from '@/components/Layout/Grid/Container';
import CustomPopper from '@/components/CustomPopper';
import NavHeader from '@/components/Toolbar/NavHeader';
import RoomCard from '@/components/RoomCard';
import VisitedRoomBox from '@/components/Rooms/VisitedRoomBox';
import {
  RoomHomepageContext,
  getRoomHot,
  RoomHotStateInit,
  RoomHotReducer
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
      <Fragment>
        {roomsHot ? (
          <GridContainer xs={12} sm={10}>
            <VisitedRoomBox visitedRoom={roomsHot.slice(0,4)}></VisitedRoomBox>
          </GridContainer>
        ) : (
            'loading'
          )}
      </Fragment>
    </RoomHomepageContext.Provider>
  );
};

export default Home;
