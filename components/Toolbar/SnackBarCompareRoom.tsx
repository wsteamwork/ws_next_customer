import React, { Fragment, FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, IconButton, Grid, Snackbar, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import VisitedRoom from '@/components/Rooms/VisitedRooms/VisitedRoom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { CompareRoomsActions } from '@/store/Redux/Reducers/Room/CompareRooms';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import DialogComparison from '@/components/Toolbar/DialogComparison';

interface IProps {
  classes?: any,
  open?: boolean,
  onClose?: () => void,
  className?: string,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: 20,
    },
    boxEmpty: {
      padding: 16,
      border: '2px dashed #ddd',
      borderRadius: 2,
      margin: '8px 0px',
      textAlign: 'center',
      color: '#ddd'
    },
    btnShow: {
      color: '#41C9BC',
      border: '1px solid #41C9BC',
      textTransform: 'initial',
      marginTop: theme.spacing(1),
      float: 'right'
    },
    indexSnack: {
      zIndex: 1200,
    }
  })
);

const SnackBarCompareRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, onClose } = props;
  const comparisonList = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.compareRooms.compareRooms
  );
  const { t } = useTranslation();
  const [openCompare, setOpenCompare] = useState<boolean>(false);
  const hanldeShow = () => {
    setOpenCompare(true);
  };

  return (
    <Fragment>
      <Snackbar
        open={open}
        classes={{ root: classes.indexSnack }}
        autoHideDuration={null}
        // TransitionComponent={Transition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => onClose()}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        message={
          <Grid container spacing={2} style={{ maxWidth: 500 }}>
            <Grid item xs={6}>
              {
                comparisonList[0] ? (
                  <VisitedRoom room={comparisonList[0]} marginBottom={'0px'} />
                ) : (
                    <div className={classes.boxEmpty}>
                      <FontAwesomeIcon size='2x' icon={faTags} />
                      <Typography variant='h6'>{t('rooms:emptyItem')}</Typography>
                    </div>
                  )
              }
            </Grid>
            <Grid item xs={6}>
              {
                comparisonList[1] ? (
                  <VisitedRoom room={comparisonList[1]} marginBottom={'0px'} />
                ) : (
                    <div className={classes.boxEmpty}>
                      <FontAwesomeIcon size='2x' icon={faTags} />
                      <Typography variant='h6'>{t('rooms:emptyItem')}</Typography>
                    </div>
                  )
              }
            </Grid>
            <Grid item xs={12}>
              {
                comparisonList.length < 2 ? '' : (
                  <Button
                    variant="outlined"
                    className={classes.btnShow}
                    size='small'
                    onClick={hanldeShow}
                  >
                    {t('rooms:showCompare')}
                  </Button>
                )
              }
            </Grid>
          </Grid>
        }
      />

      <DialogComparison open={openCompare} handleClose={() => setOpenCompare(false)} />
    </Fragment>
  );
};

export default SnackBarCompareRoom;
