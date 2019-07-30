import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  memo,
  MouseEventHandler,
  useEffect
} from 'react';
import { Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { faUserFriends, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SearchFilterAction } from '@/store/Redux/Reducers/searchFilter';
import { ReducersList } from '@/store/Redux/Reducers';
import { useTranslation } from 'react-i18next';
import ButtonGlobal from '@/components/ButtonGlobal';

const RowSelect = dynamic(() => import('./RowSelect'));

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  checkRemove?: boolean;
}

const ActionChoose: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { setOpen, open, checkRemove } = props;
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);
  const [guest, setGuest] = useState(numberGuest);
  const [room, setRoom] = useState(numberRoom);

  useEffect(() => {
    !open && hanldeClose();
  }, [open, checkRemove]);

  const hanldeClose = () => {
    setOpen(false);
    setGuest(numberGuest);
    setRoom(numberRoom);
  };

  const hanleSubmit = () => {
    setOpen(false);
    dispatch({ type: 'SET_NUMBER_ROOM', roomsCount: room });
    dispatch({ type: 'SET_NAV_GUESTS', guestsCount: guest });
  };

  return (
    <Grid className="chooseGuestRoom__actions">
      <RowSelect
        icon={faUserFriends}
        number={guest}
        setNumber={setGuest}
        title={t('home:searchComponent:guestUpper')}></RowSelect>
      <RowSelect
        icon={faDoorClosed}
        number={room}
        setNumber={setRoom}
        title={t('home:searchComponent:roomUpper')}></RowSelect>

      <Grid container>
        <Grid item xs={6}>
          <ButtonGlobal
            height="35px"
            fontSize="14px"
            background="white"
            textColor="#000"
            onClick={hanldeClose}>
            {t('home:chooseGuestRoom:close')}
          </ButtonGlobal>
        </Grid>
        <Grid item xs={6}>
          <ButtonGlobal height="35px" fontSize="14px" color="primary" onClick={hanleSubmit}>
            {t('home:chooseGuestRoom:apply')}
          </ButtonGlobal>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(ActionChoose);
