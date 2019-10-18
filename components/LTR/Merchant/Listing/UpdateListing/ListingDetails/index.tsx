import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import NameAndDescription from './NameAndDescription';
import Amenities from './Amenities';
import BedRooms from './BedRooms';
import BathRooms from './BathRooms';
import RentAndRoomType from './RentAndRoomType';
import Location from './Location';
import StatusRoom from './StatusRoom';
import Guests from './Guests';

interface IProps {
  classes?: any;
}
const ListingDetails: FC<IProps> = (props) => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={10} lg={9}>
        <NameAndDescription />
        <RentAndRoomType />
        <Guests />
        <Amenities />
        <BedRooms />
        <BathRooms />
        <Location />
        <StatusRoom />
      </Grid>
    </Grid>
  );
};
export default ListingDetails;
