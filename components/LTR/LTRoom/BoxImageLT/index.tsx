import { GlobalContext } from '@/store/Context/GlobalContext';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG, IMAGE_STORAGE_XS } from '@/utils/store/global';
import { Button, Grid, Hidden, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FC, Fragment, MouseEvent, useContext, useState } from 'react';
import 'react-animated-slider/build/horizontal.css';
// import DialogFullImage from './DialogFullImage';
import { useTranslation } from 'react-i18next';
import ProgressiveImage from 'react-progressive-image';
import DialogFullImage from '../BoxListImageRoom/DialogFullImage';
import '/styles/pages/LTR/room/index.scss';

interface IProps {
  classes?: any,
  livingrooms?: ImagesRes | any,
  cover_photo?: ImagesRes | any,
  furnitures?: ImagesRes | any,
  kitchens?: ImagesRes | any,
  bedrooms?: any,
  outdoors?: ImagesRes | any,
  roomName?: any,
  bathrooms?: any,
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
      margin: '10px 5px 8px 5px',
      [theme.breakpoints.down('sm')]: {
        margin: '5px 0 4px',
      },
      paddingGrid: {
        padding: 1
      }
    },
    imgSize: {
      maxHeight: '100%',
      width: '100%',
      backgroundSize: 'cover',
      borderRadius: 4,
      MozTransition: 'all 0.5s',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s',
      cursor: 'pointer',
      '&:hover': {
        MsTransform: 'scale(1.01)' /* IE 9 */,
        WebkitTransform: 'scale(1.01)' /* Safari 3-8 */,
        transform: 'scale(1.01)'
      },
      overflow: 'hidden'
    },
  })
);

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { livingrooms, bedrooms, isPreviewPage, kitchens, cover_photo, bathrooms, outdoors, furnitures, roomName } = props;
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenFullImage(!openFullImage);
  };

  return (
    <Fragment>
      <Hidden mdUp>
        <Grid container spacing={1} className={classes.boxContainer}>
          <Grid item xs={12}>
            <Grid container direction="column">
              <Grid item className={classes.paddingGrid}>
                <ProgressiveImage src={livingrooms.images && livingrooms.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + livingrooms.images[0].name}` : '/static/images/image-room-default.png'} placeholder={livingrooms.images && livingrooms.images.length && !isPreviewPage ? `${IMAGE_STORAGE_XS + livingrooms.images[0].name}` : '/static/images/image-room-default.png'}>
                  {(src, loading) => (
                    <img
                      src={src}
                      style={{
                        opacity: loading ? 0.1 : 1,
                        height: 280,
                        maxHeight: 280,
                      }}
                      className={classNames(classes.imgSize)}
                    />)}
                </ProgressiveImage>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid container spacing={1} className={classes.boxContainer}>
          <Grid item xs={6}>
            <Grid container direction="column">
              <Grid item className={classes.paddingGrid} onClick={toggle}>
                <ProgressiveImage src={livingrooms.images && livingrooms.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + livingrooms.images[0].name}` : '/static/images/image-room-default.png'} placeholder={livingrooms.images && livingrooms.images.length && !isPreviewPage ? `${IMAGE_STORAGE_XS + livingrooms.images[0].name}` : '/static/images/image-room-default.png'}>
                  {(src, loading) => (
                    <img
                      src={livingrooms.images && livingrooms.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + livingrooms.images[0].name}` : '/static/images/image-room-default.png'}
                      style={{
                        opacity: loading ? 0.1 : 1,
                        height: width === 'xl' ? 464 : width === 'md' ? 304 : width === 'lg' ? 334 : 504,
                        maxHeight: width === 'xl' ? 464 : width === 'md' ? 304 : width === 'lg' ? 334 : 504,
                      }}
                      className={classNames(classes.imgSize)}
                    />)}
                </ProgressiveImage>

              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={3}>
            <Grid container item xs={12}>
              <Grid item xs={12} className={classes.paddingGrid} onClick={toggle}>
                <ProgressiveImage src={bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + bedrooms['bedroom_1'].images[0].name}` : '/static/images/image-room-default.png'} placeholder={bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length && !isPreviewPage ? `${IMAGE_STORAGE_XS + bedrooms['bedroom_1'].images[0].name}` : '/static/images/image-room-default.png'}>
                  {(src, loading) => (
                    <img
                      src={src}
                      style={{
                        opacity: loading ? 0.1 : 1,
                        height: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                        maxHeight: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                      }}
                      className={classNames(classes.imgSize)}
                    />)}
                </ProgressiveImage>
              </Grid>
              <Grid item xs={12} className={classes.paddingGrid} onClick={toggle}>
                <ProgressiveImage src={kitchens.images && kitchens.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + kitchens.images[0].name}` : '/static/images/image-room-default.png'} placeholder={kitchens.images && kitchens.images.length && !isPreviewPage ? `${IMAGE_STORAGE_XS + kitchens.images[0].name}` : '/static/images/image-room-default.png'}>
                  {(src, loading) => (
                    <img
                      src={src}
                      style={{
                        opacity: loading ? 0.1 : 1,
                        height: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                        maxHeight: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                      }}
                      className={classNames(classes.imgSize)}
                    />)}
                </ProgressiveImage>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={3}>
            <Grid container item xs={12}>
              <Grid item xs={12} className={classes.paddingGrid} onClick={toggle}>
                <ProgressiveImage src={bathrooms[`bathroom_1`] && bathrooms[`bathroom_1`].images && bathrooms[`bathroom_1`].images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + bathrooms['bathroom_1'].images[0].name}` : '/static/images/image-room-default.png'} placeholder={bathrooms[`bathroom_1`] && bathrooms[`bathroom_1`].images && bathrooms[`bathroom_1`].images.length && !isPreviewPage ? `${IMAGE_STORAGE_XS + bathrooms['bathroom_1'].images[0].name}` : '/static/images/image-room-default.png'}>
                  {(src, loading) => (
                    <img
                      src={src}
                      style={{
                        opacity: loading ? 0.1 : 1,
                        height: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                        maxHeight: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                      }}
                      className={classNames(classes.imgSize)}
                    />)}
                </ProgressiveImage>
              </Grid>
              <Grid item xs={12} className={classes.paddingGrid} onClick={toggle}>
                <ProgressiveImage src={cover_photo.images && cover_photo.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + cover_photo.images[0].name}` : '/static/images/image-room-default.png'} placeholder={cover_photo.images && cover_photo.images.length && !isPreviewPage ? `${IMAGE_STORAGE_XS + cover_photo.images[0].name}` : '/static/images/image-room-default.png'}>
                  {(src, loading) => (
                    <img
                      src={cover_photo.images && cover_photo.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + cover_photo.images[0].name}` : '/static/images/image-room-default.png'}
                      style={{
                        opacity: loading ? 0.1 : 1,
                        height: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                        maxHeight: width === 'xl' ? 230 : width === 'md' ? 150 : width === 'lg' ? 165 : 250,
                      }}
                      className={classNames(classes.imgSize)}
                    />)}
                </ProgressiveImage>
                <div className={classes.insideParalax}>
                  <Button variant="contained" className={classes.button}>

                    {width === 'sm' || width === 'xs' ? t('room:imageRoom') :
                      <img
                        src="../../../static/images/telescope.svg"
                        alt="iconScope"
                        className={classes.iconScope}
                      />
                    }

                    {width === 'sm' || width === 'xs' ? '' : t('room:viewPhotos')}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <DialogFullImage open={openFullImage} handleClose={() => setOpenFullImage(false)}
        livingrooms={livingrooms}
        kitchens={kitchens}
        cover_photo={cover_photo}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        outdoors={outdoors}
        furnitures={furnitures}
        roomName={roomName}
      />
    </Fragment>
  );
};

export default BoxImageLT;
