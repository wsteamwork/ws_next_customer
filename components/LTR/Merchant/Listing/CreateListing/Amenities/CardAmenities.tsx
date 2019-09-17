import React, { FC } from 'react';
import { Grid, FormControlLabel, createStyles, Theme, Typography } from '@material-ui/core';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import OutlinedDiv from './OutlinedGrid';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    subTitle: {
      marginBottom: theme.spacing(3)
    },
  })
);

const CardAmenities: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  return (
    <OutlinedDiv label="Tiện nghi thiết yếu">
      <Grid container>
        <Grid item xs={12} className={classes.subTitle}>
          <Typography>Những tiện nghi thiết yếu thường được du khách chú trọng khi đặt nhà riêng.</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<CustomCheckbox checked={true} value="checkedB" color="primary" />}
            label="Cảnh quan đẹp"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<CustomCheckbox checked={true} value="checkedB" color="primary" />}
            label="Nhà bếp"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<CustomCheckbox checked={true} value="checkedB" color="primary" />}
            label="Móc treo quần áo"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<CustomCheckbox checked={true} value="checkedB" color="primary" />}
            label="Nước khoáng"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<CustomCheckbox checked={true} value="checkedB" color="primary" />}
            label="Nhà bếp"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<CustomCheckbox checked={true} value="checkedB" color="primary" />}
            label="Không gian thư giãn ngoài trời"
          />
        </Grid>
      </Grid>
    </OutlinedDiv>
  );
};

export default CardAmenities;
