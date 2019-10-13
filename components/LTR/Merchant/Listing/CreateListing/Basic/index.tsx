import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/Basic/CheckboxCustom';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { getRoomType, RoomTypeData } from '@/components/Rooms/FilterActions/RoomType/context';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, FormikActions, FormikProps, Field } from 'formik';
import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RadioButtonGroup from './RadioButtonGroup';
import CheckboxGroup from './CheckboxGroup';
import classNames from 'classnames';
interface IProps {
  classes?: any;
}

interface FormValues {
  lease_type: string[];
  accommodation_type: number;
  stay_with_host: string;
}

const useStyles = makeStyles((theme) => ({
  checked: {
    color: '#FFA712 !important'
  }
}));

const Basic: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { accommodationType, stayWithHost } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const [isStayWithHost, setIsStayWithHost] = useState<boolean>(!!stayWithHost);

  const [roomType, setRoomType] = useState<number>(accommodationType);
  const [roomTypesData, setRoomTypesData] = useState<RoomTypeData[]>([]);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [state, setState] = useState<any>({
    shortterm: true,
    longterm: false
  });
  const { shortterm, longterm } = state;

  useEffect(() => {
    getRoomType(setRoomTypesData);
  }, []);

  // const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
  //   setIsStayWithHost(checked);
  // };

  useEffect(() => {
    dispatch({
      type: 'SET_STAY_WITH_HOST',
      payload: isStayWithHost ? 1 : 0
    });
  }, [isStayWithHost]);

  const initFormValue: FormValues = {
    lease_type: [],
    accommodation_type: accommodationType,
    stay_with_host: stayWithHost.toString()
  };

  const handleFormSubmit = (values: FormValues, actions: FormikActions<FormValues>) => {
    const data: any = {
      lease_type: values.lease_type,
      accommodation_type: values.accommodation_type,
      stay_with_host: values.stay_with_host
    };
  };

  // const callBackOnChange = (value: string) => {
  //   dispatch({
  //     type: 'SET_ACCOMMODATION_TYPE',
  //     payload: parseInt(value)
  //   });
  // };

  const InputFeedback = ({ error }) =>
    error ? <div className={classNames('input-feedback')}>{error}</div> : null;

  const RadioButton = ({
    // field: { name, value, onChange, onBlur },
    value,
    label,
    className,
    name,
    ...props
  }) => {
    return <FormControlLabel name={name} value={value} control={<Radio />} label={label} />;
  };

  const CheckboxCustom = ({
    field: { name, value, onChange, onBlur },
    form: { errors, touched, setFieldValue },
    id,
    label,
    valueField,
    className,
    ...props
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            disableRipple
            classes={{ checked: classes.checked }}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            id={id}
          />
        }
        label="Ngắn hạn"
      />
      // <div>
      //   <input
      //     name={name}
      //     id={id}
      //     type="checkbox"
      //     value={value}
      //     checked={value}
      //     onChange={onChange}
      //     onBlur={onBlur}
      //     className={classNames('radio-button')}
      //   />
      //   <label htmlFor={id}>{label}</label>
      //   {touched[name] && <InputFeedback error={errors[name]} />}
      // </div>
    );
  };

  return (
    <div>
      <Grid className="createListing-title">
        <Grid className="createListing-heading-1">Thông tin cơ bản</Grid>
      </Grid>

      <Formik
        initialValues={initFormValue}
        onSubmit={handleFormSubmit}
        render={({
          values,
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
          setFieldTouched
        }: FormikProps<FormValues>) => (
          <form onSubmit={handleSubmit}>
            {/* onSubmit={handleSubmit} */}
            {/* <CheckboxCustom /> */}
            <CheckboxGroup
              id="checkboxGroup"
              label="Hình thức thuê"
              value={values.lease_type}
              error={errors.lease_type}
              touched={touched.lease_type}
              onChange={setFieldValue}
              onBlur={setFieldTouched}>
              {values.lease_type}
              <Field
                component={CheckboxCustom}
                name="checkboxGroup"
                // id="shortterm"
                id="shortterm"
                label="Ngắn hạn"
              />
              <Field
                component={CheckboxCustom}
                name="checkboxGroup"
                id="longterm"
                label="Dài hạn"
              />
            </CheckboxGroup>

            <Grid style={{ width: 'calc(50% - 8px)' }}>
              {/* <h3>Loại Căn hộ: </h3> */}
              {/* <SelectCustom
                name="accommodation_type"
                // onChange={handleChangeSelect}
                onBlur={handleBlur}
                value={roomType}
                title="Loại Căn hộ: "
                options={roomTypesData}
                callBackOnChange={callBackOnChange}
              /> */}
            </Grid>

            <RadioButtonGroup
              id="stay_with_host-radioGroup"
              label="Bạn có đang ở trong căn hộ này không?"
              handleChange={handleChange}
              value={values.stay_with_host}
              error={errors.stay_with_host}
              touched={touched.stay_with_host}>
              <Field
                component={RadioButton}
                name="stay_with_host-radioGroup"
                value="1"
                label="Đúng, tôi hiện đang sống trong căn hộ này"
              />
              <Field
                component={RadioButton}
                name="stay_with_host-radioGroup"
                value="2"
                label="Không, tôi không sống ở đây"
              />
            </RadioButtonGroup>

            {/* <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  classes={{ checked: classes.checked }}
                  checked={isStayWithHost}
                  onChange={handleChangeCheckBox}
                  value="stayWithHost"
                />
              }
              label="Bạn có đang ở trong căn hộ này không?"
            /> */}
          </form>
        )}
      />
    </div>
  );
};

export default Basic;
