import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Theme } from '@material-ui/core';
import classNames from 'classnames';

const checkTypeBackground = (value: string[] | string): string => {
  if (typeof value !== 'string') {
    return `linear-gradient(to right, ${value.join(',')})`;
  } else {
    return value;
  }
};

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      background: (props) =>
        props.background
          ? checkTypeBackground(props.background)
          : `radial-gradient( circle farthest-corner at 10% 20%,  rgba(253,193,104,1) 0%, rgba(251,128,128,1) 90% );`,
      borderRadius: (props) => props.borderRadius || 4,
      fontWeight: 700,
      fontSize: (props) => props.fontSize || '17px',
      color: (props) => props.textColor || 'white',
      height: (props) => props.height || '45px',
      width: (props) => props.width || 'auto',
      padding: (props) => props.padding || '0 30px'
    }
  })
);

interface IProps extends ButtonProps {
  height?: string | number;
  background?: string[] | string;
  width?: string | number;
  fontSize?: string | number;
  borderRadius?: string | number;
  padding?: string | number;
  textColor?: string;
  boxShadow?: string;
}

const ButtonGlobal: FC<IProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Button {...props} className={classNames(classes.root, 'buttonGlobal', props.className)}>
      {props.children}
    </Button>
  );
};

export default ButtonGlobal;
