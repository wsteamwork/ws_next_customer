import { updateObject } from '@/store/Context/utility';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { createContext, Dispatch, Reducer } from 'react';
import { formatTime } from '@/utils/mixins';
import { BookingPriceCalculatorReq } from '@/types/Requests/Booking/BookingRequests';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { axios } from '@/utils/axiosInstance';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';

export const BookingDetailContext = createContext<IBookingDetailContext>(
  null as IBookingDetailContext
);

export interface IBookingDetailContext {
  state: BookingDetailState;
  dispatch: Dispatch<BookingDetailAction>;
}

export type BookingDetailState = {
  readonly room: RoomIndexRes | null;
  readonly price?: BookingPriceCalculatorRes | null;
  readonly coupon: string;
  readonly discount: number;
  readonly success?: boolean;
  readonly profile: ProfileInfoRes | null;
};

export type BookingDetailAction =
  | { type: 'setRoom'; room: RoomIndexRes; price: BookingPriceCalculatorRes }
  | { type: 'setCoupon'; coupon: string; discount: number }
  | { type: 'removeCoupon' }
  | { type: 'setProfile'; profile: ProfileInfoRes }
  | { type: 'setSuccess'; success: boolean };

export const BookingDetailStateInit: BookingDetailState = {
  room: null,
  coupon: '',
  discount: 0,
  price: null,
  profile: null,
  success: false
};

export interface IBookingDetailParams {
  checkin: string;
  checkout: string;
  checkin_hour: number;
  checkout_hour: number;
  checkout_minute?: number;
  checkin_minute?: number;
  hosting_id: number;
  number_guests: number;
  booking_type: number;
  instant_book: number;
}

export const BookingDetailReducer: Reducer<BookingDetailState, BookingDetailAction> = (
  state: BookingDetailState,
  action: BookingDetailAction
): BookingDetailState => {
  switch (action.type) {
    case 'setRoom':
      return updateObject<BookingDetailState>(state, {
        room: action.room,
        price: action.price
      });
    case 'setCoupon':
      return updateObject<BookingDetailState>(state, {
        coupon: action.coupon,
        discount: action.discount
      });
    case 'removeCoupon':
      return updateObject<BookingDetailState>(state, {
        coupon: '',
        discount: 0
      });
    case 'setProfile':
      return updateObject<BookingDetailState>(state, {
        profile: action.profile
      });
    case 'setSuccess':
      return updateObject<BookingDetailState>(state, {
        success: action.success
      });
    default:
      return state;
  }
};

export const priceCalculate = async (params: IBookingDetailParams) => {
  let additional_fee = 0;
  let discount = 0;
  let CI = '';
  let CO = '';
  try {
    CI = formatTime(params.checkin, params.checkin_hour, params.checkin_minute);
    CO = formatTime(params.checkout, params.checkout_hour, params.checkout_minute);
  } catch (e) {
    console.error(e);
  }

  const data: BookingPriceCalculatorReq = {
    room_id: params.hosting_id,
    checkin: CI,
    checkout: CO,
    additional_fee: additional_fee,
    number_of_guests: params.number_guests,
    booking_type: params.booking_type,
    price_discount: discount
  };

  const res: AxiosRes<BookingPriceCalculatorRes> = await axios.post(
    'bookings/price-calculator',
    data
  );
  //   const info: AxiosRes<RoomIndexRes>                  = await axios.get(`rooms/${params.hosting_id}?include=details,media`);

  return res.data;
};

export const getRoomBookingDetail = async (params: IBookingDetailParams) => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(
    `rooms/${params.hosting_id}?include=details,media`
  );

  return res.data;
};

export const getProfile = async () => {
  const res: AxiosRes<ProfileInfoRes> = await axios.get('profile');
  return res.data;
};
