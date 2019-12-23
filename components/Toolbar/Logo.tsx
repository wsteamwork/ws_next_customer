// @ts-ignore
import logoOnlyImg from '@/static/images/logo-image-only.png';
// @ts-ignore
import logo from '@/static/images/Logo-westay.png';
import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'next/link';
import React, { Fragment, FunctionComponent } from 'react';
import { compose } from 'recompose';

interface IProps {
  classes?: any;
  isTextLogo?: boolean;
  onlyImg?: boolean;
  href?: string;
  isDetailPage?: boolean;
}

const styles: any = (theme: Theme) =>
  createStyles({
    img: {
      marginRight: '3rem !important',
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
  const { classes, isTextLogo, onlyImg, href, isDetailPage } = props;
  return (
    <Fragment>
      <Link href={href}>
        <img
          src={onlyImg ? logoOnlyImg : logo}
          className={onlyImg ? classes.onlyImgClass : isTextLogo ? classes.footer : classes.img}
          alt="Westay.vn"
        />
      </Link>
    </Fragment>
  );
};

Logo.defaultProps = {
  href: '/'
};

export default compose<IProps, any>(withStyles(styles))(Logo);
