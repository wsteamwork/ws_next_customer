import React, { FC } from 'react';
import Tippy, { TippyProps } from '@tippy.js/react';

interface IProps extends TippyProps {}

const CustomPopper: FC<IProps> = (props) => {
  return (
    <Tippy content="Tooltip" duration={300} theme="light-border" {...props}>
      {props.children}
    </Tippy>
  );
};

export default CustomPopper;
