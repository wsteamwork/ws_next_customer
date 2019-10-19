import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid } from '@material-ui/core';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import '/styles/pages/LTR/room/index.scss'
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';

interface IProps {
  classes?: any,
  livingrooms:ImagesRes,
  cover_photo: ImagesRes,
  outdoors?: ImagesRes,
  furnitures?: ImagesRes,
  kitchens?: ImagesRes,
  roomName:string,
  bedrooms: any,
  bathrooms: any,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer:{
      height:'55vh',
      margin:'64px 0 48px',
      [theme.breakpoints.down('xs')]:{
        height:'40vh',
        margin:'20px 0 48px',
      }
    },
  })
);

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {roomName, livingrooms, cover_photo, outdoors, furnitures, kitchens, bedrooms, bathrooms} = props;

  const imgContent = [
    {
      imgURL: `${IMAGE_STORAGE_LG + cover_photo.images[0].name}`,
      title: '',
      subTitle: cover_photo.images[0].caption
    },
    {
      imgURL: `${IMAGE_STORAGE_LG + livingrooms.images[0].name}`,
      title:'Phòng khách',
      subTitle: livingrooms.images[0].caption
    },
    {
      imgURL: `${IMAGE_STORAGE_LG + bedrooms.bedroom_1.images[0].name}`,
      title: 'Phòng ngủ',
      subTitle: bedrooms.bedroom_1.images[0].caption
    },
    {
      imgURL: `${IMAGE_STORAGE_LG + bathrooms.bathroom_1.images[0].name}`,
      title: 'Phòng tắm',
      subTitle: bathrooms.bathroom_1.images[0].caption
    }
  ];

  return (
    <Grid container spacing={1} className={classes.boxContainer}>
      <Slider className="slider-wrapper" autoplay={3000}>
        {imgContent.map((item,i)=>(
            <div
              key={i}
              className="slider-content"
              style={{ background: `url('${item.imgURL}') no-repeat center center` }}
            >
              <div className="inner">
                <h1 className={classes.txtName}>{item.title}</h1>
                <p>{item.subTitle}</p>
                {/*<button>{item.button}</button>*/}
              </div>
            </div>
        ))}
      </Slider>
    </Grid>
  );
};

export default BoxImageLT;
