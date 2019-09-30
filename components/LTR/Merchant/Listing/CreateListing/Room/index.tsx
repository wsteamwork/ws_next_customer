import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import AddBedRoom from './AddBedRoom';
import { Typography } from '@material-ui/core';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingState } from '@/store/Context/LTR/CreateListingContext';
interface IProps {}

const Room: FC<IProps> = (props) => {
  const [guest, setGuest] = useState<number>(0);
  const [maxGuest, setMaxGuest] = useState<number>(0);

  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const bedRoomNumbers = useSelector<ReducersList, number>(
    (state) => state.createListing.bedRoomsNumber
  );
  const bedRoomNumbersArray = (length: number) =>
    Array.from(new Array(length), (val: any, index: number) => ++index);


  const callBackOnChange = (value: any) => {
    console.log('callbacl');
    dispatch({
      type: 'SET_BEDROOMS_NUMBER',
      payload: value
    });
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
        number={maxGuest}
        setNumber={setMaxGuest}
        title={'Số khách tối đa'}
        containerWidth={'66.67%'}></QuantityButtons>
      <Grid style={{ paddingRight: 10 }}>
        <SelectCustom
          value={bedRoomNumbers}
          callBackOnChange={callBackOnChange}
          unit={' phòng ngủ'}
          title="Bạn có thể cung cấp bao nhiêu phòng ngủ cho khách?"
          options={bedRoomNumbersArray(50)}
          twoThirdWidth={true}
        />
      </Grid>

      <Grid className="createListing-heading-2">Sắp xếp chỗ ngủ</Grid>
      <h3 className="createListing-subTitle">
        Cung cấp chi tiết về chỗ ngủ sẽ giúp khách có được sự lựa chọn tốt hơn
      </h3>

      {bedRoomNumbersArray(+bedRoomNumbers).map((number) => (
        <AddBedRoom roomNumber={number} />
      ))}
    </div>
  );
};

export default Room;
