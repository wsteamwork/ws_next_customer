import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import mainColor from '@/styles/constants/colors';
import CustomPopper from '@/components/CustomPopper';
import Link from 'next/link';

const CancellationPolicy: FC = () => {
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
        <Grid item xs={5} className="cancellationPolicy__details">
          <Link href="/terms-and-conditions">
            <a>Chi tiết</a>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CancellationPolicy;
