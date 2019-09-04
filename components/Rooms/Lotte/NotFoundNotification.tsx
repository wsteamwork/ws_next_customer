import React, { ComponentType } from 'react';
import Lottie from 'react-lottie';
import animationData from '@/assets/lottie/empty_status.json';
import { Typography } from '@material-ui/core';

interface IProps {
  height?: number;
  width?: number;
}

const NotFoundNotification: ComponentType<IProps> = (props) => {
  const defaultOptions: any = {
    loop: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <span style={{ margin: '20px auto' }}>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={props.height || 25}
        width={props.width || 70}
      />
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Hiện tại bạn không có thông báo mới.
      </Typography>
    </span>
  );
};

export default NotFoundNotification;
