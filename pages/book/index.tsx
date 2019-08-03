import React, { useContext, useReducer, useEffect } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import { Grid } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import { GlobalContext } from '@/store/Context/GlobalContext';
import {
  BookingDetailContext,
  BookingDetailReducer,
  BookingDetailStateInit,
  getRoomBookingDetail
} from '@/store/Context/Booking/BookingDetailContext';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import BookingInfoDetail from '@/components/Book/BookingInfoDetail';

const Book: NextPage = (props) => {
  const { width, router } = useContext(GlobalContext);
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.booking.dataCalculate
  );
  const [state, dispatch] = useReducer(BookingDetailReducer, BookingDetailStateInit);

  const isWide = width === 'lg' || width === 'xl' || width === 'md';
  const xsMode = width === 'xs';

  useEffect(() => {
    if (!!dataCalculate) {
      getRoomBookingDetail(dataCalculate.room_id, dispatch, router);
    } else {
      router.push('/');
    }
  }, []);

  return (
    <Grid className="book">
      <NavHeader></NavHeader>
      <BookingDetailContext.Provider value={{ state, dispatch }}>
        <GridContainer xs={11} lg={9} className={'container'} spacing={0}>
          <Grid
            container
            spacing={xsMode ? 0 : 8}
            className={'marginContainer'}
            direction={isWide ? 'row' : 'column-reverse'}>
            <Grid item xl={8} lg={8} md={7} xs={12}>
              {/* <BookingForm state={state} /> */}
            </Grid>
            <Grid item xl={4} lg={4} md={5} xs={12}>
              <BookingInfoDetail />
            </Grid>
          </Grid>
        </GridContainer>
      </BookingDetailContext.Provider>
    </Grid>
  );
};

export default Book;
