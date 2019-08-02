import React, { FC, ChangeEvent, Dispatch, useMemo } from 'react';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { Grid, FormControlLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingAction } from '@/store/Redux/Reducers/booking';

const ChooseBookingType: FC = () => {
  const dispatch = useDispatch<Dispatch<BookingAction>>();
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      dispatch({ type: 'SET_BOOKING_TYPE', payload: 1 });
    } else {
      dispatch({ type: 'SET_BOOKING_TYPE', payload: 2 });
    }
  };

  return useMemo(
    () => (
      <Grid className="boxBooking__chooseBooking">
        <FormControlLabel
          control={
            <CustomCheckbox checked={bookingType === 1} onChange={handleChange} value="checkedA" />
          }
          label="Đặt theo giờ"
        />
      </Grid>
    ),
    [bookingType]
  );
};

export default ChooseBookingType;
