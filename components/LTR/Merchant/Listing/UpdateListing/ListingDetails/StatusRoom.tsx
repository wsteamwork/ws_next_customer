import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import FiberIcon from '@material-ui/icons/FiberManualRecord';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      display:'flex',
      alignItems: 'center',
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    icon: {
      width: '0.8rem',
      height: '0.8rem',
      marginRight: theme.spacing(1),
      color: '#1d8df7'
    }
  })
);

const StatusRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Trạng thái">
          <Typography variant="subtitle1" className={classes.name}>
            <FiberIcon className={classes.icon} />
            {listing.short_term_room.status_txt}
          </Typography>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default StatusRoom;
