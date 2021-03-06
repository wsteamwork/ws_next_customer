import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, Hidden } from '@material-ui/core';
import CardIntro from '@/components/Cards/CardIntro';
import { useTranslation } from 'react-i18next';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import Link from 'next/link';
import Slider, { Settings } from 'react-slick';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';

interface IProps {
  classes?: any;
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
      fontWeight: 900
    },
    paddingItem: {
      padding: theme.spacing(1 / 2)
    }
  })
);

const BlogContainer: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();

  const setting: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    speed: 800,
    lazyLoad: 'ondemand',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    touchThreshold: 10,
    centerPadding: "20%",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1.9,
          touchThreshold: 5000,
          arrows: false,
          lazyLoad: 'progressive',
          centerMode: true,
          initialSlide: 0,
          centerPadding: '24%',
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          touchThreshold: 5000,
          slidesToShow: 1.2,
          centerPadding: '12%',
          arrows: false,
          lazyLoad: 'progressive',
          centerMode: true,
          initialSlide: 0,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Grid className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {t('home:blogContainer:blog')}
      </Typography>
      <Hidden xsDown implementation="css">
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs={4}>
            <a href="https://blog.westay.vn/cam-nang-du-lich" target="_blank">
              <CardIntro
                imgSrc={`${IMAGE_STORAGE_LG}cam_nang_du_lich_1.jpg`}
                imgHeight={300}
                customClasses={{ boxTitle: classes.boxTitle }}
                showSubTitle={true}
                title={t('home:blogContainer:journey')}
                subTitle={t('home:blogContainer:titleJourney')}
              />
            </a>
          </Grid>
          <Grid item xs={4}>
            <a href="https://blog.westay.vn/o-dau" target="_blank">
              <CardIntro
                imgSrc={`${IMAGE_STORAGE_LG}o_dau_1.jpg`}
                imgHeight={300}
                customClasses={{ boxTitle: classes.boxTitle }}
                showSubTitle={true}
                title={t('home:blogContainer:where')}
                subTitle={t('home:blogContainer:titleWhere')}
              />
            </a>
          </Grid>
          <Grid item xs={4}>
            <a target="_blank" href="https://blog.westay.vn/choi-gi">
              <CardIntro
                imgSrc={`${IMAGE_STORAGE_LG}choi_gi_1.jpg`}
                imgHeight={300}
                customClasses={{ boxTitle: classes.boxTitle }}
                showSubTitle={true}
                title={t('home:blogContainer:whatPlay')}
                subTitle={t('home:blogContainer:titlePlay')}
              />
            </a>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smUp implementation="css">
        <Slider {...setting}>
          <div className={classes.paddingItem}>
            <a href="https://blog.westay.vn/cam-nang-du-lich" target="_blank">
              <CardIntro
                imgSrc={`${IMAGE_STORAGE_LG}cam_nang_du_lich_1.jpg`}
                imgHeight={300}
                customClasses={{ boxTitle: classes.boxTitle }}
                showSubTitle={true}
                title={t('home:blogContainer:journey')}
                subTitle={t('home:blogContainer:titleJourney')}
              />
            </a>
          </div>
          <div className={classes.paddingItem}>
            <a href="https://blog.westay.vn/o-dau" target="_blank">
              <CardIntro
                imgSrc={`${IMAGE_STORAGE_LG}o_dau_1.jpg`}
                imgHeight={300}
                customClasses={{ boxTitle: classes.boxTitle }}
                showSubTitle={true}
                title={t('home:blogContainer:where')}
                subTitle={t('home:blogContainer:titleWhere')}
              />
            </a>
          </div>
          <div className={classes.paddingItem}>
            <a href="https://blog.westay.vn/choi-gi" target="_blank">
              <CardIntro
                imgSrc={`${IMAGE_STORAGE_LG}choi_gi_1.jpg`}
                imgHeight={300}
                customClasses={{ boxTitle: classes.boxTitle }}
                showSubTitle={true}
                title={t('home:blogContainer:whatPlay')}
                subTitle={t('home:blogContainer:titlePlay')}
              />
            </a>
          </div>
        </Slider>
      </Hidden>
    </Grid>
  );
};

export default BlogContainer;
