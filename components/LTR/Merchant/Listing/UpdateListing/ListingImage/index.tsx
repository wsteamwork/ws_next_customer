import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import CoverPhoto from '../ListingImage/CoverPhoto';
import AvatarImage from '../ListingImage/AvatarImage';
import LivingRooms from '../ListingImage/LivingRooms';
import Kitchens from '../ListingImage/Kitchens';
import Furnitures from '../ListingImage/Furnitures';
import Outdoors from '../ListingImage/Outdoors';
import BedImage from './BedImage';
import BathImage from './BathImage';

interface IProps {
  classes?: any;
}

const ListingImage: FC<IProps> = (props) => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={10} lg={9}>
        <AvatarImage />
        <CoverPhoto />
        <LivingRooms />
        <BedImage />
        <BathImage />
        <Kitchens />
        <Furnitures />
        <Outdoors />
      </Grid>
    </Grid>
  );
};
export default ListingImage;
