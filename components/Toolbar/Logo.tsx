import { ThemeCustom } from '@/components/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ComponentType,FunctionComponent } from 'react';
import { compose } from 'recompose';
import Link from 'next/link';
// @ts-ignore
import logo from '@/static/images/Logo-westay.png';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  img: {
    cursor:'pointer',
    [theme!.breakpoints!.up!('md')]: {
      height: 45,
    },
    [theme!.breakpoints!.down!('sm')]: {
      height: 30,
    },
  },
});

const Logo: FunctionComponent<IProps> = (props) => {
  const { classes } = props;

  return (
    <div>
      <Link href='/'>
        <img src={logo} className={classes.img} alt='Westay.vn' />
      </Link>
    </div>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Logo);
