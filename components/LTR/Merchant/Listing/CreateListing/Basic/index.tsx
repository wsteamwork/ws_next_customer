import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/ReusableComponents/Select';
import { Formik, FormikActions, FormikProps } from 'formik';
import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/CheckboxCustom';

interface IProps {
  activeStep: number;
  steps: string[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  nextLink: string;
}

interface FormValues {
  lease_type: number;
  accommodation_type: number;
  stay_with_host: number;
}

const Basic: FC<IProps> = (props) => {
  const { activeStep, steps, setActiveStep, nextLink } = props;
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

  const handleFormSubmit = (values: FormValues, action: FormikActions<FormValues>) => {
    console.log('submit');
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
          <form >
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
            <BottomNavigation
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              nextLink={nextLink}
              handleSubmit={handleSubmit}
            />
          </form>
        )}
      />
    </div>
  );
};

export default Basic;
