import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { Fragment, FunctionComponent, useMemo } from 'react';
import { compose } from 'recompose';
import { Grid, Typography, Theme } from '@material-ui/core';
import classNames from 'classnames';
import { ICardIntro } from '@/types/Interfaces/Components/Card';
import GridContainer from '../Layout/Grid/Container';

interface IProps extends ICardIntro {
  classes?: any;
  showPrice: boolean;
}

const styles: any = (theme: Theme) =>
  createStyles({
    imgSize: {
      maxHeight: '100%',
      height: '100%',
      width: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      objectFit: 'cover',
      borderRadius: 4,
      MozTransition: 'all 0.5s',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s',
      cursor: 'pointer',
      '&:hover': {
        MsTransform: 'scale(1.1)' /* IE 9 */,
        WebkitTransform: 'scale(1.1)' /* Safari 3-8 */,
        transform: 'scale(1.1)'
      },
      overflow: 'hidden'
    },
    imgGradientLeftBottom: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 4,
      width: '100%',
      height: '100%',
      MozTransition: 'all 0.5s',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s',
      cursor: 'pointer',
      '&:after': {
        transition: theme!.transitions!.create!(['all'], {
          duration: 200,
          easing: 'ease-in-out'
        }),
        display: 'block',
        position: 'absolute',
        bottom: 0,
        // backgroundImage: 'linear-gradient(to top,#000, transparent)',
        backgroundImage: `linear-gradient(to left bottom, #000000, #3b3b3b, #777777,transparent,transparent, transparent, transparent)`,
        opacity: 0.67,
        content: `''`,
        width: '100%',
        height: '100%'
      },
      '&:hover:after': {
        opacity: 0.8
      },
      '&:hover': {
        MsTransform: 'scale(1.01)' /* IE 9 */,
        WebkitTransform: 'scale(1.01)' /* Safari 3-8 */,
        transform: 'scale(1.01)'
      },
      '&:hover > image': {
        MsTransform: 'scale(1.01)' /* IE 9 */,
        WebkitTransform: 'scale(1.01)' /* Safari 3-8 */,
        transform: 'scale(1.01)'
      }
    },
    imgGradientToTop: {
      '&:after': {
        backgroundImage: 'linear-gradient(to top,#000, transparent)',
        height: '50%'
      },
      '&:hover:after': {
        opacity: 0.8
      },
      '&:hover > image': {
        MsTransform: 'scale(1.02)' /* IE 9 */,
        WebkitTransform: 'scale(1.02)' /* Safari 3-8 */,
        transform: 'scale(1.02)'
      }
    },
    boxTitle: {
      position: 'absolute',
      zIndex: 1,
      bottom: '10%',
      left: '7%'
    },
    title: {
      color: '#fff',
      fontWeight: 900,
      // fontSize:'1.075rem',
      textShadow: '1px 1px 4px #000000'
    },
    boxPrice: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
      padding: theme.spacing(1 / 2), // 1=8px
      width: '35%',
      height: '35%'
    },
    price: {
      color: '#fff',
      fontWeight: 600,
      fontSize: '0.75rem',
      textAlign: 'right'
    }
  });

const CardIntro: FunctionComponent<IProps> = (props) => {
  const { classes, customClasses, imgHeight, maxHeight, imgAlt, imgSrc, title, showPrice } = props;

  const imgStyles = useMemo<CSSProperties>(
    () => ({
      maxHeight: imgHeight ? imgHeight : maxHeight,
      height: imgHeight ? imgHeight : undefined
    }),
    [imgHeight]
  );

  return (
    <GridContainer xs={12}>
      <div
        className={
          showPrice
            ? classes.imgGradientLeftBottom
            : classNames(classes.imgGradientLeftBottom, classes.imgGradientToTop)
        }>
        <img
          src={imgSrc}
          alt={imgAlt}
          style={imgStyles}
          className={classNames(classes.imgSize, customClasses.image)}
        />
        <div className={classes.boxTitle}>
          <Typography variant="h5" className={classNames(classes.title, customClasses.title)}>
            {title}
          </Typography>
        </div>
        {showPrice ? (
          <div className={classes.boxPrice}>
            <Typography variant="subtitle2" className={classes.price}>
              Chỉ từ <br /> 1.2tr
            </Typography>
          </div>
        ) : (
          ''
        )}
      </div>
    </GridContainer>
  );
};

CardIntro.defaultProps = {
  customClasses: {},
  imgHeight: 0,
  imgAlt: 'Westay - Homestay cho người Việt',
  imgSrc: './static/images/room_demo.jpg',
  title: '',
  showPrice: false
};

export default compose<IProps, any>(withStyles(styles))(CardIntro);
