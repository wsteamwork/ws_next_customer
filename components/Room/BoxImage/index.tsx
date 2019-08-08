import React, { FC, useState, forwardRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Button, Typography } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import { Parallax } from 'react-parallax';
import { IMAGE_STORAGE_LG, IMAGE_STORAGE_SM } from '@/utils/store/global';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import _ from 'lodash';
import '../../../styles/pages/room/boxImage/index.scss';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';

interface IProps {
  classes?: any;
}

const Transition = forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      margin: '32px 0'
    },
    img: {
      // maxHeight: '60vh',
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    parallaxContainer: {
      width: '100%',
      borderRadius: 4
    },
    contentParallax: {
      display: 'flex',
      justifyContent: 'center',
      height: '55vh'
    },
    insideParalax: {
      position: 'absolute',
      padding: 12,
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      textAlign: 'center'
      // backgroundColor: 'rgba(255, 255, 255, 0.95)',
      // borderRadius: 8,
      // boxShadow: '2px 4px 17px 0px rgba(0,0,0,0.3)',
      // display: 'initial',
    },
    button: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      textTransform: 'none',
      padding: '8px 12px'
    },
    iconScope: {
      marginRight: theme.spacing(1)
    },
    dialog: {
      // maxHeight:'100vh'
    },
    dialogTitle: {
      padding: theme.spacing(3),
      position: 'relative'
    },
    dialogContent: {
      [theme.breakpoints.down('sm')]: {
        padding: 0
      }
    },
    btClose: {
      right: '4%',
      position: 'absolute',
      margin: '0 auto',
      top: '50%',
      transform: 'translateY(-50%)',
      opacity: 1,
      transition: ' opacity 150ms ease-in-out 0s, transform 150ms ease-in-out 0s'
    },
    iconClose: {
      width: '2rem',
      height: '2rem'
    },
    roomName: {
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1,125rem'
      }
    }
  })
);

const BoxImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [openDialog, setOpenDialog] = useState(false);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  const handleClick = () => {
    setOpenDialog(!openDialog);
  };

  const images = room
    ? _.map(room.media.data, (o) => {
        return {
          original: `${IMAGE_STORAGE_LG}${o.image}`,
          thumbnail: `${IMAGE_STORAGE_SM}${o.image}`
        };
      })
    : [];

  if (room === null) {
    return <ContentPlaceHolder />;
  }

  return (
    <GridContainer xs={12} className={classes.root}>
      <Parallax
        bgImage={`${IMAGE_STORAGE_LG}o_dau_1.jpg`}
        strength={500}
        bgClassName={classes.img}
        className={classes.parallaxContainer}
        contentClassName={classes.contentParallax}>
        <div className={classes.insideParalax}>
          <Button variant="contained" className={classes.button} onClick={handleClick}>
            <img
              src="../../../static/images/telescope.svg"
              alt="iconScope"
              className={classes.iconScope}
            />
            Thăm quan căn hộ
          </Button>
        </div>
      </Parallax>

      <Dialog
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        scroll="body"
        fullScreen={true}
        maxWidth="xs"
        className={classes.dialog}
        open={openDialog}
        onClose={handleClick}>
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant="h4" className={classes.roomName}>
            {room.details.data[0].name}
          </Typography>

          <IconButton className={classes.btClose} aria-label="Close" onClick={handleClick}>
            <CloseIcon className={classes.iconClose} />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <GridContainer xs={11} sm={11} md={11} lg={10} xl={9}>
            <ImageGallery items={images} lazyLoad={true} showPlayButton={false} showIndex={true} />
          </GridContainer>
        </DialogContent>
      </Dialog>
    </GridContainer>
  );
};

export default BoxImage;
