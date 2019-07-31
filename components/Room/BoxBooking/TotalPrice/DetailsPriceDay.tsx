import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import mainColor from '@/styles/constants/colors';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import numeral from 'numeral';
import CustomPopper from '@/components/CustomPopper';

interface IProps {
  dataCalculate: BookingPriceCalculatorRes;
}

const DetailsPriceDay: FC<IProps> = (props) => {
  const { dataCalculate } = props;

  return (
    <CustomPopper
      arrow
      placement="top"
      content={
        <Grid className="totalPrice__detailsPrice">
          {dataCalculate.each_day_price.map((item, index) => (
            <Grid container key={index}>
              <Grid item xs={7}>
                <p>Ngày {item.date}</p>
              </Grid>
              <Grid item xs={5}>
                <p>{numeral(item.price_day).format('0,0')}đ</p>
              </Grid>
            </Grid>
          ))}
        </Grid>
      }>
      <span>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          size="1x"
          color={mainColor.primary}></FontAwesomeIcon>
      </span>
    </CustomPopper>
  );
};

export default DetailsPriceDay;
