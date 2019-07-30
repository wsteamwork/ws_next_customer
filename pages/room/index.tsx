import React, { useContext, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { GlobalContext } from '@/store/Context/GlobalContext';
import GridContainer from '@/components/Layout/Grid/Container';
import BoxBooking from '@/components/Room/BoxBooking';

const Room: NextPage = () => {
  const { router } = useContext(GlobalContext);

  console.log(router);

  return (
    <GridContainer lg={10}>
      <BoxBooking></BoxBooking>
    </GridContainer>
  );
};

export default Room;
