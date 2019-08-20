import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { FunctionComponent } from 'react';
import { compose } from 'recompose';
import Link from 'next/link';
// @ts-ignore
import logo from '@/static/images/Logo-westay.png';
import { Theme } from '@material-ui/core';

interface IProps {
  classes?: any;
}

const styles: any = (theme: Theme) =>
  createStyles({
    img: {
      cursor: 'pointer',
      [theme!.breakpoints!.up!('md')]: {
        height: 45
      },
      [theme!.breakpoints!.down!('sm')]: {
        height: 30
      }
    }
  });

const Logo: FunctionComponent<IProps> = (props) => {
  const { classes } = props;

  return (
    <div>
      <Link href="/">
        <a>
          <img src={logo} className={classes.img} alt="Westay.vn" />
        </a>
      </Link>
    </div>
  );
};

export default compose<IProps, any>(withStyles(styles))(Logo);
