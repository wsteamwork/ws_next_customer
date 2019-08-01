import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useContext, useState, useMemo, useEffect } from 'react';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import moment from 'moment';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { BookingPriceCalculatorReq } from '@/types/Requests/Booking/BookingRequests';
import { AxiosRes, AxiosErrorCustom } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';

type ReturnCalculate = {
  numberDay: number;
  checkData: boolean;
  loading: boolean;
  dataCalculate: BookingPriceCalculatorRes;
  error: string | null;
};

export const useCalculatePrice = (): ReturnCalculate => {
  const startDate = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const endDate = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const guestsCount = useSelector<ReducersList, number>((state) => state.booking.numberOfGuest);
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);
  const [loading, setLoading] = useState(false);
  const { router } = useContext(GlobalContext);
  const { dispatch, state } = useContext(RoomDetailsContext);
  const { dataCalculate, error } = state;

  const numberDay: number = useMemo<number>(() => {
    if (!!startDate && !!endDate) {
      if (startDate === endDate) {
        return 1;
      }
      const startValue = moment(startDate);
      const endValue = moment(endDate);

      return Math.abs(startValue.diff(endValue, 'days'));
    }

    return 0;
  }, [endDate, startDate]);

  const checkData = useMemo<boolean>(() => {
    return !!startDate && !!endDate && guestsCount !== 0;
  }, [endDate, startDate, guestsCount]);

  useEffect(() => {
    checkData && getcalculatePrice();
  }, [checkData, endDate, startDate, guestsCount, bookingType]);

  const getcalculatePrice = async () => {
    setLoading(true);

    const body: BookingPriceCalculatorReq = {
      room_id: parseInt(router.query.id as string, 10),
      checkin: startDate,
      checkout: endDate,
      coupon: '',
      number_of_guests: guestsCount,
      booking_type: bookingType
    };

    try {
      const res: AxiosRes<BookingPriceCalculatorRes> = await axios.post(
        'bookings/calculate-price-with-specific-day-price',
        body
      );

      setLoading(false);
      dispatch({ type: 'setDataCalculdate', payload: res.data.data });
      dispatch({ type: 'setError', payload: null });
    } catch (error) {
      const result: AxiosErrorCustom<{ errors: string; exception: string }> = error;

      setLoading(false);
      dispatch({ type: 'setError', payload: result.response.data.data.exception });
      dispatch({ type: 'setDataCalculdate', payload: null });
    }
  };

  return { numberDay, checkData, loading, dataCalculate, error };
};
