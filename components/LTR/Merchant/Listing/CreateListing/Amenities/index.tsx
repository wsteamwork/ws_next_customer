import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { Grid } from '@material-ui/core';
import React, { FC, Fragment, useEffect, useState, useContext } from 'react';
import CardAmenities from './CardAmenities';
import { useDispatch, useSelector } from 'react-redux';
import {
  AmenitiesReducerAction,
  getDataAmenities
} from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
import { Dispatch } from 'redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
interface IProps {
  classes?: any;
}
const Amenities: FC<IProps> = (props) => {
  const [amenities, setAmenities] = useState<any>([]);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const dispatch_amen = useDispatch<Dispatch<AmenitiesReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  const commonClick = useSelector<ReducersList, number[]>((state) => state.amenities.common);
  const facilitiesClick = useSelector<ReducersList, number[]>(
    (state) => state.amenities.facilities
  );
  const bathroomsClick = useSelector<ReducersList, number[]>((state) => state.amenities.bathrooms);
  const livingRoomsClick = useSelector<ReducersList, number[]>(
    (state) => state.amenities.livingrooms
  );
  const kitchensClick = useSelector<ReducersList, number[]>((state) => state.amenities.kitchens);
  const bedroomsClick = useSelector<ReducersList, number[]>((state) => state.amenities.bedrooms);
  const entertainmentClick = useSelector<ReducersList, number[]>(
    (state) => state.amenities.entertainment
  );
  const othersClick = useSelector<ReducersList, number[]>((state) => state.amenities.others);
  const getAmenitiesList = async () => {
    const url = `comforts`;
    const res: AxiosRes<any> = await axios_merchant.get(url);
    setAmenities(res.data);
    return res.data;
  };
  useEffect(() => {
    if(!amenities.length) {
      getAmenitiesList();
      getDataAmenities(id, dispatch_amen);
    }
  }, []); 
  useEffect(() => {
    dispatch_detail({ type: 'setStep', payload: 'tab2' });
  }, []);

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} className="wrapper">
          {amenities['facilities'] ? (
            <CardAmenities
              label={amenities['facilities'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['facilities']}
              dataClick={facilitiesClick.length ? facilitiesClick : []}
              typeUpload={{ type: 'setFacilities' }}
            />
          ) : (
            ''
          )}
          {amenities['bathrooms'] ? (
            <CardAmenities
              label={amenities['bathrooms'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['bathrooms']}
              dataClick={bathroomsClick.length ? bathroomsClick : []}
              typeUpload={{ type: 'setBathRooms' }}
            />
          ) : (
            ''
          )}
          {amenities['kitchens'] ? (
            <CardAmenities
              label={amenities['kitchens'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['kitchens']}
              dataClick={kitchensClick.length ? kitchensClick : []}
              typeUpload={{ type: 'setKitChens' }}
              />
              ) : (
            ''
            )}
          {amenities['entertainments'] ? (
            <CardAmenities
            label={amenities['entertainments'][0].type_txt}
            sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
            amenities={amenities['entertainments']}
            dataClick={entertainmentClick.length ? entertainmentClick : []}
            typeUpload={{ type: 'setEntertainment' }}
            />
          ) : (
            ''
          )}
          {/* {amenities['outdoors'] ? (
            <CardAmenities
              label={amenities['outdoors'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['outdoors']}
              dataClick={outdoorsClick.length ? outdoorsClick : []}
              typeUpload={{ type: 'setOutdoors' }}
            />
          ) : (
            ''
          )} */}
          {amenities['others'] ? (
            <CardAmenities
              label={amenities['others'][0].type_txt}
              sub_label="Những tiện tích thiết yếu thường được du khách chú trọng khi đặt phòng."
              amenities={amenities['others']}
              dataClick={othersClick.length ? othersClick : []}
              typeUpload={{ type: 'setOthers' }}
            />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Amenities;
