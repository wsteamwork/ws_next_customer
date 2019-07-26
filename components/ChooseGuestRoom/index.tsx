import React, { useState, FC, useMemo, memo } from 'react';
import { ClickAwayListener, Grid, Collapse, InputBase } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

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
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="chooseGuestRoom">
        <Grid container className="root" onClick={() => setOpen(true)}>
          <span className="flex_columCenter">
            <FontAwesomeIcon icon={faPersonBooth} size="1x"></FontAwesomeIcon>
            <InputBase value={valueInput} className="input" placeholder={'Chọn sô phòng & người'} />
          </span>
        </Grid>

        <Collapse in={open} className="viewAction">
          <span className="arrow-up arrow"></span>
          <ActionChoose setOpen={setOpen}></ActionChoose>
        </Collapse>
      </div>
    </ClickAwayListener>
  );
};

export default memo(ChooseGuestRoom);
