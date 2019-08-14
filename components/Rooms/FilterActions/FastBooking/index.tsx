import React, { FC, useContext, memo } from 'react';
import CustomPopper from '@/components/CustomPopper';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import { OfflineBoltRounded } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';

const FastBooking: FC = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(RoomFilterContext);
  const { instant_book } = state;

  const handleClick = () => {
    if (instant_book === 0) {
      dispatch({ type: 'setInstantBook', payload: 1 });
      updateRouter(true, 'instant_book', 1, 'page', 1);
    } else {
      dispatch({ type: 'setInstantBook', payload: 0 });
      updateRouter(true, 'instant_book', 0, 'page', 1);
    }
  };

  return (
    <CustomPopper
      arrow
      placement="bottom"
      duration={200}
      content={
        <Grid>
          <p>{t('rooms:searchRooms:fastPayment')}</p>
        </Grid>
      }>
      <Grid
        onClick={handleClick}
        className={classNames('chooseRoomGuest', 'flex_columCenter', {
          haveResult: instant_book === 1
        })}>
        <span className="flex_columCenter chooseRoomGuest__actions">
          {/* <OfflineBoltRounded fontSize="small"></OfflineBoltRounded>&nbsp;&nbsp; */}
          <p>{t('rooms:searchRooms:fastBooking')}</p>
        </span>
        {/* {instant_book === 1 && (
          <span className="chooseRoomGuest__removeIcon">
            <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
          </span>
        )} */}
      </Grid>
    </CustomPopper>
  );
};

export default memo(FastBooking);
