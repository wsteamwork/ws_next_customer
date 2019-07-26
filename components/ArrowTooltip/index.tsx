import React, { FC, useState, Fragment, Dispatch, SetStateAction, ReactNode } from 'react';
import { makeStyles, Tooltip, ClickAwayListener, Grid, Theme, Popover } from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';

const arrowGenerator = (color) => {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
};

const useStylesArrow = makeStyles((theme: Theme) => ({
  tooltip: {
    position: 'relative'
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  },
  popper: arrowGenerator('red')
}));

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: ReactNode;
}

const ArrowTooltip: FC<IProps> = (props) => {
  const { setOpen, open } = props;
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      {props.children}
      <Popover
        id={open ? 'simple-popover' : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        {props.title}
      </Popover>
    </Grid>

    // <ClickAwayListener onClickAway={hanldeClose}>
    //   <Grid>
    //     <Tooltip
    //       interactive
    //       classes={classes}
    //       onClose={hanldeClose}
    //       open={open}
    //       disableFocusListener
    //       disableHoverListener
    //       disableTouchListener
    //       PopperProps={{
    //         disablePortal: true
    //         // popperOptions: {
    //         //   modifiers: {
    //         //     arrow: {
    //         //       enabled: Boolean(arrowRef),
    //         //       element: arrowRef
    //         //     }
    //         //   }
    //         // }
    //       }}
    //       title={
    //         <Fragment>
    //           {props.title}
    //           <span className={arrow} ref={setArrowRef} />
    //         </Fragment>
    //       }>
    //       <Grid onClick={handleOpen}>{props.children}</Grid>
    //     </Tooltip>
    //   </Grid>
    // </ClickAwayListener>
  );
};

export default ArrowTooltip;
