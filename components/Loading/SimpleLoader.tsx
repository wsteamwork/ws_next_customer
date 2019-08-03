import React, { FC } from 'react';
import Lottie, { Options, LottieProps } from 'react-lottie';
import animationData from '@/assets/lottie/simple_loader.json';

interface IProps extends Partial<LottieProps> {}

const defaultOptions: Options = {
  loop: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const SimpleLoader: FC<IProps> = (props) => {
  return (
    <span>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={props.height || 25}
        width={props.width || 70}
      />
    </span>
  );
};

export default SimpleLoader;
