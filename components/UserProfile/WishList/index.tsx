import React, { FC, Fragment, useMemo, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { getFavoriteRoom } from './context';
import RoomCard from '@/components/RoomCard';

const WishList: FC = (props) => {
  const [wishListRooms, setWishListRooms] = useState<any>([]);

  useEffect(() => {
    getFavoriteRoom()
      .then((res) => {
        setWishListRooms(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(wishListRooms);
  }, [wishListRooms]);
  return (
    <Fragment>
      {wishListRooms ? (
        <Fragment>
          {wishListRooms.map((room) => {
            console.log(room.rooms.data[0]);
            return (
              <div style={{ width: '50%' }}>
                <RoomCard room={room.rooms.data[0]} useSwiperImages={true} />
              </div>
            );
          })}
        </Fragment>
      ) : (
        'loading'
      )}
    </Fragment>
  );
};

export default WishList;
