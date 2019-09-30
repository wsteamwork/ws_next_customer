import React, {
  FC,
  Fragment,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
import _ from 'lodash';
import {
  ListingDetailContext,
  IListingDetailContext
} from '@/store/Context/LTR/ListingDetailContext';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import CardImageCaption from './CardImageCaption';

interface IProps {
  activeStep: number;
  steps: string[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  nextLink: string;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    margin: {
      marginBottom: theme.spacing(3)
    }
  })
);

const ImageCaption: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { activeStep, steps, setActiveStep, nextLink } = props;
  const { state } = useContext<IListingDetailContext>(ListingDetailContext);
  const {
    avatar_image,
    cover_photo,
    livingrooms,
    bedrooms,
    kitchens,
    bathrooms,
    outdoors,
    furnitures
  } = state;
  const countBedRoom = Object.keys(bedrooms).length;
  const countBathRoom = Object.keys(bathrooms).length;

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        {avatar_image.images.length && (
          <CardImageCaption label="Ảnh đại diện" subLabel="Thêm chú thích cho ảnh đại diện" typeImage ={1} arrImage={avatar_image.images}/>
        )}
        </Grid>
        <Grid item xs={6}>
        {cover_photo.images.length && (
          <CardImageCaption label="Ảnh bìa" subLabel="Thêm chú thích cho ảnh bìa căn hộ" typeImage ={1} arrImage={cover_photo.images}/>
        )}
        </Grid>
      </Grid>
      {livingrooms.images.length && (
        <CardImageCaption label="Ảnh phòng khách" subLabel="Thêm chú thích cho ảnh phòng khách căn hộ" typeImage ={2} arrImage={livingrooms.images}/>
      )}
      {countBedRoom && (_.times(countBedRoom, (i) => (
        bedrooms[`bedroom_${i + 1}`].images.length ? <CardImageCaption key={i} label={`Ảnh phòng ngủ ${i + 1}`} typeImage ={2} subLabel="Thêm chú thích cho ảnh phòng ngủ" arrImage={bedrooms[`bedroom_${i + 1}`].images}/>: ''
      )))}
      {countBathRoom && (_.times(countBathRoom, (i) => (
        bathrooms[`bathroom_${i + 1}`].images.length ? <CardImageCaption key={i} label={`Ảnh phòng tắm ${i + 1}`} typeImage ={2} subLabel="Thêm chú thích cho ảnh phòng tắm" arrImage={bathrooms[`bathroom_${i + 1}`].images}/>: ''
      )))}
      {kitchens.images.length && (
        <CardImageCaption label="Ảnh phòng bếp" subLabel="Thêm chú thích cho ảnh phòng bếp căn hộ" typeImage ={2} arrImage={kitchens.images}/>
      )}
      {furnitures.images.length && (
        <CardImageCaption label="Ảnh phòng khách" subLabel="Thêm chú thích cho ảnh phòng khách căn hộ" typeImage ={2} arrImage={furnitures.images}/>
      )}
      {outdoors.images.length && (
        <CardImageCaption label="Ảnh phòng khách" subLabel="Thêm chú thích cho ảnh phòng khách căn hộ" typeImage ={2} arrImage={outdoors.images}/>
      )}
      <BottomNavigation
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        nextLink={nextLink}
      />
    </Fragment>
  );
};

export default ImageCaption;
