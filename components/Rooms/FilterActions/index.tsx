import React, { FC } from 'react';
import GridContainer from '@/components/Layout/Grid/Container';
import { Grid } from '@material-ui/core';
import ChooseRoomGuest from './ChooseRoomGuest';
import RoomType from './RoomType';
import PriceRange from './PriceRange';
import BookByHour from './BookByHour';
import FastBooking from './FastBooking';
import FilterRoom from './FilterRoom';
import SwitchMap from './SwitchMap';

const FilterActions: FC = () => {
  return (
    <GridContainer xs={11} md={10} className="filterRooms">
      <Grid container>
        <Grid item xs={11} container spacing={1}>
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
        <Grid item xs={1} container justify="flex-end">
          <SwitchMap></SwitchMap>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default FilterActions;
