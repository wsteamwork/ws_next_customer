import React, { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Grid, FormGroup, FormControlLabel } from '@material-ui/core';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { axios } from '@/utils/axiosInstance';
import { getRoomType, useRoomTypeChecbox } from './context';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ActionSelect: FC<IProps> = (props) => {
  const { setOpen } = props;
  const { t } = useTranslation();
  const [data, handleChange, dataClick, handleSubmit] = useRoomTypeChecbox(setOpen);

  return (
    <Grid className="kindOfRoom__actions">
      <FormGroup>
        {data.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <CustomCheckbox
                checked={dataClick.some((i) => i.id === item.id)}
                onChange={handleChange(item)}
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
            onClick={() => setOpen(false)}>
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

export default ActionSelect;
