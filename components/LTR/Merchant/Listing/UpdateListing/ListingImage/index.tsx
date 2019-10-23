import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import AvatarImage from '../ListingImage/AvatarImage';
import CoverPhoto from '../ListingImage/CoverPhoto';
import Furnitures from '../ListingImage/Furnitures';
import Kitchens from '../ListingImage/Kitchens';
import LivingRooms from '../ListingImage/LivingRooms';
import Outdoors from '../ListingImage/Outdoors';
import BathImage from './BathImage';
import BedImage from './BedImage';

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
