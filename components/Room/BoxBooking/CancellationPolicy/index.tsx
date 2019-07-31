import React, { FC, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import mainColor from '@/styles/constants/colors';
import CustomPopper from '@/components/CustomPopper';
import { GlobalContext } from '@/store/Context/GlobalContext';

const CancellationPolicy: FC = () => {
  const { router } = useContext(GlobalContext);
  console.log(router);

  return (
    <Grid className="cancellationPolicy">
      <Grid container>
        <Grid item xs={7}>
          <p>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size="1x"
              color={mainColor.primary}></FontAwesomeIcon>{' '}
            Chính sách hủy phòng
          </p>
        </Grid>
        <Grid item xs={5}>
          <CustomPopper content={<div>aaa</div>}>
            <p>Chi tiết</p>
          </CustomPopper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CancellationPolicy;
