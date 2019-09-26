import React, { FC, Fragment, useState, useReducer, useContext, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import UppyImage from './UppyImage';
import _ from 'lodash';
import {
  ListingDetailContext,
  IListingDetailContext
} from '@/store/Context/LTR/ListingDetailContext';
import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/CheckboxCustom';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
interface IProps {
  activeStep: number;
  steps: string[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  nextLink: string;
}

const useStyles = makeStyles<Theme>((theme: Theme) => createStyles({}));

const UploadImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { activeStep, steps, setActiveStep, nextLink } = props;
  const { state } = useContext<IListingDetailContext>(ListingDetailContext);
  const { listing } = state;
  console.log(state);
  return (
    <Fragment>
      {listing ? (
        <Fragment>
          <UppyImage
            label="Ảnh đại diện căn hộ"
            subLabel="Vui lòng đăng ảnh đại diện cho căn hộ của bạn"
            height={350}
            maxImage={1}
            typeUpload={{ type: 'setAvatarImage' }}
            initImages={listing.avatar.images ? listing.avatar.images : []}
          />
          <UppyImage
            label="Ảnh bìa căn hộ"
            subLabel="Vui lòng đăng ảnh bìa cho căn hộ của bạn"
            height={350}
            maxImage={1}
            typeUpload={{ type: 'setCoverImage' }}
            initImages={listing.cover_photo.images ? listing.cover_photo.images : []}
          />
          <UppyImage
            label="Ảnh phòng khách"
            subLabel="Vui lòng đăng phòng khách cho căn hộ của bạn"
            typeUpload={{ type: 'setLivingRoomImage' }}
            initImages={listing.livingrooms.images ? listing.livingrooms.images : []}
          />
          {_.times(listing.bedrooms.number_bedroom, (i) => (
            <UppyImage
              key={i}
              label={`Ảnh phòng ngủ ${i + 1}`}
              subLabel="Vui lòng đăng ảnh phòng ngủ cho căn hộ của bạn"
              type_txt={`bedroom_${i + 1}`}
              typeUpload={{ type: 'setBedRoomImage' }}
              initImages={
                listing.bedrooms[`bedroom_${i + 1}`]
                  ? listing.bedrooms[`bedroom_${i + 1}`].images
                  : []
              }
            />
          ))}
          {_.times(listing.bathrooms.number_bathroom, (i) => (
            <UppyImage
              key={i}
              label={`Ảnh phòng tắm ${i + 1}`}
              subLabel="Vui lòng đăng ảnh phòng tắm cho căn hộ của bạn"
              type_txt={`bathroom_${i + 1}`}
              typeUpload={{ type: 'setBathRoomImage' }}
              initImages={
                listing.bathrooms[`bathroom_${i + 1}`]
                  ? listing.bathrooms[`bathroom_${i + 1}`].images
                  : []
              }
            />
          ))}
          <UppyImage
            label="Ảnh phòng bếp"
            subLabel="Vui lòng đăng ảnh phòng bếp cho căn hộ của bạn"
            typeUpload={{ type: 'setKitchensImage' }}
            initImages={listing.kitchens.images ? listing.kitchens.images : []}
          />
          {/* {useMemo(
            () => (
              <UppyImage
                label="Ảnh lối ra vào, khu vực xunh quanh"
                subLabel="Vui lòng đăng ảnh lối ra vào, khu vực xunh quanh cho căn hộ của bạn"
                typeUpload={{ type: 'setOutdoorsImage' }}
                initImages={listing.outdoors.images ? listing.outdoors.images : []}
              />
            ),
            [listing.outdoors.images]
          )}
          {useMemo(
            () => (
              <UppyImage
                label="Ảnh tiện nghi, đồ dùng trang trí nội thất"
                subLabel="Vui lòng đăng ảnh tiện nghi, đồ dùng trang trí nội thất cho căn hộ của bạn"
                typeUpload={{ type: 'setFurnituresImage' }}
                initImages={listing.furnitures.images ? listing.furnitures.images : []}
              />
            ),
            [listing.furnitures.images]
          )} */}
        </Fragment>
      ) : (
        ''
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

export default UploadImage;
