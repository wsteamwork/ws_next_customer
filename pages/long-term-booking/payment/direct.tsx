import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import { getInvoice } from '@/store/Redux/Reducers/Book/book';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import NextHead from '@/components/NextHead';
import { useSelector } from 'react-redux';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import GridContainer from '@/components/Layout/Grid/Container';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import DirectPayment from '@/components/LTR/LTBook/LTPayment/DirectPayment';
import { Grid } from '@material-ui/core';
import { getCookieFromReq } from '@/utils/mixins';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { getLTInvoice } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';

const Direct: NextPage = () => {
  const error = useSelector<ReducersList, boolean>((state) => state.ltBooking.LTPaymentError);
  const longTermRoom = useSelector<ReducersList, LTRoomIndexRes>(
    (state) => state.ltBooking.LTDataInvoice.longTermRoom.data
  );
  const lists = useSelector<ReducersList, PaymentBankListRes>(
    (state) => state.ltBooking.LTDataInvoice
  );

  const { router } = useContext(GlobalContext);

  useEffect(() => {
    console.log(error);
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {/* {!!room && (
        <NextHead
          ogSitename="Westay - Đặt phòng homestay trực tuyến"
          title={`Thanh toán booking của phòng ${longTermRoom.about_room.name}`}
          description={`Thanh toán booking của phòng ${longTermRoom.about_room.name}`}
          url={`/payment/invoice/${lists.uuid}`}
          ogImage={`${IMAGE_STORAGE_LG}${longTermRoom.media.data[0].image}`}></NextHead>
      )} */}

      {useMemo(
        () => (
          <Grid className="directPayment">
            <NavHeader></NavHeader>
            <GridContainer xs={11} md={8} classNameItem="directPayment__content">
              <DirectPayment></DirectPayment>
            </GridContainer>
            <Footer></Footer>
          </Grid>
        ),
        []
      )}
    </Fragment>
  );
};

Direct.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const res = await getLTInvoice(query, store.dispatch, initLanguage);
  return {};
};

export default Direct;
