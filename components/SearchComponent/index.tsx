import React, { FC, memo, useContext } from 'react';
import { Grid } from '@material-ui/core';
import SearchAutoSuggestion from '../Home/SearchAutoSuggestion';
import DateRangeSearch from '../Home/DateRangeSearch';
import ChooseGuestRoom from '../Home/ChooseGuestRoom';
import ButtonGlobal from '../ButtonGlobal';
import { useTranslation } from 'react-i18next';
import { Formik, FormikActions } from 'formik';
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ReducersType } from '@/store/Redux/Reducers';
import { SearchFilterState } from '@/store/Redux/Reducers/searchFilter';
import { newRoomLocation } from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import qs from 'query-string';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';
import Router from 'next/router';

interface IProps {
  className?: string;
  filter: SearchFilterState;
}

const SearchComponent: FC<IProps> = (props) => {
  const { className, filter } = props;
  const { dispatch: dispatchGlobal, router } = useContext(GlobalContext);
  const {
    searchText,
    city_id,
    district_id,
    startDate,
    endDate,
    bookingType,
    roomsCount,
    guestsCount
  } = filter;
  const { t } = useTranslation();

  const applySearch = () => {
    const pushQuery: ParsedUrlQueryInput = {
      name: city_id === undefined && district_id === undefined ? searchText : '',
      number_of_rooms: roomsCount,
      check_in: startDate,
      check_out: endDate,
      number_of_guests: guestsCount,
      rent_type: bookingType !== 0 ? bookingType : undefined,
      city_id: city_id ? city_id : '',
      district_id: district_id ? district_id : ''
    };
    dispatchGlobal({ type: 'setOverlay', payload: false });
    Router.push({
      pathname: '/rooms',
      query: pushQuery
    });
  };

  return (
    <Grid container spacing={1} className={className}>
      <Grid item xs={12} md={4}>
        <SearchAutoSuggestion />
      </Grid>
      <Grid item xs={12} md={4}>
        <DateRangeSearch />
      </Grid>
      <Grid item xs={12} md={2}>
        <ChooseGuestRoom />
      </Grid>
      <Grid item xs={12} md={2}>
        <ButtonGlobal padding="0px" width="100%" onClick={applySearch}>
          {t('home:searchComponent:search')}
        </ButtonGlobal>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps),
  memo
)(SearchComponent);
