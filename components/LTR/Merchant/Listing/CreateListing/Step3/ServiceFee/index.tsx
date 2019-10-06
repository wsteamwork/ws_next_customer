import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import RadioCustom from '@/components/LTR/ReusableComponents/RadioCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { StepPricesActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { IServicesFee, serviceFeeType, typeService } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import { ServicesIndexRes } from '@/types/Requests/LTR/Services/ServicesResponses';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { Checkbox, Collapse, FormGroup, InputAdornment, OutlinedInput, RadioGroup, Select, Theme, Zoom } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

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
      minHeight: 120,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)',
    },
    rowCheckPrice: {
      padding: '8px 0'
    },
  })
);


const ServiceFee: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const [selectedValue, setSelectedValue] = React.useState<any>(0);
  const [services, setServices] = useState<ServicesIndexRes[]>([]);
  const [serviceFeeType, setServiceFeeType] = useState<serviceFeeType[]>([]);
  const [serviceOpt, setServiceOtp] = useState<number[]>([]);
  const [included_fee, setIncludedFee] = useState<typeService[]>([]);
  const dispatch = useDispatch<Dispatch<PriceTermActions>>();
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const priceser = useSelector<ReducersList, IServicesFee>((state) => state.priceTerm.serviceFee);

  const getServices = async () => {
    const url = `services`;
    const res: AxiosRes<any> = await axios_merchant.get(url);
    setServices(res.data.data);
  };

  const getServiceFeeType = async () => {
    const url = `service-type/calculate-service-fee-type`;
    const res: AxiosRes<serviceFeeType[]> = await axios_merchant.get(url);
    // @ts-ignore
    setServiceFeeType(res.data);
  };

  useEffect(() => {
    dispatchStep({ type: 'setStep', payload: 'tab3' });
    getServices();
    getServiceFeeType();
  }, []);

  useEffect(() => {
    let defaultService: typeService[] = [];
    if (services.length) {
      _.map(services, (o, i) => {
        if (selectedValue === 0) {
          defaultService = [...defaultService, { id: o.id, value: 0, included: 1, calculate_function: 3 }]
        } else {
          defaultService = [...defaultService, { id: o.id, value: 0, included: 0, calculate_function: 3 }]
        }
      });
    }
    setIncludedFee(defaultService);
    dispatch({ type: 'setServiceFee', payload: { included_fee: included_fee } });
  }, [services, selectedValue]);

  useMemo(() => {
    dispatch({ type: 'setServiceFee', payload: { included_fee: included_fee } });
  }, [included_fee]);

  const handlePrice = (id: number, include: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let obj: typeService = {
      id: id,
      value: parseInt(event.target.value),
      included: include ? 1 : 0,
      calculate_function: 3
    };

    const dataUnCheck = included_fee.filter((item) => item.id !== id);
    setIncludedFee([...dataUnCheck, obj]);
  };

  const handleChangeServices = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      included_fee.sort((a, b) => a.id - b.id);
      setServiceOtp([...serviceOpt, id]);
      let newObj = {
        id: id,
        value: included_fee[id - 1].value,
        included: 1,
        calculate_function: 3
      };
      const dataCheck = included_fee.filter((item) => item.id !== id);
      setIncludedFee([...dataCheck, newObj]);
    } else {
      included_fee.sort((a, b) => a.id - b.id);
      const dataCheckboxUnCheck = serviceOpt.filter((i) => i !== id);
      setServiceOtp(dataCheckboxUnCheck);
      let newObj = {
        id: id,
        value: included_fee[id - 1].value,
        included: 0,
        calculate_function: 3
      };
      const dataCheck = included_fee.filter((item) => item.id !== id);
      setIncludedFee([...dataCheck, newObj]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt((event.target as HTMLInputElement).value));
  };

  const blurPrice = () => {
    dispatch({ type: 'setServiceFee', payload: { included_fee: included_fee } })
  };

  const changeSelect = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    for (let i in included_fee) {
      if (included_fee[i].id == id) {
        included_fee[i].calculate_function = parseInt(event.target.value);
        setIncludedFee(included_fee);
        dispatch({ type: 'setServiceFee', payload: { included_fee: included_fee } });
        break; //Stop this loop, we found it!
      }
    }
  };

  const closeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setServiceFee', payload: { included_fee: included_fee } })
  };

  return (
    <div>
      <ValidatorForm onSubmit={() => { return null }}>
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
                        descr={"Giá cho thuê phòng đã bao gồm các dịch vụ: wifi, điện, nước, phí môi trường,..."}
                        value={String(0)} />
                    </Grid>
                    <Grid item xs={6}>
                      <RadioCustom label={"Bán lẻ dịch vụ"}
                        descr={"Hình thức thanh toán dịch vụ riêng lẻ theo từng loại phí: wifi, điện, nước, phí môi trường..."}
                        value={String(1)} />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>

        <Collapse in={!!selectedValue}>
          <div>
            <h1 className={classes.bigTitle}>
              Giá dịch vụ bán lẻ
          </h1>
            <Grid container justify='center'>
              <Grid item xs={11}>
                <FormGroup row>
                  {services.map((o, i) => (
                    <Grid container spacing={2} alignItems='center' className={classes.rowCheckPrice} key={o.id}>
                      <Grid item xs={5}>
                        <FormControlLabel
                          control={
                            <Checkbox checked={serviceOpt.some((x) => x === o.id)} classes={{ checked: classes.checked }} onChange={handleChangeServices(o.id)} value={o.id} />
                          }
                          label={o.type_txt}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <Zoom in={serviceOpt.some((x) => x === o.id)}>
                          <Grid container spacing={2}>
                            <Grid item xs={8}>
                              <TextValidator
                                validators={['required', 'isNumber']}
                                errorMessages={['Bạn cần nhập giá cho trường này', 'Bạn cần nhập giá cho trường này']}
                                id={o.id.toString()}
                                variant="outlined"
                                // value={included_fee ? 0 : included_fee[i].value}
                                onChange={handlePrice(o.id, serviceOpt.some((x) => x === o.id))}
                                onBlur={blurPrice}
                                InputProps={{
                                  id: o.id.toString(),
                                  inputComponent: NumberFormatCustom as any,
                                  endAdornment: <InputAdornment position="start"> đ </InputAdornment>,
                                }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl variant="outlined" fullWidth>
                                {/* <InputLabel htmlFor="Gender">Giới tính</InputLabel> */}
                                <Select
                                  native
                                  // value={0}
                                  onChange={changeSelect(o.id)}
                                  onClose={closeSelect}
                                  inputProps={{
                                    className: 'outlineInput'
                                  }}
                                  input={
                                    <OutlinedInput
                                      name={o.type_txt}
                                      labelWidth={0}
                                    />
                                  }>
                                  {serviceFeeType.map((o, i) => (
                                    <option key={i} value={o.id}>{o.value}</option>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Zoom>
                      </Grid>
                    </Grid>
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </div>
        </Collapse>
      </ValidatorForm>
    </div>
  );
};

export default ServiceFee;
