import React, { Fragment, FC, useReducer, useState } from 'react';
import { NextPage } from 'next';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import { RoomIndexReducer, RoomIndexStateInit, RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';
import { Hidden, Grid } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import FilterActions from '@/components/Rooms/FilterActions';
import MapAndListing from '@/components/Rooms/MapAndListing';
import SearchMobile from '@/components/Rooms/SearchMobile';
import BottomNav from '@/components/Rooms/BottomNav';
import { StickyContainer, Sticky } from 'react-sticky';
import HeadRoom from 'react-headroom';
import SearchHomeLT from '@/components/LTR/LTHome/SearchHomeLT';
import SelectLeaseTypeGlobal from '@/components/LTR/ReusableComponents/SelectLeaseTypeGlobal';

const LongtermRooms: NextPage = () => {
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { isMapOpen } = state;
  const [hideSearchBar, setHideSearchBar] = useState<boolean>(false);

  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Thuê phòng trực tuyến"
        title="Thuê phòng dài hạn, thuê trọ - Westay - Westay.vn - Westay.vn"
        description="Thuê phòng dài hạn, thuê trọ - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/long-term-rooms"/>

      <NavHeader isSticky={isMapOpen}/>
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <div className="roomListing">
            <Hidden smDown implementation="css">
              <StickyContainer>
                {!isMapOpen ? (
                  <Sticky>
                    {({ style }) => (
                      <header style={{ ...style, zIndex: 99, transform: 'none' }}>
                        <HeadRoom
                          onPin={() => {
                            setHideSearchBar(false);
                          }}
                          onUnpin={() => {
                            setHideSearchBar(true);
                          }}>
                          <GridContainer
                            xs={11}
                            md={11}
                            lg={10}
                            classNameItem="searchRooms__overlay"
                            className="searchRooms">
                            {/*<Grid container>*/}
                            {/*  <Grid item xs={3}>*/}
                            {/*    */}
                            {/*  </Grid>*/}
                            {/*</Grid>*/}
                            <Grid container spacing={1}>
                              <Grid item>
                                <SelectLeaseTypeGlobal/>
                              </Grid>
                              <Grid item xs>
                                <SearchHomeLT showPlaces={false}/>
                              </Grid>
                            </Grid>
                          </GridContainer>
                        </HeadRoom>

                        <FilterActions hideSearchBar={hideSearchBar} showBookByHour={false}/>
                      </header>
                    )}
                  </Sticky>
                ) : (
                    <FilterActions hideSearchBar={hideSearchBar} showBookByHour={false}/>
                )}

                <MapAndListing/>
              </StickyContainer>
            </Hidden>
            <Hidden mdUp implementation="css">
              <GridContainer
                xs={11}
                md={11}
                lg={10}
                classNameItem="searchRooms__overlay"
                className="searchRooms">
                {/*<SearchComponent />*/}
                <SearchHomeLT showPlaces={false}/>
              </GridContainer>
              <FilterActions showBookByHour={false}/>
              <MapAndListing/>
              <BottomNav />
            </Hidden>
          </div>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

LongtermRooms.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  return {};
};

export default LongtermRooms;
