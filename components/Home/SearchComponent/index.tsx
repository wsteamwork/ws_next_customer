import React, { FC, memo, Fragment, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SearchAutoSuggestion from '../SearchAutoSuggestion';
import DateRangeSearch from '../DateRangeSearch';
import ChooseGuestRoom from '../ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ReducersType } from '@/store/Redux/Reducers';
import { SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';
import { ParsedUrlQueryInput } from 'querystring';
import Router from 'next/router';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface IProps {
  className?: string;
  filter: SearchFilterState;
  showGuestRoom: boolean;
  closeModal?: () => void;
}

const SearchComponent: FC<IProps> = (props) => {
  const { className, filter, showGuestRoom, closeModal } = props;
  const { dispatch: dispatchGlobal, router } = useContext(GlobalContext);
  const {
    searchText,
    city_id,
    district_id,
    startDate,
    endDate,
    bookingType,
    roomType,
    roomsCount,
    guestsCount
  } = filter;
  const { t } = useTranslation();

  const applySearch = () => {
    closeModal && closeModal();

    dispatchGlobal({ type: 'setOverlay', payload: false });
    const pushQuery: ParsedUrlQueryInput = {
      name: city_id === undefined && district_id === undefined ? searchText : '',
      number_of_rooms: roomsCount,
      check_in: startDate,
      check_out: endDate,
      number_of_guests: guestsCount,
      rent_type: bookingType !== 0 ? bookingType : undefined,
      type_room: roomType !== 0 ? roomType : undefined,
      city_id: city_id ? city_id : '',
      district_id: district_id ? district_id : ''
    };

    Router.push({
      pathname: '/rooms',
      query: pushQuery
    });
  };

  return (
    <Grid container spacing={1} className={className}>
      {showGuestRoom ? (
        <Fragment>
          <Grid item xs={12} md={4}>
            <SearchAutoSuggestion />
          </Grid>
          <Grid item xs={12} md={4}>
            <DateRangeSearch />
          </Grid>
          <Grid item xs={12} md={2}>
            <ChooseGuestRoom />
          </Grid>
        </Fragment>
      ) : (
          <Fragment>
            <Grid item xs={12} md={6}>
              <SearchAutoSuggestion />
            </Grid>
            <Grid item xs={12} md={4}>
              <DateRangeSearch />
            </Grid>
          </Fragment>
        )}

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
