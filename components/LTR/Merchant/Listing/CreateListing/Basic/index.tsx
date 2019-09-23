import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/ReusableComponents/Select';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormGroup } from '@material-ui/core';
import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/CheckboxCustom';
interface IProps {}

const Basic: FC<IProps> = (props) => {
  const propertyType: Array<string> = [
    'Nhà riêng',
    'Chung cư',
    'Biệt thự Villa',
    'Phòng riêng',
    'Khách sạn'
  ];
  return (
    <div>
      <h1>Thông tin cơ bản</h1>

      <CheckboxCustom />

      <Grid style={{ width: 'calc(50% - 8px)' }}>
        {/* <h3>Loại Căn hộ: </h3> */}
        <Select title="Loại Căn hộ: " options={propertyType} />
      </Grid>
    </div>
  );
};

export default Basic;
