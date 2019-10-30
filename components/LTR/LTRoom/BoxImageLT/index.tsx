import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, useMemo, Fragment, MouseEvent, useState } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import '/styles/pages/LTR/room/index.scss';
import DialogFullImage from '../BoxListImageRoom/DialogFullImage';

interface IProps {
  classes?: any,
  livingrooms: ImagesRes,
  cover_photo: ImagesRes,
  outdoors?: ImagesRes,
  furnitures?: ImagesRes,
  kitchens?: ImagesRes,
  roomName: string,
  bedrooms: any,
  bathrooms: any,
}

interface IArrayImage {
  imgURL: string,
  title: string,
  subTitle: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      height: '55vh',
      margin: '64px 0 48px',
      [theme.breakpoints.down('xs')]: {
        height: '40vh',
        margin: '20px 0 48px',
      }
    },
  })
);

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms, cover_photo, roomName } = props;
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenFullImage(!openFullImage);
  };
  let arrImage: IArrayImage[] = [
    // {
    //   imgURL: `${IMAGE_STORAGE_LG + cover_photo.images[0].name}`,
    //   title: '',
    //   subTitle: cover_photo.images[0].caption
    // }
  ];

  const funcPushImage = useMemo(() => {
    if (cover_photo.images && cover_photo.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + cover_photo.images[0].name}`,
        title: '',
        subTitle: cover_photo.images[0].caption
      })
    }
    if (livingrooms.images && livingrooms.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + livingrooms.images[0].name}`,
        title: 'Phòng khách',
        subTitle: livingrooms.images[0].caption
      })
    }
    if (bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + bedrooms['bedroom_1'].images[0].name}`,
        title: 'Phòng ngủ',
        subTitle: bedrooms['bedroom_1'].images[0].caption
      })
    }
    if (bathrooms['bathroom_1'] && bathrooms['bathroom_1'].images.length) {
      arrImage.push({
        imgURL: `${bathrooms.bathroom_1 ? IMAGE_STORAGE_LG + bathrooms['bathroom_1'].images[0].name : ''}`,
        title: 'Phòng tắm',
        subTitle: `${bathrooms.bathroom_1 ? bathrooms['bathroom_1'].images[0].caption : ''}`
      })
    }
    if (kitchens.images.length && kitchens.images) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + kitchens.images[0].name}`,
        title: 'Phòng bếp',
        subTitle: kitchens.images[0].caption
      })
    }
    if (furnitures.images.length && furnitures.images) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + furnitures.images[0].name}`,
        title: 'Nội thất',
        subTitle: furnitures.images[0].caption
      })
    }
  }, []);

  return (
    <Fragment>
      <Grid container spacing={1} className={classes.boxContainer}>
        <Slider className="slider-wrapper" autoplay={3000}>
          {arrImage.map((item, i) => (
            <div
              onClick={toggle}
              key={i}
              className="slider-content"
              style={{ background: `url('${item.imgURL}') no-repeat center center` }}
            >
              {/* <div className="inner"> */}
              {/* <h1 className={classes.txtName}>{item.title}</h1> */}
              {/* <p>{item.subTitle}</p> */}
              {/*<button>{item.button}</button>*/}
              {/* </div> */}
            </div>
          ))}
        </Slider>
      </Grid>
      {/* <DialogFullImage open={openFullImage} handleClose={() => setOpenFullImage(false)}
        livingrooms={livingrooms}
        kitchens={kitchens}
        cover_photo={cover_photo}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        outdoors={outdoors}
        furnitures={furnitures}
        roomName={roomName}
      /> */}
    </Fragment>
  );
};

export default BoxImageLT;
