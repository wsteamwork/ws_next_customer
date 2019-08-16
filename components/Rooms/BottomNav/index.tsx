import React, { FC, useState, Fragment, forwardRef, useEffect, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { List, Adjust, PinDrop } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import { TransitionProps } from '@material-ui/core/transitions';
import { useTranslation } from 'react-i18next';
import FilterDrawerMobile from '../FilterDrawerMobile/index';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
      height: 60
    },
    customColor: {
      color: '#484848'
    }
  })
);
export const FILTER = 0;
export const TAB_LIST = 1;
export const MAP = 2;
export const NAV = 3;


export const TransitionCustom = forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps { }
const BottomNav: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const [index, setIndex] = useState<number>(TAB_LIST);

  return (
    <Fragment>
      <BottomNavigation
        value={index}
        onChange={(event, newValue) => {
          setIndex(newValue);
        }}
        showLabels
        className={classes.root}>
        <BottomNavigationAction className={classes.customColor} label={t('rooms:searchRooms:filterRooms')} icon={<Adjust />} />
        <BottomNavigationAction className={classes.customColor} label={t('rooms:list')} icon={<List />} />
        <BottomNavigationAction className={classes.customColor} label={t('rooms:location')} icon={<PinDrop />} />
      </BottomNavigation>
      <Dialog
        fullScreen
        TransitionComponent={TransitionCustom}
        scroll="paper"
        open={index === FILTER}
        onClose={() => setIndex(TAB_LIST)}
      >
        <FilterDrawerMobile setIndex={setIndex} />
      </Dialog>
    </Fragment>
  );
};

export default BottomNav;
