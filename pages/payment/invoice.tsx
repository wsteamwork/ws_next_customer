import React, { Fragment, useEffect, useContext, useMemo } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getInvoice } from '@/store/Redux/Reducers/Book/book';
import { useSelector } from 'react-redux';
import { GlobalContext } from '@/store/Context/GlobalContext';
import GridContainer from '@/components/Layout/Grid/Container';
import { Grid } from '@material-ui/core';
import BankList from '@/components/Payment/BankList';
import PaymentInfo from '@/components/Payment/PaymentInfo';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import NextHead from '@/components/NextHead';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';

const Invoice: NextPage = () => {
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
          <Fragment>
            <NavHeader></NavHeader>
            <GridContainer
              xs={11}
              md={10}
              className="paymentInvoice"
              classNameItem={'parentContainer'}>
              <Grid container spacing={2} className={'container'}>
                <Grid item xs={12} md={8} className={'info'}>
                  <BankList />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PaymentInfo />
                </Grid>
              </Grid>
            </GridContainer>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

Invoice.getInitialProps = async ({ query, store }: NextContextPage) => {
  const res = await getInvoice(query, store.dispatch);

  return {};
};

export default Invoice;