import createStyles from '@material-ui/core/styles/createStyles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { Fragment, FunctionComponent, useMemo } from 'react';
import { Typography, Theme, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { ICardIntro } from '@/types/Interfaces/Components/Card';
import GridContainer from '../Layout/Grid/Container';

interface IProps extends ICardIntro {
  classes?: any;
  showPrice?: boolean;
  recommendedPrice?: string;
  subTitle?: string;
  titleContent?: string;
  subTitleContent?: string;
  showSubTitle?: boolean;
  showContent?: boolean;
  onClickCard?: ()=>void;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
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
      maxHeight: (props) => props.imgHeight,
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
        backgroundImage: `linear-gradient(to left bottom, #1976d2,#81b5e9, transparent,transparent,transparent, transparent, transparent)`,
        opacity: 0.7,
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
        backgroundImage: 'linear-gradient(to top,#1976d2, transparent)',
        height: '50%'
      },
      '&:hover:after': {
        opacity: 0.85
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
      bottom: theme.spacing(2),
      left: theme.spacing(3),
      width: '85%',
    },
    title: {
      color: '#fff',
      fontWeight: 900,
      // fontSize:'1.075rem',
      textShadow: '1px 1px 4px #000000'
    },
    subTitle: {
      color: '#fff',
      fontWeight: 500,
      fontSize: '0.775rem',
      textShadow: '1px 1px 4px #000000'
    },
    boxPrice: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
      padding: theme.spacing(1 / 2), // 1=8px
      width: '50%',
      height: '35%'
    },
    price: {
      color: '#fff',
      fontWeight: 600,
      fontSize: '0.75rem',
      textAlign: 'right'
    },
    titleContent: {
      minHeight: 64,
    },
    noneBG: {
      '&:after': {
        backgroundImage: 'linear-gradient(to top,#1976d2, transparent)',
        height: '0%'
      },
    }
  })
);

const CardIntro: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(props);
  const { customClasses, imgHeight, imgAlt, imgSrc, title, showPrice, showSubTitle, recommendedPrice, subTitle, showContent, titleContent, subTitleContent,onClickCard } = props;

  const imgStyles = useMemo<CSSProperties>(
    () => ({
      maxHeight: imgHeight,
      height: imgHeight ? imgHeight : undefined
    }),
    [imgHeight]
  );

  return (
    <div onClick={()=>onClickCard()}>
      <div
        className={
          showPrice
            ? classNames(classes.imgGradientLeftBottom, title === '' ? classes.noneBG : '')
            : classNames(classes.imgGradientLeftBottom, classes.imgGradientToTop, title === '' ? classes.noneBG : '')
        }>
        <img
          src={imgSrc}
          alt={imgAlt}
          style={imgStyles}
          className={classNames(classes.imgSize, customClasses.image)}
        />
        <div className={classNames(classes.boxTitle, customClasses.boxTitle)}>
          <Typography variant="h5" className={classNames(classes.title, customClasses.title)}>
            {title}
          </Typography>
          {showSubTitle ? (
            <Typography variant="subtitle2" className={classNames(classes.subTitle, customClasses.subTitle)}>
              {subTitle}
            </Typography>
          ) : ''}
        </div>
        {showPrice ? (
          <div className={classes.boxPrice}>
            <Typography variant="subtitle2" className={classes.price}>
              Chỉ từ <br /> {recommendedPrice}/đêm
            </Typography>
          </div>
        ) : (
            ''
          )}
      </div>
      {showContent ? (
        <div>
          <Typography variant='h6' className={classes.titleContent}>
            {titleContent}
          </Typography>
          <Typography variant='body2'>
            {subTitleContent}
          </Typography>
        </div>
      ) : ''}
    </div>
  );
};

CardIntro.defaultProps = {
  customClasses: {},
  imgHeight: 200,
  imgAlt: 'Westay - Homestay cho người Việt',
  imgSrc: './static/images/room_demo.jpg',
  title: '',
  subTitle: '',
  showPrice: false,
  recommendedPrice: '',
  showSubTitle: false,
  showContent: false,
  titleContent: '',
  subTitleContent: '',
};

export default CardIntro;
