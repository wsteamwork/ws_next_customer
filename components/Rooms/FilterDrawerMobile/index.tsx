import React, { FC, useState, Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TAB_LIST } from '@/components/Rooms/BottomNav';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import RoomType from '../FilterActions/RoomType';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    center: {
      textAlign: 'center',
    },
    closeButton: {
     position: 'absolute',
     top: 0,
     right: 0
    },
    dialog: {
      [theme!.breakpoints!.only!('xs')]: {
        padding: '0 20px',
      },
    },
    sortMargin: {
      marginTop: 12,
    },
    title: {
      fontWeight: 700,
    },
  })
);
interface IProps {
  classes?: any
  setIndex(value: number): void
}
const FilterDrawerMobile: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {setIndex} = props;

  return (
    <Fragment>
        <DialogTitle disableTypography>
        <Typography variant = 'h6' className = {classes.center}>Bộ lọc phòng</Typography>
        <IconButton
          className = {classes.closeButton}
          onClick = {() => setIndex(TAB_LIST)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className = {classes.dialog}>
      <Grid item xs = {12} container className = {classes.sortMargin} spacing = {0}>
      <Grid item xs = {12} className = {classes.sortMargin}>
            <Typography variant = 'subtitle2' className = {classes.title}>Loại phòng</Typography>
            {/* {roomTypes.length > 0 ? (
              <Fragment>
                <ul className = {classes.ul}>
                  {_.map(roomTypeChunks, (o) => (
                    <li key = {o.id}>
                      <FormControlLabel
                        control = {<Checkbox
                          name = {o.id.toString()}
                          color = 'primary'
                          onChange = {roomTypeEvent}
                          value = {o.id.toString()}
                          checked = {_.indexOf(roomTypeLocal, o.id) !== -1}
                          classes = {{
                            root: classes.checkboxRoot,
                          }}
                        />}
                        label = {o.value}
                      />
                    </li>
                  ))}
                </ul>
                <Paper
                  elevation = {0} className = {classes.showMore}
                  onClick = {() => setRoomTypeExpand(!isRoomTypeExpand)}
                >
                  {isRoomTypeExpand ? 'Thu gọn' : 'Mở rộng'}
                </Paper>
              </Fragment>
            ) : ''} */}
          </Grid>
      </Grid>
      </DialogContent>
    </Fragment>
  );
};

export default FilterDrawerMobile;
