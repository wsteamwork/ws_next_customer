import React, { Fragment, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CardIntro from '@/components/Cards/CardIntro';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';
import Link from 'next/link';
import Slider, { Settings } from 'react-slick';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8)
    },
    boxTitle: {
      textAlign: 'center'
    },
    title: {
      marginBottom: theme.spacing(3),
      fontWeight: 900,
    },
    paddingItem: {
      padding: theme.spacing(1 / 2)
    },
  })
);

const SeaView: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();
  const setting: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    speed: 800,
    lazyLoad: 'progressive',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    touchThreshold: 10,

    centerPadding: "20%",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1.2,
          centerPadding: "12%",
          touchThreshold: 5000,
          arrows: false,
          lazyLoad: 'progressive',
          centerMode: true,
          initialSlide: 0,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          touchThreshold: 5000,
          slidesToShow: 1.2,
          centerPadding: "12%",
          arrows: false,
          lazyLoad: 'progressive',
          centerMode: true,
          initialSlide: 0,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Grid className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        {t('home:collectionRooms:seaView')}
      </Typography>
      <Hidden smDown implementation="css">
        <Grid container spacing={2} justify='flex-start'>
          <Grid item xs={3}>
            <CardIntro imgSrc="https://westay-img.s3-ap-southeast-1.amazonaws.com/lg/hanoi_night.jpg" imgAlt="" imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
          </Grid>
          <Grid item xs={3}>
            <CardIntro imgSrc="https://westay-img.s3-ap-southeast-1.amazonaws.com/lg/hochiminh_night.jpg" imgAlt="" imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
          </Grid>
          <Grid item xs={3}>
            <CardIntro imgSrc="https://westay-img.s3-ap-southeast-1.amazonaws.com/lg/danang_night.jpg" imgAlt="" imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
          </Grid>
          <Grid item xs={3}>
            <CardIntro imgSrc="https://westay-img.s3-ap-southeast-1.amazonaws.com/lg/nhatrang_night.jpg" imgAlt="" imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Slider {...setting}>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={230} showContent={true} titleContent='Day la cai ten phong no co the rat la dai' subTitleContent='QUan hoan kiem, Ha Noi' />
              </a>
            </Link>
          </div>
        </Slider>
      </Hidden>
    </Grid>
  );
};

export default SeaView;
