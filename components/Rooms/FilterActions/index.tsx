import React, { FC } from 'react';
import GridContainer from '@/components/Layout/Grid/Container';
import { Grid } from '@material-ui/core';
import ChooseRoomGuest from './ChooseRoomGuest';
import KindOfRoom from './KindOfRoom';
import PriceRange from './PriceRange';
import BookByHour from './BookByHour';
import FastBooking from './FastBooking';
import FilterRoom from './FilterRoom';

const FilterActions: FC = () => {
  return (
    <GridContainer xs={11} md={10} className="filterRooms">
      <Grid container spacing={1} >
        <Grid item className="displayWebkit filterRooms__chooseRoomGuest">
          <ChooseRoomGuest></ChooseRoomGuest>
        </Grid>
        <Grid item className="displayWebkit filterRooms__kindOfRoom">
          <KindOfRoom></KindOfRoom>
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
    </GridContainer>
  );
};

export default FilterActions;
