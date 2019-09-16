import React, { Fragment, FC, useState } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';

import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import GridContainer from '@/components/Layout/Grid/Container';
import Logo from '@/components/Toolbar/Logo';
import Layout from '../../Layout';
import { OutlinedInput } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Select from '@/components/Select';

interface IProps {}

const Room: FC<IProps> = (props) => {
  return (
    <div>
      <h1>Số phòng tắm</h1>

      <Grid>
        <h3>Phòng Tắm: </h3>
        <Select>
          <option value="">Select one</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </Select>
      </Grid>
    </div>
  );
};

export default Room;
