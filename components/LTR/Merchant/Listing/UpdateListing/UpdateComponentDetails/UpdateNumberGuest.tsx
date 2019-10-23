import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { ReducersList } from '@/store/Redux/Reducers';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, useEffect, useState, Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
import { UpdateDetailsState, getDataUpdateListing, UpdateDetailsActions } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Dispatch } from 'redux';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
interface IProps {}

const UpdateNumberGuest: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, guestRecommendation, maxGuest } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const [guest, setGuest] = useState<number>(guestRecommendation);
  const [maxGuests, setMaxGuests] = useState<number>(maxGuest);
  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);
  
  useEffect(() => {
    setGuest(guestRecommendation);
    setMaxGuests(maxGuest);
  }, [guestRecommendation, maxGuest]);
  
  useEffect(() => {
    dispatch({
      type: 'SET_GUEST_RECOMMENDATION',
      payload: guest
    });
  }, [guest]);
  
  useEffect(() => {
    dispatch({
      type: 'SET_MAX_GUEST',
      payload: maxGuests
    });
  }, [maxGuests]);

  const UpdateGuests: any = () => {
    handleUpdateListing(room_id, {
      guests: {
        recommendation: guest,
        max_additional_guest: maxGuests,
      }
    });
  };

  return (
    <Fragment>
      <CardWrapperUpdate handleSave={UpdateGuests}>
        <div className="step1-tab2-room">
          <Grid className="createListing-title">
            <Grid className="createListing-heading-1">
              Bạn có thể cung cấp dịch vụ cho bao nhiêu khách
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <QuantityButtons number={guest} setNumber={setGuest} title={'Khách'}></QuantityButtons>
            <QuantityButtons
              number={maxGuests}
              setNumber={setMaxGuests}
              title={'Số khách tối đa'}></QuantityButtons>
          </Grid>
        </div>
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateNumberGuest;
