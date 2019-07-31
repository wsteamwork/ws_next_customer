import React, { memo } from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import mainColor from '@/styles/constants/colors';
import numeral from 'numeral';
import { useCalculatePrice } from '@/store/Context/Room/RoomDetailContext';
import Lottie from 'react-lottie';
import animationData from '@/assets/lottie/simple-loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData
};

const TotalPrice = () => {
  const { checkData, numberDay, loading, dataCalculate } = useCalculatePrice();

  console.log(dataCalculate);

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
        ) : (
          dataCalculate && (
            <Grid>
              <Grid container className="totalPrice__original">
                <Grid item xs={6}>
                  <p className="totalPrice__left">Giá {numberDay} đêm</p>
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
                    Phí dịch vụ{' '}
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title={<p className="totalPrice__tooltip">Phí dịch vụ và phí khác</p>}
                      placement="top">
                      <span>
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          size="1x"
                          color={mainColor.primary}></FontAwesomeIcon>
                      </span>
                    </Tooltip>
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p className="totalPrice__right">
                    {numeral(dataCalculate.service_fee).format('0,0')} VND
                  </p>
                </Grid>
              </Grid>
              <Grid container className="totalPrice__total">
                <Grid item xs={6}>
                  <p className="totalPrice__left">Tổng cộng</p>
                </Grid>
                <Grid item xs={6}>
                  <p className="totalPrice__right">
                    {numeral(dataCalculate.total_fee).format('0,0')} VND
                  </p>
                </Grid>
              </Grid>
            </Grid>
          )
        )}
      </Grid>
    )
  );
};

export default memo(TotalPrice);
