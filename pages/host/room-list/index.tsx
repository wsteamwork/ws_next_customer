import { NextPage } from 'next';
import React, { Fragment } from 'react';
import RoomListHost from '@/components/LTR/Merchant/Listing/RoomList';

const RoomList: NextPage = (props) => {
  return (
    <Fragment>
      <RoomListHost />
    </Fragment>
  );
};

export default RoomList;
