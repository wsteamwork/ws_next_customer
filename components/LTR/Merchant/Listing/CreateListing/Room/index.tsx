import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';

import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation.tsx';
import GridContainer from '@/components/Layout/Grid/Container';
import Logo from '@/components/Toolbar/Logo';
import Layout from '../../Layout';
import { OutlinedInput } from '@material-ui/core';
import Select from '@/components/Select';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

interface IProps {}

const Room: FC<IProps> = (props) => {
  return (
    <div>
      <h1>Thông tin cơ bản</h1>

      <Grid>
        {/* <h3>Hình thức thuê: </h3> */}

        <Select title="Hình thức thuê: ">
          <option value="">Select one</option>
          <option value={1}>Ngắn hạn</option>
          <option value={2}>Dài hạn</option>
        </Select>
      </Grid>

      <Grid>
        {/* <h3>Loại Căn hộ: </h3> */}
        <Select title="Loại Căn hộ: ">
          <option value="">Select one</option>
          <option value={1}>Nhà Riêng</option>
          <option value={2}>Chung cư</option>
          <option value={3}>Biệt thự Villa</option>
          <option value={4}>Phòng riêng</option>
          <option value={5}>Khách sạn</option>
        </Select>
      </Grid>
    </div>
  );
};

export default Room;
