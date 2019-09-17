import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { FunctionComponent, Fragment } from 'react';
import { compose } from 'recompose';
import Link from 'next/link';
// @ts-ignore
import logo from '@/static/images/Logo-westay.png';
// @ts-ignore
import logoOnlyImg from '@/static/images/logo-image-only.png';
import { Theme } from '@material-ui/core';

interface IProps {
  classes?: any;
  isFooter?: boolean;
  onlyImg?: boolean;
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
    },
    onlyImgClass: {
      height: '100%'
    },
    footer: {
      height: 45
    }
  });

const Logo: FunctionComponent<IProps> = (props) => {
  const { classes, isFooter, onlyImg } = props;

  return (
    <Fragment>
      <Link href="/">
        <img
          src={onlyImg ? logoOnlyImg : logo}
          className={onlyImg ? classes.onlyImgClass : isFooter ? classes.footer : classes.img}
          alt="Westay.vn"
        />
      </Link>
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(Logo);
