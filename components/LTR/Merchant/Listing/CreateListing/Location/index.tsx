import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, useState } from 'react';
interface IProps { }

const Location: FC<IProps> = (props) => {
  const [address, setAddress] = useState<string>('');
  const handleChange = (event) => {
    setAddress(event.target.value);
  };
  return (
    <div className="step1-tab3-location">
      <Grid className="createListing-location">
        <Grid className="createListing-heading-1">Địa chỉ căn hộ của bạn</Grid>
        <Grid className="createListing-subTitle">
          Khách sẽ chỉ biết được địa chỉ chính xác sau khi đặt phòng thành công
        </Grid>
      </Grid>

      <Grid style={{ width: 'calc(80% - 8px)' }}>
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            id="component-outlined"
            value={address}
            onChange={handleChange}
            labelWidth={0}
          />
        </FormControl>
      </Grid>

      <Grid style={{ width: 'calc(80% - 8px)' }}>
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            id="component-outlined"
            value={address}
            onChange={handleChange}
            labelWidth={0}
          />
        </FormControl>
      </Grid>

      <Grid className="createListing-heading-2">Đây đã phải là địa chỉ đúng chưa?</Grid>
      <h3 className="createListing-subTitle">
        Nếu cần thiết, bạn có thể thay đổi vị trí cho chính xác. Chỉ những khách hàng xác nhận đặt
        phòng mới có thể thấy được
      </h3>
    </div>
  );
};

export default Location;
