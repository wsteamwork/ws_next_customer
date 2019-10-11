import { NextPage } from 'next';
import React, { Fragment } from 'react';
import RoomListHost from '@/components/LTR/Merchant/Listing/RoomList';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';

const RoomList: NextPage = (props) => {
  return (
    <Fragment>
      {/* <NavHeader_Merchant /> */}
      <RoomListHost />
    </Fragment>
  );
};

export default RoomList;
