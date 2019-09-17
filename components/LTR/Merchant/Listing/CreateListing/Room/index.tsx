import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/Select';

interface IProps { }

const Room: FC<IProps> = (props) => {
  return (
    <div>
      <h1>Thông tin cơ bản</h1>

      <Grid style={{ width: '50%' }}>
        {/* <h3>Hình thức thuê: </h3> */}

        <Select title="Hình thức thuê: ">
          <option value="">Select one</option>
          <option value={1}>Ngắn hạn</option>
          <option value={2}>Dài hạn</option>
        </Select>
      </Grid>

      <Grid style={{ width: '50%' }}>
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
