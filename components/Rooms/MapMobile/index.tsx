import React, { Fragment, FC, useContext, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Hidden, DialogTitle, Dialog, IconButton, DialogContent, Grid } from '@material-ui/core';
import { TransitionCustom, FILTER, TAB_LIST } from "@/components/Rooms/BottomNav";
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import CloseIcon from "@material-ui/icons/Close";
import FilterIcon from "@material-ui/icons/FilterListRounded";
import MapRoomListing from '@/components/Rooms/MapAndListing/MapRoomListing';
import { useTranslation } from 'react-i18next';
import FilterDrawerMobile from '@/components/Rooms/FilterDrawerMobile';
interface IProps {
  classes?: any
  openMap?: boolean
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    closeButton: {
      [theme!.breakpoints!.only!("xs")]: {},
      position: "absolute",
      top: '1%',
      right: '1%'
    },
    closeButtonRoot: {
      [theme!.breakpoints!.only!("xs")]: {
        position: "absolute"
      }
    },
    label: {
      [theme!.breakpoints!.only!("xs")]: {
        textAlign: "center",
        backgroundColor: "#fff",
        width: "1.6em",
        height: "1.6em",
        boxShadow: '1px 5px 5px rgba(0, 0, 0, 0.15)',
        borderRadius: 4
      }
    },
    filterButton: {
      position: "absolute",
      top: "3.8%",
      [theme!.breakpoints!.only!("xs")]: {
        bottom: '5%',
        top: 'unset',
      },
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: 999
    },
    list: {
      [theme!.breakpoints!.up!("lg")]: {
        maxHeight: "83vh"
      },
      [theme!.breakpoints!.between!("sm", "md")]: {
        maxHeight: "43vh",
        order: 1,
        marginTop: 10
      },
      [theme!.breakpoints!.only!("xs")]: {
        maxHeight: "47vh",
        order: 1,
        position: "absolute",
        bottom: 5,
        zIndex: 100
      },
      overflow: "auto"
    },
    mapContainer: {
      [theme!.breakpoints!.up!("lg")]: {
        minHeight: "82vh"
      },
      [theme!.breakpoints!.between!("sm", "md")]: {
        minHeight: "46vh"
      },
      [theme!.breakpoints!.only!("xs")]: {
        minHeight: "100vh"
      }
    },
    dialogContent: {
      [theme!.breakpoints!.only!("xs")]: {
        padding: 0
      }
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      [theme!.breakpoints!.only!("xs")]: {
        textAlign: "center",
        position: "absolute",
        zIndex: 9999,
        top: -3,
        left: 9
      }
    }
  })
);

const MapMobile: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { openMap } = props;
  const [index, setIndex] = useState<number>(TAB_LIST);
  const { state: stateRoomIndex, dispatch: mapDispatch } = useContext(RoomIndexContext);
  const { t } = useTranslation();

  const handleOpenFilter = () => {
    setIndex(FILTER);
  };

  const mapClose = () => {
    mapDispatch({
      type: "setMapOpen",
      isMapOpen: false
    });
  };

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={openMap}
        onClose={mapClose}
        TransitionComponent={TransitionCustom}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Hidden xsDown>
            <Typography variant="h6">
              {t('rooms:map')}
            </Typography>
            {/*<MapFilter />*/}
          </Hidden>

          <IconButton
            className={classes.closeButton}
            onClick={mapClose}
            classes={{
              root: classes.closeButtonRoot,
              label: classes.label
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={0} style={{ height: '100%' }}>
            <div className='roomListing'>
              <MapRoomListing />
            </div>

            <Hidden mdUp>
              <IconButton
                className={classes.filterButton}
                classes={{
                  root: classes.closeButtonRoot,
                  label: classes.label
                }}
                onClick={handleOpenFilter}
              >
                <FilterIcon />
              </IconButton>
              <Dialog
                fullScreen
                open={index === FILTER}
                TransitionComponent={TransitionCustom}
                scroll="paper"
                onClose={() => setIndex(TAB_LIST)}
              >
                <FilterDrawerMobile setIndex={setIndex} />
              </Dialog>
            </Hidden>
            {/*<Grid*/}
            {/*  container*/}
            {/*  item*/}
            {/*  xs={12}*/}
            {/*  lg={5}*/}
            {/*  spacing={xsMode ? 0 : 12}*/}
            {/*  className={classes.list}*/}
            {/*  id="room-map-list"*/}
            {/*  justify="center"*/}
            {/*>*/}
            {/*  <MapRooms*/}
            {/*    page={page}*/}
            {/*    pageChange={pageChange}*/}
            {/*    hoverId={hoverId}*/}
            {/*    hoverAction={hoverAction}*/}
            {/*    focusRoomLocation={focusRoomLocation}*/}
            {/*    rooms={roomChunks}*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12} lg={7} className={classes.mapContainer}>*/}
            {/*  <MapDetail*/}
            {/*    hoverId={hoverId}*/}
            {/*    center={center}*/}
            {/*    hoverAction={hoverAction}*/}
            {/*    rooms={roomChunks}*/}
            {/*    setRooms={setRoomChunks}*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default MapMobile;
