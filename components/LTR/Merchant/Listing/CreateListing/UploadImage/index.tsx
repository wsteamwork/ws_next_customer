import React, { FC, Fragment, useState, useReducer } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import UppyImage from './UppyImage';
import { ListingDetailContext, ListingDetailStateInit, ListingDetailReducer } from '@/store/Context/LTR/ListingDetailContext';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    App: {
      textAlign: 'center',
      backgroundColor: 'rgb(206, 213, 223)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)'
    },
    Card: {
      backgroundColor: 'white',
      padding: '64px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      boxShadow: '0 15px 30px 0 rgba(0, 0, 0, 0.11) , 0 5px 15px 0 rgba(0, 0, 0, 0.08)',
      boxSizing: 'border-box'
    }
  })
);

const UploadImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [state, dispatch] = useReducer(ListingDetailReducer, ListingDetailStateInit);
  return (
    <Fragment>
      <ListingDetailContext.Provider value={{ state, dispatch }}>
        <UppyImage />
      </ListingDetailContext.Provider>
    </Fragment>
  );
};

export default UploadImage;
