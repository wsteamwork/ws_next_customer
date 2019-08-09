import React, { Fragment,FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Hidden, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';
import Slider, { Settings } from 'react-slick';
import CardIntro from '@/components/Cards/CardIntro';
import Link from 'next/link';

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

const CityView: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const {t} = useTranslation();

  const setting: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    speed: 800,
    lazyLoad: 'ondemand',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    touchThreshold: 10,
    mobileFirst: true,
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
          slidesToShow:3,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1.2,
          centerPadding: "12%",
          touchThreshold: 5000,
          arrows: false,
          lazyLoad: false,
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
          lazyLoad: false,
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
        {t('home:collectionRooms:cityView')}
      </Typography>
      <Hidden smDown implementation="css">
        <Grid container spacing={2} justify='flex-start'>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Slider {...setting}>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href='/room/3762'>
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
        </Slider>
      </Hidden>
    </Grid>
  );
};

export default CityView;
