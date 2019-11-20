// import DialogFullImage from '../BoxListImageRoom/DialogFullImage';
import CardIntro from '@/components/Cards/CardIntro';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Hidden, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useState } from 'react';
import 'react-animated-slider/build/horizontal.css';
import '/styles/pages/LTR/room/index.scss';

interface IProps {
  classes?: any,
  livingrooms: ImagesRes | any,
  cover_photo: ImagesRes | any,
  furnitures?: ImagesRes | any,
  kitchens?: ImagesRes | any,
  bedrooms: any,
  bathrooms: any,
  isPreviewPage?: boolean,
}

interface IArrayImage {
  imgURL: string,
  title: string,
  subTitle: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      // height: '55vh',
      // // margin: '64px 0 48px',
      margin: '10px 0 8px',
      [theme.breakpoints.down('sm')]: {
        // height: '31vh',
        margin: '5px 0 4px',
      },
      paddingGrid: {
        padding: 4
      }
    },
  })
);

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { livingrooms, furnitures, kitchens, bedrooms, bathrooms, cover_photo, isPreviewPage } = props;
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);
  const { width } = useContext(GlobalContext);
  // const { t } = useTranslation();
  // const toggle = (e: MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   setOpenFullImage(!openFullImage);
  // };
  // let arrImage: IArrayImage[] = [];
  // const funcPushImage = useMemo(() => {
  //   if (isPreviewPage && !cover_photo.images && !livingrooms.images && !bedrooms[`bedroom_1`].images) {
  //     arrImage.push({
  //       imgURL: '/static/images/image-room-default.png',
  //       title: '',
  //       subTitle: ''
  //     })
  //   }
  //   if (cover_photo.images && cover_photo.images.length) {
  //     arrImage.push({
  //       imgURL: `${IMAGE_STORAGE_LG + cover_photo.images[0].name}`,
  //       title: '',
  //       subTitle: cover_photo.images[0].caption
  //     })
  //   }
  //   if (livingrooms.images && livingrooms.images.length) {
  //     arrImage.push({
  //       imgURL: `${IMAGE_STORAGE_LG + livingrooms.images[0].name}`,
  //       title: t('longtermroom:livingrooms'),
  //       subTitle: livingrooms.images[0].caption
  //     })
  //   }
  //   if (bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length) {
  //     arrImage.push({
  //       imgURL: `${IMAGE_STORAGE_LG + bedrooms['bedroom_1'].images[0].name}`,
  //       title: t('longtermroom:bedrooms'),
  //       subTitle: bedrooms['bedroom_1'].images[0].caption
  //     })
  //   }
  //   if (bathrooms['bathroom_1'] && bathrooms['bathroom_1'].images && bathrooms['bathroom_1'].images.length) {
  //     arrImage.push({
  //       imgURL: `${bathrooms.bathroom_1 ? IMAGE_STORAGE_LG + bathrooms['bathroom_1'].images[0].name : ''}`,
  //       title: t('longtermroom:bathrooms'),
  //       subTitle: `${bathrooms.bathroom_1 ? bathrooms['bathroom_1'].images[0].caption : ''}`
  //     })
  //   }
  //   if (kitchens.images && kitchens.images.length) {
  //     arrImage.push({
  //       imgURL: `${IMAGE_STORAGE_LG + kitchens.images[0].name}`,
  //       title: t('longtermroom:kitchens'),
  //       subTitle: kitchens.images[0].caption
  //     })
  //   }
  //   if (furnitures.images && furnitures.images.length) {
  //     arrImage.push({
  //       imgURL: `${IMAGE_STORAGE_LG + furnitures.images[0].name}`,
  //       title: t('longtermroom:furnitures'),
  //       subTitle: furnitures.images[0].caption
  //     })
  //   }
  // }, []);
  return (
    <Fragment>
      <Hidden lgUp>
        <Grid container spacing={1} className={classes.boxContainer}>
          <Grid item xs={12}>
            <Grid container direction="column">
              <Grid item className={classes.paddingGrid}>
                <CardIntro
                  imgSrc={livingrooms.images && livingrooms.images.length ? `${IMAGE_STORAGE_LG + livingrooms.images[0].name}` : '/static/images/image-room-default.png'}
                  imgHeight={width === 'xl' ? 576 : 280}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdDown>
        <Grid container spacing={1} className={classes.boxContainer}>
          <Grid item xs={8}>
            <Grid container direction="column">
              <Grid item className={classes.paddingGrid}>
                <CardIntro
                  imgSrc={livingrooms.images && livingrooms.images.length ? `${IMAGE_STORAGE_LG + livingrooms.images[0].name}` : '/static/images/image-room-default.png'}
                  imgHeight={width === 'xl' ? 576 : 504}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={4}>
            <Grid container item xs={12}>
              <Grid item xs={12} className={classes.paddingGrid}>
                <CardIntro
                  imgSrc={cover_photo.images && cover_photo.images.length ? `${IMAGE_STORAGE_LG + bedrooms['bedroom_1'].images[0].name}` : '/static/images/image-room-default.png'}
                  imgHeight={width === 'xl' ? 284 : 250}
                />
              </Grid>
              <Grid item xs={12} className={classes.paddingGrid}>
                <CardIntro
                  imgSrc={kitchens.images && kitchens.images.length ? `${IMAGE_STORAGE_LG + kitchens.images[0].name}` : '/static/images/image-room-default.png'}
                  imgHeight={width === 'xl' ? 284 : 250}
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Hidden>
    </Fragment>
  );
};

export default BoxImageLT;
