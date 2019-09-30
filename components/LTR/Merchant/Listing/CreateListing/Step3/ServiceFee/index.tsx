import React, { Fragment, FC, useState, useEffect, ChangeEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  FormGroup,
  RadioGroup,
  Collapse,
  Zoom,
  Checkbox, InputAdornment, TextField
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import RadioCustom from '@/components/LTR/ReusableComponents/RadioCustom';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { ServicesIndexRes } from '@/types/Requests/LTR/Services/ServicesResponses';

interface IProps {
  classes?: any
}

interface ValuesPrice {
  id: number,
  value: number,
  included: number
}


const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    bigTitle: {
      margin: '24px 0'
    },
    checked: {
      color: '#FFA712 !important'
    },
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
  const [amenities, setAmenities] = useState<ServicesIndexRes[]>([]);
  const [dataClick, setDataClick] = useState<number[]>([]);

  const [included_fee, setIncludedFee] = useState<ValuesPrice[]>([
    {
      id:0,
      value:0,
      included:0
    }
  ]);

  const getAmenities = async () => {
    const url = `services`;
    const res: AxiosRes<any> = await axios_merchant.get(url);
    setAmenities(res.data.data);
  };
  useEffect(() => {
    getAmenities();
  }, []);

  // const [service, setService] = React.useState({
  //   checkWifi: true,
  //   checkElec: true,
  //   checkeWater: true,
  //   checkedEnvir: true,
  // });
  // const [price, setPrice] = useState<ValuesPrice>({
  //   priceWifi: null,
  //   priceElec: null,
  //   priceWater: null,
  //   priceEnvir: null,
  // });

  const handlePrice = () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setIncludedFee([{
        ...included_fee[0],
        value: parseInt(event.target.value)
    }]);
  };


  // const handleService = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setService({ ...service, [name]: event.target.checked });
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt((event.target as HTMLInputElement).value));
  };

  const handleChangeServices = (id: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      setDataClick([...dataClick, id]);
    } else {
      const dataCheckboxUnCheck = dataClick.filter((i) => i !== id);
      setDataClick(dataCheckboxUnCheck);
    }
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
                <Grid item xs={6}>
                  <RadioCustom label={"Trọn gói dịch vụ"}
                               descr={"Giá này đã bao gồm wifi, điện, nước, phí môi trường,..."}
                               value={String(0)}/>
                </Grid>
                <Grid item xs={6}>
                  <RadioCustom label={"Bán lẻ dịch vụ"}
                               descr={"Hình thức thanh toán dịch vụ riêng lẻ theo từng loại phí: wifi, điện, nước, phí môi trường..."}
                               value={String(1)}/>
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
              <FormGroup row>
                {amenities.map(o =>(
                  <Grid container spacing={2} alignItems='center' className={classes.rowCheckPrice} key={o.id}>
                    <Grid item xs={5}>
                      <FormControlLabel
                        control={
                          <Checkbox checked={dataClick.some((x) => x === o.id)} classes={{checked:classes.checked}} onChange={handleChangeServices(o.id)} value={o.id} />
                        }
                        label={o.type_txt}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Zoom in={dataClick.some((x) => x === o.id)}>
                        <TextField
                          id={o.id.toString()}
                          variant="outlined"
                          value={included_fee[0].value}
                          onChange={handlePrice()}
                          InputProps={{
                            id:o.id.toString(),
                            inputComponent: NumberFormatCustom as any,
                            endAdornment: <InputAdornment position="start"> đ/người/tháng </InputAdornment>,
                          }}
                        />
                      </Zoom>
                    </Grid>
                  </Grid>
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </div>
      </Collapse>
    </div>
  );
};

export default ServiceFee;
