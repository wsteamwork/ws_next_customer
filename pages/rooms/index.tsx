import React, { useReducer, Fragment, useState } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import NextHead from '@/components/NextHead';
import GridContainer from '@/components/Layout/Grid/Container';
import FilterActions from '@/components/Rooms/FilterActions';
import {
  RoomFilterContext,
  RoomFilterStateInit,
  RoomFilterReducer
} from '@/store/Context/Room/RoomFilterContext';
import {
  RoomIndexReducer,
  RoomIndexContext,
  RoomIndexStateInit
} from '@/store/Context/Room/RoomListContext';
import SearchComponent from '@/components/Home/SearchComponent';
import MapAndListing from '@/components/Rooms/MapAndListing';
import { Hidden } from '@material-ui/core';
import HeadRoom from 'react-headroom';
import { StickyContainer, Sticky } from 'react-sticky';
import BottomNav from '@/components/Rooms/BottomNav';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import SearchMobile from '@/components/Rooms/SearchMobile';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    rowMargin: {
      marginBottom: 50
    }
  })
);

const Rooms: NextPage = (props) => {
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { isMapOpen } = state;
  const [hideSearchBar, setHideSearchBar] = useState<boolean>(false);
  const classes = useStyles(props);
  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/rooms" />

      <NavHeader isSticky={isMapOpen} />
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
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
                            <SearchComponent />
                          </GridContainer>
                        </HeadRoom>

                        <FilterActions hideSearchBar={hideSearchBar} />
                      </header>
                    )}
                  </Sticky>
                ) : (
                    <Fragment>
                      {/* <GridContainer
                      xs={11}
                      md={10}
                      classNameItem="searchRooms__overlay"
                      className="searchRooms">
                      <SearchComponent />
                    </GridContainer> */}

                      <FilterActions hideSearchBar={hideSearchBar} />
                    </Fragment>
                  )}

                <MapAndListing />
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
                <SearchMobile />
              </GridContainer>
              <FilterActions />
              <MapAndListing />
              <BottomNav />
            </Hidden>
          </div>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
