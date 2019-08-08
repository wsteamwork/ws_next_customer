import { createContext, Dispatch, Reducer } from 'react';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '@/store/Context/utility';
import { AxiosRes, Pagination } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { BookingIndexParams } from '@/types/Requests/Booking/BookingRequests';
//ts-ignore
import qs from 'query-string';
import { AxiosError } from 'axios';

export const ProfileContext = createContext<IProfileContext | any>(null);

export interface IProfileContext {
  state: ProfileState;
  dispatch: Dispatch<ProfileAction>;
}

export type ProfileAction =
  | {
      type: 'setData';
      profile?: ProfileInfoRes;
      bookings?: BookingIndexRes[];
      meta?: Pagination;
    }
  | { type: 'setDataBooking'; bookings?: BookingIndexRes[]; meta?: Pagination };

export type ProfileState = {
  readonly profile?: ProfileInfoRes | null;
  readonly bookings: BookingIndexRes[];
  readonly metaBookings?: Pagination;
};

export const ProfileStateInit: ProfileState = {
  profile: null,
  bookings: [],
};

export const ProfileReducer: Reducer<ProfileState, ProfileAction> = (
  state: ProfileState,
  action: ProfileAction
) => {
  switch (action.type) {
    case 'setData':
      return updateObject<ProfileState>(state, {
        profile: action.profile,
        bookings: action.bookings,
        metaBookings: action.meta
      });
    case 'setDataBooking':
      return updateObject<ProfileState>(state, {
        bookings: action.bookings,
        metaBookings: action.meta
      });
    default:
      return state;
  }
};

export const getProfile = async (token?: any) => {
  const headers = token && {
    headers: {
      Authorization: token
    }
  };

  try {
    const res: AxiosRes<ProfileInfoRes> = await axios.get('profile?include=city,district', headers);
    return res.data;
  } catch (err) {
    // console.log(err.response);
  }
};

export const getUserBookingList = async (status?: number, page?: number) => {
  const params: Partial<BookingIndexParams> = {
    status,
    include: 'room.details,room.media',
    size: 5,
    page: page
  };
  const res: AxiosRes<BookingIndexRes[]> = await axios.get(`bookings?${qs.stringify(params)}`);
  return res.data;
};

export const getDataProfile = (
  dispatch: Dispatch<ProfileAction>,
  status?: number,
  page?: number
) => {
  Promise.all([getProfile(), getUserBookingList(status, page)])
    .then((res) => {
      const [profile, bookings] = res;

      dispatch({
        type: 'setData',
        profile: profile!.data,
        bookings: bookings.data,
        meta: bookings.meta
      });
    })
    .catch((err: AxiosError) => {
      // console.log(err);
    });
};
