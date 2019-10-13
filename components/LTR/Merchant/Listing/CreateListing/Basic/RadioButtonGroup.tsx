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
import { Formik, FormikActions, FormikProps } from 'formik';
import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
interface IProps {
  classes?: any;
  value?: any;
  error?: any;
  touched?: any;
  id?: any;
  className?: any;
  label?: string;
  handleChange?: any;
}

const InputFeedback = ({ error }) =>
  error ? <div className={classNames('input-feedback')}>{error}</div> : null;

const RadioButtonGroup: FC<IProps> = (props) => {
  const { value, error, touched, className, label, children, handleChange } = props;
  const classes = classNames(
    'input-field',
    {
      'is-success': value || (!error && touched), // handle prefilled or user-filled
      'is-error': !!error && touched
    },
    className
  );
  return (
    <FormControl component="fieldset" className={classes}>
      <FormLabel component="legend">{label}</FormLabel>

      <RadioGroup
        aria-label="stay_with_host"
        name="stay_with_host"
        value={value}
        onChange={handleChange}>
        {children}
        {touched && <InputFeedback error={error} />}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
