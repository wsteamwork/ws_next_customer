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
import DirectPayment from '@/components/Payment/DirectPayment';
import { Grid } from '@material-ui/core';

const Direct: NextPage = () => {
  const error = useSelector<ReducersList, boolean>((state) => state.book.error);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.dataInvoice.room.data);
  const lists = useSelector<ReducersList, PaymentBankListRes>((state) => state.book.dataInvoice);

  const { router } = useContext(GlobalContext);

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {!!room && (
        <NextHead
          title={`Thanh toán booking của phòng ${room.details.data[0].name}`}
          description={`Thanh toán booking của phòng ${room.details.data[0].name}`}
          url={`/payment/invoice/${lists.uuid}`}
          ogImage={`${IMAGE_STORAGE_LG}${room.media.data[0].image}`}></NextHead>
      )}

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

Direct.getInitialProps = async ({ query, store }: NextContextPage) => {
  const res = await getInvoice(query, store.dispatch);
  return {};
};

export default Direct;
