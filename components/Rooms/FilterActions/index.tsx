import React, { FC, useContext } from 'react';
import GridContainer from '@/components/Layout/Grid/Container';
import { Grid, Toolbar, AppBar } from '@material-ui/core';
import ChooseRoomGuest from './ChooseRoomGuest';
import RoomType from './RoomType';
import PriceRange from './PriceRange';
import BookByHour from './BookByHour';
import FastBooking from './FastBooking';
import FilterRoom from './FilterRoom';
import SwitchMap from './SwitchMap';
import InfoSearch from './InfoSearch';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
interface Iprops {
  hideSearchBar?: boolean;
}

const FilterActions: FC<Iprops> = (props) => {
  const { state } = useContext(RoomIndexContext);
  const { isMapOpen } = state;
  return (
    <GridContainer
      xs={11}
      md={10}
      className={`filterRooms ${!isMapOpen && props.hideSearchBar ? 'hideSearchBar' : ''}`}>
      <Grid container>
        <Grid item xs={10} container spacing={1}>
          <Grid item className="displayWebkit filterRooms__chooseRoomGuest">
            <ChooseRoomGuest></ChooseRoomGuest>
          </Grid>
          <Grid item className="displayWebkit filterRooms__roomType">
            <RoomType></RoomType>
          </Grid>
          <Grid item className="displayWebkit filterRooms__priceRange">
            <PriceRange></PriceRange>
          </Grid>
          <Grid item className="displayWebkit filterRooms__bookByHourt">
            <BookByHour></BookByHour>
          </Grid>
          <Grid item className="displayWebkit filterRooms__fastBooking">
            <FastBooking></FastBooking>
          </Grid>
          <Grid item className="displayWebkit filterRooms__filterRoom">
            <FilterRoom></FilterRoom>
          </Grid>
        </Grid>

        <Grid item xs={2} container justify="flex-end">
          <SwitchMap></SwitchMap>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default FilterActions;
