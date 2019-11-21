// import DialogFullImage from '../BoxListImageRoom/DialogFullImage';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Hidden, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
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
      margin: '10px 0 8px',
      [theme.breakpoints.down('sm')]: {
        margin: '5px 0 4px',
      },
      paddingGrid: {
        padding: 2
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
  const { livingrooms, bedrooms, isPreviewPage, kitchens } = props;
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);
  const { width } = useContext(GlobalContext);
  return (
    <Fragment>
      <Hidden mdUp>
        <Grid container spacing={1} className={classes.boxContainer}>
          <Grid item xs={12}>
            <Grid container direction="column">
              <Grid item className={classes.paddingGrid}>
                <img
                  src={livingrooms.images && livingrooms.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + livingrooms.images[0].name}` : '/static/images/image-room-default.png'}
                  style={{
                    height: 280,
                    maxHeight: 280,
                  }}
                  className={classNames(classes.imgSize)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid container spacing={1} className={classes.boxContainer}>
          <Grid item xs={8}>
            <Grid container direction="column">
              <Grid item className={classes.paddingGrid}>
                <img
                  src={livingrooms.images && livingrooms.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + livingrooms.images[0].name}` : '/static/images/image-room-default.png'}
                  style={{
                    height: width === 'xl' ? 576 : width === 'md' ? 304 : width === 'lg' ? 404 : 504,
                    maxHeight: width === 'xl' ? 576 : width === 'md' ? 304 : width === 'lg' ? 404 : 504,
                  }}
                  className={classNames(classes.imgSize)}
                />

              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={4}>
            <Grid container item xs={12}>
              <Grid item xs={12} className={classes.paddingGrid}>
                <img
                  src={bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + bedrooms['bedroom_1'].images[0].name}` : '/static/images/image-room-default.png'}
                  style={{
                    height: width === 'xl' ? 284 : width === 'md' ? 150 : width === 'lg' ? 200 : 250,
                    maxHeight: width === 'xl' ? 284 : width === 'md' ? 150 : width === 'lg' ? 200 : 250,
                  }}
                  className={classNames(classes.imgSize)}
                />
              </Grid>
              <Grid item xs={12} className={classes.paddingGrid}>
                <img
                  src={kitchens.images && kitchens.images.length && !isPreviewPage ? `${IMAGE_STORAGE_LG + kitchens.images[0].name}` : '/static/images/image-room-default.png'}
                  style={{
                    height: width === 'xl' ? 284 : width === 'md' ? 150 : width === 'lg' ? 200 : 250,
                    maxHeight: width === 'xl' ? 284 : width === 'md' ? 150 : width === 'lg' ? 200 : 250,
                  }}
                  className={classNames(classes.imgSize)}
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
