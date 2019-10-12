import RoomListHost from '@/components/LTR/Merchant/Listing/RoomList';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { NextPage } from 'next';
import React, { Fragment } from 'react';

const RoomList: NextPage = (props) => {
  return (
    <Fragment>
      <NavHeader_Merchant />
      <RoomListHost />
    </Fragment>
  );
};

export default RoomList;
