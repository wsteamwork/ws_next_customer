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
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';

const PriceRange: FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { state, dispatch } = useContext(RoomFilterContext);
  const { price_day_from, price_day_to } = state;

  const checkPrice = useMemo<string>(() => {
    if (price_day_from === MIN_PRICE && price_day_to === MAX_PRICE) {
      return '';
    } else if (price_day_to !== MIN_PRICE && price_day_from === MIN_PRICE) {
      return `đ 0 - ${numeral(price_day_to).format('0,0')}`;
    } else if (price_day_from !== MIN_PRICE && price_day_to > price_day_from) {
      return `đ ${numeral(price_day_from).format('0,0')} - ${numeral(price_day_to).format('0,0')}`;
    }

    return '';
  }, [price_day_from, price_day_to]);

  const onHide = () => {
    setOpen(false);
  };

  const hanldeOpen = () => {
    setOpen(true);
  };

  const handleRemove = () => {
    setOpen(false);
    dispatch({ type: 'setPrices', price_day_from: MIN_PRICE, price_day_to: MAX_PRICE });
  };

  return useMemo(
    () => (
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
    ),
    [checkPrice, open, t]
  );
};

export default memo(PriceRange);
