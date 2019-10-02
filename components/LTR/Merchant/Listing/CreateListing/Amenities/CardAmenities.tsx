import React, { FC, ChangeEvent, useState } from 'react';
import {
  Grid,
  FormControlLabel,
  createStyles,
  Theme,
  Typography,
  withStyles,
  Checkbox
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import OutlinedDiv from './OutlinedGrid';
import mainColor from '@/styles/constants/colors';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { AmenitiesIndexRes } from '@/types/Requests/LTR/Amenities/AmenitiesResponses';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { AmenitiesReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
export const CustomCheckbox = withStyles({
  root: {
    color: mainColor.primary,
    '&$checked': {
      color: mainColor.primary
    }
  }
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface IProps {
  classes?: any;
  label: string;
  sub_label?: string;
  amenities: AmenitiesIndexRes[];
  dataClick?: number[];
  typeUpload: {type: any};
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    subTitle: {
      marginBottom: theme.spacing(3)
    }
  })
);

const CardAmenities: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { label, sub_label, amenities, dataClick, typeUpload } = props;
  const dispatch = useDispatch<Dispatch<AmenitiesReducerAction>>();

  const [newDataClick, setNewDataClick] = useState<number[]>(dataClick);
  const handleChange = (id: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      setNewDataClick([...newDataClick, id]);
      dispatch({ type: typeUpload.type, payload: [...newDataClick, id] });
    } else {
      let dataCheckboxUnCheck = newDataClick.filter((i) => i !== id);
      setNewDataClick(dataCheckboxUnCheck);
      dispatch({ type: typeUpload.type, payload: dataCheckboxUnCheck });
    }
  };
  return (
    <OutlinedDiv label={label}>
      <Grid container>
        <Grid item xs={12} className={classes.subTitle}>
          <Typography>{sub_label}</Typography>
        </Grid>
        {amenities.map((o) => (
          <Grid item xs={6} key={o.id}>
            <FormControlLabel
              control={
                <CustomCheckbox
                  name={o.id.toString()}
                  onChange={handleChange(o.id)}
                  checked={newDataClick.some((x) => x === o.id)}
                  value={o.id.toString()}
                  color="primary"
                />
              }
              label={o.comfort_trans[0].name}
            />
          </Grid>
        ))}
      </Grid>
    </OutlinedDiv>
  );
};

export default CardAmenities;
