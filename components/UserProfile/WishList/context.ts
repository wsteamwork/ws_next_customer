import { FavoriteRoomReq } from '@/types/Requests/Rooms/RoomRequests';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { FavoriteRoomRes } from '@/types/Requests/Rooms/RoomResponses';
import { BaseResponse } from '@/types/Requests/ResponseTemplate';

export const addFavoriteRoom = async (body: FavoriteRoomReq): Promise<FavoriteRoomRes> => {
  const res: AxiosResponse<FavoriteRoomRes> = await axios.post('wish-list', body);
  return res.data;
};

export const getFavoriteRoom = async (): Promise<BaseResponse<FavoriteRoomRes[]>> => {
  const res: AxiosResponse<BaseResponse<FavoriteRoomRes[]>> = await axios.get(
    'wish-list?&include=rooms.media,rooms.details,roomsm.reviews,rooms.district,rooms.city'
  );
  return res.data;
};

export const deleteFavoriteRoom = async (body: FavoriteRoomReq): Promise<FavoriteRoomRes> => {
    const res: AxiosResponse<FavoriteRoomRes> = await axios.post('wish-list/delete-from-wishlist', body);
    return res.data;
  };