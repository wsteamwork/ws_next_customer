import React, { FC, useState, Dispatch, useEffect, ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/ReusableComponents/SelectCustom';
import { Formik, FormikActions, FormikProps } from 'formik';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/CheckboxCustom';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { FormControlLabel, Checkbox } from '@material-ui/core';
interface IProps {
  classes?: any;
}

interface FormValues {
  lease_type: number;
  accommodation_type: number;
  stay_with_host: number;
}

const useStyles = makeStyles((theme) => ({
  checked: {
    color: '#FFA712 !important'
  }
}));

const Basic: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [stayWithHost, setStayWithHost] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();

  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStayWithHost(checked);
  };

  useEffect(() => {
    dispatch({
      type: 'SET_STAY_WITH_HOST',
      payload: stayWithHost ? 1 : 0
    });
  }, [stayWithHost]);
  const propertyType: Array<string> = [
    'Nhà riêng',
    'Chung cư',
    'Biệt thự Villa',
    'Phòng riêng',
    'Khách sạn'
  ];

  const initFormValue: FormValues = {
    lease_type: null,
    accommodation_type: null,
    stay_with_host: null
  };

  const handleFormSubmit = (values: FormValues, actions: FormikActions<FormValues>) => {
    console.log('handle submit');
    const data: any = {
      lease_type: values.lease_type,
      accommodation_type: values.accommodation_type,
      stay_with_host: values.stay_with_host
    };
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
          isSubmitting
        }: FormikProps<FormValues>) => (
          <form onSubmit={handleSubmit}>
            {/* onSubmit={handleSubmit} */}
            <CheckboxCustom />

            <Grid style={{ width: 'calc(50% - 8px)' }}>
              {/* <h3>Loại Căn hộ: </h3> */}
              <Select
                name="accommodation_type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.accommodation_type}
                title="Loại Căn hộ: "
                options={propertyType}
              />
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  classes={{ checked: classes.checked }}
                  checked={stayWithHost}
                  onChange={handleChangeCheckBox}
                  value="stayWithHost"
                />
              }
              label="Bạn có đang ở trong căn hộ này không?"
            />
          </form>
        )}
      />
    </div>
  );
};

export default Basic;
