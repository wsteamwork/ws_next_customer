import React, { Fragment, useEffect, useContext, useMemo } from 'react';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import { NextPage } from 'next';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { getProfile } from '@/store/Redux/Reducers/Profile/profile';
import { useSelector } from 'react-redux';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import MenuProfile from '@/components/Profile/MenuProfile';
import { useCookies } from 'react-cookie';

const Profile: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['_token']);

  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);
  const { router } = useContext(GlobalContext);

  useEffect(() => {
    !!error && router.push('/auth/signin');
    !cookies._token && router.push('/auth/signin');
  }, [error]);

  return (
    <Fragment>
      {!!profile && (
        <NextHead
          ogSitename={`Westay - Đặt phòng homestay trực tuyến`}
          title={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
          description={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
          url={`/profile`}
          ogImage={profile.avatar_url}></NextHead>
      )}

      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <MenuProfile></MenuProfile>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

Profile.getInitialProps = async ({ req, store }: NextContextPage) => {
  const token = getCookieFromReq(req, '_token');
  const res = await getProfile(store.dispatch, token);

  return {};
};
export default Profile;
