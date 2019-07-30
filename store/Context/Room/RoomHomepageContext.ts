import { createContext, Dispatch, Reducer } from 'react';
import { RoomIndexRes, NumberRoomCity, TypeApartment } from '@/types/Requests/Rooms/RoomResponses';
import qs from 'query-string';
import { AxiosRes, BaseResponse } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { RoomIndexGetParams, RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import _ from 'lodash';
import { fetchRoom } from './RoomListContext';

export const RoomHomepageContext = createContext<IRoomHomepageContext>(
  null as IRoomHomepageContext
);

export interface IRoomHomepageContext {
  state: RoomHomepageState;
  dispatch: Dispatch<RoomHomepageAction>;
}

export type RoomHomepageAction =
  | { type: 'setRoomHot'; rooms: RoomIndexRes[] }
  | { type: 'setRoomCity'; rooms: NumberRoomCity[] }
  | { type: 'setRoomNew'; rooms: RoomIndexRes[] }
  | { type: 'setRoomsHomepage'; hot: RoomIndexRes[], city: NumberRoomCity[], apartment: TypeApartment[] };

export type RoomHomepageState = {
  readonly roomsHot: RoomIndexRes[];
  readonly roomsCity: NumberRoomCity[] | null;
  readonly roomsNew: RoomIndexRes[];
  readonly apartments: TypeApartment[];
};

export const RoomHomepageStateInit: RoomHomepageState = {
  roomsHot: [],
  roomsCity: null,
  roomsNew: [],
  apartments: []
};

export const RoomHomepageReducer: Reducer<RoomHomepageState, RoomHomepageAction> = (
  state: RoomHomepageState,
  action: RoomHomepageAction
): RoomHomepageState => {
  switch (action.type) {
    case 'setRoomsHomepage':
      return updateObject<RoomHomepageState>(state, {
        roomsHot: action.hot,
        roomsCity: action.city,
        apartments: action.apartment
      });
    case 'setRoomHot':
      return updateObject<RoomHomepageState>(state, {
        roomsHot: action.rooms
      });
    case 'setRoomCity':
      return updateObject<RoomHomepageState>(state, {
        roomsCity: action.rooms
      });
    case 'setRoomNew':
      return updateObject<RoomHomepageState>(state, {
        roomsNew: action.rooms
      });
    default:
      return state;
  }
};

export const getRoomHot = async (): Promise<RoomIndexRes[]> => {
  const query: Partial<RoomIndexGetParams> = {
    include: 'details,media,city,district',
    hot: 1,
    limit: 10
  };
  const url                                = `rooms?${qs.stringify(query)}`;

  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url);

  return res.data.data;
};

export const getRoomCity = async (): Promise<NumberRoomCity[]> => {
  const query: Partial<RoomIndexGetParams> = {
    hot: 1
  };
  const res: AxiosRes<NumberRoomCity[]>    = await axios.get(
    `rooms/number-room-by-city?${qs.stringify(query)}`
  );
  return res.data.data;
};

export const getRoomNew = async (): Promise<RoomIndexRes[]> => {
  const query: Partial<RoomIndexGetParams> = {
    include: 'details,media,city,district',
    limit: 10
  };
  const url                                = `get-new-room?${qs.stringify(query)}`;

  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url);

  return res.data.data;
};

export const getApartments = async (): Promise<TypeApartment[]> => {
  const url = `rooms/room-type-homepage`;

  const res: AxiosRes<TypeApartment[]> = await axios.get(url);

  return res.data.data;
};

export const getRoomsHomepage = (dispatch: Dispatch<RoomHomepageAction>) => {
  Promise.all([
    getRoomHot(),
    getRoomCity(),
    getApartments()
  ]).then(res => {
    const [hot, city, apartment] = res;

    dispatch({
      type: 'setRoomsHomepage',
      hot: hot,
      city: city,
      apartment: apartment
    });

  }).catch(err => {
    console.log(err);
  });
};
