export const IS_SEARCH_CITY = 1;
export const IS_SEARCH_DISTRICT = 2;
export const IS_SEARCH_ROOM = 3;

export interface SearchSuggestRes {
  city?: (CityEntity)[];
  district?: (DistrictEntity)[];
  room?: (RoomEntity)[];
}
export interface CityEntity {
  id: number;
  name: string;
  hot: number;
  hot_txt: string;
  type: number;
  description: string;
  city: string;
  number_room: number;
  country: string;
}
export interface DistrictEntity {
  id: number;
  name: string;
  hot: number;
  hot_txt?: null;
  type: number;
  description: string;
  city: string;
  number_room: number;
  country: string;
}
export interface RoomEntity {
  id: number;
  name: string;
  hot: number;
  hot_txt?: null;
  room_type_text: string;
  type: number;
  description: string;
  city?: null;
  country: string;
  number_room?: number;
}
