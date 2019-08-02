import React, { useContext, FC, memo, useMemo } from 'react';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { Grid } from '@material-ui/core';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

const PriceDetail: FC = () => {
  const { state } = useContext(RoomDetailsContext);
  const { room, dataCalculate } = state;
  const { t } = useTranslation();

  return useMemo(
    () =>
      room && (
        <Grid container className="priceDetail">
          {!!dataCalculate && dataCalculate.days > 5 ? (
            <Grid className="priceDetail__priceDay flex_center">
              <p>
                Trung bình {numeral(room.price_day).format('0,0')} VND/ {t('room:boxBooking:day')}
              </p>
            </Grid>
          ) : (
            <Grid container>
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
          )}
        </Grid>
      ),
    [t, room, dataCalculate]
  );
};

export default memo(PriceDetail);
