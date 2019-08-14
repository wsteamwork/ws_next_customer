import { Dispatch, Reducer } from 'react';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '@/store/Context/utility';
import { AxiosRes, Pagination, BaseResponse } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { BookingIndexParams } from '@/types/Requests/Booking/BookingRequests';
//ts-ignore
import qs from 'query-string';
import { AxiosError, AxiosResponse } from 'axios';
import { ReducresActions } from '..';

export type ProfileAction =
  | { type: 'SET_I_PROFILE'; payload: ProfileInfoRes }
  | { type: 'SET_DATA_STATUS_BOOKING'; payload: BookingIndexRes[] }
  | { type: 'SET_ERROR_PROFILE'; payload: boolean }
  | { type: 'SET_META_BOOKING'; payload: Pagination };

export type ProfileState = {
  readonly profile: ProfileInfoRes | null;
  readonly bookings: BookingIndexRes[];
  readonly metaBookings: Pagination | null;
  readonly error: boolean;
};

export const init: ProfileState = {
  profile: null,
  bookings: [],
  error: false,
  metaBookings: null
};

export const iProfileReducer: Reducer<ProfileState, ProfileAction> = (
  state: ProfileState = init,
  action: ProfileAction
) => {
  switch (action.type) {
    case 'SET_DATA_STATUS_BOOKING':
      return updateObject(state, { bookings: action.payload });
    case 'SET_I_PROFILE':
      return updateObject(state, { profile: action.payload });
    case 'SET_ERROR_PROFILE':
      return updateObject(state, { error: action.payload });
    case 'SET_META_BOOKING':
      return updateObject(state, { metaBookings: action.payload });

    default:
      return state;
  }
};

export const getProfile = async (
  dispath: Dispatch<ReducresActions>,
  token?: string
): Promise<ProfileInfoRes> => {
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res: AxiosRes<ProfileInfoRes> = await axios.get('profile?include=city,district', headers);
    dispath({ type: 'SET_I_PROFILE', payload: res.data.data });
    dispath({ type: 'SET_ERROR_PROFILE', payload: false });
    return res.data.data;
  } catch (err) {
    dispath({ type: 'SET_ERROR_PROFILE', payload: true });
  }
};

export const getUserBookingList = async (
  status: number,
  page: number = 1
): Promise<BaseResponse<BookingIndexRes[]>> => {
  const res: AxiosResponse<BaseResponse<BookingIndexRes[]>> = await axios.get(
    `bookings?include=room.details,room.media&status=${status}&limit=5&page=${page}`
  );

  return res.data;
};
