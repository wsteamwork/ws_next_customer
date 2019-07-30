import React, { useReducer, useContext } from 'react';
import { NextPage } from 'next';
import { Grid } from '@material-ui/core';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import DateRangeSearch from '@/components/Home/DateRangeSearch';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import {
  RoomIndexContext,
  RoomIndexReducer,
  RoomIndexStateInit
} from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import FilterActions from '@/components/Rooms/FilterActions';

const Rooms: NextPage = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const { dispatch: dispatchGlobal } = useContext(GlobalContext);

  const handleOverlay = () => {
    dispatchGlobal({ type: 'setOverlay', payload: true });
  };

  return (
    <RoomIndexContext.Provider value={{ state, dispatch }}>
      <NextHead
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        url="/rooms"></NextHead>
      <NavHeader></NavHeader>

      <GridContainer
        onClick={handleOverlay}
        xs={11}
        md={10}
        classNameItem="searchRooms__overley"
        className="searchRooms">
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <SearchAutoSuggestion />
          </Grid>
          <Grid item xs={12} md={5}>
            <DateRangeSearch />
          </Grid>
          <Grid item xs={12} md={2}>
            <ButtonGlobal padding="0px" width="100%">
              {t('home:searchComponent:search')}
            </ButtonGlobal>
          </Grid>
        </Grid>
      </GridContainer>

      <FilterActions></FilterActions>
    </RoomIndexContext.Provider>
  );
};

export default Rooms;
