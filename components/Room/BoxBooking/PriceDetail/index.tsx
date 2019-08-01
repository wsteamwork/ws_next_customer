import React, { useContext, FC, memo } from 'react';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { Grid } from '@material-ui/core';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

const PriceDetail: FC = () => {
  const { state } = useContext(RoomDetailsContext);
  const { room } = state;
  const { t } = useTranslation();

  return (
    room && (
      <Grid container className="priceDetail">
        <Grid item xs={6} className="priceDetail__priceDay flex_center">
          <p>
            {numeral(room.price_day).format('0,0')} VND/ {t('room:boxBooking:day')}
          </p>
        </Grid>
        <Grid item xs={6} className="priceDetail__priceHour flex_center">
          {room.price_hour !== 0 && (
            <p>
              {numeral(room.price_hour).format('0,0')} VND/ 4 {t('room:boxBooking:hours')}
            </p>
          )}
        </Grid>
      </Grid>
    )
  );
};

export default memo(PriceDetail);
