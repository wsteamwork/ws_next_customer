import React, { useReducer } from 'react';
import { NextPage } from 'next';
import { Grid, Hidden } from '@material-ui/core';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import DateRangeSearch from '@/components/Home/DateRangeSearch';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import ChooseGuestRoom from '@/components/Home/ChooseGuestRoom';
import ChooseRoomGuest from '@/components/Rooms/ChooseRoomGuest';
import KindOfRoom from '@/components/Rooms/KindOfRoom';
import {
  RoomIndexContext,
  RoomIndexReducer,
  RoomIndexStateInit
} from '@/store/Context/Room/RoomListContext';

const Rooms: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);

  return (
    <RoomIndexContext.Provider value={{ state, dispatch }}>
      <NextHead
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        url="/rooms"></NextHead>
      <NavHeader></NavHeader>

      <GridContainer xs={12} md={9} className="searchRooms">
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <SearchAutoSuggestion />
          </Grid>
          <Grid item xs={12} md={5}>
            <DateRangeSearch />
          </Grid>
          <Grid item xs={12} md={2}>
            <ButtonGlobal width="100%">{t('home:searchComponent:search')}</ButtonGlobal>
          </Grid>
        </Grid>
      </GridContainer>

      <GridContainer xs={12} md={9} className="filterRooms">
        <Grid container spacing={2}>
          <Grid item className="displayWebkit">
            <ChooseRoomGuest></ChooseRoomGuest>
          </Grid>
          <Grid item className="displayWebkit">
            <KindOfRoom></KindOfRoom>
          </Grid>
        </Grid>
      </GridContainer>
    </RoomIndexContext.Provider>
  );
};

export default Rooms;
