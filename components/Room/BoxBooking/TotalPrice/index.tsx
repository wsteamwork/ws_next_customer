import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import CustomPopper from '@/components/CustomPopper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import mainColor from '@/styles/constants/colors';

const TotalPrice = () => {
  return (
    <Grid className="totalPrice">
      <Grid container className="totalPrice__original">
        <Grid item xs={6}>
          <p className="totalPrice__left">Giá 5 đêm</p>
        </Grid>
        <Grid item xs={6}>
          <p className="totalPrice__right">4.500.000 VND</p>
        </Grid>
      </Grid>
      <Grid container className="totalPrice__service">
        <Grid item xs={6}>
          <p className="totalPrice__left">
            Phí dịch vụ{' '}
            <Tooltip title={<p>Phí dịch vụ và phí khác</p>} placement="top">
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
          <p className="totalPrice__right">100.000 VND</p>
        </Grid>
      </Grid>
      <Grid container className="totalPrice__total">
        <Grid item xs={6}>
          <p className="totalPrice__left">Tổng cộng</p>
        </Grid>
        <Grid item xs={6}>
          <p className="totalPrice__right">4.700.000 VND</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TotalPrice;
