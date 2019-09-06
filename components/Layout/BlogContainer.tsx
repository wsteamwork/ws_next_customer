import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, Hidden } from '@material-ui/core';
import CardIntro from '@/components/Cards/CardIntro';
import { useTranslation } from 'react-i18next';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import Link from 'next/link';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';

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
  const {} = props;
  const { t } = useTranslation();

  const setting: ReactIdSwiperProps = {
    slidesPerView: 1.5,
    lazy: true
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
        <Swiper {...setting}>
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
        </Swiper>
      </Hidden>
    </Grid>
  );
};

export default BlogContainer;
