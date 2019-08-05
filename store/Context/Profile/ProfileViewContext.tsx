import { createContext, Dispatch, Reducer } from 'react';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { updateObject } from '@/store/Context/utility';
import { AxiosRes, BaseResponse } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
// import { History } from "history";
import { AxiosError } from 'axios';
import _ from 'lodash';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { NextRouter } from 'next/router';

export const ProfileViewContext = createContext<IProfileViewContext | any>(null);

export interface IProfileViewContext {
  state: ProfileViewState;
  dispatch: Dispatch<ProfileViewAction>;
}

export type ProfileViewAction =
  | {
    type: 'setData';
    profile: ProfileViewInfoRes;
    userRooms: RoomIndexRes[];
  }
  | { type: 'setUserRooms'; rooms: RoomIndexRes[] };

export type ProfileViewState = {
  readonly profile?: ProfileViewInfoRes | null;
  readonly userRooms?: RoomIndexRes[];
};

export const ProfileViewStateInit: ProfileViewState = {
  profile: null,
  userRooms: []
};

export const ProfileViewReducer: Reducer<ProfileViewState, ProfileViewAction> = (state: ProfileViewState, action: ProfileViewAction) => {
  switch (action.type) {
    case 'setData':
      return updateObject<ProfileViewState>(state, {
        profile: action.profile,
        userRooms: action.userRooms
      });
    case 'setUserRooms':
      return updateObject<ProfileViewState>(state, {
        userRooms: action.rooms
      });
    default:
      return state;
  }
};

export const getProfileById = async (idUser: number) => {
  const res: AxiosRes<ProfileViewInfoRes> = await axios.get(`/profile/${idUser}`);
  return res.data;
};

export const getRoomMerchantById = async (idUser: number) => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(
    `rooms?merchant=${idUser}&include=reviews.user,details,media,city,district`
  );
  return res.data;
};

export const getDataViewProfile = (
  id: number,
  dispatch: Dispatch<ProfileViewAction>,
  router: NextRouter
) => {
  if (isNaN(id)) router.push('/');

  Promise.all([getProfileById(id), getRoomMerchantById(id)])
    .then((res) => {
      const [user, userRooms] = res;
      dispatch({
        type: 'setData',
        profile: user.data,
        userRooms: userRooms.data
      });
    })
    .catch((err: AxiosError) => {
      // console.log('Profile view context: ' + err);
      router.push('/404');
    });
};
