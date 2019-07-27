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
          : `linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516)`,
      borderRadius: (props) => props.borderRadius || 3,
      boxShadow: (props) => props.boxShadow || '0 4px 10px 0 rgba(252, 104, 110, 0.75)',
      fontWeight: 700,
      fontSize: (props) => props.fontSize || '17px',
      color: (props) => props.textColor || 'white',
      height: (props) => props.height || '50px',
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
