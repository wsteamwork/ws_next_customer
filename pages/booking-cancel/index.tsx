import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { getPageBookingCancel } from '@/store/Redux/Reducers/Profile/profile';
import { useSelector } from 'react-redux';
import { GlobalContext } from '@/store/Context/GlobalContext';
import NextHead from '@/components/NextHead';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import CancelBooking from '@/components/CancelBooking';

const BookingCancel: NextPage = () => {
  const { router } = useContext(GlobalContext);
  const errorCancelBooking = useSelector<ReducersList, boolean>(
    (state) => state.iProfile.errorCancelBooking
  );
  const bookingById = useSelector<ReducersList, BookingIndexRes>(
    (state) => state.iProfile.bookingById
  );

  useEffect(() => {
    !!errorCancelBooking && router.push('/error');
  }, [errorCancelBooking]);

  return (
    <Fragment>
      {!!bookingById && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename={`Westay - Đặt phòng homestay trực tuyến`}
          title={`Hủy phòng ${bookingById.room.data.details.data[0].name} | Westay - Đặt phòng homestay trực tuyến`}
          description={`Hủy phòng ${bookingById.room.data.details.data[0].name} | Westay - Đặt phòng homestay trực tuyến`}
          url={`/booking-cancel/${bookingById.id}`}
          ogImage={`${IMAGE_STORAGE_LG}${bookingById.room.data.media.data[0].image}`}></NextHead>
      )}

      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <CancelBooking></CancelBooking>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

BookingCancel.getInitialProps = async ({ query, req, store }: NextContextPage) => {
  const token = getCookieFromReq(req, '_token');
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const res = await getPageBookingCancel(store.dispatch, query.id, initLanguage, token);

  return {};
};

export default BookingCancel;
