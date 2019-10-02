import Amenities from '@/components/LTR/Merchant/Listing/CreateListing/Amenities';
import Description from '@/components/LTR/Merchant/Listing/CreateListing/Description';
import UploadImage from '@/components/LTR/Merchant/Listing/CreateListing/UploadImage';
import ImageCaption from '@/components/LTR/Merchant/Listing/CreateListing/UploadImage/ImageCaption';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import NextHead from '@/components/NextHead';

import React, { Fragment, useEffect, useContext } from 'react';
import {
  handleDetailsListing,
  getListingDetails,
  DetailsReducerAction
} from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { Dispatch } from 'redux';
import { GlobalContext } from '@/store/Context/GlobalContext';

const RoomCreateListing = () => {
  const dispatch = useDispatch<Dispatch<DetailsReducerAction>>();
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.details.listing);
  const current_step = useSelector<ReducersList, string>((state) => state.details.step);

  const data_description = {
    name: useSelector<ReducersList, string>((state) => state.description.name),
    description: useSelector<ReducersList, string>((state) => state.description.description),
    space: useSelector<ReducersList, string>((state) => state.description.space),
    rules: useSelector<ReducersList, string>((state) => state.description.rules)
  };

  const data_amenities = {
    facilities: useSelector<ReducersList, number[]>((state) => state.amenities.facilities),
    kitchens: useSelector<ReducersList, number[]>((state) => state.amenities.kitchens),
    bedrooms: useSelector<ReducersList, number[]>((state) => state.amenities.bedrooms),
    entertainment: useSelector<ReducersList, number[]>(
      (state) => state.amenities.entertainment
    ),
    others: useSelector<ReducersList, number[]>((state) => state.amenities.others)
  };
  const data = (step) => {
    switch (step) {
      case 'tab1':
        return data_description;
      case 'tab2':
        return data_amenities; 
      // case 'tab3':
      //   return data_amenities;
      // case 'tab3':
      //   return data_amenities;
      default:
        return 'tab1';
    }
  };

  useEffect(() => {
    if (!listing) {
      getListingDetails(id, dispatch);
    }
  }, []);
  const getSteps = () => {
    return ['Mô tả căn hộ', 'Tiện nghi'];
    // return ['Mô tả căn hộ', 'Tiện nghi', 'Đăng ảnh', 'Mô tả ảnh'];
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Description />;
      case 1:
        return <Amenities />;
      case 2:
        return <UploadImage />;
      case 3:
        return <ImageCaption />;
      default:
        return 'Unknown step';
    }
  };
  return (
    <Fragment>
      <NextHead
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/host/create-listing"
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>

      <Layout
        title="Bước 2: Thông tin chi tiết"
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={`/host/create-listing/${id}/price`}
        handleAPI={() => handleDetailsListing(listing.room_id, current_step, data(current_step))}
      />
    </Fragment>
  );
};
export default RoomCreateListing;
