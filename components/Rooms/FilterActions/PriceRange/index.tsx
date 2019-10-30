import CustomPopper from '@/components/CustomPopper';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRangePrice from './ActionRangePrice';
import { usePriceRange } from './context';

const PriceRange: FC = () => {
  const { t } = useTranslation();
  const { open, onHide, checkPrice, setOpen, hanldeOpen, handleRemove } = usePriceRange();

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
            {/* <FontAwesomeIcon icon={faMoneyBillWaveAlt} size="1x"></FontAwesomeIcon>&nbsp;&nbsp; */}
            <p>{checkPrice !== '' ? checkPrice : t('rooms:searchRooms:priceRange')}</p>
          </span>
          {/* {checkPrice !== '' && (
            <span onClick={handleRemove} className="chooseRoomGuest__removeIcon">
              <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
            </span>
          )} */}
        </Grid>
      </CustomPopper>
    ),
    [checkPrice, open, t]
  );
};

export default memo(PriceRange);
