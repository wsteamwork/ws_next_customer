import React, { FC, useState, useContext, memo, useMemo } from 'react';
import CustomPopper from '@/components/CustomPopper';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import ActionSelect from './ActionSelect';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { useTranslation } from 'react-i18next';

const KindOfRoom: FC = () => {
  const [open, setOpen] = useState(false);
  const { state } = useContext(RoomIndexContext);
  const { roomTypes } = state;
  const { t } = useTranslation();

  const checkRoomTypes = useMemo<boolean>(() => {
    return roomTypes.length > 0;
  }, [roomTypes]);

  return (
    <CustomPopper
      arrow
      placement="bottom"
      duration={200}
      trigger="click"
      isVisible={open}
      theme="light-border"
      onHide={() => setOpen(false)}
      interactive
      content={<ActionSelect setOpen={setOpen}></ActionSelect>}>
      <Grid
        onClick={() => setOpen(true)}
        className={classNames('chooseRoomGuest', { haveResult: checkRoomTypes })}>
        <span className="flex_columCenter">
          <FontAwesomeIcon icon={faBuilding} size="1x"></FontAwesomeIcon>&nbsp;&nbsp;
          <p>{t('rooms:searchRooms:roomsType')}</p>
        </span>
      </Grid>
    </CustomPopper>
  );
};

export default memo(KindOfRoom);
