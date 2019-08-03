import React, { memo, FC } from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import mainColor from '@/styles/constants/colors';
import numeral from 'numeral';
import Lottie from 'react-lottie';
import animationData from '@/assets/lottie/simple-loading.json';
import DetailsPriceDay from './DetailsPriceDay';
import { useTranslation } from 'react-i18next';
import { useCalculatePrice } from './context';
import DetailsPriceService from './DetailsPriceService';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData
};

const TotalPrice: FC = () => {
  const { checkData, numberDay, loading, dataCalculate, error } = useCalculatePrice();
  const { t } = useTranslation();

  return (
    checkData && (
      <Grid className="totalPrice">
        {loading ? (
          <Grid container>
            <Grid item xs={4}>
              <Lottie options={defaultOptions} height="40px" width="100%"></Lottie>
            </Grid>
            <Grid item xs={4}>
              <Lottie options={defaultOptions} height="40px" width="100%"></Lottie>
            </Grid>
            <Grid item xs={4}>
              <Lottie options={defaultOptions} height="40px" width="100%"></Lottie>
            </Grid>
          </Grid>
        ) : dataCalculate && !error ? (
          <Grid>
            <Grid container className="totalPrice__original">
              <Grid item xs={6}>
                <p className="totalPrice__left">
                  {t('room:boxBooking:price')} {numberDay} {t('room:boxBooking:day')}{' '}
                  <DetailsPriceDay
                    numberDay={numberDay}
                    dataCalculate={dataCalculate}></DetailsPriceDay>
                </p>
              </Grid>
              <Grid item xs={6}>
                <p className="totalPrice__right">
                  {numeral(dataCalculate.price_original).format('0,0')} VND
                </p>
              </Grid>
            </Grid>
            <Grid container className="totalPrice__service">
              <Grid item xs={6}>
                <p className="totalPrice__left">
                  {t('room:boxBooking:serviceFee')}{' '}
                  <DetailsPriceService dataCalculate={dataCalculate}></DetailsPriceService>
                </p>
              </Grid>
              <Grid item xs={6}>
                <p className="totalPrice__right">
                  {numeral(
                    dataCalculate.service_fee +
                      dataCalculate.charge_additional_guest +
                      dataCalculate.charge_additional_hour
                  ).format('0,0')}{' '}
                  VND
                </p>
              </Grid>
            </Grid>
            <Grid container className="totalPrice__total">
              <Grid item xs={6}>
                <p className="totalPrice__left">{t('room:boxBooking:total')}</p>
              </Grid>
              <Grid item xs={6}>
                <p className="totalPrice__right">
                  {numeral(dataCalculate.total_fee).format('0,0')} VND
                </p>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid className="totalPrice__error">
            <p>{error}</p>
          </Grid>
        )}
      </Grid>
    )
  );
};

export default memo(TotalPrice);
