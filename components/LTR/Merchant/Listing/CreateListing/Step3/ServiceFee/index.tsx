import React, { Fragment, FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
  Collapse,
  Paper,
  Fade,
  Grow,
  Zoom,
  Checkbox, InputAdornment, TextField, Hidden
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';

interface IProps {
  classes?: any
}

interface ValuesPrice {
  priceWifi: number,
  priceElec: number,
  priceWater: number,
  priceEnvir: number,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    bigTitle: {
      margin: '24px 0'
    },
    checked: {
      color: '#FFA712 !important'
    },
    checkboxItem: {},
    checkboxItemWrapper: {
      padding: '5px 15px 10px',
      border: '1px solid #767676',
      borderRadius: 4,
      minHeight:120,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)',
    },
    rowCheckPrice:{
      padding:'8px 0'
    }
  })
);


const ServiceFee: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [selectedValue, setSelectedValue] = React.useState<any>(0);
  const [service, setService] = React.useState({
    checkWifi: true,
    checkElec: true,
    checkeWater: true,
    checkedEnvir: true,
  });
  const [price, setPrice] = useState<ValuesPrice>({
    priceWifi: null,
    priceElec: null,
    priceWater: null,
    priceEnvir: null,
  });

  const handlePrice = (name: keyof ValuesPrice) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      ...price,
      [name]: event.target.value,
    });
  };

  const handleService = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setService({ ...service, [name]: event.target.checked });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt((event.target as HTMLInputElement).value));
  };

  return (
    <div>
      <div>
      <h1 className={classes.bigTitle}>
        Lựa chọn gói dịch vụ
      </h1>
      <Grid container className={classes.container} justify='center'>
        {/* <h3>Hình thức thuê: </h3> */}
        <Grid item xs={11}>
          <FormControl component="fieldset" fullWidth>

            <RadioGroup value={selectedValue.toString()} onChange={handleChange} row>
              <Grid container spacing={2}>
                <Grid item xs={6} className={classes.checkboxItem}>
                  <div className={classes.checkboxItemWrapper}>
                    <FormControlLabel
                      value={String(0)}
                      label="Trọn gói dịch vụ"
                      control={<Radio color="primary" />}
                      labelPlacement="end"
                      classes={{label:classes.title}}
                    />
                    <Typography style={{ marginTop: 10 }}>Giá này đã bao gồm wifi, điện, nước, phí môi trường,...</Typography>
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.checkboxItem}>
                  <div className={classes.checkboxItemWrapper}>
                    <FormControlLabel
                      value={String(1)}
                      label="Bán lẻ dịch vụ"
                      control={<Radio color="primary" />}
                      labelPlacement="end"
                      classes={{label:classes.title}}
                    />
                    <Typography style={{ marginTop: 10 }}>Hình thức thanh toán dịch vụ riêng lẻ theo từng loại phí: wifi, điện, nước, phí môi trường...</Typography>
                  </div>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>

    <Collapse  in={!!selectedValue}>
      <div>
        <h1 className={classes.bigTitle}>
          Giá dịch vụ bán lẻ
        </h1>
        <Grid container justify='center'>
          <Grid item xs={11}>
            <div>
              <FormGroup row>
                <Grid container spacing={2} alignItems='center' className={classes.rowCheckPrice}>
                  <Grid item xs={5}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={service.checkWifi} classes={{checked:classes.checked}} onChange={handleService('checkWifi')} value="checkWifi" />
                      }
                      label="Giá Wifi"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Zoom  in={service.checkWifi}>
                      <TextField
                        variant="outlined"
                        value={price.priceWifi}
                        onChange={handlePrice('priceWifi')}
                        InputProps={{
                          inputComponent: NumberFormatCustom as any,
                          endAdornment: <InputAdornment position="start"> đ/người/tháng </InputAdornment>,
                        }}
                      />
                    </Zoom>
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems='center' className={classes.rowCheckPrice}>
                  <Grid item xs={5}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={service.checkElec} classes={{checked:classes.checked}} onChange={handleService('checkElec')} value="checkElec" />
                      }
                      label="Giá điện"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Zoom in={service.checkElec}>
                      <TextField
                        variant="outlined"
                        value={price.priceElec}
                        onChange={handlePrice('priceElec')}
                        InputProps={{
                          inputComponent: NumberFormatCustom as any,
                          endAdornment: <InputAdornment position="start"> đ/người/tháng </InputAdornment>,
                        }}
                      />
                    </Zoom>
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems='center' className={classes.rowCheckPrice}>
                  <Grid item xs={5}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={service.checkeWater} classes={{checked:classes.checked}} onChange={handleService('checkeWater')} value="checkeWater" />
                      }
                      label="Giá nước"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Zoom in={service.checkeWater}>
                      <TextField
                        variant="outlined"
                        value={price.priceWater}
                        onChange={handlePrice('priceWater')}
                        InputProps={{
                          inputComponent: NumberFormatCustom as any,
                          endAdornment: <InputAdornment position="start"> đ/người/tháng </InputAdornment>,
                        }}
                      />
                    </Zoom>
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems='center' className={classes.rowCheckPrice}>
                  <Grid item xs={5}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={service.checkedEnvir} classes={{checked:classes.checked}} onChange={handleService('checkedEnvir')} value="checkedEnvir" />
                      }
                      label="Phí môi trường"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Zoom in={service.checkedEnvir}>
                      <TextField
                        variant="outlined"
                        value={price.priceEnvir}
                        onChange={handlePrice('priceEnvir')}
                        InputProps={{
                          inputComponent: NumberFormatCustom as any,
                          endAdornment: <InputAdornment position="start"> đ/người/tháng </InputAdornment>,
                        }}
                      />
                    </Zoom>
                  </Grid>
                </Grid>
              </FormGroup>
            </div>
          </Grid>
        </Grid>
      </div>
    </Collapse>
    </div>
  );
};

export default ServiceFee;
