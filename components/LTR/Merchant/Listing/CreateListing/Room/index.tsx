import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import Grid from '@material-ui/core/Grid/Grid';
import React, { Dispatch, FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBedRoom from './AddBedRoom';
import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
interface IProps {}

const Room: FC<IProps> = (props) => {
  const { guestRecommendation, maxGuest, bedRoomsNumber, bedRooms } = useSelector<
    ReducersList,
    CreateListingState
  >((state) => state.createListing);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [guest, setGuest] = useState<number>(guestRecommendation);
  const [maxGuests, setMaxGuests] = useState<number>(maxGuest);
  const [bedRoomsList, setBedRoomsList] = useState<BedRoomReq>(bedRooms);

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


  const bedRoomsNumberArray = (length: number) =>
    Array.from(new Array(length), (val: any, index: number) => ++index);

  const callBackOnChange = (value: any) => {
    dispatch({
      type: 'SET_BEDROOMS_NUMBER',
      payload: parseInt(value)
    });
    let bedRoomsTemp: any = {};
    for (let i = 1; i <= parseInt(value); i++) {
      bedRoomsTemp[`bedroom_${i}`] = {
        number_bed: 0,
        beds: [],
        area: 0
      };
    }
    bedRoomsTemp['number_bedroom'] = parseInt(value);
    setBedRoomsList(bedRoomsTemp);
  };

  return (
    <div className="step1-tab2-room">
      <Grid className="createListing-title">
        <Grid className="createListing-heading-1">
          Bạn có thể cung cấp dịch vụ cho bao nhiêu khách
        </Grid>
      </Grid>

      <QuantityButtons
        containerWidth={'66.67%'}
        number={guest}
        setNumber={setGuest}
        title={'Khách'}></QuantityButtons>
      <QuantityButtons
        number={maxGuests}
        setNumber={setMaxGuests}
        title={'Số khách tối đa'}
        containerWidth={'66.67%'}></QuantityButtons>
      <Grid style={{ paddingRight: 10 }}>
        <SelectCustom
          value={bedRoomsNumber}
          callBackOnChange={callBackOnChange}
          unit={' phòng ngủ'}
          title="Bạn có thể cung cấp bao nhiêu phòng ngủ cho khách?"
          options={bedRoomsNumberArray(50)}
          twoThirdWidth={true}
        />
      </Grid>

      <Grid className="createListing-heading-2">Sắp xếp chỗ ngủ</Grid>
      <h3 className="createListing-subTitle">
        Cung cấp chi tiết về chỗ ngủ sẽ giúp khách có được sự lựa chọn tốt hơn
      </h3>

      {bedRoomsNumberArray(bedRoomsNumber).map((number) => (
        <AddBedRoom
          roomNumber={number}
          bedRoomsList={bedRoomsList}
          setBedroomsList={setBedRoomsList}
        />
      ))}
    </div>
  );
};

export default Room;
