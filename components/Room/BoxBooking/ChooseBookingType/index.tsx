import React, { FC, ChangeEvent, Dispatch, useMemo, useContext } from 'react';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { Grid, FormControlLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingAction } from '@/store/Redux/Reducers/Booking/booking';
import { useTranslation } from 'react-i18next';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

const ChooseBookingType: FC = () => {
  const dispatch = useDispatch<Dispatch<BookingAction>>();
  const { t } = useTranslation();
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      dispatch({ type: 'SET_BOOKING_TYPE', payload: 1 });
    } else {
      dispatch({ type: 'SET_BOOKING_TYPE', payload: 2 });
    }
  };

  return useMemo(
    () =>
      !!room &&
      room.price_hour !== 0 && (
        <Grid className="boxBooking__chooseBooking">
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={bookingType === 1}
                onChange={handleChange}
                value="checkedA"
              />
            }
            label={t('room:boxBooking:setByHour')}
          />
        </Grid>
      ),
    [bookingType, t]
  );
};

export default ChooseBookingType;
