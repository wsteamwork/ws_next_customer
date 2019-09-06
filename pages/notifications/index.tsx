import React, { Fragment, useContext, useEffect, useMemo, Dispatch } from 'react';
import { NextPage } from 'next';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '@/store/Context/GlobalContext';
import Footer from '@/components/Layout/FooterComponent';
import NavHeader from '@/components/Toolbar/NavHeader';
import { useSelector } from 'react-redux';
import Notifications from '@/components/Notifications';
const Notification: NextPage = () => {
  const { router } = useContext(GlobalContext);
  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <Notifications></Notifications>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

export default Notification;

