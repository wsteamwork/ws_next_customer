import { NextContextPage } from '@/store/Redux/Reducers';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { getCookieFromReq } from '@/utils/mixins';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import NextHead from '@/components/NextHead';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';

const Host: NextPage = () => {
  return (
    <Fragment>
    {/*<NextHead*/}
    {/*  ogSitename={`Westay - Đặt phòng homestay trực tuyến`}*/}
    {/*  title={`Westay - Đặt phòng homestay trực tuyến`}*/}
    {/*  description={`Westay - Đặt phòng homestay trực tuyến`}*/}
    {/*  url={`/host`}*/}
    {/*  ogImage={profile.avatar_url}/>*/}
      <NavHeader_Merchant/>
  </Fragment>
  );
};

Host.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const data = await getDataRoom(store.dispatch, query, initLanguage);
  return {};
};

export default Host;
