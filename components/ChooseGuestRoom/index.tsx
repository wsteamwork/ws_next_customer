import React, { useState, FC, useMemo, memo } from 'react';
import { Grid, InputBase } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import CustomPopper from '../CustomPopper';

const ActionChoose = dynamic(() => import('./ActionChoose'));

const ChooseGuestRoom: FC = () => {
  const [open, setOpen] = useState(false);
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);

  const valueInput = useMemo(() => {
    if (numberGuest !== 0 && numberRoom !== 0) {
      return `${numberGuest} guest & ${numberRoom} room`;
    }

    return '';
  }, [numberGuest, numberRoom]);

  return (
    <CustomPopper
      arrow
      duration={200}
      trigger="click"
      isVisible={open}
      theme="light-border"
      onHidden={() => setOpen(false)}
      interactive
      content={<ActionChoose setOpen={setOpen}></ActionChoose>}>
      <div className="chooseGuestRoom">
        <Grid container className="root" onClick={() => setOpen(true)}>
          <span className="flex_columCenter">
            <FontAwesomeIcon icon={faDoorClosed} size="1x"></FontAwesomeIcon>
            <InputBase
              readOnly
              value={valueInput}
              className="input"
              placeholder={'Phòng & người'}
            />
          </span>
        </Grid>
      </div>
    </CustomPopper>
  );
};

export default memo(ChooseGuestRoom);
