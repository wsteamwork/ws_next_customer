import GridContainer from '@/components/Layout/Grid/Container';
import { TransitionCustom } from '@/components/Rooms/BottomNav';
// import ScrollableAnchor from 'react-scrollable-anchor';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Dialog, DialogContent, DialogTitle, Grid, Hidden, IconButton, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/styles';
// import ScrollAnim from 'rc-scroll-anim';
import 'rc-scroll-anim/assets/index.css';
import React, { FC, Fragment, Ref } from 'react';
import Masonry from 'react-masonry-component';

interface IProps {
    classes?: any,
    open: boolean,
    handleClose: () => void,
    livingrooms: ImagesRes,
    outdoors?: ImagesRes,
    furnitures?: ImagesRes,
    kitchens?: ImagesRes,
    cover_photo?: ImagesRes,
    bedrooms?: any,
    bathrooms?: any,
    roomName: string,
    refKit?: Ref<any>
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
    createStyles({
        dialogTitle: {
            borderBottom: '1px solid #eee'
        },
        dialogContent: {

        },
        btClose: {
            marginLeft: 16,
            padding: 8,
        },
        iconClose: {
            width: '1.6rem',
            height: '1.6rem',
        },
        roomName: {
            textAlign: 'right',
            margin: '0 auto',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.125rem',
            },
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'relative'
        },
        ul: {
            padding: 0,
            backgroundColor: '#fff',
        },
        images: {
            width: '100%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            borderRadius: 4,
            // [theme.breakpoints.up('md')]: {
            //     height: 320,
            // },
            // maxHeight: 320,
            objectFit: 'cover'
        },
        bigImage: {
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'cover',
            width: '100%',
            borderRadius: 4,
            maxHeight: 500,
            height: 'auto',
            objectFit: 'cover',
            [theme.breakpoints.up('md')]: {
                height: 500,
            },
        },
        listSection: {
            backgroundColor: '#fff',
            margin: '64px 0'
        },
        subHeader: {
            top: '-2%',
            fontSize: '1.6rem',
            marginBottom: 16,
        },
        titleSticky: {
            position: 'sticky',
            top: '5%',
        },
        stikyMobi: {
            backgroundColor: '#fff',
            [theme.breakpoints.down('sm')]: {
                position: 'sticky',
                top: '-1.1%',
            }
        },
        imageMasonry: {
            width: '48%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                margin: '2px'
            },
            margin: '4px'
        }
    })
);

// const Link = ScrollAnim.Link;
// const Element = ScrollAnim.Element;



const DialogFullImageMasonry: FC<IProps> = (props) => {
    const classes = useStyles(props);
    const { open, handleClose, livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms, cover_photo, roomName, refKit } = props;
    // console?
    const masonryOptions = {
        transitionDuration: 0
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={TransitionCustom}>
            <DialogTitle className={classes.dialogTitle} disableTypography>
                <Grid container alignItems='center'>
                    <Hidden smDown>
                        <Grid item xs>
                            <Typography variant="h6" className={classes.roomName}>
                                {roomName}
                            </Typography>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <IconButton className={classes.btClose} aria-label="Close" onClick={handleClose}>
                            <CloseIcon className={classes.iconClose} />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <GridContainer xs={11} sm={11} md={11} lg={11} xl={10}>
                    {livingrooms && livingrooms.images && livingrooms.images.length ? (
                        <Fragment>
                            <div className={classes.stikyMobi} >
                                <div className={classes.titleSticky}>
                                    <Typography variant='h5'>Phòng khách</Typography>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                <Masonry
                                    className={classes.root}
                                    options={masonryOptions} // default {}
                                    updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
                                >
                                    {livingrooms.images.map((o, i) => {
                                        if (i > 0) return (
                                            <div className={classes.imageMasonry}>
                                                <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                                            </div>
                                        )
                                    }
                                    )}
                                </Masonry>
                            </div>
                        </Fragment>
                    ) : <Fragment />}
                </GridContainer>
            </DialogContent>
        </Dialog >
    );
};

export default DialogFullImageMasonry;
