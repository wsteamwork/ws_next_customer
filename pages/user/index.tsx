import React, { Fragment, useEffect, useContext, useMemo } from 'react';
import { NextPage } from 'next';
import { getDataViewProfile } from '@/store/Redux/Reducers/Profile/userProfile';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import NavHeader from '@/components/Toolbar/NavHeader';
import { useSelector } from 'react-redux';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { GlobalContext } from '@/store/Context/GlobalContext';
import Footer from '@/components/Layout/FooterComponent';
import MainProfile from '@/components/UserProfile/MainProfile';
import NextHead from '@/components/NextHead';
import { getCookieFromReq } from '@/utils/mixins';

const UserPage: NextPage = (props) => {
  const { router } = useContext(GlobalContext);
  const profile = useSelector<ReducersList, ProfileViewInfoRes>(
    (state) => state.userProfile.profile
  );
  const error = useSelector<ReducersList, boolean>((state) => state.userProfile.error);

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {useMemo(
        () =>
          !!profile && (
            <NextHead
              ogSitename={`Westay - Đặt phòng homestay trực tuyến`}
              title={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
              description={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
              url={`/user/${profile.id}`}
              ogImage={profile.avatar_url}></NextHead>
          ),
        [profile]
      )}

      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <MainProfile></MainProfile>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

UserPage.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  if (!store.getState().iProfile.profile) {
    const res = await getDataViewProfile(query.id, store.dispatch, initLanguage);
  }

  return {};
};

export default UserPage;
