import React, { FC, useContext } from 'react';
import CustomPopper from '@/components/CustomPopper';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { SearchFilterState, SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { ReducersType } from '@/store/Redux/Reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { updateRouter } from '@/store/Context/utility';

interface IProps {
  filter: SearchFilterState;
  updateBookingType: (type: number) => void;
}

const BookByHour: FC<IProps> = (props) => {
  const { filter, updateBookingType } = props;
  const { bookingType } = filter;
  const { t } = useTranslation();
  const { dispatch, state } = useContext(RoomIndexContext);

  const handleClick = () => {
    if (bookingType === 2) {
      updateBookingType(1);
      updateRouter(true, 'rent_type', 1, 'page', 1);
    } else {
      updateBookingType(2);
      updateRouter(true, 'rent_type', 2, 'page', 1);
    }
  };

  return (
    <CustomPopper
      arrow
      placement="bottom"
      duration={200}
      content={
        <Grid>
          <p>{t('rooms:searchRooms:descBookByHour')}</p>
        </Grid>
      }>
      <Grid
        onClick={handleClick}
        className={classNames('chooseRoomGuest', 'flex_columCenter', {
          haveResult: bookingType === 1
        })}>
        <span className="flex_columCenter chooseRoomGuest__actions">
          <FontAwesomeIcon icon={faClock} size="1x"></FontAwesomeIcon>&nbsp;&nbsp;
          <p>{t('rooms:searchRooms:bookByHour')}</p>
        </span>
        {bookingType === 1 && (
          <span className="chooseRoomGuest__removeIcon">
            <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
          </span>
        )}
      </Grid>
    </CustomPopper>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateBookingType: (type: number) =>
      dispatch({
        type: 'SET_BOOKING_TYPE',
        bookingType: type
      })
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookByHour);
