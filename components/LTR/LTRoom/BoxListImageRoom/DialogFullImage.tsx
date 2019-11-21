import GridContainer from '@/components/Layout/Grid/Container';
import { TransitionCustom } from '@/components/Rooms/BottomNav';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Dialog, DialogContent, Divider, Grid, IconButton, List, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import 'rc-scroll-anim/assets/index.css';
import React, { FC, Fragment, Ref, useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Masonry from 'react-masonry-css';
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
    dialogContent: {
      padding: 0,
    },
    btnIconClose: {
      borderRadius: 'unset',
      background: '#000'
    },
    btClose: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    iconClose: {
      color: '#fff',
      width: '1.6rem',
      height: '1.6rem',
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative'
    },
    images: {
      width: '100%',
      borderRadius: 4,
      [theme.breakpoints.up('md')]: {
      },
      objectFit: 'cover'
    },
    bigImage: {
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
      // margin: '64px 0'
      margin: '8px 0'
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
    appBar: {
      position: "relative"
    },
  })
);

const scrollToRef = (ref) => {
  window.document.getElementById('full_image_dialog_openned').scrollTo(0, ref.current.offsetTop)
}

const DialogFullImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms } = props;
  const livingroomRef = useRef(null);
  const bedroomRef = useRef(null);
  const bathroomRef = useRef(null);
  const kitchenRef = useRef(null);
  const outdoorRef = useRef(null);
  const furnitureRef = useRef(null);
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const [value, setValue] = useState<number>(0);
  const { t } = useTranslation();

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: any) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1
  };
  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={TransitionCustom} scroll="paper">
      <AppBar className={classes.appBar} color="inherit" elevation={0}>
        <Grid item className={classes.btClose}>
          <IconButton classes={{ root: classes.btnIconClose }} size="small" aria-label="Close" onClick={handleClose}>
            <CloseIcon className={classes.iconClose} />
          </IconButton>
        </Grid>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="inherit"
          aria-label="action tabs example"
        >
          {
            livingrooms && livingrooms.images && <Tab label={t('longtermroom:livingrooms')} onClick={() => scrollToRef(livingroomRef)} {...a11yProps(0)} />
          }
          {
            bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length && <Tab label={t('longtermroom:bedrooms')} onClick={() => scrollToRef(bedroomRef)} {...a11yProps(1)} />
          }
          {
            bathrooms[`bathroom_1`] && bathrooms[`bathroom_1`].images && bathrooms[`bathroom_1`].images.length && <Tab label={t('longtermroom:bathrooms')} onClick={() => scrollToRef(bathroomRef)} {...a11yProps(2)} />
          }
          {
            kitchens && kitchens.images && kitchens.images.length && <Tab label={t('longtermroom:kitchens')} onClick={() => scrollToRef(kitchenRef)} {...a11yProps(3)} />
          }
          {
            furnitures && furnitures.images && furnitures.images.length && <Tab label={t('longtermroom:furnitures')} onClick={() => scrollToRef(furnitureRef)} {...a11yProps(4)} />
          }
          {
            outdoors && outdoors.images && outdoors.images.length && <Tab label={t('longtermroom:outdoors')} onClick={() => scrollToRef(outdoorRef)} {...a11yProps(5)} />
          }
        </Tabs>
        <Divider />

      </AppBar>

      <DialogContent classes={{ root: classes.dialogContent }} id="full_image_dialog_openned">
        <GridContainer xs={11} sm={11} md={11} lg={11} xl={10}>
          <List className={classes.root} subheader={<li />}>

            {livingrooms && livingrooms.images && livingrooms.images.length ? (
              <li ref={livingroomRef} className={classes.listSection}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>{t('room:livingroomsImg')}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <img src={IMAGE_STORAGE_LG + livingrooms.images[0].name} alt={livingrooms.images[0].caption} className={classes.bigImage} />
                      </Grid>

                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {livingrooms.images.map((o, i) => {
                          if (i > 0) return (
                            <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                          )
                        })}
                      </Masonry>
                    </Grid>
                  </Grid>
                </Grid>
              </li>
            ) : <Fragment />}
            <div ref={bedroomRef}>
              {_.times(bedrooms.number_bedroom, (i) => (
                <li className={classes.listSection} key={i}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={2} className={classes.stikyMobi}>
                      <div className={classes.titleSticky}>
                        <Typography variant='h5'>{t('room:bedroomsImg')} {i + 1}</Typography>
                      </div>
                    </Grid>
                    {
                      bedrooms[`bedroom_${i + 1}`] && bedrooms[`bedroom_${i + 1}`].images && bedrooms[`bedroom_${i + 1}`].images.length ? (
                        <Grid item xs={12} sm={12} md={10}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <img src={IMAGE_STORAGE_LG + bedrooms[`bedroom_${i + 1}`].images[0].name} alt={bedrooms[`bedroom_${i + 1}`].images[0].caption} className={classes.bigImage} />
                            </Grid>
                            <Masonry
                              breakpointCols={breakpointColumnsObj}
                              className="my-masonry-grid"
                              columnClassName="my-masonry-grid_column"
                            >
                              {bedrooms[`bedroom_${i + 1}`].images.map((o, i) => {
                                if (i > 0) return (
                                  <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                                )
                              })}
                            </Masonry>
                          </Grid>
                        </Grid>) : ''
                    }
                  </Grid>
                </li>
              ))}
            </div>
            <div ref={bathroomRef}>
              {_.times(bathrooms.number_bathroom, (i) => (
                <li className={classes.listSection} key={i}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={2} className={classes.stikyMobi}>
                      <div className={classes.titleSticky}>
                        <Typography variant='h5'>{t('room:bathroomsImg')} {i + 1}</Typography>
                      </div>
                    </Grid>

                    {
                      bathrooms[`bathroom_${i + 1}`] && bathrooms[`bathroom_${i + 1}`].images && bathrooms[`bathroom_${i + 1}`].images.length ? (
                        <Grid item xs={12} sm={12} md={10}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <img src={IMAGE_STORAGE_LG + bathrooms[`bathroom_${i + 1}`].images[0].name} alt={bathrooms[`bathroom_${i + 1}`].images[0].caption} className={classes.bigImage} />
                            </Grid>

                            <Masonry
                              breakpointCols={breakpointColumnsObj}
                              className="my-masonry-grid"
                              columnClassName="my-masonry-grid_column"
                            >
                              {bathrooms[`bathroom_${i + 1}`].images.map((o, i) => {
                                if (i > 0) return (
                                  <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                                )
                              })}
                            </Masonry>
                          </Grid>
                        </Grid>) : ''
                    }

                  </Grid>
                </li>
              ))}
            </div>
            {kitchens && kitchens.images && kitchens.images.length ? (
              <li ref={kitchenRef} className={classes.listSection}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>{t('room:kitchensImg')}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <img src={IMAGE_STORAGE_LG + kitchens.images[0].name} alt={kitchens.images[0].caption} className={classes.bigImage} />
                      </Grid>
                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {kitchens.images.map((o, i) => {
                          if (i > 0) return (
                            <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                          )
                        })}
                      </Masonry>
                    </Grid>
                  </Grid>
                </Grid>
              </li>
            ) : <Fragment />}

            {furnitures && furnitures.images && furnitures.images.length ? (
              <li ref={furnitureRef} className={classes.listSection}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>{t('room:furnituresImg')}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <img src={IMAGE_STORAGE_LG + furnitures.images[0].name} alt={furnitures.images[0].caption} className={classes.bigImage} />
                      </Grid>
                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {furnitures.images.map((o, i) => {
                          if (i > 0) return (
                            <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                          )
                        })}
                      </Masonry>
                    </Grid>
                  </Grid>
                </Grid>
              </li>
            ) : <Fragment />}

            {outdoors && outdoors.images && outdoors.images.length ? (
              <li ref={outdoorRef} className={classes.listSection}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>{t('room:aroundAccommodationImg')}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <img src={IMAGE_STORAGE_LG + outdoors.images[0].name} alt={outdoors.images[0].caption} className={classes.bigImage} />
                      </Grid>
                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {outdoors.images.map((o, i) => {
                          if (i > 0) return (
                            <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                          )
                        })}
                      </Masonry>
                    </Grid>
                  </Grid>
                </Grid>
              </li>
            ) : <Fragment />}
          </List>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFullImage;
