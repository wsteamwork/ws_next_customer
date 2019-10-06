import React, { Fragment, useContext, useEffect } from 'react';
import NextHead from '@/components/NextHead';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import PriceShortTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/PriceShortTerm';
import LongTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/LongTerm';
import ServiceFee from '@/components/LTR/Merchant/Listing/CreateListing/Step3/ServiceFee';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  IPriceShortTerm,
  IPriceLongTerm,
  IPriceST,
  IPriceLT
} from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import {
  handlePricesListing,
  getListingPrices,
  StepPricesActions
} from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { IServicesFee } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import { Dispatch } from 'redux';
import { PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { GlobalContext } from '@/store/Context/GlobalContext';

const RoomCreateListing = () => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.stepPrice.listing);
  const current_step = useSelector<ReducersList, string>((state) => state.stepPrice.step);
  const disable_next = useSelector<ReducersList, boolean>((state) => state.stepPrice.disable_next);
  const data_ShortTerm = useSelector<ReducersList, IPriceShortTerm>((state => state.priceTerm.priceST));
  const data_LongTerm = useSelector<ReducersList, IPriceLongTerm>((state => state.priceTerm.priceLT));
  const data_serviceFee = useSelector<ReducersList, IServicesFee>((state => state.priceTerm.serviceFee));
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();

  useEffect(() => {
    getListingPrices(id, dispatchStep)
      .catch(err => {
        console.log(err);
      });
  }, []);

  const dataST:IPriceST = {
    prices:data_ShortTerm
  };

  const dataLT:IPriceLT = {
    prices:data_LongTerm
  };

  const data = (step) => {
    switch (step) {
      case 'tab1':
        return dataST;
      case 'tab2':
        return dataLT;
      case 'tab3':
        return data_serviceFee;
      default:
        return null;
    }
  };

  const getSteps = () => {
    if (listing.long_term_rent_type.rent_type === 1) {
      return ['Dài hạn', 'Giá dịch vụ cho thuê dài hạn'];
    }else if (listing.long_term_rent_type.rent_type === 0){
      return ['Ngắn hạn'];
    }else{
      return ['Ngắn hạn', 'Dài hạn', 'Giá dịch vụ cho thuê dài hạn'];
    }
  };

  const getStepContent = (step, steps, setActiveStep, nextLink) => {
    if (listing.long_term_rent_type.rent_type === 1) {
      switch (step) {
        case 0:
          return <LongTerm />;
        case 1:
          return <ServiceFee />;
        default:
          return 'Unknown step';
      }
    }else if (listing.long_term_rent_type.rent_type === 0){
      switch (step) {
        case 0:
          return <PriceShortTerm />;
        default:
          return 'Unknown step';
      }
    }else {
      switch (step) {
        case 0:
          return <PriceShortTerm />;
        case 1:
          return <LongTerm />;
        case 2:
          return <ServiceFee />;
        default:
          return 'Unknown step';
      }
    }
  };

  if (!listing) {return null}
  console.log(listing);
  return (
    <Fragment>
      <NextHead
        ogSitename = 'Westay - Đặt phòng homestay trực tuyến'
        title = 'Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay'
        description = 'Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay'
        url = '/host/create-listing'
        ogImage = '/static/images/Bg_home.4023648f.jpg' />

      {/* <NavHeader></NavHeader> */}
      <Layout
        title = 'Bước 3: Giá và dịch vụ'
        getSteps = {getSteps}
        getStepContent = {getStepContent}
        nextLink = {`/preview-room/${listing.room_id}`}
        disableNext={disable_next}
        handleAPI={() => handlePricesListing(listing.room_id, current_step, data(current_step))}
      />
    </Fragment>
  );
};

export default RoomCreateListing;
