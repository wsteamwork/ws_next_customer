import React, { FC, useState, memo, useMemo, useCallback } from 'react';
import CustomPopper from '@/components/CustomPopper';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ActionSelect from './ActionSelect';
import { useTranslation } from 'react-i18next';
import { useRoomTypeChecbox, RoomTypeData } from './context';

const RoomType: FC = () => {
  const [open, setOpen] = useState(false);
  const [dataClick, setDataClick] = useState<number[]>([]);
  const { handleRemove, roomTypes } = useRoomTypeChecbox(setOpen, dataClick, setDataClick);
  const { t } = useTranslation();

  const checkRoomTypes = useMemo<boolean>(() => {
    return roomTypes.length > 0;
  }, [roomTypes]);

  const onHide = useCallback(() => {
    setOpen(false);
    setDataClick(roomTypes);
  }, [open, roomTypes]);

  // const onHide = () => {
  //   setOpen(false);
  //   setDataClick(roomTypes);
  // };

  const hanldeOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  // const hanldeOpen = () => {
  //   setOpen(true);
  // };

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
        content={
          <ActionSelect
            dataClick={dataClick}
            setDataClick={setDataClick}
            setOpen={setOpen}></ActionSelect>
        }>
        <Grid
          className={classNames('chooseRoomGuest', 'flex_columCenter', {
            haveResult: checkRoomTypes
          })}>
          <span onClick={hanldeOpen} className="flex_columCenter chooseRoomGuest__actions">
            {/* <FontAwesomeIcon icon={faBuilding} size="1x"></FontAwesomeIcon>&nbsp;&nbsp; */}
            <p>{t('rooms:searchRooms:roomsType')}</p>
            {checkRoomTypes && <p>&nbsp;({roomTypes.length})</p>}
          </span>
          {/* {checkRoomTypes && (
            <span onClick={handleRemove} className="chooseRoomGuest__removeIcon">
              <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
            </span>
          )} */}
        </Grid>
      </CustomPopper>
    ),
    [checkRoomTypes, open, roomTypes, t, dataClick]
  );
};

export default memo(RoomType);
