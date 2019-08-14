import React, { FC, memo, Dispatch, SetStateAction, useContext } from 'react';
import { Grid, FormControlLabel } from '@material-ui/core';
import { useFilterRoom } from './context';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDataClick: Dispatch<SetStateAction<number[]>>;
  dataClick: number[];
}

const ActionFilter: FC<IProps> = (props) => {
  const { setOpen, setDataClick, dataClick } = props;
  const { data, handleChange, handleClose, handleSubmit } = useFilterRoom(
    setDataClick,
    dataClick,
    setOpen
  );
  const { t } = useTranslation();

  return (
    <Grid className="roomsFilter">
      <Grid className="roomsFilter__choose">
        {data.map((item, index) => (
          <Grid key={index}>
            <h3>{item[0]}</h3>

            <Grid container className="roomsFilter__item">
              {item[1].map((i, index) => (
                <Grid item xs={4} key={index}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={dataClick.some((x) => x === i.id)}
                        onChange={handleChange(i.id)}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label={i.details.data[0].name}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid className="roomsFilter__actions flex_columCenter">
        <Grid container>
          <Grid item xs={6}>
            <ButtonGlobal
              onClick={handleClose}
              height="35px"
              fontSize="14px"
              background="white"
              textColor="#000">
              {t('home:chooseGuestRoom:close')}
            </ButtonGlobal>
          </Grid>
          <Grid item xs={6}>
            <ButtonGlobal onClick={handleSubmit} height="35px" fontSize="14px" color="primary">
              {t('home:chooseGuestRoom:apply')}
            </ButtonGlobal>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(ActionFilter);
