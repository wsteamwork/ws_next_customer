import React, { useEffect, useReducer, memo } from 'react';
import { NextPage } from 'next';
import {
  ProfileViewContext,
  ProfileViewReducer,
  ProfileViewStateInit,
  getRoomMerchantById
} from '@/store/Context/Profile/ProfileViewContext';
import HostInfo from '@/components/HostInfo';
import {
  RoomDetailsReducer,
  RoomDetailsStateInit,
  RoomDetailsContext,
  getRoom
} from '@/store/Context/Room/RoomDetailContext';

const Test: NextPage = () => {
  const [state, dispatch] = useReducer(ProfileViewReducer, ProfileViewStateInit);
  const [state2, dispatch2] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { userRooms } = state;
  const { room } = state2;

  // useEffect(() => {
  //   getRoomMerchantById(10000).then((res) => {
  //     dispatch({
  //       type: 'setUserRooms',
  //       rooms: res.data
  //     });
  //   });
  //   getRoom(3732).then((res) => {
  //     dispatch2({
  //       type: 'setDetails',
  //       room: res,
  //     });
  //   });
  // }, []);
  return (
    <ProfileViewContext.Provider value={{ state, dispatch }}>
      {/* <RoomDetailsContext.Provider value={{ state2, dispatch2 }}>
        {room && userRooms ? (<HostInfo countRoom={userRooms.length} merchant={room.merchant.data}></HostInfo>): ''}
      </RoomDetailsContext.Provider> */}
    </ProfileViewContext.Provider>
  )
 ;
};

export default memo(Test);
