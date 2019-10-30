import ButtonGlobal from '@/components/ButtonGlobal';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import React, { Dispatch, FC, memo, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoomTypeChecbox } from './context';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  dataClick: number[];
  setDataClick: Dispatch<SetStateAction<number[]>>;
}

const ActionSelect: FC<IProps> = (props) => {
  const { setOpen, dataClick, setDataClick } = props;
  const { t } = useTranslation();
  const { data, handleChange, handleSubmit, handleClose } = useRoomTypeChecbox(
    setOpen,
    dataClick,
    setDataClick
  );

  return (
    <Grid className="roomType__actions">
      <FormGroup>
        {data.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <CustomCheckbox
                checked={dataClick.some((i) => i === item.id)}
                onChange={handleChange(item.id)}
                value="checkedA"
              />
            }
            label={item.value}></FormControlLabel>
        ))}
      </FormGroup>

      <Grid container>
        <Grid item xs={6}>
          <ButtonGlobal
            height="35px"
            fontSize="14px"
            background="white"
            textColor="#000"
            onClick={handleClose}>
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
  );
};

export default memo(ActionSelect);
