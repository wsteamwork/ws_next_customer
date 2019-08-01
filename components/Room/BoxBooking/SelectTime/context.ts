import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { useMemo, Dispatch, useContext, useEffect } from 'react';
import { axios } from '@/utils/axiosInstance';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { BookingAction } from '@/store/Redux/Reducers/booking';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { DataChangePriceByDay, changeDataPriceByDay } from '../DateRangeSingle/context';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import moment from 'moment';

export const useCheckBookingTypeHour = (): [boolean] => {
  const startDate = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const endDate = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);

  const check = useMemo<boolean>(() => {
    return !!startDate && !!endDate && bookingType === 1;
  }, [startDate, endDate, bookingType]);

  return [check];
};

export const getAvailablecCheckout = async (
  date: string,
  id: any,
  dispatch: Dispatch<BookingAction>
): Promise<string[]> => {
  const body = { checkin: date };
  try {
    const res: AxiosRes<string[]> = await axios.post(`rooms/available-checkout-time/${id}`, body);
    dispatch({ type: 'SET_AVAILABLE_CHECKOUT', payload: res.data.data });
    return res.data.data;
  } catch (error) {
    console.log(error.response);
  }
};

interface ReturnMinBookByHourCheckin {
  valueStart: string;
  checkInHour: string;
  available_hour: string[];
  dispatch: Dispatch<BookingAction>;
}

export const useMinBookByHourCheckin = (): ReturnMinBookByHourCheckin => {
  const dispatch = useDispatch<Dispatch<BookingAction>>();
  const startDate = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const endDate = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);
  const checkInHour = useSelector<ReducersList, string>((state) => state.booking.checkInHour);
  const { state } = useContext(RoomDetailsContext);
  const { priceByDay } = state;
  const { router } = useContext(GlobalContext);
  const dataPriceByDay = useMemo<DataChangePriceByDay>(() => changeDataPriceByDay(priceByDay), [
    priceByDay
  ]);

  const available_hour = useMemo<string[]>(() => {
    if (!!dataPriceByDay && !!startDate) {
      const currentDate = moment(startDate).format(DEFAULT_DATE_FORMAT);
      const data = dataPriceByDay[currentDate];

      if (data) {
        return data.available_hour;
      }

      return [];
    }
    return [];
  }, [startDate, dataPriceByDay]);

  const valueStart = useMemo<string>(() => {
    if (available_hour.length > 0) {
      dispatch({ type: 'SET_CHECK_IN_HOUR', payload: available_hour[0] });

      return available_hour[0];
    }

    return '12:00:00';
  }, [available_hour]);

  useEffect(() => {
    if (valueStart !== '12:00:00') {
      getAvailablecCheckout(
        `${moment(startDate).format(DEFAULT_DATE_FORMAT)} ${checkInHour}`,
        router.query.id,
        dispatch
      );
    }
  }, [valueStart, checkInHour]);

  return { valueStart, checkInHour, available_hour, dispatch };
};
