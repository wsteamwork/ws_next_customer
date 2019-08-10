import { Reducer } from 'react';
import { RoomIndexRes, NumberRoomCity, TypeApartment, Collections } from '@/types/Requests/Rooms/RoomResponses';
import qs from 'query-string';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { RoomIndexGetParams } from '@/types/Requests/Rooms/RoomRequests';
import _ from 'lodash';

export type RoomHomepageAction =
  | { type: 'setRoomHot'; rooms: RoomIndexRes[] }
  | { type: 'setRoomCity'; rooms: NumberRoomCity[] }
  | { type: 'setRoomNew'; rooms: RoomIndexRes[] }
  | { type: 'setApartment'; rooms: TypeApartment[] }
  | { type: 'setCollections'; collections: Collections[] };

export type RoomHomepageState = {
  readonly roomsHot: RoomIndexRes[];
  readonly roomsCity: NumberRoomCity[] | null;
  readonly roomsNew: RoomIndexRes[];
  readonly apartments: TypeApartment[];
  readonly collections: Collections[];
};

export const init: RoomHomepageState = {
  roomsHot: [],
  roomsCity: null,
  roomsNew: [],
  apartments: [],
  collections: []
};

export const roomHomepageReducer: Reducer<RoomHomepageState, RoomHomepageAction> = (
  state: RoomHomepageState = init,
  action: RoomHomepageAction
): RoomHomepageState => {
  switch (action.type) {
    case 'setRoomHot':
      return updateObject<RoomHomepageState>(state, { roomsHot: action.rooms });
    case 'setRoomCity':
      return updateObject<RoomHomepageState>(state, { roomsCity: action.rooms });
    case 'setRoomNew':
      return updateObject<RoomHomepageState>(state, { roomsNew: action.rooms });
    case 'setApartment':
      return updateObject<RoomHomepageState>(state, { apartments: action.rooms });
    case 'setCollections':
      return updateObject<RoomHomepageState>(state, { collections: action.collections });
    default:
      return state;
  }
};

export const getRoomHot = async (): Promise<RoomIndexRes[]> => {
  const query: Partial<RoomIndexGetParams> = {
    include: 'details,media,city,district,merchant',
    hot: 1,
    limit: 10
  };
  const url = `rooms?${qs.stringify(query)}`;

  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url);

  return res.data.data;
};

export const getRoomCity = async (): Promise<NumberRoomCity[]> => {
  const query: Partial<RoomIndexGetParams> = {
    hot: 1
  };
  const res: AxiosRes<NumberRoomCity[]> = await axios.get(
    `rooms/number-room-by-city?${qs.stringify(query)}`
  );
  return res.data.data;
};

export const getRoomNew = async (): Promise<RoomIndexRes[]> => {
  const query: Partial<RoomIndexGetParams> = {
    include: 'details,media,city,district',
    limit: 10
  };
  const url = `get-new-room?${qs.stringify(query)}`;

  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url);

  return res.data.data;
};

export const getApartments = async (): Promise<TypeApartment[]> => {
  const url = `rooms/room-type-homepage`;

  const res: AxiosRes<TypeApartment[]> = await axios.get(url);

  return res.data.data;
};

export const getCollections = async (): Promise<Collections[]> => {
  const url = `collections?include=details,rooms`;

  const res: AxiosRes<Collections[]> = await axios.get(url);

  return res.data.data;
};

// @ts-ignore
export const getRoomsHomepage = async (): Promise<Omit<RoomHomepageState, 'roomsNew'>> => {
  const res = await Promise.all([getRoomHot(), getRoomCity(), getApartments(),getCollections()]);
  const [roomsHot, roomsCity, apartments,collections] = res;

  return {
    roomsHot,
    roomsCity,
    apartments,
    collections
  };
};
