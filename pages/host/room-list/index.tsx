import { NextPage } from 'next';
import React, { Fragment } from 'react';
import RoomCardItem from '@/components/LTR/Merchant/Listing/RoomList/RoomCardItem';

const RoomList: NextPage = (props) => {
  return (
    <Fragment>
      <RoomCardItem />
    </Fragment>
  );
};

export default RoomList;
