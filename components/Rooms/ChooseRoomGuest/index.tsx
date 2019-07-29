import React, { FC, useState, useMemo } from 'react';
import CustomPopper from '@/components/CustomPopper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import ActionChoose from '@/components/Home/ChooseGuestRoom/ActionChoose';
import { Paper, Grid, InputBase } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import classNames from 'classnames';
// import QuickBookIcon from "@material-ui/icons/OfflineBoltRounded";

const ChooseRoomGuest: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);

  const valueInput = useMemo(() => {
    if (numberGuest !== 0 && numberRoom !== 0) {
      return `${numberGuest} ${t('home:searchComponent:guest')} & ${numberRoom} ${t(
        'home:searchComponent:room'
      )}`;
    } else if (numberGuest !== 0) {
      return `${numberGuest} ${t('home:searchComponent:guest')} & 0 ${t(
        'home:searchComponent:room'
      )}`;
    } else if (numberRoom !== 0) {
      return `0 ${t('home:searchComponent:guest')} & ${numberRoom} ${t(
        'home:searchComponent:room'
      )}`;
    }

    return '';
  }, [numberGuest, numberRoom]);

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
      content={<ActionChoose setOpen={setOpen}></ActionChoose>}>
      <Grid
        onClick={() => setOpen(true)}
        className={classNames('chooseRoomGuest', { haveResult: valueInput !== '' })}>
        <span className="flex_columCenter">
          <FontAwesomeIcon icon={faDoorClosed} size="1x"></FontAwesomeIcon>&nbsp;&nbsp;
          <p>
            {valueInput || `${t('home:searchComponent:guest')} & ${t('home:searchComponent:room')}`}
          </p>
        </span>
      </Grid>
    </CustomPopper>
  );
};

export default ChooseRoomGuest;
