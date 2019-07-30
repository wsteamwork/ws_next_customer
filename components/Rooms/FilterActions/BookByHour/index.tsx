import React, { useContext } from 'react';
import CustomPopper from '@/components/CustomPopper';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';

const BookByHour = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(RoomIndexContext);
  const { rent_type } = state;

  const handleClick = () => {
    if (rent_type === 2) {
      dispatch({ type: 'setRentType', payload: 1 });
    } else {
      dispatch({ type: 'setRentType', payload: 2 });
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
          haveResult: rent_type === 1
        })}>
        <span className="flex_columCenter chooseRoomGuest__actions">
          <FontAwesomeIcon icon={faClock} size="1x"></FontAwesomeIcon>&nbsp;&nbsp;
          <p>{t('rooms:searchRooms:bookByHour')}</p>
        </span>
        {rent_type === 1 && (
          <span className="chooseRoomGuest__removeIcon">
            <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
          </span>
        )}
      </Grid>
    </CustomPopper>
  );
};

export default BookByHour;
