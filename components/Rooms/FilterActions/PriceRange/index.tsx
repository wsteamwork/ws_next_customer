import React, { FC, useState, useContext, useMemo, memo } from 'react';
import CustomPopper from '@/components/CustomPopper';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import ActionRangePrice from './ActionRangePrice';
import { useTranslation } from 'react-i18next';
import { RoomIndexContext, MIN_PRICE, MAX_PRICE } from '@/store/Context/Room/RoomListContext';
import numeral from 'numeral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWaveAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PriceRange: FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { state, dispatch } = useContext(RoomIndexContext);
  const { price } = state;

  const checkPrice = useMemo<string>(() => {
    if (price.min === MIN_PRICE && price.max === MAX_PRICE) {
      return '';
    } else if (price.max !== MIN_PRICE && price.min === MIN_PRICE) {
      return `đ 0 - ${numeral(price.max).format('0,0')}`;
    } else if (price.min !== MIN_PRICE && price.max > price.min) {
      return `đ ${numeral(price.min).format('0,0')} - ${numeral(price.max).format('0,0')}`;
    }

    return '';
  }, [price]);

  const onHide = () => {
    setOpen(false);
  };

  const hanldeOpen = () => {
    setOpen(true);
  };

  const handleRemove = () => {
    setOpen(false);
    dispatch({ type: 'setPrices', price: { min: MIN_PRICE, max: MAX_PRICE } });
  };

  return (
    <CustomPopper
      arrow
      placement="bottom"
      duration={200}
      trigger="click"
      isVisible={open}
      theme="light-border"
      onHide={onHide}
      interactive
      content={<ActionRangePrice setOpen={setOpen}></ActionRangePrice>}>
      <Grid
        className={classNames('chooseRoomGuest', 'flex_columCenter', {
          haveResult: checkPrice !== ''
        })}>
        <span onClick={hanldeOpen} className="flex_columCenter chooseRoomGuest__actions">
          <FontAwesomeIcon icon={faMoneyBillWaveAlt} size="1x"></FontAwesomeIcon>&nbsp;&nbsp;
          <p>{checkPrice !== '' ? checkPrice : t('rooms:searchRooms:priceRange')}</p>
        </span>
        {checkPrice !== '' && (
          <span onClick={handleRemove} className="chooseRoomGuest__removeIcon">
            <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
          </span>
        )}
      </Grid>
    </CustomPopper>
  );
};

export default memo(PriceRange);
