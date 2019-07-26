import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      background: `linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516)`,
      border: 0,
      borderRadius: 3,
      boxShadow: '0 4px 15px 0 rgba(252, 104, 110, 0.75)',
      fontWeight: 600,
      fontSize: '0.9rem',
      textTransform: 'none',
      color: 'white',
      backgroundSize: '300% 100%',
      MozTransition: 'all 0.4s ease-in-out',
      OTransition: 'all 0.4s ease-in-out',
      WebkitTransition: 'all 0.4s ease-in-out',
      transition: 'all 0.4s ease-in-out',
      height: (props) => props.height || '50px',
      width: (props) => props.width || 'auto',
      padding: '0 30px',
      '&:hover': {
        backgroundPosition: '100%',
        MozTransition: 'all 0.4s ease-in-out',
        OTransition: 'all 0.4s ease-in-out',
        WebkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out'
      }
    }
  })
);

interface IProps extends ButtonProps {
  height?: string | number;
  linear?: string[];
  width?: string | number;
}

const ButtonGlobal: FC<IProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Button {...props} className={classes.root}>
      {props.children}
    </Button>
  );
};

export default ButtonGlobal;
