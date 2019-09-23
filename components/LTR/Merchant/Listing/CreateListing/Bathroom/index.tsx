import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/ReusableComponents/Select';

interface IProps {}

const Bathroom: FC<IProps> = (props) => {
  return (
    <div>
      <h1>Số phòng tắm</h1>

      <Grid>
        <h3>Phòng Tắm: </h3>
        {/* <Select>
          <option value="">Select one</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </Select> */}
      </Grid>
    </div>
  );
};

export default Bathroom;
