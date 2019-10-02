import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import { IListingDetailContext, ListingDetailContext } from '@/store/Context/LTR/ListingDetailContext';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import _ from 'lodash';
import React, { Dispatch, FC, Fragment, SetStateAction, useContext, useEffect, useState } from 'react';
import UppyImage from './UppyImage';
import { useDispatch } from 'react-redux';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) => createStyles({}));

const UploadImage: FC<IProps> = (props) => {
  const [disable, setDisable] = useState(false);
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  const { state } = useContext<IListingDetailContext>(ListingDetailContext);
  const {
    listing,
    avatar_image,
    cover_photo,
    livingrooms,
    bedrooms,
    kitchens,
    bathrooms,
    outdoors,
    furnitures
  } = state;
  useEffect(() => {
    if (!avatar_image.images.length) {
      setDisable(true);
    }
    if (!cover_photo.images.length) {
      setDisable(true);
    }
    if (!livingrooms.images.length) {
      setDisable(true);
    }
    if (!kitchens.images.length) {
      setDisable(true);
    }
    if (!outdoors.images.length) {
      setDisable(true);
    }
    if (!furnitures.images.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [avatar_image, cover_photo, livingrooms, bedrooms, kitchens, bathrooms, outdoors, furnitures]);
  useEffect(() => {
    dispatch_detail({ type: 'setStep', payload: 'tab3' });
  }, []);
  const handleSubmit = async () => {
    const data = {
      avatar_image,
      cover_photo,
      livingrooms,
      bedrooms,
      kitchens,
      bathrooms,
      outdoors,
      furnitures
    };
    try {
      const res: AxiosRes<any> = await axios_merchant.post(
        `long-term/room/step2/tab3/${listing.room_id}`,
        {
          step2: {
            tab3: data
          }
        }
      );
    } catch (error) { }
  };
  return (
    <Fragment>
      {listing ? (
        <Fragment>
          <UppyImage
            label="Ảnh đại diện căn hộ"
            subLabel="Vui lòng đăng 1 ảnh đại diện cho căn hộ của bạn"
            height={350}
            maxImage={1}
            typeUpload={{ type: 'setAvatarImage' }}
            initImages={listing.avatar && listing.avatar.images ? listing.avatar.images : []}
          />
          <UppyImage
            label="Ảnh bìa căn hộ"
            subLabel="Vui lòng đăng 1 ảnh bìa cho căn hộ của bạn"
            height={350}
            maxImage={1}
            typeUpload={{ type: 'setCoverImage' }}
            initImages={
              listing.cover_photo && listing.cover_photo.images ? listing.cover_photo.images : []
            }
          />
          <UppyImage
            label="Ảnh phòng khách"
            subLabel="Vui lòng đăng phòng khách cho căn hộ của bạn"
            typeUpload={{ type: 'setLivingRoomImage' }}
            initImages={
              listing.livingrooms && listing.livingrooms.images ? listing.livingrooms.images : []
            }
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
            initImages={listing.kitchens && listing.kitchens.images ? listing.kitchens.images : []}
          />
          <UppyImage
            label="Ảnh tiện nghi, đồ dùng trang trí nội thất"
            subLabel="Vui lòng đăng ảnh tiện nghi, đồ dùng trang trí nội thất cho căn hộ của bạn"
            typeUpload={{ type: 'setFurnituresImage' }}
            initImages={
              listing.furnitures && listing.furnitures.images ? listing.furnitures.images : []
            }
          />
          <UppyImage
            label="Ảnh lối ra vào, khu vực xunh quanh"
            subLabel="Vui lòng đăng ảnh lối ra vào, khu vực xunh quanh cho căn hộ của bạn"
            typeUpload={{ type: 'setOutdoorsImage' }}
            initImages={listing.outdoors && listing.outdoors.images ? listing.outdoors.images : []}
          />
        </Fragment>
      ) : (
          ''
        )}
    </Fragment>
  );
};

export default UploadImage;
