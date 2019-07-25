import React, { useState, FC } from 'react';
import { ClickAwayListener, Grid, Collapse, InputBase } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import ActionChoose from './ActionChoose';

const ChooseGuestRoom: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="chooseGuestRoom">
        <Grid container className="root" onClick={() => setOpen(true)}>
          <Grid item xs={1}>
            <FontAwesomeIcon icon={faPersonBooth} size="1x"></FontAwesomeIcon>
          </Grid>

          <InputBase className="input" placeholder={'Chọn sô phòng & người'} />
        </Grid>

        <Collapse in={open} className="viewAction">
          <ActionChoose></ActionChoose>
        </Collapse>
      </div>
    </ClickAwayListener>
  );
};

export default ChooseGuestRoom;
